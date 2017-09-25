import React, {Component} from 'react'
import {View, TouchableOpacity, Text, TextInput, StyleSheet, Platform} from 'react-native'
import {NavigationActions} from 'react-navigation'
import {connect} from 'react-redux'

import {white, purple} from '../utils/colors'

import {addDeck} from '../actions'
import {submitDeck} from '../utils/api'

function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}

class AddDeck extends Component {
    state = {
        title: ""
    }
    submit = () => {
        const deckTitle = this.state.title

        const deck = {
        	id: new Date().getTime(),
            title: deckTitle,
            questions: [],
        }

        this.props.dispatch(addDeck({
            [deckTitle]: deck
        }))

        this.setState({title: ""})

        submitDeck({deck});

        this.redirectToHome()
    }

    redirectToHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.deckText}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.deckTitleInput}
                    onChangeText={(title) => this.setState({title})}
                    value={this.state.title}
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
        justifyContent: 'center',
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
    deckText: {
        fontSize: 32,
        textAlign: 'center',
    },
    deckTitleInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
})

export default connect()(AddDeck)