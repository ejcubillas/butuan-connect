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
import { ListContainer } from '../../components/ui'

const ScanResultIndividual = (props) => {
  
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
              color="#222"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: 'center', marginTop: 20}}>
        <Animatable.Image
          // animation='swing'
          source={require('../../img/individual.jpg')}
          style={{
            width: 200,
            height: 200,
            borderRadius: 100
          }}
        />
      </View>
      <View style={{flex: 1, marginTop: 20}}>
         
        <ListContainer style={styles.listContainer}>
          <Text>Date/Time</Text>
          <Text>{moment().tz('Asia/Manila').format('DD MMM YYYY - h:m A')}</Text>
        </ListContainer>
        <ListContainer style={styles.listContainer}>
          <Text>Name</Text>
          <Text>Ernest Jay Cubillas</Text>
        </ListContainer>
        <ListContainer style={styles.listContainer}>
          <Text>Barangay</Text>
          <Text>Libertad</Text>
        </ListContainer>
        <ListContainer style={styles.listContainer}>
          <Text>Enter</Text>
          <Text>Block 123 Lot 23 Northtown, Libertad</Text>
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
