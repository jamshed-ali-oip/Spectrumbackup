import {
    GET_LOGIN_IMG
  } from '../actions/actionType';
  
  const INITIAL_STATE = null
  
const logo = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_LOGIN_IMG:
        return action.payload
      default:
        return state;
    }
  };

  export default logo
  