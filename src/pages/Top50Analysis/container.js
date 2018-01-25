import {connect} from 'react-redux';
import Top50Analysis from './';

const mapStateToProps = state => ({
  playlists: state.playlists,
});

export default connect(mapStateToProps)(Top50Analysis);
