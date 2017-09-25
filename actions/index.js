const RECEIVE_DECKS = 'RECEIVE_DECKS'
const ADD_DECK = 'ADD_DECK'
const GET_DECK = 'GET_DECK'
const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'

function receiveDecks (decks) {
	return {
		type: RECEIVE_DECKS,
		decks,
	}
}

function addDeck (deck) {
	return {
		type: ADD_DECK,
		deck
	}
}

function getDeck (deck) {
	return {
		type: GET_DECK,
		deck
	}
}

function addCard (card, deck) {
	return {
		type: ADD_CARD_TO_DECK,
		card,
		deck
	}
}

export {
	RECEIVE_DECKS,
	ADD_DECK,
	GET_DECK,
	ADD_CARD_TO_DECK,
	receiveDecks,
	addDeck,
	getDeck,
	addCard,
}