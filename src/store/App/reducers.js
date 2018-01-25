import {
  REQUEST_ALBUM_COLOR,
  RECEIVE_ALBUM_COLOR,
  REQUEST_TRACK_COLOR,
  RECEIVE_TRACK_COLOR,
  SET_CURRENT_ALBUM,
  SET_CURRENT_TRACK,
} from './actions';

const albumColors = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_ALBUM_COLOR:
      return Object.assign({}, state, {
        [action.key]: {
          isExtracting: true,
          albumId: action.id,
        },
      });
    case RECEIVE_ALBUM_COLOR:
      return Object.assign({}, state, {
        [action.key]: {
          isExtracting: false,
          albumId: action.id,
          color: action.data,
        },
      });
    default:
      return state;
  }
};

const trackColors = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_TRACK_COLOR:
      return Object.assign({}, state, {
        [action.id]: {
          isExtracting: true,
        },
      });
    case RECEIVE_TRACK_COLOR:
      return Object.assign({}, state, {
        [action.id]: {
          isExtracting: false,
          color: action.color,
        },
      });
    default:
      return state;
  }
};

const currentAlbum = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_ALBUM:
      return Object.assign({}, state, {
        id: action.id,
        type: action.albumType,
      });
    default:
      return state;
  }
};

const currentTrack = (state = '', action) => {
  switch (action.type) {
    case SET_CURRENT_TRACK:
      return action.id;
    default:
      return state;
  }
};

export default {
  albumColors,
  trackColors,
  currentAlbum,
  currentTrack,
};
