import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { bindActionCreators } from 'redux'
import DeskTopSidebar from '../../conponents/DeskTopSidebar'

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeskTopSidebar)