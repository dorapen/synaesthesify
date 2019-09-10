import { connect } from 'react-redux';
import Analysis from '.';

const mapStateToProps = (state) => ({
  albums: state.albums,
  currentAlbum: state.currentAlbum,
  trackColors: state.trackColors,
  trackFeatures: state.trackFeatures,
});

export default connect(mapStateToProps)(Analysis);
