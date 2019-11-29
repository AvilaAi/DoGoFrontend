import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Label, Text } from 'native-base';
import { Divider } from 'react-native-elements';
import Signin from '../Screen/Signin';
import { connect } from 'react-redux';

class MyAccount extends Component {
 constructor(){
   super()

 }

  render() {

    if(!this.props.user.token){
      return (<Signin/>)
    }else{
    return (

// récupération des données du sign up

      <View style={styles.container}>

          <ScrollView style={styles.display}>

              <Label style={styles.label}>Votre nom</Label>
                <Text> {this.props.user.name} </Text>

              <Label style={styles.label}>Nom de votre chien</Label>
                <Text> {this.props.user.dog1} </Text>

              <Label style={styles.label}>Sexe de votre chien</Label>
                <Text> {this.props.user.dog1gender} </Text>

              <Divider style={{height:10, backgroundColor: "#FFFFFF"}} />

              <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                <Image source={{uri: this.props.user.avatar}} style={{height: 80, width: 80, borderRadius: 50 }}/>
              </View>

              <Divider style={{height:10, backgroundColor: "#FFFFFF"}} />

              <Label style={styles.label}>Description</Label>
                <Text style={{ height: 60}}> {this.props.user.description} </Text>

              <Label style={styles.label}>Votre email</Label>
                <Text> {this.props.user.email} </Text>

              <Label style={styles.label}>Mot de passe</Label>
                <Text> {this.props.user.password} </Text>

              <View style={{justifyContent:"center", alignItems:"center"}}>
                <TouchableOpacity
                  style = {styles.submitButton}
                  onPress={() => this.props.navigation.navigate('MyAccountEdit')}>
                 <Text style = {styles.submitButtonText}> Modifier </Text>
               </TouchableOpacity>
             </View>

             <View style={{display:'flex',justifyContent:"center", alignItems:"center"}}>
                <TouchableOpacity
                  style = {styles.submitButton}
                  onPress={() => this.props.navigation.navigate('SearchScreen')}>
                 <Text style = {styles.submitButtonText}> Trouver une promenade </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style = {styles.submitButton}
                  onPress={() => this.props.navigation.navigate('AddPromenade')}>
                 <Text style = {styles.submitButtonText}> Ajouter une promenade </Text>
               </TouchableOpacity>

             </View>

          </ScrollView>

        </View>
);
    }
}

};


const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    justifyContent: 'center',
  },
  display: {
    paddingLeft: "5%",
    width: "90%",

  },
  label: {
    paddingBottom: 5,
    paddingLeft: 10,
    paddingTop: 10
  },
  input: {
    paddingBottom: 5,
    height: 40
  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
   },
   submitButton: {
     borderColor: "#0FA1AE",
     borderWidth: 1,
     borderRadius: 30,
     padding: 10,
     margin: 10,
     height: 40,
    },
    submitButtonText:{
       color: "#0FA1AE"
    }
});



function mapStateToProps(state) {
  return { user: state.userData }
}

export default connect(
    mapStateToProps,
    null
)(MyAccount);


// <Label style={styles.label}>Votre nom</Label>
//   <Text style={styles.input}
//   onChangeText={(username) => this.setState({username})}
//   value={this.state.username}
//   />
//
// <Label style={styles.label}>Nom de votre chien</Label>
//   <Text style={styles.input}
//   onChangeText={(dog1) => this.setState({dog1})}
//   value={this.state.dog1}
//   />
//
// <Label style={styles.label}>Sexe de votre chien</Label>
//   <Text style={styles.input}
//   onChangeText={(dog1gender) => this.setState({dog1gender})}
//   value={this.state.dog1gender}
//   />
//
// <Divider style={{height:10, backgroundColor: "#FFFFFF"}} />
//
// <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
//   <Image source={require("../../assets/Images/doge.png")} style={{height: 60, width: 60}}/>
// </View>
//
// <Divider style={{height:10, backgroundColor: "#FFFFFF"}} />
//
// <Label style={styles.label}>Description</Label>
//   <Text style={styles.input}
//   onChangeText={(description) => this.setState({description})}
//   value={this.state.description}
//   />
//
// <Label style={styles.label}>Votre email</Label>
//   <Text style={styles.input}
//   onChangeText={(email) => this.setState({email})}
//   value={this.state.email}
//   />
//
// <Label style={styles.label}>Mot de passe</Label>
//   <Text style={styles.input}
//   onChangeText={(password) => this.setState({password})}
//   placeholder="****"
//   value={this.state.password}
//   />
//
// <View style={{justifyContent:"center", alignItems:"center"}}>
//   <TouchableOpacity
//     style = {styles.submitButton}
//     onPress={() => this.props.navigation.navigate('MyAccountEdit')}>
//    <Text style = {styles.submitButtonText}> Modifier </Text>
