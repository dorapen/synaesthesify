import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './GridSystem.scss';

/**
 * Grid System for development purpose.
 * Make sure to exclude this on production.
 */
class GridSystem extends Component {
  constructor(props) {
    super(props);
    this.toggleGrid = this.toggleGrid.bind(this);
    this.state = {
      grid: 'inactive',
    };
  }

  toggleGrid() {
    if (this.state.grid === 'active') {
      this.setState({
        grid: 'inactive',
      });
    } else {
      this.setState({
        grid: 'active',
      });
    }
  }

  render() {
    return (
      <div className={`grid-system ${this.state.grid}`}>
        <div className={this.props.className}>
          <div className="row">
            <div className="col-3 col-lg-1 column" />
            <div className="col-3 col-lg-1 column" />
            <div className="col-3 col-lg-1 column" />
            <div className="col-3 col-lg-1 column" />
            <div className="hidden-md-down col-lg-1 column" />
            <div className="hidden-md-down col-lg-1 column" />
            <div className="hidden-md-down col-lg-1 column" />
            <div className="hidden-md-down col-lg-1 column" />
            <div className="hidden-md-down col-lg-1 column" />
            <div className="hidden-md-down col-lg-1 column" />
            <div className="hidden-md-down col-lg-1 column" />
            <div className="hidden-md-down col-lg-1 column" />
          </div>
        </div>

        <button className="toggle" onClick={this.toggleGrid}>
          Toggle Grid
        </button>
      </div>
    );
  }
}

GridSystem.propTypes = {
  className: PropTypes.string,
};

GridSystem.defaultProps = {
  className: 'container',
};

export default GridSystem;
