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
import * as Animatable from 'react-native-animatable';
import moment from 'moment-timezone';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { ListContainer } from '../../components/ui'

const ScanResultEstablishment = (props) => {
  
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
          animation='rubberBand'
          source={require('../../img/establishment.png')}
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
          <Text>Enter</Text>
          <Text>SM City Butuan</Text>
        </ListContainer>
        <ListContainer style={styles.listContainer}>
          <Text>Address</Text>
          <Text>J C Aquino Ave, Butuan City</Text>
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

export default ScanResultEstablishment;
