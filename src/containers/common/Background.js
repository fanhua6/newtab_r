import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { bindActionCreators } from 'redux'
import Background from '../../conponents/Background';

const mapStateToprops = state => ({
  wallpaper: state.basics.wallpaper
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToprops, 
  mapDispatchToProps
)(Background);