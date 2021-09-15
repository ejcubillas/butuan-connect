import React, { useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import Sound from 'react-native-sound';
// Redux
// components
import * as Animatable from 'react-native-animatable';
import { InfoModal, Link, TextRegular, TextSubHeading, TextLabel, Button, TextHeading } from '../ui';
import { ShadowPropTypesIOS } from 'react-native';
// icons
import Checked from '../../icons/checked.svg';

const success = new Sound('preview.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});
// OFFLINE RESULT
const ScanResult = (props) => {
  useEffect(() => {
    if (props.isVisible) {
      success.play();
    }
  }, [props.isVisible])
  return (
    

      <InfoModal
        isVisible={props.isVisible}
        toggle={props.handleClose}
      >
        <View style={styles.container}>
          <Animatable.View 
            animation="rubberBand"
            delay={500}
            style={styles.iconContainer}>
            <Checked/>
          </Animatable.View>
          
          <View style={styles.textContainer}>
            <TextHeading>Yay!</TextHeading>
            {/* <TextSubHeading style={{textAlign: 'center', fontSize: 16, marginTop: 20}}>Thank you for using Butuan Connect.</TextSubHeading> */}
            <TextRegular style={{textAlign: 'center', marginTop: 20}}>Thank you for using Butuan Connect. Stay safe!</TextRegular>
          </View>
          
        </View>
        
      </InfoModal>
 
      
  )
}

export default ScanResult;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    justifyContent: 'space-between'
    // alignItems: 'center'
  },

  textContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 50
  },

  iconContainer: {
    padding: 20,
    flex: 1
  }


})
