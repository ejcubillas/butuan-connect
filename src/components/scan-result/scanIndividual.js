'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Image
} from 'react-native';
import moment from 'moment-timezone';
import * as Animatable from 'react-native-animatable';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { ListContainer, TextHeading, TextRegular } from '../ui'
import colors from '../../styles/colors';

const ScanResultIndividual = (props) => {
  if (!props.data) return null;
  
  return (
    <Modal isVisible={props.isVisible}
      // backdropColor="#fff"
      hasBackdrop={false}
      backdropTransitionInTiming={0}
      style={{ margin: 0, backgroundColor: '#fff'}}
      onBackButtonPress={() => { props.close() }}
      animationIn="bounceIn"
      animationOut="bounceOut"
      
    >
      <View style={{ flexDirection: 'row', padding: 15,}}>
        <View>
          <TouchableOpacity
            onPress={() => { props.close() }}
          >
            <Icon
              name="close"
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: 'center', marginTop: 20}}>
        <Animatable.Image
          // animation='swing'
          source={{
            uri: props.data.profile.picture
          }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 100
          }}
        />
      </View>
      <View style={{padding: 20, paddingHorizontal: 70}}>
        <TextHeading style={{textAlign: 'center'}}>{props.data.msg}!</TextHeading>
        <TextRegular style={{textAlign: 'center', marginTop: 20}}>Thank you for using Butuan Connect. Stay safe!</TextRegular>
      </View>
      

      <View style={{flex: 1, marginTop: 10, padding: 10}}>
        <ListContainer style={styles.listContainer}>
          <Text>Date/Time</Text>
          <Text>{props.data.log.date} {props.data.log.time}</Text>
        </ListContainer>
        <ListContainer style={styles.listContainer}>
          <Text>Name</Text>
          <Text>{props.data.profile.fullname}</Text>
        </ListContainer>
        <ListContainer style={styles.listContainer}>
          <Text>Address</Text>
          <Text>{props.data.profile.place}</Text>
        </ListContainer>
      </View>  
    </Modal>
    
  );
  
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 20,
    color: '#777',
    zIndex: 9
  },
  backIcon: {
    flex: 1,
    // size: 20,
    padding: 20,
    // color: '#',
    zIndex: 120
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
  
});

export default ScanResultIndividual;
