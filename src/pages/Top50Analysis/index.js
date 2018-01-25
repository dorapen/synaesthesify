import React from 'react';
import PropTypes from 'prop-types';
import Playlist from '../../components/Playlist/container';
import TrackFeatures from '../../components/TrackFeatures/container';
import AlbumColor from '../../components/AlbumColor/container';
import Analysis from '../../components/Analysis/container';

class Top50Analysis extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trackReady: false,
      albumReady: false,
    };

    this.userId = 'spotifycharts';
    this.playlistId = '37i9dQZEVXbMDoHDwVN2tF';

    this.trackReady = this.trackReady.bind(this);
    this.colorReady = this.colorReady.bind(this);
  }

  trackNames() {
    let trackNames = {};
    const {playlists} = this.props;
    const playlist = playlists[this.playlistId];
    const items = playlist.data.tracks.items;

    Object.keys(items).forEach((key) => {
      const item = items[key];
      const {id, name} = item.track;

      trackNames = Object.assign({}, trackNames, {
        [id]: name,
      });
    });

    return trackNames;
  }

  colorReady() {
    this.setState({
      albumReady: true,
    });
  }

  trackReady() {
    this.setState({
      trackReady: true,
    });
  }

  render() {
    if (this.state.trackReady && this.state.albumReady) {
      return (
        <Analysis trackNames={this.trackNames()} />
      );
    }

    return (
      <Playlist userId={this.userId} playlistId={this.playlistId}>
        <TrackFeatures trackReady={this.trackReady} />
        <AlbumColor colorReady={this.colorReady} />
      </Playlist>
    );
  }
}

Top50Analysis.propTypes = {
  playlists: PropTypes.object.isRequired,
};

export default Top50Analysis;
