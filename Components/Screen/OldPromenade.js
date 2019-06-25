import React from 'react';
import { ImageBackground, RefreshControl,AppRegistry, View,ScrollView} from 'react-native';
import Promenade from '../Promenade/Promenade';
import {Header,Button,Content,Right,Spinner,Icon,Text,Footer,FooterTab} from 'native-base';
import url from '../../config';

import { connect } from 'react-redux';


class OldPromenades extends React.Component{

    constructor(){
        super()
        this.state={
          promenadeBD:[],
          dataLoad : false,
          isRefreshing:false
        };
      }
    
      componentWillMount() {
        var ctx = this;
        fetch(`${url}/mes_promenades?userId=${this.props.user.userId}`)
        .then(function(response){
          return response.json();
        }).then(function(promenade){
          ctx.setState({promenadeBD: promenade.data});
        }).catch(function(error){
          console.error(error);
        });
        ctx.setState({dataLoad:true})
      }

      onRefresh() {
   
        this.setState({isRefreshing: true});
        setTimeout(() => {
          
          this.setState({isRefreshing: false});
        }, 2000);
        var ctx = this;
        fetch(`${url}/mes_promenades?userId=${this.props.user.userId}`)
        .then(function(response){
          return response.json();
        }).then(function(promenade){
          ctx.setState({promenadeBD: promenade.data});
        }).catch(function(error){
          console.error(error);
        });
        ctx.setState({dataLoad:true})
      }




    render(){

        var promenadeList = this.state.promenadeBD.map((item,i)=>{
           
              return <Promenade warning={item.warning}id={item._id}cp={item.cp}description={item.description}adress={item.adress}key={i} username={item.userId.username} dog1={item.userId.dog1}avatar={item.userId.avatar} date={item.date} duree={item.duree} distance={item.distance} participant={item.participant} navigation={this.props.navigation}/>
      
            }
        )

        return(

                <View style={{flex:1}} >
                  { this.state.promenadeBD.length>0 ? 
                       (
                 <ScrollView style={{flex: 1, marginHorizontal:20}} refreshControl={  <RefreshControl
                  refreshing={this.state.isRefreshing}  
                  onRefresh={this.onRefresh.bind(this)}  
                  tintColor='white'
                  title= {this.state.isRefreshing? 'loading....':'loading'}
                />
              }>
                   
                {promenadeList}
                  
                 </ScrollView>
                 
                 ) 
                  : 
                  (   
                   
                  <ImageBackground style={{height:500}}source={require("../../assets/Images/chien-triste3.jpeg")}>
                  <Text>Oops, pas de promenade ...</Text>
                  </ImageBackground>
                  )
                    }
                    
                 
                </View>
          

        )
    }
}

function mapStateToProps(state) {
    return { user: state.userData }
  }
  
  export default connect(
      mapStateToProps,
      null
  )(OldPromenades);