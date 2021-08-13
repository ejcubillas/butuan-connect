import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Text, StatusBar, Dimensions, ScrollView } from 'react-native';
import { stylesMain } from '../../../styles/main';
import { Input, Button, Link, TextRegular, TextLabel } from '../../../components/ui';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import AutoHeightImage from 'react-native-auto-height-image';
import { Picker } from '@react-native-picker/picker';
// Redux
import { useDispatch, useSelector } from '../../../store/store';

// components
import ProgressOverlay from '../../../components/progress-overlay';
import AlertModal from '../../../components/ui/modal/Alert';
import { loginEstablishment } from '../../../store/slices/user';

const windowWidth = Dimensions.get('window').width;

const LoginEstablishment = (props) => {

  // props.navigation.setOptions({
  //  headerStyle: {
  //   //  backgroundColor: 'transparent'
  //  },
  //  title: ''
  // })

  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logType, setLogType] = useState(1); // 0 for exit
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    logType: '',
    
  })

  const [showAccountSelection, setShowAccountSelection] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [alertModal, setAlertModal] = useState({
    show: false,
    content: '',
    type: 'error' // or success
  });


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
    dispatch(loginEstablishment(username, password, logType))
      .then(loginRes => {
        setShowProgress(false)
      })
      .catch(errorMsg => {
        setShowProgress(false)
        setAlertModal({
          show: true,
          type: 'error',
          content: errorMsg
        })
      })

   
  }

  return (
    <ScrollView style={[stylesMain.container, {padding: 0}]}>
      <StatusBar backgroundColor="transparent"/>
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

        <TextLabel>Log Type</TextLabel>
        <View style={{
          borderBottomColor: '#999',
          borderBottomWidth: 1,
          marginHorizontal: 10,
          marginBottom: 25,
          // marginTop: -5,
        }}>
          <Picker
            mode="dropdown"
            style={{ marginHorizontal: -12, backgroundColor: '#fff', padding: 0}}
            selectedValue={logType}
            onValueChange={(val, index) => setLogType(val)}>
              <Picker.Item label="Entrance" value={1} style={stylesMain.pickerItemStyle}/>
              <Picker.Item label="Exit" value={0} style={stylesMain.pickerItemStyle}/>
          </Picker>
        </View>
        
        <View style={{marginTop: 20, marginBottom: 20}}>
          <Button
            title="LOGIN"
            type="primary"
            onPress={userLogin}
          />
        </View>
        
      </View>

      <ProgressOverlay
        isVisible={showProgress}
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

export default LoginEstablishment;

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
