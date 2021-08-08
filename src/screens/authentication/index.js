import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Text, StatusBar, Dimensions, ScrollView } from 'react-native';
import { stylesMain } from '../../styles/main';
import { Input, Button, Link } from '../../components/ui';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import AutoHeightImage from 'react-native-auto-height-image';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setName, login } from '../../store/slices/user';

// components
import AccountTypeSelection from './AccountTypeSelection';
import ProgressOverlay from '../../components/progress-overlay';

const windowWidth = Dimensions.get('window').width;

const Auth = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAccountSelection, setShowAccountSelection] = useState(false);
  const [showProgress, setShowProgress] = useState(false)

  useEffect(() => {
    // dispatch(login('ej', 'password')())
  }, [dispatch])

  return (
    <ScrollView style={[stylesMain.container, {padding: 0, marginTop: -30}]}>
      <StatusBar backgroundColor="transparent"/>
      <View style={[styles.header]}>
        <AutoHeightImage
          source={require('../../img/header-2.png')}
          width={windowWidth}
        />
        {/* <Text style={[stylesMain.textHeader]}>Welcome!</Text> */}
        {/* <Text style={[stylesMain.textSubHeader]}>Login to your account</Text> */}
      </View>
      
      

      <View style={[styles.form]}>
        <Input
          // label="Your Username"
          placeholder="Username"
          value={username}
          onChangeText={(val) => {
            setUsername(val)
          }}
          leftIcon={<Icon name="person"/>}
        />
        <Input
          // label="Password"
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={(val) => {
            setPassword(val);
          }}
          leftIcon={<Icon name="lock"/>}
        />
        
        <View style={{marginTop: 20, marginBottom: 20}}>
          <Button
            title="LOGIN"
            type="primary"
            onPress={() => {
              setShowProgress(true);
              setTimeout(() => {
                // setShowProgress(false);
                dispatch(login('ej', 'password'))
              }, 2000)
              
            }}
          />
        </View>
        {/* <View style={{alignItems: 'center', marginTop: 15}}>
        <Link
          title="Forgot Password?"
          onPress={() => {
            setShowAccountSelection(!showAccountSelection);
          }}
        />
          
        </View> */}
        
      </View>
      <View style={{alignItems: 'center', marginTop: 5}}>
      <Link
            title="Login as Establishment"
            onPress={() => {
              setShowAccountSelection(!showAccountSelection);
            }}
          />
      </View>
      <View style={{alignItems: 'center', marginTop: 5}}>
        <Link
          title="No account yet? Register here!"
          onPress={() => {
            setShowAccountSelection(!showAccountSelection);
          }}
        />
      </View>
      

      <AccountTypeSelection
        isVisible={showAccountSelection}
        onPress={(type) => {
          console.log('go to');
          if (type == 'individual') {
            setShowAccountSelection(!showAccountSelection)
            props.navigation.navigate('RegisterIndividualPersonalInfo', {})
            
          }else if (type == 'individual') {
            setShowAccountSelection(!showAccountSelection)
            props.navigation.navigate('RegisterEstablishmentPersonalInfo', {})
          }else {
            setShowAccountSelection(!showAccountSelection)
          }
        }}
        toggle={() => {
          setShowAccountSelection(!showAccountSelection)
        }}
      />

      <ProgressOverlay
        isVisible={showProgress}
      />
    </ScrollView>
  )
}

export default Auth;

const styles = StyleSheet.create({
  header: {
    // marginTop: -15,
    justifyContent: 'flex-start',
  },
  form: {
    paddingTop: 15,
    paddingHorizontal: 20
  }
})
