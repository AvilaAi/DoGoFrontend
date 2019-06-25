import React from 'react';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Participant from '../Promenade/Participant';
import {bottomDivider,Image,ListItem,Avatar,containerStyle,Badge,Text} from 'react-native-elements';
import {Alert,View,ImageBackground,StyleSheet} from 'react-native';
import {Footer,FooterTab, Content,Spinner,Card, Header,CardItem, Thumbnail, Left, Body, Right,Button,Icon} from 'native-base';
import { connect } from 'react-redux';



class PromenadeScreen extends React.Component{
    constructor(){
        super()
        this.state={
          participant:[],
          participantCount:0,
          promenadeSelected:{},
          dataLoad : false,
          joint:false,
          participantVisible:false
        };
        this.deletePromenade=this.deletePromenade.bind(this),
        this.jointClick=this.jointClick.bind(this),
        this.voirParticipant=this.voirParticipant.bind(this)
        
    }

    async voirParticipant(){
      await this.setState({participantVisible:!this.state.participantVisible})
    }

    deletePromenade=()=>{
      fetch(`${url}/deletePromenade/${this.props.promenade}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({promenadeId: this.props.promenadeId})

      })
      .catch((error) => {
      console.error(error);
      })
      Alert.alert("Promenade supprimée")
    }

 


    async componentWillMount() {
        var ctx = this;
        
        await fetch(`${url}/select_promenade?_id=${this.props.promenade}`)
        .then(function(response){
          return response.json();
        }).then(function(promenade){
          console.log(promenade.data)
          if(promenade.data.participant.some(item => item.userId === ctx.props.user.userId) ==true){
            ctx.setState({joint:true})
          }
          var participantCopy=promenade.data.participant
          ctx.setState({
              promenadeSelected: promenade.data,
              participant:participantCopy,
              participantCount:promenade.data.participant.length
            });
           
        }).catch(function(error){
          console.error(error);
          Alert.alert('Promenade supprimée')
          
        });
        ctx.setState({dataLoad:true})
    }

       jointClick= async ()=>{
        if(this.props.user.token){

          await this.setState({ joint : !this.state.joint })
          var participantCopy=[...this.state.participant]
          var participantAjouts = JSON.stringify({
            promenadeId:this.state.promenadeSelected._id,
            userId: this.props.user.userId,
            username:this.props.user.name,
            avatar:this.props.user.avatar
          });
          if(this.state.joint==true){ Alert.alert("Promenade ajoutée")
          
          participantCopy.push({
            userId: this.props.user.userId,
            username:this.props.user.name,
            avatar:this.props.user.avatar
          })
          this.setState({participant:participantCopy,participantCount:this.state.participantCount+1})
      
          fetch(`${url}/add_participant`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: participantAjouts
          }
          ).then(function(res, err){
            return res.json()
          }).then(function(data){
            console.log(data, "-------------------");
            var participantCopy=data.participant;
            console.log(participantCopy, "participant copy --------");
            console.log(data.participant.length,  "participant copy LENGTH --------");
            ctx.setState({
                participant:participantCopy,
                participantCount:data.participant.length
              });
            
          }).catch(function(err){
            console.log(err)
          })

        }else{Alert.alert("A la prochaine fois..?");
        this.setState({participantCount:this.state.participantCount-1});

        fetch(`${url}/delete_participant/${this.props.promenade}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId: this.props.user.userId})
      // body:`userId=${this.props.user.userId}`
    })
        .catch((error) => {
        console.error(error);
      });
      this.setState({participant:data.participant});

      
          
       }
      }else{
        this.props.navigation.navigate('Signin')
     }
        

    }



    render(){       
      var newDate = new Date(this.state.promenadeSelected.date);
      var dateAffiche=newDate.getDate() + "/" + (newDate.getMonth() + "/" + newDate.getFullYear());
  
      var listParticipant= this.state.participant.map((item,i)=>{
          return(

            <Participant key={i}username={item.username} avatar={item.avatar}/>
          )})


        return(
            <View style={{flex:1}}>
             { 
               this.state.dataLoad 
               ?(<Card style={{flex: 1}}>

<CardItem cardBody >
           
           <Thumbnail style={{marginLeft:15,marginTop:10}}square large source={{uri: this.state.promenadeSelected.userId.avatar}} />
          
       
        <View style={{marginLeft:10,marginTop:10}}>
             <View>
             
             <Text style={{fontWeight: 'bold'}}><Icon style={{color:'blue',fontSize:15}} name="person" />  {this.state.promenadeSelected.userId.username}</Text>
             <Text style={{fontWeight: 'bold'}}><Icon style={{color:'blue',fontSize:15}} name="paw" />  {this.state.promenadeSelected.userId.dog1}</Text>
             </View>

             <View style={{marginTop:8}}>
               <Text><Icon style={{color:'blue',fontSize:15}} name="pin" /> {this.state.promenadeSelected.adress}</Text>
               <Text><Icon style={{color:'blue',fontSize:15}} name="warning" /> {this.state.promenadeSelected.warning}</Text>
             </View>
             
         </View>

        
       </CardItem>
        
        <CardItem bordered>
              <Body>
              <Text>Durée:{this.state.promenadeSelected.duree}</Text>
              <Text>
            {this.state.promenadeSelected.description}
            </Text>
              </Body>
            </CardItem>


        <MapView mapType = "standard"
        style={{flex : 0.5}}
        initialRegion=
        {{
        latitude: this.state.promenadeSelected.latitude,
        longitude: this.state.promenadeSelected.longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
        }}
        >
        <Marker 
        title="Ici , "
        description="Promenade proposée"
        image={require('../../assets/Images/projet_emeline.png')} coordinate={{latitude: this.state.promenadeSelected.latitude, longitude: this.state.promenadeSelected.longitude}}
        />

        </MapView>
        <CardItem>
        <Left>
            <Button transparent>
            <Icon active name="calendar" />
            <Text>{dateAffiche}</Text>
            </Button>
        </Left>
        <Body>
            <Button transparent onPress={this.voirParticipant}>
            <Icon active name="people" />
            <Text>{this.state.participantCount}participants</Text>
            </Button>
        </Body>
        <Right>
        <Button transparent>
            <Icon active name="navigate" />
            <Text>{this.state.promenadeSelected.distance}km</Text>
            </Button>
        </Right>
        </CardItem>



    

<View >

  {(this.state.promenadeSelected.userId._id==this.props.user.userId)?
    <Button block bordered primary onPress={this.deletePromenade}>
    <Icon active name='trash'/>
    <Text>Supprimer</Text>
    </Button>
  :
  
    <Button block bordered primary 
     onPress={this.jointClick}
    style={this.state.joint ? styles.activeButton : styles.inactiveButton} 
    >
    <Icon name='heart' />
    <Text>Rejoindre</Text>
    </Button>
  }

    <Button block bordered primary onPress={ () => this.props.navigation.navigate('CameraScreen')}>
    <Icon active name='camera'/>
    <Text>Prendre photo</Text>
    </Button>
    <View style={{display:'flex',flex:'row'}}>
{
this.state.participantVisible 
        ? listParticipant
        :null
  }
  </View>
</View>

    </Card>

      
)  
    
            
        
        : (   <Content>
            <Spinner />
            <Spinner color='red' />
            <Spinner color='green' />
            <Spinner color='blue' />
          </Content>)
          }




<Footer>
      <FooterTab>
      <Button transparent primary onPress={ () => this.props.navigation.navigate('MyAccount')}>
                  <Icon name='menu'/>
                  <Text>Mon compte</Text>
                </Button>
                <Button transparent primary onPress={ () => this.props.navigation.navigate('AddPromenade')}>
                  <Icon name='alarm'/>
                  <Text>Créer une alerte</Text>
                </Button>
      </FooterTab>

      </Footer>
          </View>
        )
    }
}
  

const styles = StyleSheet.create({
  activeButton:{
    backgroundColor:'blue',
  },
  inactiveButton:{
    backgroundColor:'rgba(0,0,0,0)',
  },
  button:{
    width:200,
    justifyContent:'center',
  },
})

function mapStateToProps(state) {
    return { promenade: state.promenade,
      user: state.userData }
  }
  
  export default connect(
      mapStateToProps,
      null
  )(PromenadeScreen);