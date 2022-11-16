import { createStore, applyMiddleware, combineReducers } from 'redux';
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import {fileLoadReducer} from './fileReducer';
import {authLoginReducer, authRegisterReducer} from './authReducer';
import {userListReducer} from './userReducer';

const rootReducer = combineReducers({
  authRegisterR: authRegisterReducer,
  authLoginR: authLoginReducer,
  userListR: userListReducer,
  fileLoadR: fileLoadReducer
})

const initialState = {
  
    currentUser: {},
    isAuth: false
  
}

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

//const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//export const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
