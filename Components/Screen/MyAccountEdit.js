import React, { Component } from 'react';
import { View, Button, KeyboardAvoidingView, StyleSheet, Image} from 'react-native';
import { Picker, Icon, Item, Label, Input} from 'native-base';
import { Divider } from 'react-native-elements';

export default class MyAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      dog1: "",
      dog1gender: undefined,
      descritpion: "",
      email: "",
      password: "",
    };
  }
  onValueChange(value) {
    this.setState({
      dog1gender: value
    });
  }


  render() {
    return (

      <KeyboardAvoidingView style={styles.container} behavior="padding">



          <View style={styles.display}>
              <Label style={styles.label}>Votre nom</Label>
                <Item regular style={styles.input} >
                  <Input
                  onChangeText={(username) => this.setState({username})}
                  value={this.state.username}
                  placeholder= "..."
                  placeholderColor="#c4c3cb"/>
              </Item>

              <Label style={styles.label}>Nom de votre chien</Label>
                <Item regular style={styles.input} >
                  <Input
                  onChangeText={(dog1) => this.setState({dog1})}
                  value={this.state.dog1}
                  placeholder= "..."
                  placeholderColor="#c4c3cb"/>
                  </Item>

              <Label style={styles.label}>Sexe de votre chien</Label>
                <Item regular style={styles.input} >
                  <Picker style={styles.input}
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      placeholder="..."
                      selectedValue={this.state.dog1gender}
                      onValueChange={this.onValueChange.bind(this)}
                    >
                      <Picker.Item label="Male" value="key0" />
                      <Picker.Item label="Femelle" value="key1" />

                  </Picker>
                  </Item>

              <Divider style={{height:10, backgroundColor: "#FFFFFF"}} />

              <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                  <Image source={require("../../assets/Images/doge.png")} style={{ height: 80, width: 80, borderRadius: 50 }}/>
                  <Image source={require("../../assets/Images/doge.png")} style={{ height: 80, width: 80, borderRadius: 50 }}/>
                  <Image source={require("../../assets/Images/doge.png")} style={{ height: 80, width: 80, borderRadius: 50 }}/>
              </View>

              <Divider style={{height:10, backgroundColor: "#FFFFFF"}} />

              <Label style={styles.label}>Description</Label>
                <Item regular style={{borderRadius: 5, height: 60}} >
                  <Input
                  onChangeText={(description) => this.setState({description})}
                  value={this.state.description}
                  placeholder= "..."
                  placeholderColor="#c4c3cb"/>
              </Item>

              <Label style={styles.label}>Votre email</Label>
                <Item regular style={styles.input} >
                  <Input
                  onChangeText={(email) => this.setState({email})}
                  value={this.state.email}
                  placeholder= "..."
                  placeholderColor="#c4c3cb"/>
              </Item>

              <Label style={styles.label}>Mot de passe</Label>
                <Item regular style={styles.input} >
                  <Input
                  onChangeText={(password) => this.setState({password})}
                  value={this.state.password}
                  placeholder= "..."
                  placeholderColor="#c4c3cb"/>
              </Item>



              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onLoginPress()}
                title="Valider"
              />

          </View>


        </KeyboardAvoidingView>
);
}

};


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  display: {
    paddingLeft: "5%",
    width: "90%"
  },
  label: {
    paddingBottom: 5,
    paddingLeft: 10,
    paddingTop: 10
  },
  input: {
    borderRadius: 5,
    height: 40
  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
   },
});
