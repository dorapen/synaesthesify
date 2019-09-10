import React from 'react';
import PropTypes from 'prop-types';

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);
  }

  componentDidMount() {
    const { userId, playlistId, fetchPlaylist } = this.props;
    fetchPlaylist(userId, playlistId);
  }

  componentWillReceiveProps(nextProps) {
    const { albums, playlistId, getAlbumColor } = nextProps;
    const playlist = albums[playlistId];

    if (playlist && !playlist.isFetching) {
      const key = `playlist-${playlist.data.id}`;
      getAlbumColor(playlist.data, key);
    }
  }

  handler(e, id) {
    e.preventDefault();

    const { setCurrentAlbum } = this.props;
    setCurrentAlbum(id, 'playlist');
  }

  render() {
    const {
      albums,
      playlistId,
      label,
      albumColors,
    } = this.props;
    const playlist = albums[playlistId];

    if (!playlist || playlist.isFetching) {
      return (
        <div className="playlist">
          <p>Fetching playlists...</p>
        </div>
      );
    }

    if (
      !albumColors[`playlist-${playlistId}`]
      || albumColors[`playlist-${playlistId}`].isExtracting
    ) {
      return (
        <div className="playlist">
          <p>Extracting colours...</p>
        </div>
      );
    }

    const style = {
      backgroundColor: albumColors[`playlist-${playlistId}`].color,
    };
    const displayName = label || playlist.data.name;

    return (
      <div className="playlist">
        <button href="#" style={style} onClick={(e) => { this.handler(e, playlistId); }} type="button">
          <span>
            {displayName}
          </span>
        </button>
      </div>
    );
  }
}

Playlist.propTypes = {
  userId: PropTypes.string.isRequired,
  playlistId: PropTypes.string.isRequired,
  label: PropTypes.string,
  albums: PropTypes.shape({}).isRequired,
  albumColors: PropTypes.shape({}).isRequired,
  fetchPlaylist: PropTypes.func.isRequired,
  getAlbumColor: PropTypes.func.isRequired,
  setCurrentAlbum: PropTypes.func.isRequired,
};

Playlist.defaultProps = {
  label: '',
};

export default Playlist;
