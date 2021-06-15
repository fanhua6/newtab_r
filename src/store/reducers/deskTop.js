import * as types from '../../constants/ActionsTypes'
import initialState from '../state/deskTop'

const deskTop = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_IS_SHOW_SIDEBAR:
      return { ...state, isShowSidebar: action.isShowSidebar }
  
    default:
      return state;
  }
}

export default deskTop