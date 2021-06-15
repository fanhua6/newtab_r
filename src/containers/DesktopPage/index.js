import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import DesktopPage from '../../pages/DesktopPage';

const mapStateToProps = state => ({
  wallpaper: state.basics.wallpaper,
  wallpaperList: state.basics.wallpaperList,
  skinTypeId: state.basics.skinTypeId,
  fontColor: state.basics.fontColor
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopPage);