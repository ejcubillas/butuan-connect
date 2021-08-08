import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Button } from './src/components/ui'
import { NavigationContainer } from '@react-navigation/native';
// Routes
import AuthStack from './src/navigation/auth';
import IndividualStack from './src/navigation/individual';
import EstablishmentTab from './src/navigation/establishment';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { login } from './src/store/slices/user';

const Main = () => {
  return (
    
    <Button
      title={`asd ${useSelector((state) => state.user.firstName)}`}
      onPress={() => {
        dispatch(login('ej', 'password'))
      }}
    />
  
)
}

const App = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500)
  }, [])

  useEffect(() => {
    // login('ej', 'password')
    console.log(loggedIn)
  }, [loggedIn])

  return (
    <>
      <StatusBar
        backgroundColor='#fff'
        barStyle="dark-content"
        translucent={true}
        // hidden={true}
      />
      <NavigationContainer>
        {(loggedIn) ? <IndividualStack/> : <AuthStack />}
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
