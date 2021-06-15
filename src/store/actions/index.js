import * as types from '../../constants/ActionsTypes';

export const changeViewState = viewState => ({ type: types.CHANGE_VIEW_STATE, viewState });
export const setWallpaper = wallpaper => ({ type: types.SET_WALLPAPER, wallpaper });
export const setWallpaperList = wallpaperList => ({ type: types.SET_WALLPAPER_LIST, wallpaperList });
export const setFontColor = fontColor => ({ type: types.CHANGE_FONT_COLOR, fontColor });
export const setCurrentSkinId = currentSkinId => ({ type: types.SET_CURRENT_SKIN_ID, currentSkinId });
export const setLoadingSkinId = loadingSkinId => ({ type: types.SET_LOADING_SKIN_ID, loadingSkinId });
export const setSkinTypeId = skinTypeId => ({ type: types.SET_SKIN_TYPE_ID, skinTypeId });
export const setIndividuationData = data => ({ type: types.SET_INDIVIDUATION_DATA, data });

export const setSearchEngine = searchEngine => ({ type: types.SET_SEARCH_ENGINE, searchEngine });
export const setSearchEngineList = searchEngineList => ({ type: types.SET_SEARCH_ENGINE_LIST, searchEngineList });
export const setSearchEngineListVersion = searchEngineListVersion => ({ type: types.SET_SEARCH_ENGINE_LIST_VERSION, searchEngineListVersion });
export const setIsShowSearchEngineList = isShowSearchEngineList => ({ type: types.SET_IS_SHOW_SEARCH_ENGINE_LIST, isShowSearchEngineList });
export const setHotWordsList = hotWordsList => ({ type: types.SET_HOTWORDS_LIST, hotWordsList });

export const setIsShowSidebar = isShowSidebar => ({ type: types.SET_IS_SHOW_SIDEBAR, isShowSidebar });