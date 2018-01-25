import {combineReducers} from 'redux';
import Spotify from './Spotify/reducers';
import App from './App/reducers';

const Reducers = Object.assign({}, Spotify, App);
export default combineReducers(Reducers);
