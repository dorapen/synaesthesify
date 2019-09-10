import React from 'react';
import PropTypes from 'prop-types';

class NewRelease extends React.Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);
  }

  componentWillMount() {
    const { fetchNewRelease } = this.props;
    fetchNewRelease();
  }

  componentWillReceiveProps(props) {
    const { newRelease, albumColors, getAlbumColor } = props;

    if (newRelease.albums && Object.keys(albumColors).length === 0) {
      const albums = newRelease.albums.items;
      albums.forEach((album, index) => {
        const key = `new-release-${index}`;
        getAlbumColor(album, key);
      });
    }
  }

  handler(e, id) {
    e.preventDefault();
    const { setCurrentAlbum } = this.props;

    setCurrentAlbum(id);
  }

  render() {
    const { newRelease, albumColors } = this.props;

    if (newRelease.isFetching || !newRelease.albums) {
      return (
        <div>
          <p>Getting latest updates...</p>
        </div>
      );
    }

    if (Object.keys(albumColors).length === 0) {
      return (
        <div>
          <p>Extracting colours...</p>
        </div>
      );
    }

    const albums = newRelease.albums.items;
    const albumList = [];

    albums.forEach((album, index) => {
      const style = {
        backgroundColor: albumColors[`new-release-${index}`].color,
      };

      albumList.push((
        <li className="album-list-item" key={album.id}>
          <button href="#" style={style} onClick={(e) => { this.handler(e, album.id); }} type="button">
            <span>
              {`#${index + 1}`}
            </span>
          </button>
        </li>
      ));
    });

    return (
      <ul className="album-list">
        {albumList}
      </ul>
    );
  }
}

NewRelease.propTypes = {
  newRelease: PropTypes.shape({
    albums: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    isFetching: PropTypes.bool,
  }).isRequired,
  albumColors: PropTypes.shape({}).isRequired,
  fetchNewRelease: PropTypes.func.isRequired,
  getAlbumColor: PropTypes.func.isRequired,
  setCurrentAlbum: PropTypes.func.isRequired,
};

export default NewRelease;
