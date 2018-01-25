import {connect} from 'react-redux';
import {fetchNewRelease} from '../../store/Spotify/actions';
import {getAlbumColor, setCurrentAlbum} from '../../store/App/actions';
import NewRelease from './';

const mapStateToProps = state => ({
  newRelease: state.newRelease,
  albumColors: state.albumColors,
});

const mapDispatchToProps = dispatch => ({
  fetchNewRelease: () => {
    dispatch(fetchNewRelease());
  },
  getAlbumColor: (album, key) => {
    dispatch(getAlbumColor(album, key));
  },
  setCurrentAlbum: (id) => {
    dispatch(setCurrentAlbum(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRelease);
