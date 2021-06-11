import { connect } from 'react-redux'
import * as actions from '../../../store/actions'
import { bindActionCreators } from 'redux'
import skinItem from '../../../conponents/SysManege/Skin/SkinItem'

const mapStateToProps = state => ({
  currentSkinId: state.basics.currentSkinId,
  loadingSkinId: state.basics.loadingSkinId
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(skinItem)