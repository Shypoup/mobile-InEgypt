/**
 * @format
 */

import './src/utils/translation/i18n';

import App from './App';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
