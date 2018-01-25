import React from 'react';
// import PropTypes from 'prop-types';

import NewRelease from '../../components/NewRelease/container';
import Playlist from '../../components/Playlist/container';
import Tracks from '../../components/Tracks/container';
import RadarChart from '../../components/RadarChart/container';
import Analysis from '../../components/Analysis/container';

class Home extends React.Component {
  componentDidMount() {
    // hi
  }

  render() {
    return (
      <div className="home col-md-12">
        <div className="row">
          <div className="control col-md-6">
            <div className="album-control row">
              <div className="albums col-md-8">
                <h2>New Releases</h2>
                <NewRelease />
              </div>

              <div className="col-md-4">
                <h2>Playlists</h2>
                <div className="playlists">
                  <Playlist
                    userId="digster.fm"
                    playlistId="6wsFITBT08NA12LlCG9h3Q"
                    label="EQX Playlist"
                  />

                  <Playlist
                    userId="spotifycharts"
                    playlistId="37i9dQZEVXbMDoHDwVN2tF"
                  />
                </div>
              </div>
            </div>

            <Tracks />

            <RadarChart />
          </div>

          <div className="artwork col-md-6">
            <Analysis />
          </div>
        </div>
      </div>
    );
  }
}

/*
Home.propTypes = {
  user: PropTypes.object.isRequired,
};
*/

export default Home;
