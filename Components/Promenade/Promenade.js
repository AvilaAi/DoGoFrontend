import React from 'react';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

import {bottomDivider,Image,ListItem,Avatar,containerStyle,Badge,Text} from 'react-native-elements';
import {TouchableOpacity,View,ImageBackground,StyleSheet} from 'react-native';
import { Card, Header,CardItem, Thumbnail, Left,H3, Body, Right,Button,Icon} from 'native-base';
import { connect } from 'react-redux';



class Promenade extends React.Component{
  constructor(){
    super()
    this.voir=this.voir.bind(this)
   
    
  }
  
  voir= async()=>{
   
    await this.props.promenadeSelected(this.props.id);
  
    this.props.navigation.navigate('PromenadeScreen');
    
  }
  
  render(){
    var newDate = new Date(this.props.date);
    var dateAffiche=newDate.getDate() + "/" + (newDate.getMonth() + "/" + newDate.getFullYear())

    return(

    <TouchableOpacity onPress={this.voir}>
      <Card >
            <CardItem style={this.props.user.userId==this.props.userId? styles.mypromenade:styles.promenade}cardBody >
           
                <Thumbnail style={{marginLeft:15,marginTop:10}}square large source={{uri: this.props.avatar}} />
               
            
             <View style={{marginLeft:10,marginTop:10}}>
                  <View>
                  
                  <Text style={{fontWeight: 'bold'}}><Icon style={{color:'#0FA1AE',fontSize:15}} name="person" />  {this.props.username}</Text>
                  <Text style={{fontWeight: 'bold'}}><Icon style={{color:'#0FA1AE',fontSize:15}} name="paw" />  {this.props.dog1}</Text>
                  </View>

                  <View style={{marginTop:8}}>
                    <Text><Icon style={{color:'#0FA1AE',fontSize:15}} name="pin" /> {this.props.adress}</Text>
                    <Text><Icon style={{color:'#0FA1AE',fontSize:15}} name="warning" /> {this.props.warning}</Text>
                  </View>
                 
              </View>

             
            </CardItem>
        
            <CardItem style={this.props.user.userId==this.props.userId? styles.mypromenade:styles.promenade}>
              <Left>
                <Button transparent>
                  <Icon active name="calendar" />
                  <Text>{dateAffiche}</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent >
                  <Icon active name="people" />
                  <Text>{this.props.participant.length}participants</Text>
                </Button>
              </Body>
              <Right>
              <Button transparent>
                  <Icon active name="navigate" />
                  <Text>{this.props.distance}km</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>

  </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({
 subtitle:{
   flexDirection:'column',
   padding:10,
   paddingTop:5,
 },
 mypromenade:{
   backgroundColor:'#c7ecee',
   flex:0
 },
 promenade:{
  backgroundColor:'#FFFFFF',
   flex:0
 },
 ratingText:{
   color: 'grey',
 },
 picNumber:{
   paddingLeft: 10,
   fontWeight: 'bold',
   fontSize: 18
 },
 title: {
   fontSize: 25,
   fontWeight: 'bold',
   margin: 15,
 },
 descDisplay: {
   flexDirection: 'row',
 },
});


function mapDispatchToProps(dispatch) {
  return {
    promenadeSelected: function(idPromenade) {
        dispatch({
          type: 'selectPromenade',
          promenadeId:idPromenade
          
        })
       
    }
  }
}
function mapStateToProps(state) {
  return { user: state.userData }
}
export default connect(
  mapStateToProps,
    mapDispatchToProps
)(Promenade);