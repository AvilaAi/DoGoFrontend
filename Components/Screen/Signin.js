import React from 'react';
import {
  View, Keyboard, TextInput, TouchableWithoutFeedback,
  Alert, KeyboardAvoidingView, StyleSheet, Button, Text, Image, AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';
import url from '../../config';

class Signin extends React.Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    }
  }



  handleSumbit = () => {


    fetch(`${url}/signin?email=${this.state.email}&password=${this.state.password}`)
      .then((res, err) => res.json() // only one element to return so no need to add {} and no need to use the key word return
      ).then(data => {
        // console.log(data)
        data.isUserExist
          ? (
            console.log("ok"),
            Alert.alert('Welcome back'),
            this.props.handleUserValid(data.user._id, data.user.username, data.user.email, data.user.dog1, data.user.dog1gender, data.user.avatar, data.user.token),
            AsyncStorage.setItem('userComeback', JSON.stringify(data)),
            this.props.navigation.navigate('Mon compte')



          )
          : this.setState({ errorMessage: 'Wrong credentials, try again...' })
      }).catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <Image source={require("../../assets/Images/dogo.png")} style={styles.logo} />

            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Connexion</Text>
              <TextInput onChangeText={(e) => this.setState({ email: e })} placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
              <TextInput onChangeText={(e) => this.setState({ password: e })} placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
              <Text style={{ color: '#fd79a8', marginLeft: 2 }}>{this.state.errorMessage}</Text>



              <Button
                style={styles.loginButton}
                onPress={this.handleSumbit}
                title="Login"
              />


              <Button
                buttonStyle={{ color: '#778ca3' }}
                onPress={() => this.props.navigation.navigate('Signup')}
                title="Pas de compte? Inscrivez-vous !"
                color="#3897f1"
              />

            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }


  // async onFbLoginPress() {
  //   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
  //     permissions: ['public_profile', 'email'],
  //   });
  //   if (type === 'success') {
  //     const response = await fetch(
  //       `https://graph.facebook.com/me?access_token=${token}`);
  //     Alert.alert(
  //       'Logged in!',
  //       `Hi ${(await response.json()).name}!`,
  //     );
  //   }
  // }
}


const styles = StyleSheet.create({

  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
    alignItems: 'center'
  },
  logoText: {
    fontSize: 30,
    fontWeight: "200",
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
    color: "#778ca3"
  },
  logo: {
    height: 83,
    width: 210,
    marginTop: 50,

  },
  loginFormView: {
    flex: 1
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    color: '#778ca3',
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    color: '#778ca3',
    borderRadius: 5,
    margin: 20,
    height: 45,

  },
})

function mapDispatchToProps(dispatch) {
  return {
    handleUserValid: function (idUser, nameUser, emailUser, dog1User, dog1genderUser, avatarUser, tokenUser) {
      dispatch({
        type: 'setUser',
        userId: idUser,
        name: nameUser,
        email: emailUser,
        dog1: dog1User,
        dog1gender: dog1genderUser,
        avatar: avatarUser,
        token: tokenUser
      })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Signin);
