import React, {Component} from 'react'
import {View, TouchableOpacity, Text, TextInput, StyleSheet, Platform} from 'react-native'
import {NavigationActions} from 'react-navigation'
import {connect} from 'react-redux'

import {white, purple, gray} from '../utils/colors'

import {addCard, getDeck} from '../actions'
import {fetchDeck, addCardToDeck} from '../utils/api'

function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}

class AddCard extends Component {
    state = {
        question: "",
        answer: ""
    }

    static navigationOptions = ({ navigation }) => {
        return {
          title: "Add Card"
        }
    }

    componentDidMount () {
        const {title} = this.props
        console.log(this.props)

        fetchDeck(title).then((deck) => this.props.getDeck(deck))
    }

    submit = () => {
        const {question, answer} = this.state
        const {title, deck} = this.props

        const card = {question, answer}

        this.props.addCard({deck, card})

        this.setState({question: "", answer: ""})

        const cardInfo = {
            key: title, 
            card
        }
        addCardToDeck(cardInfo)

        this.props.navigation.state.params.refresh()
        this.props.navigation.goBack('AddCard')
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.cardTitleInput}
                    onChangeText={(question) => this.setState({question})}
                    value={this.state.question}
                    placeholder="Question"
                    placeholderColor={gray}
                />
                <TextInput
                    style={styles.cardTitleInput}
                    onChangeText={(answer) => this.setState({answer})}
                    value={this.state.answer}
                    placeholder="Answer"
                    placeholderColor={gray}
                />
                <SubmitBtn onPress={this.submit}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    cardTitleInput: {
        marginTop: 10,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
})

function mapStateToProps (state, { navigation }) {
    const { title, deck } = navigation.state.params
    return {
        title,
        deck: state[title],
    }
}

function mapDispatchToProps (dispatch, { navigation }) {
  return {
    getDeck: (deck) => dispatch(getDeck(deck)),
    addCard: ({deck, card}) => dispatch(addCard({deck, card})),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddCard)