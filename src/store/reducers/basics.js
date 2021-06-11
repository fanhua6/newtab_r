import * as types from '../../constants/ActionsTypes';
import initialState from '../state/basics';


const basics = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_VIEW_STATE:
      return { ...state, viewState: action.viewState }
    case types.SET_WALLPAPER:
      return { ...state, wallpaper: action.wallpaper }
    case types.SET_WALLPAPER_LIST:
      return { ...state, wallpaperList: action.wallpaperList }
    case types.CHANGE_FONT_COLOR:
      return { ...state, fontColor: action.fontColor }
    case types.SET_CURRENT_SKIN_ID:
      return { ...state, currentSkinId: action.currentSkinId }
    case types.SET_LOADING_SKIN_ID:
      return { ...state, loadingSkinId: action.loadingSkinId }
    case types.SET_SKIN_TYPE_ID:
      return { ...state, skinTypeId: action.skinTypeId }
    case types.SET_INDIVIDUATION_DATA:
      return { ...state, individuationData: action.data }
    default:
      return state
  }
}

export default basics;