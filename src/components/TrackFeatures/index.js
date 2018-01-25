import React from 'react';
import PropTypes from 'prop-types';

class TrackFeatures extends React.Component {
  componentDidMount() {
    const {playlistId, playlists, fetchAudioFeatures} = this.props;

    // Playlist ID is not provided
    if (!playlistId) {
      return;
    }

    const playlist = playlists[playlistId];

    // Playlist is not yet loaded
    if (!playlist || playlist.isFetching) {
      return;
    }

    // Start getting the cool data!
    const {items} = playlist.data.tracks;

    items.forEach((item) => {
      const {id} = item.track;

      fetchAudioFeatures(id);
    });
  }

  componentWillReceiveProps(nextProps) {
    const {playlistId, playlists, audioFeatures} = nextProps;
    const playlist = playlists[playlistId];
    const {items} = playlist.data.tracks;

    // Ensure all data is fetched
    let count = 0;

    Object.keys(audioFeatures).forEach((key) => {
      if (audioFeatures[key].data) {
        count++;
      }
    });

    if (count === items.length) {
      this.props.trackReady();
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

TrackFeatures.propTypes = {
  playlistId: PropTypes.string.isRequired,
  playlists: PropTypes.object.isRequired,
  audioFeatures: PropTypes.object.isRequired,
  fetchAudioFeatures: PropTypes.func.isRequired,
  trackReady: PropTypes.func.isRequired,
  children: PropTypes.node,
};

TrackFeatures.defaultProps = {
  children: 'Loading track features...',
};

export default TrackFeatures;
