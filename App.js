import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {FormLabel, FormInput} from 'react-native-elements';
import Navigation from './Components/Navigation/Navigation';
import { Container, Header, Content, Button, Icon, Item, Input, Footer, DatePicker} from 'native-base';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import { Location, Permissions } from 'expo';

import userData from './Reducers/user.reducer';
import promenade from'./Reducers/promenade.reducer';
import promenadeDate from './Reducers/search.reducer';
console.disableYellowBox = true;
// Import modules related to Redux
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
const store = createStore(combineReducers({userData,promenade,promenadeDate}));

// In App.js, I just need to return my Navigation component. It is inside this component, that my components are rendered.
// I must NOT wrap my Navigation component in a View component since it is not a not a View but only a mecanism of rendering views.
// If you put a View to wrap the component, it will render a white page, with no error.
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  componentWillMount() {
    this.loadFonts();
  }
  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady){
      return (
      <Provider store={store}>
        <Navigation/>
      </Provider>
      
      );
    }
    return (
    <Provider store={store}>
      <Navigation/>
    </Provider>);
    
  }
}
