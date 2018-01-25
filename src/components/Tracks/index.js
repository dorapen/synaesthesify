import React from 'react';
import PropTypes from 'prop-types';

class Tracks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allFeaturesLoaded: false,
      tracks: [],
    };

    this.handler = this.handler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {albums, currentAlbum, trackFeatures} = nextProps;
    const {fetchAlbum, fetchTrackFeatures} = this.props;

    if (this.props.currentAlbum && currentAlbum) {
      if (this.props.currentAlbum.id !== currentAlbum.id) {
        this.setState({
          allFeaturesLoaded: false,
          tracks: 'loading',
        });
      }
    }

    if (currentAlbum.id) {
      if (!albums[currentAlbum.id]) {
        fetchAlbum(currentAlbum.id);
      } else if (!albums[currentAlbum.id].isFetching) {
        const album = albums[currentAlbum.id].data;
        const tracks = [];
        let loaded = 0;

        album.tracks.items.forEach((item) => {
          const track = currentAlbum.type === 'playlist' ? item.track : item;

          tracks.push(track);

          if (!trackFeatures[track.id]) {
            fetchTrackFeatures(track.id);
          } else if (!trackFeatures[track.id].isFetching) {
            loaded++;
          }
        });

        if (tracks.length === loaded) {
          this.setState({
            allFeaturesLoaded: true,
            tracks,
          });
        }
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const {currentAlbum} = nextProps;
    const {allFeaturesLoaded, tracks} = nextState;
    const {extractTrackColor} = this.props;

    if (allFeaturesLoaded) {
      extractTrackColor(tracks, currentAlbum.id);
    }
  }

  handler(e, id) {
    e.preventDefault();

    const {setCurrentTrack} = this.props;
    setCurrentTrack(id);
  }

  render() {
    const {allFeaturesLoaded, tracks} = this.state;

    if (tracks.length === 0) {
      return (
        <div className="track-control">
          <p>
            Please select an album or a playlist.
          </p>
        </div>
      );
    } else if (!allFeaturesLoaded || tracks === 'loading') {
      return (
        <div className="track-control">
          <p>
            Loading...
          </p>
        </div>
      );
    }

    const {
      albums,
      currentAlbum,
      currentTrack,
      trackColors,
    } = this.props;
    const trackList = [];

    let title;

    if (currentAlbum.id) {
      title = albums[currentAlbum.id].data.name;
    }

    tracks.forEach((track) => {
      let activeClass = '';

      if (currentTrack === track.id) {
        activeClass = 'active';
        title += ` • ${track.name}`;
      }

      let style = {
        backgroundColor: 'white',
      };

      if (
        trackColors[currentAlbum.id] &&
        trackColors[currentAlbum.id].color &&
        trackColors[currentAlbum.id].color[track.id]
      ) {
        style = {
          backgroundColor: trackColors[currentAlbum.id].color[track.id],
        };
      }

      trackList.push((
        <li className={`track-item ${activeClass}`} key={track.id}>
          <button href="#" onClick={(e) => { this.handler(e, track.id); }} style={style}>
            <span className="sr-only">#{track.track_number}</span>
          </button>
        </li>
      ));
    });

    return (
      <div className="track-control">
        <h2>{title}</h2>
        <ul className="track-list">
          {trackList}
        </ul>
      </div>
    );
  }
}

Tracks.propTypes = {
  albums: PropTypes.object.isRequired,
  currentAlbum: PropTypes.object.isRequired,
  currentTrack: PropTypes.string.isRequired,
  trackColors: PropTypes.object.isRequired,
  trackFeatures: PropTypes.object.isRequired,
  extractTrackColor: PropTypes.func.isRequired,
  fetchAlbum: PropTypes.func.isRequired,
  fetchTrackFeatures: PropTypes.func.isRequired,
  setCurrentTrack: PropTypes.func.isRequired,
};

export default Tracks;
