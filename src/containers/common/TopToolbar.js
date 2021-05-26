import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import TopToolbar from '../../conponents/TopToolbar';

const mapStateToProps = state => ({
  viewState: state.basics.viewState,
  fontColor: state.basics.fontColor,
  viewStateList: state.basics.viewStateList
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopToolbar);