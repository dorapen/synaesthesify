import ColorJS from 'color.js';
import * as d3 from 'd3';

export const REQUEST_ALBUM_COLOR = 'REQUEST_ALBUM_COLOR';
export const RECEIVE_ALBUM_COLOR = 'RECEIVE_ALBUM_COLOR';
export const REQUEST_TRACK_COLOR = 'REQUEST_TRACK_COLOR';
export const RECEIVE_TRACK_COLOR = 'RECEIVE_TRACK_COLOR';
export const SET_CURRENT_ALBUM = 'SET_CURRENT_ALBUM';
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';

const requestAlbumColor = (id, key) => ({
  type: REQUEST_ALBUM_COLOR,
  id,
  key,
});

const receiveAlbumColor = (id, key, data) => ({
  type: RECEIVE_ALBUM_COLOR,
  id,
  key,
  data,
});

export const getAlbumColor = (album, key) => (
  (dispatch, getState) => {
    // Album is not properly provided
    if (album.type !== 'album' && album.type !== 'playlist') {
      console.error('This is not an album or a playlist! Received:', album.type);
      return;
    }

    const { id, images } = album;
    const { albumColors } = getState();

    // Already requested
    if (albumColors[key]) {
      return;
    }

    // Let's load!
    dispatch(requestAlbumColor(id, key));

    const image = images[0];
    const color = new ColorJS(image.url);

    color.average((palette) => {
      dispatch(receiveAlbumColor(id, key, palette));
    });
  }
);

const requestTrackColor = (id) => ({
  type: REQUEST_TRACK_COLOR,
  id,
});

const receiveTrackColor = (id, color) => ({
  type: RECEIVE_TRACK_COLOR,
  id,
  color,
});

export const extractTrackColor = (tracks, albumId) => (
  (dispatch, getState) => {
    const { trackFeatures, trackColors } = getState();

    if (trackColors[albumId]) {
      return;
    }

    dispatch(requestTrackColor(albumId));

    const keys = [];
    const loudnesses = [];
    const tempos = [];

    tracks.forEach((track) => {
      const { id } = track;
      if (trackFeatures[id] && !trackFeatures[id].isFetching) {
        const { tempo, key, loudness } = trackFeatures[id].data;

        tempos.push(tempo);
        keys.push(key);
        loudnesses.push(-loudness);
      }
    });

    const h = d3.scaleLinear()
      .domain([0, d3.max(tempos)])
      .range([0, 360]);

    const s = d3.scaleLinear()
      .domain([0, d3.max(keys)])
      .range([0, 100]);

    const l = d3.scaleLinear()
      .domain([0, d3.max(loudnesses)])
      .range([0, 100]);

    let colors = {};

    tracks.forEach((track) => {
      const { id } = track;
      if (trackFeatures[id] && !trackFeatures[id].isFetching) {
        const { tempo, key, loudness } = trackFeatures[id].data;

        colors = {
          ...colors,
          [id]: `hsl(${h(tempo)}, ${s(key)}%, ${100 - l(-loudness)}%)`,
        };
      }
    });

    dispatch(receiveTrackColor(albumId, colors));
  }
);

export const setCurrentTrack = (id) => ({
  type: SET_CURRENT_TRACK,
  id,
});

export const setCurrentAlbum = (id, albumType = 'album') => (
  (dispatch, getState) => {
    const { currentAlbum } = getState();
    if (currentAlbum === id) {
      return;
    }

    dispatch({
      type: SET_CURRENT_ALBUM,
      id,
      albumType,
    });
  }
);
