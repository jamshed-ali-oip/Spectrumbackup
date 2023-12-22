import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import logo from "./logo";
import events from "./events"
import videoRed from './videoRed';
import nintyFive from './nintyFive';

const rootReducer = combineReducers({userReducer,logo,events,videoRed,nintyFive});

export default rootReducer;
