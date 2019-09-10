import { connect } from 'react-redux';

import RadarChart from '.';

const mapStateToProps = (state) => ({
  currentAlbum: state.currentAlbum,
  currentTrack: state.currentTrack,
  trackColors: state.trackColors,
  trackFeatures: state.trackFeatures,
});

export default connect(mapStateToProps)(RadarChart);
