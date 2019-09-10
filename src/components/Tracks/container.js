import { connect } from 'react-redux';

import { fetchAlbum, fetchTrackFeatures } from '../../store/Spotify/actions';
import { extractTrackColor, setCurrentTrack } from '../../store/App/actions';
import Tracks from '.';

const mapStateToProps = (state) => ({
  albums: state.albums,
  currentAlbum: state.currentAlbum,
  currentTrack: state.currentTrack,
  trackColors: state.trackColors,
  trackFeatures: state.trackFeatures,
});

const mapDispatchToProps = (dispatch) => ({
  extractTrackColor: (tracks, albumId) => {
    dispatch(extractTrackColor(tracks, albumId));
  },
  fetchAlbum: (id) => {
    dispatch(fetchAlbum(id));
  },
  fetchTrackFeatures: (id) => {
    dispatch(fetchTrackFeatures(id));
  },
  setCurrentTrack: (id) => {
    dispatch(setCurrentTrack(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
