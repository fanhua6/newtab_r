import * as types from '../../constants/ActionsTypes';

export const changeViewState = viewState => ({ type: types.CHANGE_VIEW_STATE, viewState });
export const setSearchEngine = searchEngine => ({ type: types.SET_SEARCH_ENGINE, searchEngine });
export const setSearchEngineList = searchEngineList => ({ type: types.SET_SEARCH_ENGINE_LIST, searchEngineList });
export const setSearchEngineListVersion = searchEngineListVersion => ({ type: types.SET_SEARCH_ENGINE_LIST_VERSION, searchEngineListVersion });
export const setIsShowSearchEngineList = isShowSearchEngineList => ({ type: types.SET_IS_SHOW_SEARCH_ENGINE_LIST, isShowSearchEngineList });
export const setHotWordsList = hotWordsList => ({ type: types.SET_HOTWORDS_LIST, hotWordsList });