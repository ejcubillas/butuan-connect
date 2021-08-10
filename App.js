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
// Routes
import AuthStack from './src/navigation/auth';
import IndividualStack from './src/navigation/individual';
import EstablishmentTab from './src/navigation/establishment';
import Splash from './src/screens/Splash';
// redux
import { useDispatch, useSelector } from './src/store/store';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [screen, setScreen] = useState(<Splash />)

  useEffect(() => {
    SplashScreen.hide();

    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      console.log("Is Reachable?", state.isInternetReachable); // if maka connect sa internet
    });
  }, [])

  useEffect(() => {
    // login('ej', 'password')
    if (user.loggedIn) {
      if (user.userType == 'individual') {
        setScreen(<IndividualStack/>);
      }else if (user.userType == 'establishment') {
        setScreen(<EstablishmentTab/>);
      }else {
        setScreen(<AuthStack/>);
      }
    }else {
      setScreen(<Splash />);
      setTimeout(() => {
        setScreen(<AuthStack/>);
      }, 500)
      
    }

  }, [user.loggedIn])


  // return screen;

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
