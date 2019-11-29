import React from 'react';

import {StyleSheet, ImageBackground} from 'react-native';
import {Button, Icon, Container,  Content, Card, CardItem,  Text, Left, Body, Right} from 'native-base';




export default class Alert extends React.Component {

  render() {



    return (
<Container>
      {/* <Image style={{flex:1, opacity: 0.2}} source={require("../../assets/Images/backgroundpaws.jpeg")}> */}

      <ImageBackground source={require("../../assets/Images/backgroundpaws.jpeg")} style={styles.backgroundImage}>


                  <Content style={styles.overlay}>
                    <Card style={{padding: 3, margin: 10}}>
                      <CardItem >

                        <Left style={{flex: 1, flexDirection:'row' }}>
                              <Icon name="pin" style={styles.icon} />
                              <Text>151 rue Saint Denis, 75005 PARIS</Text>
                        </Left>
                      </CardItem>


                      <CardItem>

                        <Left>
                          <Text note>Jusqu'à 5km autour</Text>
                        </Left>

                        <Right>
                          <Button transparent>
                          <Icon name="trash" style={styles.icontrash}/>
                          </Button>
                        </Right>

                      </CardItem>


                      <CardItem>

                        <Body style={{flex: 1, flexDirection:'row'}}>
                          <Icon name="hourglass" style={styles.icon}/>
                          <Text note>Durée : 1h30</Text>

                          <Icon name="refresh" style={styles.icon}/>
                          <Text note>Toujours</Text>

                          <Icon name="calendar" style={styles.icon}/>
                          <Text note>sam-dim</Text>
                        </Body>

                      </CardItem>

                    </Card>
                  </Content>






       <Button block onPress={ () => this.props.navigation.navigate('AddAlert')}>

                   <Text>Ajouter une alerte</Text>
                 </Button>






      </ImageBackground>
     </Container>);
  }
 }



 const styles = StyleSheet.create({
  icon: {
    color: '#fd9644',
    fontSize: 15,
    margin: 2,
  },
  icontrash: {
    color: '#4b6584'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
},
overlay: {
  
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor:  'rgba(0, 182, 255,0.2)',
 
}
});
