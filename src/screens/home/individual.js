import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, StatusBar, Image } from 'react-native';
import { TextRegular } from '../../components/ui';
import { Icon } from 'react-native-elements';
// import QRCode from 'react-native-qrcode-svg';
import AutoHeightImage from 'react-native-auto-height-image';

// Redux
import { useDispatch, useSelector } from '../../store/store';
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
  const user = useSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent"/>
      <AutoHeightImage width={windowWidth} source={require('../../img/header-2.png')} />
      <View style={styles.headerTitleContainer}>
        <View style={styles.headerTitle}>
          <Text style={{color: colors.primary}}>BUTUAN CONNECT</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center', marginTop: (windowWidth/2.3)*-1}}>
          <View style={{ position: 'relative' }}>
            <Image
              source={{
                uri: user.profileImage
              }}
              style={{
                width: windowHeight/4.5,
                height: windowHeight/4.5,
                borderRadius: windowHeight/4.5,
                borderWidth: 5,
                borderColor: '#fff'
              }}
            />
            <View style={styles.accountVerifiedIcon}>
              <Icon
                name="check-circle"
                color={colors.primary}
                size={35}
              />
            </View>
          </View>
          <TextRegular style={styles.name}>{user.fullName}</TextRegular>
        </View>
        <View 
          onLayout={(event) => setQRSize(event.nativeEvent.layout.height-10)}
          style={styles.qrContainer}>
            <Image
              source={{
                uri: user.qrcode
              }}
              style={{
                width: qrSize,
                height: qrSize,
                borderColor: colors.primary,
                borderWidth: 5
              }}
            />
        </View>
        <View style={{ flex: 1 }}>
            <HomeMenu/>
        </View>
      </View>

      <QRScanner
        isVisible={showScanner}
        close={() => {
          setShowScanner(false);
          // setShowResult(true);
        }}
        success={(data) => {
          console.log(data);
          setShowScanner(false);
          // setShowResult(true);
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
  name: {
    fontSize: 18,
    paddingHorizontal: 15,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'OpenSans-SemiBold'
  },

  qrContainer: {
    alignItems: 'center',
    marginTop: 15,
    flex: 1
  },

  headerTitleContainer: {
    position: 'absolute',
    marginTop: 35,
    width: '100%',
    alignItems: 'center'
  },

  headerTitle: {
    backgroundColor: '#fff',
    padding: 2,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 5
  },

  accountVerifiedIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#fff',
    borderRadius: 35
  },

  container: {
    padding: 0,
    backgroundColor: colors.bg,
    flex: 1
  }
})
