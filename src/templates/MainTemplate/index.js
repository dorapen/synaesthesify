import React from 'react';
import PropTypes from 'prop-types';

class MainTemplate extends React.Component {
  componentWillMount() {
    const { authenticate, location } = this.props;

    if (location.hash) {
      authenticate(location.hash);
    }
  }

  render() {
    const { auth, children, isTest } = this.props;

    if (!isTest && !auth.access_token) {
      return (
        <div className="login row">
          <main className="col-md-12">
            <a href="http://localhost:8888/login">Login to Spotify</a>
          </main>
        </div>
      );
    }

    return (
      <div className="container">
        <h1 className="app-title">
          Synaesthesify
        </h1>

        <main className="row">
          {children}
        </main>
      </div>
    );
  }
}

MainTemplate.propTypes = {
  auth: PropTypes.shape({
    access_token: PropTypes.string,
  }).isRequired,
  isTest: PropTypes.bool,
  children: PropTypes.node.isRequired,
  authenticate: PropTypes.func.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
  }).isRequired,
};

MainTemplate.defaultProps = {
  isTest: false,
};

export default MainTemplate;
