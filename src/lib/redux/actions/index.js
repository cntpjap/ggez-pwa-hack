import { ADD_COUNTER } from '../actions/actionType'

export const addCounter = (count) => {
  return {
		type: ADD_COUNTER, 
		count: count
	}
}