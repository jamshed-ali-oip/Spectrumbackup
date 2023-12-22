import {
    GET_NINTY_FIVE
  } from '../actions/actionType';
  
  const INITIAL_STATE = []
  
const nintyFive = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_NINTY_FIVE:
        return action.payload
      default:
        return state;
    }
  };

  export default nintyFive
  