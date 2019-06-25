import React from 'react';
import { ImageBackground, RefreshControl,AppRegistry, Image,View,ScrollView} from 'react-native';
import Promenade from '../Promenade/Promenade';
import {Header,Tab,Tabs,H3,TabHeading,Button,Content,Right,Spinner,Icon,Text,Footer,FooterTab, Container} from 'native-base';
import url from '../../config';
import { connect } from 'react-redux';

class ListScreen extends React.Component {
  constructor(){
    super()
    this.state={
      promenadeBD:[],
      dataLoad : false,
      isRefreshing:false
    };
    

  }

  onRefresh() {
   
       this.setState({isRefreshing: true});
       setTimeout(() => {
         
         this.setState({isRefreshing: false});
       }, 2000);

       var ctx = this;
       fetch(`${url}/list_promenade`)
       .then(function(response){
         return response.json();
       }).then(function(promenade){
        //  console.log(promenade.data)
         ctx.setState({promenadeBD: promenade.data});
       }).catch(function(error){
         console.error(error);
       });
       ctx.setState({dataLoad:true})
     

     }


  async componentDidMount() {
    var ctx = this;
    await fetch(`${url}/list_promenade`)
    .then(function(response){
      return response.json();
    }).then(function(promenade){
      // console.log(promenade.data)
      ctx.setState({promenadeBD: promenade.data});
    }).catch(function(error){
      console.error(error);
    });
    ctx.setState({dataLoad:true})
  }
  

  


  render() {
     
    var promenadeList =[].concat(this.state.promenadeBD)
    .sort((a,b)=>a.distance>b.distance)
    .map((item,i)=>{
      if(this.state.promenadeBD.length===0){
        return <Text>Pas de promenade</Text>
      }else{
        return <Promenade id={item._id}userId={item.userId._id}description={item.description}adress={item.adress}key={i} username={item.userId.username} dog1={item.userId.dog1}avatar={item.userId.avatar} date={item.date} duree={item.duree} distance={item.distance} participant={item.participant} warning={item.warning}navigation={this.props.navigation}/>
      }
    })

    return (

      <Container style={{flex:1,backgroundColor:'rgba(0, 182, 255,0.2)' }} >
         <Tabs>
          {/* <Tab  heading={ <TabHeading><Icon name="search" /><Text>Resultat</Text></TabHeading>}>
          
          <ImageBackground style={{height:500}}source={require("../../assets/Images/chiens-triste.jpeg")}>
          <H3 style={{margin:50}}>Oops, pas de promenade ...</H3>
          </ImageBackground>
          </Tab> */}
          <Tab heading={ <TabHeading><Icon name="paw" /><Text>A decouvrir</Text></TabHeading>}>
          { this.state.dataLoad ?
             (
       <ScrollView style={{flex: 1, marginHorizontal:20}}
       refreshControl={  <RefreshControl
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
        (   <Content>
            <Spinner />
            <Spinner color='red' />
            <Spinner color='green' />
            <Spinner color='blue' />
          </Content>)
          }
          </Tab>
         
        </Tabs>
       

      <Footer>
      <FooterTab>
      <Button transparent primary onPress={()=>this.props.navigation.navigate('AddPromenade')}>
                  <Icon name='add'/>
                  <Text>Add a promenade</Text>
                </Button>
                <Button transparent primary onPress={ () => this.props.navigation.navigate('AddPromenade')}>
                  <Icon name='alarm'/>
                  <Text>Créer une alerte</Text>
                </Button>
      </FooterTab>

      </Footer>
      </Container>
      );
    }
}

 
  function mapStateToProps(state) {
    return { user: state.userData }
  }
  
  export default connect(
      mapStateToProps,
      null
  )(ListScreen);
