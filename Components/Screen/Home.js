import React from 'react';
import { View, ImageBackground, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Button, Text } from 'native-base';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';

class Home extends React.Component {

  static navigationOptions = {
    drawerLabel: 'Home',
  };

  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userComeback",
      (err, data) => {
        if (data) {
          this.props.handleUserValid(JSON.parse(data));
        }
      })
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Handlee-Regular': require('../../assets/Handlee-Regular.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  // Traitement concernant le Header de la navigation : il masque le header
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "DoGoHome",
    headerRight: (
      <Ionicons onPress={() => navigation.navigate('Mon compte')} name='ios-person' size={25} color='#0FA1AE' style={{ marginRight: 20 }} />
    ),
    headerTitle: (
      <Image source={require("../../assets/Images/dogo.png")} style={{ width: 84, height: 33 }} />
    )
  });

  render() {
    //  console.log("fontLoaded",this.state.fontLoaded);
    return (

      <ImageBackground style={{ height: "100%" }} source={require("../../assets/Images/home5.jpg")}>


        <View style={{ flex: 1, alignItems: 'center', }}>


          {this.state.fontLoaded ? (
            <Text style={{ fontFamily: 'Handlee-Regular', fontSize: 25, textAlign: 'left', color: "#FFF", fontWeight: 'bold', marginTop: 50 }}>
              Des compagnons de promenade
          </Text>
          ) : (
              <Text style={{ fontSize: 25, textAlign: 'center' }}>
                Des compagnons de promenade
              </Text>
            )
          }

          {this.state.fontLoaded ? (
            <Text style={{ fontFamily: 'Handlee-Regular', fontSize: 25, textAlign: 'left', color: "#FFF", fontWeight: 'bold' }}>
              autour de vous
              </Text>
          ) : (
              <Text style={{ fontSize: 25, textAlign: 'center' }}>
                autour de vous
              </Text>
            )
          }

        </View>



        <View >

          <Button info style={{ marginHorizontal: 85, marginBottom: 10, position: 'center' }} onPress={() => this.props.navigation.navigate('SearchScreen')}>
            <Text >Trouver une promenade</Text>
          </Button>

          <Button info style={{ marginHorizontal: 80, marginBottom: 20, position: 'center' }} onPress={() => this.props.navigation.navigate('AddPromenade')}>
            <Text >Proposer une promenade</Text>
          </Button>

        </View>



      </ImageBackground>


    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleUserValid: function(data) {
        dispatch({
          type: 'setUser',
          userId:data.user._id,
          name: data.user.username,
          email: data.user.email,
          dog1: data.user.dog1,
          dog1gender:data.user.dog1gender,
          avatar:data.user.avatar,
          token: data.user.token
        })
    }
  }
}
//---récupérer dans le store les infos user s'il a été déjà connecté
function mapStateToProps(state) {
  return { user: state.userData }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
