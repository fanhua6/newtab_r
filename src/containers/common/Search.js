import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import searchBox from '../../conponents/Search';

const mapStateToProps = state => ({
  searchEngine: state.search.searchEngine,
  searchEngineList: state.search.searchEngineList,
  isShowSearchEngineList: state.search.isShowSearchEngineList,
  hotWordsList: state.search.hotWordsList
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(searchBox);