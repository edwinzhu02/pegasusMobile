/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createStore} from "redux";
import {Provider} from 'react-redux';
import React from "react";

// const store = createStore();
// const Root = () => (
//     <Provider store={store}>
//         <App/>
//     </Provider>
// )


AppRegistry.registerComponent(appName, () => App);

