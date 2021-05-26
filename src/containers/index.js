import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Index from '../pages'
import * as actions from '../store/actions'

const mapStateToProps = state => ({
  viewState: state.basics.viewState,
  searchEngine: state.search.searchEngine,
  searchEngineList: state.search.searchEngineList,
  currentUser: state.basics.currentUser
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);