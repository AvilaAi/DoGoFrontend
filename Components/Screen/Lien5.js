import React from 'react';
import { ImageBackground, AppRegistry, View,Button,Keyboard, Text,  TextInput, TouchableWithoutFeedback,
  Alert, KeyboardAvoidingView, StyleSheet} from 'react-native';





export default class Lien5 extends React.Component {

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>Caps</Text>
            <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}/>
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onLoginPress()}
              title="Login"
            />
            <Button
              buttonStyle={styles.fbLoginButton}
              onPress={() => this.onFbLoginPress()}
              title="Login with Facebook"
              color="#3897f1"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onLoginPress() {

  }

  async onFbLoginPress() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }
}
const styles=  StyleSheet.create({

      containerView: {
      flex: 1,
      },
      loginScreenContainer: {
      flex: 1,
      },
      logoText: {
      fontSize: 40,
      fontWeight: "800",
      marginTop: 150,
      marginBottom: 30,
      textAlign: 'center',
      },
      loginFormView: {
      flex: 1
      }  ,
      loginFormTextInput: {
      height: 43,
      fontSize: 14,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#eaeaea',
      backgroundColor: '#fafafa',
      paddingLeft: 10,
       marginLeft: 15,
       marginRight: 15,
       marginTop: 5,
       marginBottom: 5,

       },
      loginButton: {
      backgroundColor: '#3897f1',
      borderRadius: 5,
      height: 45,
       marginTop: 10,
       },
        fbLoginButton: {
          height: 45,
          marginTop: 10,
          backgroundColor: 'transparent',
        },
}
)
