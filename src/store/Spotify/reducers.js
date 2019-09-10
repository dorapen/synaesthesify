import {
  SET_AUTH_INFO,
  REQUEST_NEW_RELEASE,
  RECEIVE_NEW_RELEASE,
  REQUEST_PLAYLIST,
  RECEIVE_PLAYLIST,
  REQUEST_ALBUM,
  RECEIVE_ALBUM,
  REQUEST_TRACK_FEATURES,
  RECEIVE_TRACK_FEATURES,
} from './actions';

const auth = (state = {}, action) => {
  switch (action.type) {
    case SET_AUTH_INFO:
      return {
        ...state,
        access_token: action.data.access_token,
        refresh_token: action.data.refresh_token,
        state: action.data.state,
      };
    default:
      return state;
  }
};

const newRelease = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_NEW_RELEASE:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_NEW_RELEASE:
      return {
        ...state,
        isFetching: false,
        ...action.data,
      };
      // return Object.assign({}, state, {isFetching: false}, action.data);
    default:
      return state;
  }
};

const albums = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PLAYLIST:
    case REQUEST_ALBUM:
      return {
        ...state,
        [action.id]: {
          isFetching: true,
        },
      };
    case RECEIVE_PLAYLIST:
    case RECEIVE_ALBUM:
      return {
        ...state,
        [action.id]: {
          isFetching: false,
          data: action.data,
        },
      };
    default:
      return state;
  }
};

const trackFeatures = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_TRACK_FEATURES:
      return {
        ...state,
        [action.id]: {
          isFetching: true,
        },
      };
    case RECEIVE_TRACK_FEATURES:
      return {
        ...state,
        [action.id]: {
          isFetching: false,
          data: action.data,
        },
      };
    default:
      return state;
  }
};

export default {
  auth,
  newRelease,
  albums,
  trackFeatures,
};
