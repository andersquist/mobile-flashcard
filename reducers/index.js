import { ADD_DECK, ADD_QUESTION, RECEIVE_DECKS, REMOVE_DECK, REMOVE_QUESTION } from '../actions'

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
        .filter((key) => key === action.id)
        .map((key) => state[key])
      return {
        ...decks,
      }
    case ADD_QUESTION :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          questions: state[action.id].questions.concat(action.question)
        }
      }
    case REMOVE_QUESTION :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          questions: state[action.id].questions
            .filter((q) => q.id !== action.qid)
        }
      }
      default :
        return state
  }
}

export default decks