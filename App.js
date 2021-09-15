import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import SplashScreen from 'react-native-splash-screen';
import { Button } from './src/components/ui'
import { NavigationContainer } from '@react-navigation/native';
import Toast, { BaseToast } from 'react-native-toast-message';
// Routes
import AuthStack from './src/navigation/auth';
import IndividualStack from './src/navigation/individual';
import EstablishmentStack from './src/navigation/establishmentTraceStack';
import Splash from './src/screens/Splash';
// redux
import { useDispatch, useSelector } from './src/store/store';
import { setNetworkInfo } from './src/store/slices/network';
import { syncScannedIndividual, syncScannedEstablishment } from './src/store/slices/tracing';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [screen, setScreen] = useState(<Splash />)
  const tracing = useSelector((state) => state.tracing);
  const network = useSelector((state) => state.network);

  useEffect(() => {
    SplashScreen.hide();
    NetInfo.addEventListener(state => dispatch(setNetworkInfo(state)));
  }, [])

  useEffect(() => {
    console.log(network);
    if (network.isInternetReachable == true) {
      console.log(network.isInternetReachable, 'NETWORK');
      if (tracing.offlineScan.length > 0 || tracing.estabOfflineScan.length > 0) {
        // show progress toast
        Toast.show({
          type: 'info',
          text1: 'Syncing',
          position: 'bottom',
          text2: 'Syncing scanned QR codes...',
          // text2: 'This is some something 👋'
        });
      }
      dispatch(syncScannedIndividual())
        .then(syncRes => {
          Toast.show({
            type: 'success',
            text1: 'Successful!',
            position: 'bottom',
            text2: 'Successfully synced the scanned QR codes.',
          });
        })
        .catch(syncErr => {
          if (syncErr.status !== 'NORECORDS') {
            Toast.show({
              type: 'error',
              text1: 'Sync Error!',
              position: 'bottom',
              text2: syncErr.message,
            });
          }
        })

      dispatch(syncScannedEstablishment())
        .then(syncRes => {
          Toast.show({
            type: 'success',
            text1: 'Successful!',
            position: 'bottom',
            text2: 'Successfully synced the scanned QR codes.',
          });
        })
        .catch(syncErr => {
          if (syncErr.status !== 'NORECORDS') {
            Toast.show({
              type: 'error',
              text1: 'Sync Error!',
              position: 'bottom',
              text2: syncErr.message,
            });
          }
        })
    }
  }, [network.isInternetReachable])

  useEffect(() => {
    // login('ej', 'password')
    if (user.loggedIn) {
      if (user.userType == 'individual') {
        setScreen(<IndividualStack/>);
      }else if (user.userType == 'establishment') {
        setScreen(<EstablishmentStack/>);
      }else {
        setScreen(<AuthStack/>);
      }
    }else {
      // just for loading for 500ms
      setScreen(<Splash />);
      setTimeout(() => {
        setScreen(<AuthStack/>);
      }, 500)
      
    }

  }, [user.loggedIn])

  return (
    <>
      <StatusBar
        backgroundColor='#fff'
        barStyle="dark-content"
        translucent={true}
        // hidden={true}
      />
      <NavigationContainer>
        {screen}
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  )

  
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
