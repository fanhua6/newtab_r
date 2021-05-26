import * as types from '../../constants/ActionsTypes';
import initialState from '../state/search';

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SEARCH_TEXT:
      return { ...state, searchText: action.searchText };
    case types.SET_SEARCH_ENGINE:
      return { ...state, searchEngine: action.searchEngine }
    case types.SET_SEARCH_ENGINE_LIST:
      return { ...state, searchEngineList: action.searchEngineList }
    case types.SET_HOTWORDS_LIST:
      return { ...state, hotWordsList: action.hotWordsList }
    case types.SET_IS_SHOW_SEARCH_ENGINE_LIST:
      return { ...state, isShowSearchEngineList: action.isShowSearchEngineList }
    default:
      return state;
  }
}

export default searchReducer;