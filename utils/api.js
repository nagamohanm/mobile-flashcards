import {AsyncStorage} from 'react-native'
import {formatResults} from './helper'

export const DECKS_STORAGE_KEY = 'FlashCards:decks'

export function fetchDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(formatResults)
}

export function submitDeck({deck}) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [deck.title]: deck,
    }))
}

export function fetchDeck({key}) {
	return fetchDecks().then((deckObject) => {
		return deckObject[key]
	}).catch((error) => console.log("fetchDeck ", error))
}

export function addCardToDeck({key, card}) {
    return fetchDecks().then((deckObject) => {
    	let deck = deckObject[key]
    	deck.questions.push(card)
		return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        	[deck.title]: deck,
    	}))
	}).catch((error) => console.log("addCardToDeck ", error))
}