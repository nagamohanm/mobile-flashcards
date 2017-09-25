import React, {Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import {white, black, blue, gray} from '../utils/colors'
import {fetchDeck, fetchDecks} from '../utils/api'
import {getDeck} from '../actions'

function AddCardBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? [styles.iosBtnStyles, styles.iosAddCardBtn] : [styles.androidBtnStyles, styles.androidAddCardBtn]}
            onPress={onPress}>
            <Text style={styles.addCardBtnText}>Add Card</Text>
        </TouchableOpacity>
    )
}

function StartQuizBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? [styles.iosBtnStyles, styles.iosStartQuizBtn] : [styles.androidBtnStyles, styles.androidStartQuizBtn]}
            onPress={onPress}>
            <Text style={styles.startQuizBtnText}>Start Quiz</Text>
        </TouchableOpacity>
    )
}
class DeckView extends Component {
	state = {
		reload: false,
		deck: {},
	}
	static navigationOptions = ({ navigation }) => {
	    const { entryId, title } = navigation.state.params

	    return {
	      title: `${title}`
	    }
	}

	shouldComponentUpdate (nextProps, nextState) {
	    return this.state !== nextState
  	}

  	componentWillUpdate(nextProps) {
		fetchDecks().then((decks) => console.log(JSON.stringify(decks)))
  	}

  	refreshScreen = () => {
  		this.setState({
			reload: true,
		})	
  		
  	}
	render () {
		const {deck} = this.props
	
		return (
			<View style={styles.container}>
		        <View style={{flex: 2, justifyContent: 'center',}}>
		        	<Text style={styles.itemInfoTitle}>{deck.title}</Text>
		        	<Text style={styles.itemInfoSubtitle}>{deck.questions.length} cards</Text>
		        </View>
		        <View style={{flex: 1, justifyContent: 'center',}}>
		        	<AddCardBtn onPress={() => this.props.navigation.navigate('AddCard', {title: deck.title, refresh: () => this.refreshScreen()})} />
		        	<StartQuizBtn onPress={() => alert("Start Quiz Pressed")}/>
		        </View>
	      	</View>
		)
	}
}

const styles = StyleSheet.create({
  	container: {
    	flex: 1,
    	justifyContent: 'center',
    	backgroundColor: white,
    	padding: 15,
  	},
  	itemInfoTitle: {
    	fontSize: 32,
        textAlign: 'center',
    },
    itemInfoSubtitle: {
    	marginTop: 10,
    	fontSize: 16,
        textAlign: 'center',
        color: gray
    },
  	iosBtnStyles: {
		padding: 10,
        borderWidth: 1,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
  	},
  	androidBtnStyles: {
  		padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderWidth: 1,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
  	},
  	iosAddCardBtn: {
        backgroundColor: white,
    },
    androidAddCardBtn: {
        backgroundColor: white,
    },
    iosStartQuizBtn: {
        backgroundColor: blue,
    },
    androidStartQuizBtn: {
        backgroundColor: blue,
    },
    addCardBtnText: {
        color: black,
        fontSize: 22,
        textAlign: 'center',
    },
    startQuizBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
})

function mapStateToProps (state, { navigation }) {
  	const { title } = navigation.state.params

  	return {
    	title,
    	deck: state[title],
  	}
}

function mapDispatchToProps (dispatch, { navigation }) {
  const { entryId, deck } = navigation.state.params

  return {
  	getDeck: (deck) => dispatch(getDeck(deck)),
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckView)