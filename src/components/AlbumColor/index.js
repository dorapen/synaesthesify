import React from 'react';
import PropTypes from 'prop-types';

class AlbumColor extends React.Component {
  componentDidMount() {
    const {playlistId, playlists, extractColors} = this.props;
    const playlist = playlists[playlistId];
    const {items} = playlist.data.tracks;

    items.forEach((item) => {
      const {album, id} = item.track;

      extractColors(album, id);
    });
  }

  componentWillReceiveProps(nextProps) {
    const {albumColors} = nextProps;

    // Ensure all colors are extracted
    // Consider that some tracks might have same album
    let count = 0;

    Object.keys(albumColors).forEach((key) => {
      if (albumColors[key].color) {
        count++;
      }
    });

    if (count === Object.keys(albumColors).length) {
      this.props.colorReady();
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

AlbumColor.propTypes = {
  playlistId: PropTypes.string.isRequired,
  playlists: PropTypes.object.isRequired,
  albumColors: PropTypes.object.isRequired,
  extractColors: PropTypes.func.isRequired,
  colorReady: PropTypes.func.isRequired,
  children: PropTypes.node,
};

AlbumColor.defaultProps = {
  children: 'Calculating colours...',
};

export default AlbumColor;
