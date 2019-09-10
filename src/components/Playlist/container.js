import { connect } from 'react-redux';
import { fetchPlaylist } from '../../store/Spotify/actions';
import { getAlbumColor, setCurrentAlbum } from '../../store/App/actions';
import Playlist from '.';

const mapStateToProps = (state) => ({
  albums: state.albums,
  albumColors: state.albumColors,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPlaylist: (userId, playlistId) => {
    dispatch(fetchPlaylist(userId, playlistId));
  },
  getAlbumColor: (album, key) => {
    dispatch(getAlbumColor(album, key));
  },
  setCurrentAlbum: (id, albumType) => {
    dispatch(setCurrentAlbum(id, albumType));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
