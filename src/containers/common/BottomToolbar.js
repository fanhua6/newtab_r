import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'
import BottomToolbar from '../../conponents/BottomToolbar'

const mapStateToProps = state => ({
  viewState: state.basics.viewState,
  skinTypeId: state.basics.skinTypeId,
  wallpaper: state.basics.wallpaper,
  wallpaperList: state.basics.wallpaperList,
  individuationData: state.basics.individuationData
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomToolbar)