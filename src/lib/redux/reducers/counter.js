import { ADD_COUNTER } from '../actions/actionType'
import { getSectionsDB } from '../../../lib/firebase'

let initialState = 0

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNTER:
      return state + action.payload;
  
    default:
      
      return state;
  }
}

export default counterReducer