import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Text} from 'react-native';
import { stylesMain } from '../../../../styles/main';
import { Input, Button, Link } from '../../../../components/ui';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setName, login } from '../../store/slices/user';

// components
// import AccountTypeSelection from './AccountTypeSelection';

const PersonalInfo = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');


  useEffect(() => {
    // dispatch(login('ej', 'password')())
  }, [dispatch])

  return (
    <View style={[stylesMain.container]}>
      
      <View style={[styles.form]}>
        <Input
          // label="Username"
          placeholder="First Name"
          value={username}
          onChangeText={(val) => {
          
          }}
        />

        <Input
          // label="Username"
          placeholder="Middle Name (Optional)"
          value={username}
          onChangeText={(val) => {
          
          }}
        />
        
        <Input
          // label="Username"
          placeholder="Last Name"
          value={username}
          onChangeText={(val) => {
          
          }}
        />

        <Input
          // label="Username"
          placeholder="Gender"
          value={username}
          onChangeText={(val) => {
          
          }}
        />

        <Input
          // label="Username"
          placeholder="Birth Date"
          value={username}
          onChangeText={(val) => {
          
          }}
        />

        <Input
          // label="Username"
          placeholder="Barangay"
          value={username}
          onChangeText={(val) => {
          
          }}
        />

        <View style={{marginTop: 20}}>
          <Button
            title="NEXT"
            type="primary"
            onPress={() => {
              props.navigation.navigate('RegisterIndividualAccountInfo')
            }}
          />
        </View>
        
      </View>
      
      
      

      
    </View>
  )
}

export default PersonalInfo;

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
