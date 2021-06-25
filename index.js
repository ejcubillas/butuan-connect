/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/store/store';
import App from './App';
import {name as appName} from './app.json';

const Main = () => {
  return (<Provider store={store}><App/></Provider>)
}

AppRegistry.registerComponent(appName, () => Main);
