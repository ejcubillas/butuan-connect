'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Platform
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';

const QRScanner = (props) => {
  
  return (
    <Modal isVisible={props.isVisible}
      // backdropColor="#fff"
      // hasBackdrop={false}
      backdropTransitionInTiming={0}
      style={{padding: 0, margin: 0}}
      onBackButtonPress={() => { props.close() }}
      animationIn="slideInRight"
      animationOut="bounceOut"
    >
      <QRCodeScanner
        fadeIn={false}
        onRead={(e) => {
          // alert('AYAY');
          props.success(e.data);
        }}
        cameraStyle={{
          height: '100%'
        }}
        showMarker={true}
        // flashMode={RNCamera.Constants.FlashMode.a}
        topContent={
          <TouchableOpacity
            onPress={() => { props.close() }}
          >
            <Icon
              name="arrow-back"
              style={styles.backIcon}
              color="#fff"
              size={30}
            />
          </TouchableOpacity>
          
        }
        topViewStyle={{
          position: 'absolute',
          zIndex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          paddingTop: (Platform.OS == 'ios') ? 30 : 0
        }}

        // bottomViewStyle={{position:'absolute'}}
        
      />
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
    color: '#fff',
    zIndex: 10
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  
});

export default QRScanner;
