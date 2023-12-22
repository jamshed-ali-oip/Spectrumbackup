import {
    GET_EVENTS
  } from '../actions/actionType';
  
  const INITIAL_STATE = []
  
const events = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_EVENTS:
        return action.payload
      default:
        return state;
    }
  };

  export default events
  