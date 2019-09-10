import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

const SPOTIFY_BASE = 'https://api.spotify.com/v1';
let ACCESS_TOKEN;

// Actions
export const SET_AUTH_INFO = 'SET_AUTH_INFO';
export const REQUEST_NEW_RELEASE = 'REQUEST_NEW_RELEASE';
export const RECEIVE_NEW_RELEASE = 'RECEIVE_NEW_RELEASE';
export const REQUEST_PLAYLIST = 'REQUEST_PLAYLIST';
export const RECEIVE_PLAYLIST = 'RECEIVE_PLAYLIST';
export const REQUEST_ALBUM = 'REQUEST_ALBUM';
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';
export const REQUEST_TRACK_FEATURES = 'REQUEST_TRACK_FEATURES';
export const RECEIVE_TRACK_FEATURES = 'RECEIVE_TRACK_FEATURES';

// Return URL with access token
const requestUrl = (url, query) => {
  if (!ACCESS_TOKEN) {
    console.error('Access Token not found!');
  }

  return `${url}?access_token=${ACCESS_TOKEN}&${query}`;
};

// Authentication
const setAuthInfo = (data) => ({
  type: SET_AUTH_INFO,
  data: querystring.parse(data.slice(1)),
});

export const authenticate = (data) => (
  (dispatch, getState) => {
    const { auth } = getState();

    if (!data || auth.access_token) {
      return;
    }

    dispatch(setAuthInfo(data));

    ACCESS_TOKEN = getState().auth.access_token;
  }
);

// New Releases
const requestNewRelease = () => ({
  type: REQUEST_NEW_RELEASE,
});

const receiveNewRelease = (data) => ({
  type: RECEIVE_NEW_RELEASE,
  data,
});

export const fetchNewRelease = (limit = 16) => (
  (dispatch, getState) => {
    const { newRelease } = getState();

    if (newRelease.isFetching || newRelease.data) {
      return false;
    }

    dispatch(requestNewRelease());

    const url = `${SPOTIFY_BASE}/browse/new-releases`;

    return fetch(requestUrl(url, `limit=${limit}`))
      .then((response) => response.json())
      .then((data) => dispatch(receiveNewRelease(data)));
  }
);

// Playlists
const requestPlaylist = (playlistId) => ({
  type: REQUEST_PLAYLIST,
  id: playlistId,
});

const receivePlaylist = (playlistId, data) => ({
  type: RECEIVE_PLAYLIST,
  id: playlistId,
  data,
});

export const fetchPlaylist = (userId, playlistId) => (
  (dispatch, getState) => {
    const { albums } = getState();

    if (albums[playlistId]) {
      return false;
    }

    if (!userId || !playlistId) {
      return false;
    }

    dispatch(requestPlaylist(playlistId));

    const url = `${SPOTIFY_BASE}/users/${userId}/playlists/${playlistId}`;

    return fetch(requestUrl(url))
      .then((response) => response.json())
      .then((data) => dispatch(receivePlaylist(playlistId, data)));
  }
);

// Albums
const requestAlbum = (id) => ({
  type: REQUEST_ALBUM,
  id,
});

const receiveAlbum = (id, data) => ({
  type: RECEIVE_ALBUM,
  id,
  data,
});

export const fetchAlbum = (id) => (
  (dispatch, getState) => {
    const { albums } = getState();

    if (
      albums[id]
      && (albums[id].isFetching || albums[id].data)
    ) {
      return false;
    }

    dispatch(requestAlbum(id));

    const url = `${SPOTIFY_BASE}/albums/${id}`;

    return fetch(requestUrl(url))
      .then((response) => response.json())
      .then((data) => dispatch(receiveAlbum(id, data)));
  }
);

// Audio Features
const requestTrackFeatures = (id) => ({
  type: REQUEST_TRACK_FEATURES,
  id,
});

const receiveTrackFeatures = (id, data) => ({
  type: RECEIVE_TRACK_FEATURES,
  id,
  data,
});

export const fetchTrackFeatures = (id) => (
  (dispatch, getState) => {
    const { trackFeatures } = getState();

    // Audio feature is already loaded
    if (trackFeatures[id]) {
      return false;
    }

    dispatch(requestTrackFeatures(id));

    const url = `${SPOTIFY_BASE}/audio-features/${id}`;

    return fetch(requestUrl(url))
      .then((response) => response.json())
      .then((data) => dispatch(receiveTrackFeatures(id, data)));
  }
);
