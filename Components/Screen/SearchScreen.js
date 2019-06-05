import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Picker,Divider, Slider, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Location, Permissions } from 'expo';
import { Header, Content, Icon, Item, Input, FooterTab,Button} from 'native-base';
import TimePicker from 'react-native-24h-timepicker';
import DatePicker from 'react-native-datepicker';


export default class SearchScreen extends React.Component {

constructor(){
  super();
  this.state = {
       latitude:0,
       longitude:0,
       logPosition:[],
       duree:1,
       puppyButton:false,
       onlygirlsButton:false,
       time: " ",
       chosenDate: new Date()},
       this.setDate = this.setDate.bind(this);

}

  setDate(newDate) {
    this.setState({ chosenDate: newDate });

}

     onCancel() {
       this.TimePicker.close();
}

onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();

  }


componentWillMount() {
  this._getLocationAsync();
}
_getLocationAsync = async () => {
    var { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

   Location.watchPositionAsync({distanceInterval: 5},
    (location) => {this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });

    }
  );
}
 render(){

   return (
     <ScrollView>

       <Header style={{paddingTop: 0, backgroundColor:'#ffff'}} searchBar rounded >

         <Item>
         <Icon name="ios-search" />
         <Input placeholder="Autour de moi" />
         </Item>

       </Header>

      <View style={{flex : 1}} >
        <MapView
          style={{height:350, width: '100%'}}
          region={{
          latitude: this.state.latitude,
          longitude:this.state.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }}
        >
<View>
          <Marker
           image={require('../../assets/Images/projet_emeline.png')}
            key={"currentPosition"}
            title="Hello , "
            description="You are here"
            coordinate={{latitude:this.state.latitude, longitude:this.state.longitude}}
          />
</View>
        </MapView>
      </View>

      <Content>

        <View style={{flexDirection: 'column', border:10,marginLeft:30, marginTop:30,backgroundColor:'white', color:'black', justifyContent:'center',aligntext:'center', verticalAlign:'bottom'}}>
              <TouchableOpacity
                onPress={() => this.TimePicker.open()}
                >
                <Text>Duree:  </Text>

              </TouchableOpacity>
              <Text>{this.state.time}</Text>
              <TimePicker
                ref={ref => {
                  this.TimePicker = ref;
                }}
                onCancel={() => this.onCancel()}
                onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
              />

        </View>


        <View style={{flex:1, marginTop:30, marginLeft:20}}>
          <DatePicker
            style={{width: 200}}
            date={this.state.date}
            mode="date"
            placeholder="Date"
            format="DD/MM/YYYY"
            minDate="2016/05/01"
            maxDate="2016/06/01"
            confirmBtnText="Confirmer"
            cancelBtnText="Annuler"
            showIcon={false}
            onDateChange={(date) => {this.setState({date: date})}}
          />
        </View>

        <View style={{marginLeft:10,flexDirection: 'row', justifyContent: "space-around", alignItems:"center"}}>
            <Text>Reservé aux : </Text>

                  <Button
                    onPress={()=> this.setState({ puppyButton : !this.state.puppyButton })}
                    style={[styles.button,this.state.puppyButton ? styles.activeButton : styles.inactiveButton]} rounded>
                      <Text>Chiots</Text>
                    </Button>

                    <Button
                      onPress={()=> this.setState({ onlygirlsButton : !this.state.onlygirlsButton })}
                      style={[styles.button,this.state.onlygirlsButton ? styles.activeButton : styles.inactiveButton]} rounded>
                        <Text> Femelles </Text>
                      </Button>
        </View>

        <FooterTab style={{padding:20,marginLeft:10,marginRight:30}} >
        <Button primary onPress={ () => this.props.navigation.navigate('ListScreen')}>
         <Text>Valider</Text>

                  </Button>
        </FooterTab>

          </Content>

 </ScrollView>

     );
}
}

const styles = StyleSheet.create({
  activeButton:{
    backgroundColor:'pink',
  },
  inactiveButton:{
    backgroundColor:'rgba(0,0,0,0)',
  },
  button:{
    width:80,
    justifyContent:'center',
  },
})
