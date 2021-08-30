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
// import ScanResultEstablishment from '../../components/scan-result/establishment';
import HomeMenu from '../../components/home-menu';
import NetworkIndicator from '../../components/network-indicator';
import ProfilePicture from '../../components/profile-picture';

const QRWidth = Dimensions.get('window').width * .6;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TraceIndividual = (props) => {
  const dispatch = useDispatch();
  const [showScanner, setShowScanner] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [qrSize, setQRSize] = useState(0);
  const user = useSelector((state) => state.user);
  const network = useSelector((state) => state.network);

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
        <ProfilePicture uri={user.profileImage}/>
        <TextRegular style={styles.name}>{user.fullName}</TextRegular>
        <View 
          onLayout={(event) => setQRSize(event.nativeEvent.layout.height-10)}
          style={styles.qrContainer}>
            {
              (user.qrcode) ?
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
                : null
            }
            
        </View>
        <View style={{ flex: 1 }}>
            <HomeMenu/>
        </View>
        {
          (!network.isInternetReachable) ? <NetworkIndicator/> : null
        }
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

      {/* <ScanResultEstablishment
        isVisible={showResult}
        close={() => {
          setShowResult(false)
        }}
      /> */}
    </View>
  )
  
  
}

export default TraceIndividual;

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
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

  container: {
    padding: 0,
    backgroundColor: colors.bg,
    flex: 1
  }
})
