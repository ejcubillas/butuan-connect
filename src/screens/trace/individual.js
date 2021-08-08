import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Text, ScrollView, Dimensions, StatusBar, Image } from 'react-native';
import { stylesMain } from '../../styles/main';
import { ContentPlaceholder, ListContainer, Button, TextHeading, TextRegular, TextLabel } from '../../components/ui';
import { Divider, Icon } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import AutoHeightImage from 'react-native-auto-height-image';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../styles/colors';

// components
import QRScanner from '../../components/qrscanner';
import ScanResultEstablishment from '../../components/scan-result/establishment';
import HomeMenu from '../../components/home-menu';

const QRWidth = Dimensions.get('window').width * .6;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TraceIndividual = (props) => {
  const dispatch = useDispatch();
  const [showScanner, setShowScanner] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [qrSize, setQRSize] = useState(0);

  useEffect(() => {
    // dispatch(login('ej', 'password')())
  }, [dispatch])

  setTimeout(() => {
  }, 2000)

  return (

    <View style={[{padding: 0, backgroundColor: colors.bg, flex: 1}]}>
      <StatusBar backgroundColor="transparent"/>
      <AutoHeightImage
        width={windowWidth}
        source={require('../../img/header-2.png')}
      />
      <View style={{position: 'absolute', marginTop: 35, width: '100%', alignItems: 'center'}}>
        <View style={{backgroundColor: '#fff', padding: 2, paddingHorizontal: 5, borderWidth: 2, borderColor: colors.primary, borderRadius: 5}}>
          <Text style={{color: colors.primary}}>BUTUAN CONNECT</Text>
        </View>
        
      </View>
      
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center', marginTop: (windowWidth/2.3)*-1}}>
          <View style={{position: 'relative'}}>
            <Image
              source={require('../../img/profile.jpg')}
              style={{
                width: windowHeight/4.5,
                height: windowHeight/4.5,
                borderRadius: windowHeight/4.5,
                borderWidth: 5,
                borderColor: '#fff'
              }}
            />
            <View style={{position: 'absolute', right: 10, bottom: 10, backgroundColor: '#fff', borderRadius: 35}}>
              <Icon
                name="check-circle"
                color={colors.primary}
                size={35}
              />
            </View>
            
          </View>
          
          <TextRegular style={{fontSize: 18, paddingHorizontal: 15, textAlign: 'center', marginTop: 1}}>Cubillas, Ernest Jay T.</TextRegular>
        </View>
        
        <View 
          onLayout={(event) => {
            console.log(event.nativeEvent.layout.width, event.nativeEvent.layout.height);
            setQRSize(event.nativeEvent.layout.height-45);
          }}
          style={{
            // justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
            flex: 1
          }}>
            <View 
              style={{
                borderColor: colors.primary,
                borderWidth: 5,
                padding: 10,
                backgroundColor: '#fff'
              }}>
              <QRCode
                value="60d6bf9872571ae8024ab0eb"
                size={qrSize}
              />
            </View>
        </View>
        <View 
          style={{
            flex: 1,
          }}>
            <HomeMenu/>
        </View>
      </View>

      <QRScanner
        isVisible={showScanner}
        close={() => {
          setShowScanner(false);
          setShowResult(true);
        }}
        success={(data) => {
          setShowScanner(false);
          setShowResult(true);
        }}

      />

      <ScanResultEstablishment
        isVisible={showResult}
        close={() => {
          setShowResult(false)
        }}


      />
    </View>
    
  )
  
  
}

export default TraceIndividual;

const styles = StyleSheet.create({
  
})
