import {connect} from 'react-redux';
import {authenticate} from '../../store/Spotify/actions';
import MainTemplate from './';

const mapStateToProps = state => ({
  auth: state.auth, // Needed to trigger update after authentication
});

const mapDispatchToProps = dispatch => ({
  authenticate: (data) => {
    dispatch(authenticate(data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MainTemplate);
