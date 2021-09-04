import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Text} from 'react-native';
import { stylesMain } from '../../../../styles/main';
import { Input, Button, Link, TextRegular } from '../../../../components/ui';
import { PRIVACY_POLICY, TERMS_AND_CONDITION} from '../../../../config';
// Redux
import { useDispatch, useSelector } from '../../../../store/store';
import { register, loginIndividual } from '../../../../store/slices/user';

// components
// import AccountTypeSelection from './AccountTypeSelection';
import ProgressOverlay from '../../../../components/progress-overlay';
import AlertModal from '../../../../components/ui/modal/Alert';
import WebViewModal from '../../../../components/webview-modal';

const AccountInfo = (props) => {
  const dispatch = useDispatch();
  const [showProgress, setShowProgress] = useState(false);
  const [webViewModal, setWebViewModal] = useState({
    isVisible: false,
    uri: ''
  })
  const [alertModal, setAlertModal] = useState({
    isVisible: false,
    type: 'error',
    content: ''
  })
  const [accountInfo, setAccountInfo] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const setFields = (field, value, required = true) => {
    setAccountInfo({
      ...accountInfo,
      [field]: value
    })

    

    if (required && value == '') {
      setErrors({
        ...errors,
        [field]: 'This field is required.'
      })
    }else {
      setErrors({
        ...errors,
        [field]: ''
      })
    }

    if (field == 'confirmPassword') {
      if (value != accountInfo.password) {
        setErrors({
          ...errors,
          confirmPassword: "Password didn't match."
        })
      }else {
        setErrors({
          ...errors,
          confirmPassword: ""
        })
      }
    }

    if (field == 'password' && value != '') {
      console.log('asd');

      if (value != accountInfo.confirmPassword && accountInfo.confirmPassword != '') {
        setErrors({
          ...errors,
          confirmPassword: "Password didn't match.",
          password: ''
        })
      }else {
        setErrors({
          ...errors,
          confirmPassword: "",
          password: ''
        })
      }

      
    }
    
  }

  const checkErrors = () => {
    let onError = false;
    const errorMsg = 'This field is required.'
    if (accountInfo.username == '' ||
      accountInfo.password == '' ||
      accountInfo.confirmPassword == '') {
      onError = true; 

      setErrors({
        ...errors,
        username: (accountInfo.username == '') ? errorMsg : '',
        password: (accountInfo.password == '') ? errorMsg : '',
        confirmPassword: (accountInfo.confirmPassword == '') ? errorMsg : '',
      })
      
    } else {
      if (accountInfo.password != accountInfo.confirmPassword) {
        setErrors({
          ...errors,
          confirmPassword: "Password didn't match.",
        })
        
      }
      
    }

    return onError;
  }

  const submitRegistration = () => {
    if (checkErrors()) return;
    
    setShowProgress(true);
    dispatch(register({
      ...props.route.params,
      accountInfo
    }))
      .then(res => {
        // login
        dispatch(loginIndividual(accountInfo.username, accountInfo.password))
          .then(() => {
            // showProgress(false);

          })
          .catch(err => {
            setShowProgress(false);
            setAlertModal({
              isVisible: true,
              type: 'error',
              content: err || 'Your account was successfully created, but we are unable to log it in. Please try to login in the login page.'
            })
          })
      })
      .catch(err => {
        setShowProgress(false);
        setAlertModal({
          isVisible: true,
          type: 'error',
          content: err || 'Somethingg went wrong. Please try again.'
        })
      })
  }

  return (
    <View style={[stylesMain.container]}>
      
      <View style={[styles.form]}>
        <Input
          label="Username"
          placeholder=""
          value={accountInfo.username}
          onChangeText={(val) => setFields('username', val)}
          errorMessage={errors.username}
        />

        <Input
          label="Password"
          placeholder="******"
          value={accountInfo.password}
          onChangeText={(val) => setFields('password', val)}
          errorMessage={errors.password}
          secureTextEntry={true}
        />

        <Input
          label="Confirm Password"
          placeholder="******"
          value={accountInfo.confirmPassword}
          onChangeText={(val) => setFields('confirmPassword', val)}
          errorMessage={errors.confirmPassword}
          secureTextEntry={true}
        />
        
        <View style={{flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', paddingHorizontal: 5}}>
          <TextRegular style={{}}>By entering Butuan Connect, </TextRegular>
          <TextRegular>I </TextRegular>
          <TextRegular>agree </TextRegular>
          <TextRegular>to </TextRegular>
          <TextRegular>the </TextRegular>
          <Link
            title="Privacy Policy"
            onPress={() => {
              setWebViewModal({
                isVisible: true,
                uri: PRIVACY_POLICY
              })
            }}
          />
          <TextRegular style={{}}>, </TextRegular>
          <Link
            title="Terms and Condition"
            onPress={() => {
              setWebViewModal({
                isVisible: true,
                uri: TERMS_AND_CONDITION
              })
            }}
          />
          <TextRegular> and </TextRegular>
          <TextRegular>all </TextRegular>
          <TextRegular>information </TextRegular>
          <TextRegular>is </TextRegular>
          <TextRegular>correct. </TextRegular>
          
        </View>

        <View style={{marginTop: 20}}>
          <Button
            title="REGISTER"
            type="primary"
            onPress={submitRegistration}
          />
        </View>
        
      </View>
      
      
      
      <ProgressOverlay isVisible={showProgress} />
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
      <WebViewModal {...webViewModal} handleClose={() => setWebViewModal({...webViewModal, isVisible: false})}/>
      
    </View>
  )
}

export default AccountInfo;

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
