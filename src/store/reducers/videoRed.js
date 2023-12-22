import {
    GET_VIDEO
  } from '../actions/actionType';
  
  const INITIAL_STATE = {}
  
const videoRed = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_VIDEO:
        return action.payload
      default:
        return state;
    }
  };

  export default videoRed
  