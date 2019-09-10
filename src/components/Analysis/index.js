import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import RandomCoordinate from '../../utilities/RandomCoordinate';

class Analysis extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // albumTitle: null,
      data: null,
      randomPosition: true,
      randomRotation: true,
    };
    this.svgCanvas = null;
    this.features = [
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'liveness',
      'speechiness',
      'valence',
    ];
    this.handler = this.handler.bind(this);
  }

  componentWillReceiveProps(props) {
    // Ensure all needed data are loaded properly.
    const {
      albums,
      currentAlbum,
      trackColors,
      trackFeatures,
    } = props;
    const currAlbum = albums[currentAlbum.id];
    if (
      currAlbum
      && trackColors[currentAlbum.id]
      && currAlbum.data.tracks.items.length
        === Object.keys(trackColors[currentAlbum.id].color).length
    ) {
      const tracks = currAlbum.data.tracks.items;
      let allFeaturesLoaded = true;

      tracks.forEach((item) => {
        const track = currentAlbum.type === 'playlist' ? item.track : item;

        if (
          !trackFeatures[track.id]
          || trackFeatures[track.id].isFetching
        ) {
          allFeaturesLoaded = false;
        }
      });

      if (allFeaturesLoaded) {
        this.setData(props);
      }
    }
  }

  componentDidUpdate() {
    const { data } = this.state;

    if (data) {
      this.svgCanvas.innerHTML = '';
      this.drawChart();
    }
  }

  setData(props) {
    const {
      albums,
      currentAlbum,
      trackColors,
      trackFeatures,
    } = props;
    const data = [];

    const tracks = albums[currentAlbum.id].data.tracks.items;

    tracks.forEach((item) => {
      const track = currentAlbum.type === 'playlist' ? item.track : item;
      const { id, name } = track;
      const color = trackColors[currentAlbum.id].color[id];
      const features = trackFeatures[track.id].data;
      const featuresArray = [];

      this.features.forEach((feature) => {
        featuresArray.push({
          name: feature,
          value: features[feature],
        });
      });

      data.push({
        id,
        name,
        color,
        data: featuresArray,
      });
    });

    this.setState({
      albumName: albums[currentAlbum.id].data.name,
      data,
    });
  }

  drawChart() {
    const { data: dataList, randomPosition, randomRotation } = this.state;
    const axisLength = 500;
    const offset = (2 * Math.PI) / this.features.length;
    const startingAngle = -Math.PI / 2;

    const s = d3.scaleLinear().range([0, axisLength / 2]).domain([0, 1]);

    const x = (r, theta) => {
      const X = r * Math.cos(theta);
      return s(X);
    };

    const y = (r, theta) => {
      const Y = r * Math.sin(theta);
      return s(Y);
    };

    const chart = d3.select('.artwork-canvas')
      .attr('width', axisLength)
      .attr('height', axisLength)
      .attr('viewBox', `-${axisLength / 2} -${axisLength / 2} ${axisLength} ${axisLength}`);

    const radar = chart.selectAll('g').data(dataList)
      .enter().append('g')
      .attr('transform', () => {
        const coordinate = randomPosition
          ? new RandomCoordinate(400, 400, -200, -200) : { x: 0, y: 0 };
        const rotate = randomRotation ? Math.random() * 360 : 0;

        return `rotate(${rotate}) translate(${coordinate.x}, ${coordinate.y})`;
      });

    radar.append('polygon')
      .attr('points', (features) => {
        let count = 0;
        const points = [];

        features.data.forEach((feature) => {
          count += 1;
          const theta = startingAngle - (count * offset);
          points.push(`${x(feature.value, theta)} ${y(feature.value, theta)}`);
        });

        return points.toString();
      })
      .attr('fill', (features) => (features.color))
      .attr('fill-opacity', 0.5);
  }

  handler(type) {
    const { randomPosition, randomRotation } = this.state;

    if (type === 'randomPosition') {
      this.setState({
        randomPosition: !randomPosition,
      });
    }

    if (type === 'randomRotation') {
      this.setState({
        randomRotation: !randomRotation,
      });
    }
  }

  render() {
    const { albumName, randomPosition, randomRotation } = this.state;
    let title = '';
    if (albumName) {
      title = <h1 className="artwork-title">{albumName}</h1>;
    }
    return (
      <div className="artwork">
        <ul className="artwork-options">
          <li>
            <label htmlFor="random-position">
              <input
                type="checkbox"
                id="random-position"
                checked={randomPosition}
                onChange={() => { this.handler('randomPosition'); }}
              />
              Random Position
            </label>
          </li>

          <li>
            <label htmlFor="random-rotation">
              <input
                type="checkbox"
                id="random-rotation"
                checked={randomRotation}
                onChange={() => { this.handler('randomRotation'); }}
              />
              Random Rotation
            </label>
          </li>
        </ul>
        {title}
        <svg
          className="artwork-canvas"
          preserveAspectRatio="xMinYMin"
          ref={(svgCanvas) => { this.svgCanvas = svgCanvas; }}
        />
      </div>
    );
  }
}

Analysis.propTypes = {
  albums: PropTypes.shape({}).isRequired,
  currentAlbum: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  trackColors: PropTypes.shape({}).isRequired,
  trackFeatures: PropTypes.shape({}).isRequired,
};

export default Analysis;
