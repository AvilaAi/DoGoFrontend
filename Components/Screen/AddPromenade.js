import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Form, Picker, Container, Item, Input, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Location, Permissions } from 'expo';
import Signin from '../Screen/Signin';
import DatePicker from 'react-native-datepicker';

class AddPromenade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: null,
      adress: '',
      description: '',
      warning: '',
      userId: '',
      lat: '',
      lng: ''
    };

    duree: undefined
    this._getLocationAsync = this._getLocationAsync.bind(this)
    this.AddaPromenade = this.AddaPromenade.bind(this);
    this.setAdress = this.setAdress.bind(this)
  }

  setAdress = (data, details) => {
    this.setState({
      adress: data.description,
      lat: details.geometry.location.lat,
      lng: details.geometry.location.lng
    })

  };

  AddaPromenade() {
    console.log('Add a promenade...');
    var promenadeData = JSON.stringify({
      userId: this.props.user.userId,
      adress: this.state.adress,
      date: this.state.chosenDate,
      duree: this.state.duree,
      description: this.state.description,
      warning: this.state.warning,
      lat: this.state.lat,
      lng: this.state.lng,
      currentlatitude: '',
      currentlongitude: ''


    });

    // Since we are going to fetch with the ES5 syntax, we need to store this (an EST5 function has got its own this)
    const ctx = this;

    fetch(`${url}/add_promenade`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: promenadeData
    }
    ).then(function (res, err) {
      return res.json()
    }).then(function (data) {
      console.log(data);
      Alert.alert('Promenade saved')
      ctx.props.navigation.navigate('À venir');
    }).catch(function (err) {
      console.log(err)
    })
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

    Location.watchPositionAsync({ distanceInterval: 5 },
      (location) => {
        this.setState({
          currentlatitude: location.coords.latitude,
          currentlongitude: location.coords.longitude
        });
      }
    );
  }

  dureeChange(value: string) {
    this.setState({
      duree: value
    });
  }
  warningChange(value: string) {
    this.setState({
      warning: value
    })
  }

  render() {
    console.log('herrreeee', this.state.chosenDate)
    const geoloca = { description: 'Ma location', geometry: { location: { lat: this.state.currentlatitude, lng: this.state.currentlongitude } } };
    if (!this.props.user.token) {
      return (<Signin navigation={this.props.navigation} />)
    } else {
      return (

        <Container >

          <Content style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Thumbnail square
                large
                source={{ uri: this.props.user.avatar }} >
              </Thumbnail>
              <Text>{this.props.user.name} & {this.props.user.dog1}</Text>
            </View>

            <Text style={styles.title}>
              Lieu:
          </Text>


            <GooglePlacesAutocomplete
              placeholder="Search"
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed="auto" // true/false/undefined
              fetchDetails={true}
              renderDescription={row => row.description} // custom description render
              onPress={(data, details = null) => {
                this.setAdress(data, details)
                console.log('DATA____-----', data);
                console.log('DETAILS------', details);
              }}
              getDefaultValue={() => {
                return ''; // text input default value
              }}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyAZEThpr4uj3OwmjvrgNY1uu7oAIaEoUHM',
                language: 'fr', // language of the results
                types: 'geocode', // default: 'geocode'
              }}
              styles={{
                description: {
                  fontWeight: 'bold',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
              currentLocationLabel="Current location"
              predefinedPlaces={[geoloca]}
              nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GoogleReverseGeocodingQuery={{
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }}
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                types: 'park',
              }}
              filterReverseGeocodingByTypes={[
                'locality',
                'administrative_area_level_3',
              ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

              debounce={200}
            />


            <Text style={styles.title}>
              Quand:
          </Text>
            <View style={{ flex: 1, marginTop: 10, marginLeft: 10 }}>
              <DatePicker
                style={{ width: 200 }}
                date={this.state.chosenDate}
                mode="date"
                placeholder="Date"
                format="DD/MM/YYYY"
                minDate=" / / "
                maxDate=" / / "
                confirmBtnText="Confirmer"
                cancelBtnText="Annuler"
                showIcon={false}
                onDateChange={(date) => { this.setState({ chosenDate: date }) }}
              />
            </View>
            {/* <Text>
              Date: {this.state.chosenDate.toString().substr(4, 12)}
            </Text> */}
            <Text style={styles.title}>
              Durée approximative:
            </Text>

            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="select time"
                // placeholderStyle={{ color: "#bfc6ea" }}
                // placeholderIconColor="#007aff"
                selectedValue={this.state.duree}
                onValueChange={this.dureeChange.bind(this)}
              >
                <Picker.Item label="<= 1h" value="<= 1h" />
                <Picker.Item label="1h - 2h" value="1h - 2h" />
                <Picker.Item label=">= 2h" value=">= 2h" />
              </Picker>
            </Item>


            <Text style={styles.title}>
              Description:
            </Text>
            <Item>

              <Input onChangeText={(e) => this.setState({ description: e })} placeholder="blabla blabla" />
            </Item>
            <Text style={styles.title}>
              Warning:
            </Text>
            <Form>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Select your options"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                style={{ width: undefined }}
                selectedValue={this.state.warning}
                onValueChange={this.warningChange.bind(this)}
              >
                <Picker.Item label="ladies only" value="ladies only" />
                <Picker.Item label="puppy" value="puppy" />

              </Picker>
            </Form>



          </Content>


          <Footer>
            <FooterTab>
              <Button transparent primary onPress={this.AddaPromenade}>
                <Icon name='paw' />
                <Text>Valider</Text>
              </Button>
            </FooterTab>
          </Footer>


        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 50
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 8
  },
  button: {
    color: 'white',
    width: 200
  },

});

function mapStateToProps(state) {
  return { user: state.userData }
}

export default connect(
  mapStateToProps,
  null
)(AddPromenade);



