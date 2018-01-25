import {connect} from 'react-redux';
import AlbumColor from './';
import {extractColors} from '../../store/Utilities/actions';

const mapStateToProps = state => ({
  playlists: state.playlists,
  albumColors: state.albumColors,
});

const mapDispatchToProps = dispatch => ({
  extractColors: (album, id) => {
    dispatch(extractColors(album, id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumColor);
