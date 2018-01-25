import {connect} from 'react-redux';
import TrackFeatures from './';
import {fetchAudioFeatures} from '../../store/Spotify/actions';

const mapStateToProps = state => ({
  playlists: state.playlists,
  audioFeatures: state.audioFeatures,
});

const mapDispatchToProps = dispatch => ({
  fetchAudioFeatures: (id) => {
    dispatch(fetchAudioFeatures(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackFeatures);
