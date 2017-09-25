import React, {Component} from 'react'
import {View, Text, StyleSheet, Platform, TouchableOpacity, FlatList} from 'react-native'
import {connect} from 'react-redux'
import {white} from '../utils/colors'
import {fetchDecks} from '../utils/api'
import {receiveDecks} from '../actions'
import {AppLoading} from 'expo'

class Decks extends Component {
    state = {
        ready: false,
    }

    componentDidMount () {
        const {dispatch} = this.props
		console.log(this.props)

        fetchDecks().then((decks) => dispatch(receiveDecks(decks)))
            .then(() => this.setState(() => ({ready: true})))
    }
   
    renderEmptyDeck() {
        return (
            <View style={styles.item}>
                <Text style={styles.noDataText}>
                    No decks available!
                </Text>
            </View>
        )
    }
    keyExtractor = (item, index) => item.id
    render() {
        const {decks} = this.props
        const {ready} = this.state

	    if(ready === false) {
	    	return <AppLoading />
	    }

        const deckArray = []

        Object.keys(decks).map((key) => {
        	deckArray.push(decks[key])
        })

        return (
            <View style={styles.list}>
                <FlatList
                	data={deckArray}
                	ListEmptyComponent={this.renderEmptyDeck}
                	keyExtractor={this.keyExtractor}
                	renderItem={({item}) => (
						<View style={styles.item}>
				            <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckView', {entryId: item.id, title: item.title})}>
				        		<Text style={styles.itemInfoTitle}>{item.title}</Text>
				        		<Text style={styles.itemInfoSubtitle}>{item.questions.length} cards</Text>
				          	</TouchableOpacity>
				        </View>
                	)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
	list: {
    	flex: 1,
  	},
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        minHeight: 100,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    itemInfoTitle: {
    	fontSize: 26,
        textAlign: 'center',
    },
    itemInfoSubtitle: {
    	fontSize: 12,
        textAlign: 'center',
    },
})

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(
    mapStateToProps,
)(Decks)