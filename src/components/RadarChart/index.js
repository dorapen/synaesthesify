import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import axis from '../../assets/axis.svg';

class RadarChart extends React.Component {
  constructor(props) {
    super(props);

    this.features = [
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'liveness',
      'speechiness',
      'valence',
    ];

    this.featuresData = null;
    this.radarChart = null;
  }

  componentWillReceiveProps(props) {
    const {
      currentAlbum,
      currentTrack,
      trackColors,
      trackFeatures,
    } = props;
    this.radarChart.innerHTML = '';

    if (
      currentTrack &&
      trackColors[currentAlbum.id] &&
      trackColors[currentAlbum.id].color[currentTrack] &&
      trackFeatures[currentTrack]
    ) {
      const features = trackFeatures[currentTrack].data;
      let featuresData = {};

      this.features.forEach((feature) => {
        featuresData = Object.assign({}, featuresData, {
          [feature]: features[feature],
        });
      });

      this.featuresData = featuresData;
      this.chartColor = trackColors[currentAlbum.id].color[currentTrack];

      this.drawChart();
    }
  }

  drawChart() {
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

    const chart = d3.select('.radar-chart')
      .attr('width', axisLength)
      .attr('height', axisLength)
      .attr('viewBox', `-${axisLength / 2} -${axisLength / 2} ${axisLength} ${axisLength}`);

    chart.html('');

    chart.append('g')
      .attr('transform', 'translate(0, 0)')
      .append('polygon');

    let count = 0;
    const points = [];

    const D = this.featuresData;

    Object.keys(D).forEach((feature) => {
      const theta = startingAngle - (count++ * offset);
      points.push(`${x(D[feature], theta)} ${y(D[feature], theta)}`);
    });

    chart.select('polygon').attr('points', points.toString())
      .attr('fill', this.chartColor);
  }

  render() {
    return (
      <div className="radar">
        <svg
          className="radar-chart"
          ref={(radarChart) => { this.radarChart = radarChart; }}
        />
        <img src={axis} alt="Radar Chart Axis" className="axis" />
      </div>
    );
  }
}

RadarChart.propTypes = {
  currentAlbum: PropTypes.object.isRequired,
  currentTrack: PropTypes.string.isRequired,
  trackColors: PropTypes.object.isRequired,
  trackFeatures: PropTypes.object.isRequired,
};

export default RadarChart;
