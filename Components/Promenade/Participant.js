import React from 'react';
import {View, Text} from 'react-native';
import {Thumbnail} from 'native-base'

// --composant affiché quand on clique veut voir les participants

export default class Participant extends React.Component{
    render(){
        return(<View>
            <Thumbnail style={{marginLeft:15,marginTop:10}}square source={{uri:this.props.avatar}} />
            <Text> {this.props.username} </Text>
        </View>)
     }
}

