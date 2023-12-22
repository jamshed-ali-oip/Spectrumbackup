import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer, createTransform} from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk));

let persistor = persistStore(store);
export {store, persistor};
