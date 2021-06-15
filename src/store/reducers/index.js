import { combineReducers } from 'redux';
import basics from './basics'
import search from './search'
import deskTop from './deskTop'

const rootReducer = combineReducers({
  basics,
  search,
  deskTop
});

export default rootReducer;