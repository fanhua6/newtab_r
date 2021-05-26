import * as types from '../../constants/ActionsTypes';
import initialState from '../state/basics';


const basics = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_VIEW_STATE:
      return { ...state, viewState: action.viewState }
    case types.CHANGE_FONT_COLOR:
      return { ...state, fontColor: action.fontColor }
    default:
      return state
  }
}

export default basics;