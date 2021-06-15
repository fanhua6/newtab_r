import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'
import BottomToolbar from '../../conponents/BottomToolbar'

const mapStateToProps = state => ({
  isShowSidebar: state.deskTop.isShowSidebar
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomToolbar)