import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import DesktopPage from '../../pages/DesktopPage';

const mapStateToProps = state => ({
  viewState: state.basics.viewState,
  fontColor: state.basics.fontColor
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopPage);