import { connect } from 'react-redux';
import SimplePage from '../../pages/SimplePage'

const mapStateToProps = state => ({
  fontColor: state.basics.fontColor
})

export default connect(
  mapStateToProps,
)(SimplePage);