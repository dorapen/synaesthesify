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
    const { albums, currentAlbum: nextAlbum, trackFeatures } = nextProps;
    const { currentAlbum, fetchAlbum, fetchTrackFeatures } = this.props;

    if (currentAlbum && nextAlbum) {
      if (currentAlbum.id !== nextAlbum.id) {
        this.setState({
          allFeaturesLoaded: false,
          tracks: 'loading',
        });
      }
    }

    if (nextAlbum.id) {
      if (!albums[nextAlbum.id]) {
        fetchAlbum(nextAlbum.id);
      } else if (!albums[nextAlbum.id].isFetching) {
        const album = albums[nextAlbum.id].data;
        const tracks = [];
        let loaded = 0;

        album.tracks.items.forEach((item) => {
          const track = nextAlbum.type === 'playlist' ? item.track : item;

          tracks.push(track);

          if (!trackFeatures[track.id]) {
            fetchTrackFeatures(track.id);
          } else if (!trackFeatures[track.id].isFetching) {
            loaded += 1;
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
    const { currentAlbum: nextAlbum } = nextProps;
    const { allFeaturesLoaded, tracks } = nextState;
    const { extractTrackColor } = this.props;

    if (allFeaturesLoaded) {
      extractTrackColor(tracks, nextAlbum.id);
    }
  }

  handler(e, id) {
    e.preventDefault();

    const { setCurrentTrack } = this.props;
    setCurrentTrack(id);
  }

  render() {
    const { allFeaturesLoaded, tracks } = this.state;

    if (tracks.length === 0) {
      return (
        <div className="track-control">
          <p>
            Please select an album or a playlist.
          </p>
        </div>
      );
    }

    if (!allFeaturesLoaded || tracks === 'loading') {
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
        trackColors[currentAlbum.id]
        && trackColors[currentAlbum.id].color
        && trackColors[currentAlbum.id].color[track.id]
      ) {
        style = {
          backgroundColor: trackColors[currentAlbum.id].color[track.id],
        };
      }

      trackList.push((
        <li className={`track-item ${activeClass}`} key={track.id}>
          <button href="#" onClick={(e) => { this.handler(e, track.id); }} style={style} type="button">
            <span className="sr-only">
              {`#${track.track_number}`}
            </span>
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
  albums: PropTypes.shape({}).isRequired,
  currentAlbum: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  currentTrack: PropTypes.string.isRequired,
  trackColors: PropTypes.shape({}).isRequired,
  trackFeatures: PropTypes.shape({}).isRequired,
  extractTrackColor: PropTypes.func.isRequired,
  fetchAlbum: PropTypes.func.isRequired,
  fetchTrackFeatures: PropTypes.func.isRequired,
  setCurrentTrack: PropTypes.func.isRequired,
};

export default Tracks;
