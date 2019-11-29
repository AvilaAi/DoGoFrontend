import React from 'react';

import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import {
  Platform,
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
import OldPromenade from '../Screen/OldPromenade';
import MyAccountEdit from '../Screen/MyAccountEdit';
import Alert from '../Screen/Alert';
import AddAlert from '../Screen/AddAlert';
import PromenadeScreen from '../Screen/PromenadeScreen';
import PromenadeTrouve from '../Screen/PromenadeTrouve';
import MesPromenades from '../Screen/MesPromenades';


import { Ionicons, Entypo } from '@expo/vector-icons';

// Création de ma Bottom Navigation
const MainNavigator = createBottomTabNavigator({
  'Mon compte' : MyAccount,
  'À venir': MesPromenades,
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
    activeTintColor: '#0FA1AE',
    inactiveTintColor: 'gray'
  }
});



var StackNavigator = createStackNavigator({

// Pages de ma navigation sans bottom
   Home: Home,
   SearchScreen: SearchScreen,
   PromenadeTrouve:PromenadeTrouve,
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
   defaultNavigationOptions: ({navigation})=> ({
    headerTitle: "DoGoHome",
    headerRight: (
      <Ionicons onPress={() => navigation.navigate('Mon compte')} name='ios-person' size={25} color='#0FA1AE' style={{marginRight: 20}}/>
    ),
    
  })

 });



 export default Navigation = createAppContainer(StackNavigator);
