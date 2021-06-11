import { connect } from "react-redux"
import * as actions from '../../store/actions'
import { bindActionCreators } from 'redux'
import Individuation from '../../conponents/SysManege/Individuation/'

const mapStateToProps = state => ({
  skinTypeId: state.basics.skinTypeId,
  individuationData: state.basics.individuationData
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Individuation)