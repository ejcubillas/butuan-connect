'use strict';

import React, { useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Image,
  Dimensions,
  StatusBar
} from 'react-native';
import moment from 'moment-timezone';
import * as Animatable from 'react-native-animatable';
import AutoHeightImage from 'react-native-auto-height-image';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Button, TextHeading, TextRegular, TextSubHeading } from '../ui';
import Warning from '../../icons/warning.svg';
import ProfilePicture from '../profile-picture';
import colors from '../../styles/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ScanResultIndividual = (props) => {
  if (!props.data) return null;
  const [profileMarginTop, setProfileMarginTop] = useState(0)
  
  return (
    <Modal isVisible={props.isVisible}
      // backdropColor="#fff"
      hasBackdrop={false}
      backdropTransitionInTiming={0}
      style={{ margin: 0, backgroundColor: '#fff', justifyContent: 'flex-start'}}
      onBackButtonPress={() => { props.handleClose() }}
      animationIn="bounceIn"
      animationOut="bounceOut"
      
    >
      <AutoHeightImage width={windowWidth} source={require('../../img/header-2.png')}  style={{marginTop: -32 }} />
     
      {
        (props.data.status == 'INVALID') ? 
          <>
            <StatusBar backgroundColor='rgba(255,255,255,0.8)'/>
            <View style={{ position: 'absolute', backgroundColor: 'rgba(255,255,255,0.8)', width: '100%', padding: 15, alignItems: 'center', zIndex: 9}}
              onLayout={(e) => {
                console.log('PROFILE MARGIN');
                // console.log();
                setProfileMarginTop(e.nativeEvent.layout.height/2);
              }}
            >
              <AutoHeightImage
                source={require('../../img/invalid.png')}
                width={windowWidth-40}
                style={{marginBottom: 15}}
              />
              <TextSubHeading style={{textAlign: 'center', color: colors.error}}>{props.data.msg}</TextSubHeading>    
            </View>
          </> : null
           
      }
      
      <ProfilePicture uri={props.data.profile.picture} style={{marginTop: (props.data.status == 'INVALID') ? ((windowWidth/2.3)*-1)+100 : (windowWidth/2.3)*-1}}/>
      <View style={{padding: 20, paddingHorizontal: 70 }}>
        <TextHeading style={{textAlign: 'center', marginBottom: 20, marginTop: 10}}>{props.data.profile.fullname}!</TextHeading>
        <TextRegular style={styles.centerText}>{props.data.log.date}</TextRegular>
        <TextRegular style={styles.centerText}>{props.data.log.time}</TextRegular>
        <TextRegular style={styles.centerText}>{props.data.establishment}</TextRegular>
        <TextRegular style={styles.centerText}>{props.data.profile.place}</TextRegular>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', padding: 30}}>
        <View>
          <Button
            title="CLOSE"
            onPress={props.handleClose}
            type={(props.data.status == 'INVALID') ? 'error' : 'primary'}
          />
        </View>
      </View>
      
    </Modal>
    
  );
  
}

const styles = StyleSheet.create({
  centerText: {
    // flex: 1,
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 2,
    color: '#777',
    // zIndex: 9
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
});

export default ScanResultIndividual;
