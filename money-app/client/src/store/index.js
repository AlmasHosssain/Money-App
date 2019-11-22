import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './reducer/rootReducer'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'


const store = createStore(
    rootReducer,
    applyMiddleware(logger,thunkMiddleware))

export default store
