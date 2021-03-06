import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Text, StatusBar, Dimensions, ScrollView } from 'react-native';
import { stylesMain } from '../../styles/main';
import { Input, Button, Link, TextRegular } from '../../components/ui';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import AutoHeightImage from 'react-native-auto-height-image';
// Redux
import { useDispatch, useSelector } from '../../store/store';
import { setName, loginIndividual, setFullName} from '../../store/slices/user';


// components
import AccountTypeSelection from './AccountTypeSelection';
import ProgressOverlay from '../../components/progress-overlay';
import AlertModal from '../../components/ui/modal/Alert';

const windowWidth = Dimensions.get('window').width;

const Auth = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  })

  const [showAccountSelection, setShowAccountSelection] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [alertModal, setAlertModal] = useState({
    show: false,
    content: '',
    type: 'error' // or success
  });
  const [onProgressHide, setOnProgressHide] = useState({
    showAlert: () => {}
  })

  const user = useSelector((state) => state.user);
  
  const checkError = () => {
    let onError = false;
    if (username === '' || password === '') {
      setErrors({
        ...errors,
        username: (username == '') ? 'This field is required.' : '',
        password: (password == '') ? 'This field is required.' : '',
      })
      onError = true;
    }
    return onError;
  }

  const userLogin = async () => {

    const error = checkError();
    
    if (error) {
      return;
    }

    setShowProgress(true)
    dispatch(loginIndividual(username, password))
      .then(loginRes => {
        // setOnProgressHide({showAlert: () => {}})
        // setShowProgress(false)
      })
      .catch(errorMsg => {
        setOnProgressHide({showAlert: () => {
          setAlertModal({
            show: true,
            type: 'error',
            content: errorMsg
          })
        }})
        setShowProgress(false)
      })

   
  }

  return (
    <ScrollView style={[{padding: 0, marginTop: -30, paddingBottom: 40}]}>
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
          label="Your username"
          placeholder="Username"
          value={username}
          onChangeText={(val) => {
            if (val != '') {
              setErrors({
                ...errors,
                username: ''
              });
            }
            setUsername(val);
          }}
          leftIcon={<Icon name="person"/>}
          errorMessage={errors.username}
        />
        <Input
          label="Password"
          secureTextEntry={true}
          placeholder="*******"
          value={password}
          onChangeText={(val) => {
            if (val != '') {
              setErrors({
                ...errors,
                password: ''
              });
            }
            setPassword(val);
          }}
          leftIcon={<Icon name="lock"/>}
          errorMessage={errors.password}
        />
        
        <View style={{marginTop: 20, marginBottom: 20}}>
          <Button
            title="LOGIN"
            type="primary"
            onPress={userLogin}
          />
        </View>
        
      </View>
      <View style={{alignItems: 'center', marginTop: 5}}>
        <Link
            title="Login as Establishment"
            onPress={() => {
              // setShowAccountSelection(!showAccountSelection);
              props.navigation.navigate('LoginEstablishment', {})
            }}
          />
      </View>
      <View style={{alignItems: 'center', marginTop: 5, marginBottom: 20}}>
        <Link
          title="No account yet? Register here!"
          onPress={() => {
            // setShowAccountSelection(!showAccountSelection);
            props.navigation.navigate('RegisterIndividualPersonalInfo', {})
          }}
        />
      </View>
      
        
      {/* 
        // SELECT - REGISTER AS INDIVIDUAL or ESTABLISHMENT
        //
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
      /> */}

      <ProgressOverlay
        isVisible={showProgress}
        onModalHide={onProgressHide.showAlert}
      />
      <AlertModal
        isVisible={alertModal.show}
        type={alertModal.type}
        content={alertModal.content}
        handleClose={() => setAlertModal({...alertModal, show: false})}
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
    paddingTop: 0,
    paddingHorizontal: 20
  }
})
