import { ADD_DECK, ADD_CARD, RECEIVE_DECKS, REMOVE_DECK } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.deck,
      }
    case REMOVE_DECK :
      const { [action.key]: value, ...rest } = state
      return {
        ...rest,
      }
    case ADD_CARD :
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          questions: state[action.key].questions.concat(action.card)
        }
      }
      default :
        return state
  }
}

export default decks