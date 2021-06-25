import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Text} from 'react-native';
import { stylesMain } from '../../styles/main';
import { Input, Button, Link } from '../../components/ui';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setName, login } from '../../store/slices/user';

// components
import AccountTypeSelection from './AccountTypeSelection';

const Auth = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAccountSelection, setShowAccountSelection] = useState(false);


  useEffect(() => {
    // dispatch(login('ej', 'password')())
  }, [dispatch])

  return (
    <View style={[stylesMain.container]}>
      <View style={[styles.header]}>
        <Text style={[stylesMain.textHeader]}>Welcome!</Text>
        <Text style={[stylesMain.textSubHeader]}>Login to your account</Text>
      </View>
      

      <View style={[styles.form]}>
        <Input
          // label="Username"
          placeholder="Username"
          value={username}
          onChangeText={(val) => {
            setUsername(val)
          }}
        />
        <Input
          // label="Password"
          secureTextEntry={true}
          placeholder="******"
          value={password}
          onChangeText={(val) => {
            setPassword(val);
          }}
        />
        
        <View style={{marginTop: 20}}>
          <Button
            title="LOGIN"
            type="primary"
            onPress={() => {
              dispatch(login('ej', 'password'))
            }}
          />
        </View>
        
      </View>
      
      <View style={{alignItems: 'center'}}>
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
    </View>
  )
}

export default Auth;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    // paddingBottom: 40
  },
  form: {
    paddingVertical: 15,
    flex: 3,
    marginTop: 40
    // justifyContent: 'center'
  }
})
