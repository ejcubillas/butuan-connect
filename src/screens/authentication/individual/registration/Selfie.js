import React, { useState, useEffect, useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import { stylesMain } from '../../../../styles/main';
import { Input, Button, Link, TextSubHeading } from '../../../../components/ui';
import { RNCamera } from 'react-native-camera';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import PhotoRequirement from '../../../../components/photo-requirement';
// components
// import AccountTypeSelection from './AccountTypeSelection';

const Selfie = (props) => {
  const camera = useRef(null);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const openCamera = () => {
    launchCamera({
      cameraType: 'front',
      saveToPhotos: false,
      maxHeight: 500,
      maxHeight: 500,
      mediaType: 'photo'
    }, (data) => {
      if (!data.didCancel) {
        console.log(data.assets);
        setImage(data.assets[0])
      }
    })
  }

  const removeImage = () => {
    setImage(null);
    openCamera();
  }

  return (
    <ScrollView style={[stylesMain.container]}>
      {
        (image == null) ? 
          <TouchableOpacity style={{alignItems: 'center'}}
            onPress={openCamera}
          >
            <Animatable.Image
              animation='rubberBand'
              source={require('../../../../img/camera.png')}
              style={{
                width: 250,
                height: 250,
                opacity: 0.5
                // borderRadius: 100
              }}
            />

            <TextSubHeading style={{marginTop: 20}}>Tap to take a shot</TextSubHeading>
          </TouchableOpacity>
          :
          <View style={{alignItems: 'center'}}>
            <Animatable.Image
              animation='rubberBand'
              source={{uri: (image.uri) ? image.uri : ''}}
              style={{
                width: 250,
                height: 250,
                // opacity: 0.5
                borderRadius: 250
              }}
            />
            <TouchableOpacity
              onPress={removeImage}
            >
              <TextSubHeading style={{marginTop: 20}}>Capture again?</TextSubHeading>
            </TouchableOpacity>
          </View>

      }
      
      <PhotoRequirement/>
      
      {
        (image !== null) ? 
        <View style={{marginTop: 40, marginBottom: 40}}>
          <Button
            title="NEXT"
            type="primary"
            onPress={() => {
              props.navigation.navigate('RegisterIndividualAccountInfo')
            }}
          />
          
        </View>
        : null
      }
      
    </ScrollView>
  )
}

export default Selfie;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    // paddingBottom: 40
  },
  form: {
    // paddingVertical: 15,
    // flex: 3,
    // marginTop: 40
    // justifyContent: 'center'
  }
})
