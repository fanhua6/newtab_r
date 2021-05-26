import { combineReducers } from 'redux';
import basics from './basics'
import search from './search'

const rootReducer = combineReducers({
  basics,
  search
});

export default rootReducer;