import { ADD_DECK, ADD_CARD, RECEIVE_DECKS, REMOVE_DECK, REMOVE_QUESTION } from '../actions'

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
      const decks = Object.keys(state)
        .filter((key) => key === action.key)
        .map((key) => state[key])
      return {
        ...decks,
      }
    case ADD_CARD :
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          questions: state[action.key].questions.concat(action.card)
        }
      }
    case REMOVE_QUESTION :
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          questions: state[action.key].questions
            .filter((q) => q.id !== action.qid)
        }
      }
      default :
        return state
  }
}

export default decks