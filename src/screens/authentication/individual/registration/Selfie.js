import React, { useState, useEffect, useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, PermissionsAndroid, Platform} from 'react-native';
import { stylesMain } from '../../../../styles/main';
import { Input, Button, Link, TextSubHeading } from '../../../../components/ui';
import { RNCamera } from 'react-native-camera';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import PhotoRequirement from '../../../../components/photo-requirement';
import SelfieIcon from '../../../../icons/selfie.svg';
import { AlertModal } from '../../../../components/ui/modal';

const Selfie = (props) => {
  const camera = useRef(null);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [alertModal, setAlertModal] = useState({
    isVisible: false,
    type:'error',
    content: ''
  })
  const openCamera = async () => {
    if (Platform.OS === 'ios') {
      launchCamera({
        cameraType: 'front',
        saveToPhotos: false,
        maxHeight: 500,
        maxHeight: 500,
        mediaType: 'photo',
        includeBase64: true
      }, (data) => {
        // console.log(data);
        if (!data.didCancel) {
          console.log(data.assets);
          setImage(data.assets[0])
        }
      })
    }else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Butuan Connect Camera Permission",
            message:
              "Butuan Connect needs access to your camera " +
              "so you can take picture.",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          launchCamera({
            cameraType: 'front',
            saveToPhotos: false,
            maxHeight: 500,
            maxHeight: 500,
            mediaType: 'photo',
            includeBase64: true
          }, (data) => {
            if (!data.didCancel) {
              console.log(data.assets);
              setImage(data.assets[0])
            }
          })
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
    
    
  }

  const removeImage = () => {
    setImage(null);
    openCamera();
  }

  const nextScreen = () => {

    if (!image) {
      setAlertModal({
        isVisible: true,
        content: 'Your photo is required.',
        type: 'error'
      })
      return;
    }

    props.navigation.navigate('RegisterIndividualAccountInfo', {
      ...props.route.params,
      selfie: 'data:image/png;base64,' + image.base64
    })
  }

  return (
    <ScrollView style={[stylesMain.container]}>
      {
        (image == null) ? 
          <TouchableOpacity style={{alignItems: 'center'}}
            onPress={openCamera}
          >
            <SelfieIcon height={250} width={250}/>
            {/* <Animatable.Image
              animation='rubberBand'
              source={require('../../../../img/camera.png')}
              style={{
                width: 250,
                height: 250,
                opacity: 0.5
                // borderRadius: 100
              }}
            /> */}

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
            onPress={nextScreen}
          />
          
        </View>
        : null
      }
      
      <AlertModal
        isVisible={alertModal.isVisible}
        type={alertModal.type}
        content={alertModal.content}
        handleClose={() => {
          setAlertModal({
            isVisible: false,
            type: 'error',
            content: ''
          })
        }}
      />
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
