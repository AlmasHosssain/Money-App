import {createStore} from 'redux'
import {rootReducer} from '../strore/reducers/rootReducer'

const store = createStore(rootReducer)

export default store