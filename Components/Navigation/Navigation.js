import React from 'react';

import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems,
} from 'react-navigation';
import {
  Platform,
  StyleSheet
} from 'react-native'


import Home from '../Screen/Home';
import SearchScreen from '../Screen/SearchScreen';
import AddPromenade from '../Screen/AddPromenade';
import CameraScreen from '../Screen/CameraScreen';
import ListScreen from '../Screen/ListScreen';
import Signup from '../Screen/Signup';
import Signin from '../Screen/Signin';
import MyAccount from '../Screen/MyAccount';
import Account from '../Screen/Account';
import NextPromenade from '../Screen/NextPromenade';
import OldPromenade from '../Screen/OldPromenade';
import MyAccountEdit from '../Screen/MyAccountEdit';
import Alert from '../Screen/Alert';
import AddAlert from '../Screen/AddAlert';
import PromenadeScreen from '../Screen/PromenadeScreen';
import Promenade from '../Promenade/Promenade';
import MesPromenades from '../Screen/MesPromenades';


// Manque page inscription faite chez Ai et Produit faite aussi chez Ai en modele






// Manque page inscription faite chez Ai et Produit faite aussi chez Ai en modele

import { Ionicons, Entypo } from '@expo/vector-icons';
import {Icon } from 'native-base';



// Création de ma Bottom Navigation
const MainNavigator = createBottomTabNavigator({
  'Mon compte' : MyAccount,
  'À venir': NextPromenade,
  'Historique': OldPromenade,
  'Alertes': Alert
 },{
  // utiliser defaultNavigationOptions au lieu de navigationOptions dans la dernière version de react Navigation
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused, horizontal, tintColor}) => {
      var iconName;
      var outline = (focused)
        ? ''
        : '';
        //gestion des icônes
      if (navigation.state.routeName == 'Mon compte') {
        Platform.OS === 'ios'
        ? iconName = 'ios-person'
        : iconName = 'md-person'
        return <Ionicons name={iconName + outline} size={25} color={tintColor}/>
      }

      else if (navigation.state.routeName == 'À venir') {
        Platform.OS === 'ios'
          ? iconName = 'ios-calendar'
          : iconName = 'md-calendar'
          return <Ionicons name={iconName + outline} size={25} color={tintColor}/>
      }
      else if (navigation.state.routeName == 'Historique') {
        Platform.OS === 'ios'
          ? iconName = 'back-in-time'
          : iconName = 'back-in-time'
          return <Entypo name={iconName + outline} size={25} color={tintColor}/>
      }
      else if (navigation.state.routeName == 'Alertes') {
        Platform.OS === 'ios'
          ? iconName = 'ios-notifications'
          : iconName = 'md-notifications'
          return <Ionicons name={iconName + outline} size={25} color={tintColor}/>
      }


    }
  }),

  // Style du bottom
  tabBarOptions: {
    activeTintColor: '#fd9644',
    inactiveTintColor: 'gray'
  }
});



var StackNavigator = createStackNavigator({

// Pages de ma navigation sans bottom
   Home: Home,
   SearchScreen: SearchScreen,
   ListScreen: ListScreen,
   AddPromenade: AddPromenade,
   Signin: Signin,
   Account: Account,
   MyAccountEdit: MyAccountEdit,
 
   AddAlert: AddAlert,
   Signup: Signup,
   CameraScreen: CameraScreen,
    PromenadeScreen:PromenadeScreen,
   // J'inclus mon MainNavigator à mon StackNavigator
   MainNavigator: MainNavigator
 },
//personnalisation Header avec icon Account
 {
   defaultNavigationOptions:  ({navigation}) => ({
     headerRight: (
       <Ionicons onPress={() => this.props.navigation.navigate('MyAccount')} name='ios-person' size={25} color='#fd9644' style={{marginRight: 20}}/>
     )
   }),
 });




//j'exporte mon StackNavigator
 export default Navigation = createAppContainer(StackNavigator);
