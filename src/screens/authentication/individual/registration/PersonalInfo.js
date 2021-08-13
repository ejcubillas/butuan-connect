import React, { useState, useEffect} from 'react';
import moment from 'moment-timezone';
import {Picker} from '@react-native-picker/picker';
import { View, StyleSheet, Text} from 'react-native';
import { Icon } from 'react-native-elements'; 
import { stylesMain } from '../../../../styles/main';
import {  Button, Link, Input, TextLabel, TextRegular } from '../../../../components/ui';
import DatePicker from '../../../../components/date-picker';
// import { Input } from 'react-native-elements';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import colors from '../../../../styles/colors';

// components
// import AccountTypeSelection from './AccountTypeSelection';

const PersonalInfo = (props) => {
  const dispatch = useDispatch();
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    suffix: '',
    birthDate: '',
    sex: '',
    contact: '',
    email: '',
    philhealth: ''
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    suffix: '',
    birthDate: '',
    sex: '',
    contact: '',
    email: '',
    philhealth: ''
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    // dispatch(login('ej', 'password')())
  }, [dispatch])

  const toggleDatePickerVisibility  = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  }

  const setFields = (fieldName, value, required = true) => {
    if (!fieldName || !value == undefined) return; 

    setPersonalInfo({
      ...personalInfo,
      [fieldName]: value
    })

    if (required) {
      if (value !== '') {
        if (fieldName == 'email') {
          let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
          if (reg.test(value) === false || value == '') {
            setErrors({
              ...errors,
              [fieldName]: 'Invalid email format.'
            })
          }else {
            setErrors({
              ...errors,
              [fieldName]: ''
            })
          }
        }else {
          setErrors({
            ...errors,
            [fieldName]: ''
          })
        }
      }else {
        setErrors({
          ...errors,
          [fieldName]: 'This field is required.'
        })
      }
      
      
    }
  }

  const checkErrors = () => {
    /// for the required fields

    let onError = false;
    const errorMsg = 'This field is required.'
    if (personalInfo.firstName == '' || 
        personalInfo.lastName == '' || 
        personalInfo.middleName == '' || 
        personalInfo.sex == '' || 
        personalInfo.birthDate== '' || 
        personalInfo.contact == '' ||
        personalInfo.email == ''
      ) {
      onError = true; 

      setErrors({
        ...errors,
        firstName: (personalInfo.firstName == '') ? errorMsg : '',
        lastName: (personalInfo.lastName == '') ? errorMsg : '',
        middleName: (personalInfo.middleName == '') ? errorMsg : '',
        sex: (personalInfo.sex == '') ? errorMsg : '',
        birthDate: (personalInfo.birthDate == '') ? errorMsg : '',
        contact: (personalInfo.contact == '') ? errorMsg : '',
        email: (personalInfo.email == '') ? errorMsg : '',
      })
    }


    if (errors.email != '') {
      onError = true; 
    }

    return onError;
  }

  const nextScreen = async () => {

    const onError = checkErrors();
    console.log(errors);
    if (!onError) {
      props.navigation.navigate('RegisterIndividualAddressInfo', {
        personalInfo
      });
    }    

    // temp
    // props.navigation.navigate('RegisterIndividualAddressInfo', {
    //   personalInfo
    // });
  }

  return (
    <ScrollView style={[stylesMain.container]}>
      <View style={{paddingHorizontal: 10, marginBottom: 15}}>
        <TextRegular>For new resisdent on brgy please fill up the following for contact tracing.</TextRegular>
      </View>
      <View style={[styles.form]}>
        
        
        <Input
          value={personalInfo.firstName}
          placeholder="Juan"
          errorMessage={errors.firstName}
          onChangeText={(val) => setFields('firstName', val)}
          label="First Name"
        />
        
        <Input
          label="Middle Name"
          
          value={personalInfo.middleName}
          onChangeText={(val) => setFields('middleName', val)}
          errorMessage={errors.middleName}
        />
        
        <Input
          value={personalInfo.lastName}
          label='Last Name'
          placeholder="Dela Cruz"
          errorMessage={errors.lastName}
          onChangeText={(val) => setFields('lastName', val)}
        />

        <Input
          label="Name Suffix (Optional)"
          placeholder="Jr/Sr/etc"
          value={personalInfo.suffix}
          onChangeText={(val) => setFields('suffix', val, false)}
          errorMessage={errors.suffix}
        />

        <TextLabel>Sex</TextLabel>
        <View style={stylesMain.pickerContainer}>
          <Picker
            mode="dropdown"
            style={{ marginHorizontal: -12, backgroundColor: '#fff', padding: 0}}
            selectedValue={personalInfo.sex}
            onValueChange={(val, index) => setFields('sex', val)}>
            <Picker.Item label="Select Sex" value=""  style={stylesMain.pickerItemPlaceholderStyle}/>
            <Picker.Item label="Male" value="M"  style={stylesMain.pickerItemStyle}/>
            <Picker.Item label="Female" value="F"  style={stylesMain.pickerItemStyle}/>
          </Picker>
        </View>
        <Text style={stylesMain.customInputError}>{errors.sex}</Text>
        <TextLabel>Birth Date</TextLabel>
        <View style={{
          borderBottomColor: '#999',
          borderBottomWidth: 1,
          marginHorizontal: 10,
          marginBottom: 25,
          padding: 12,
          paddingHorizontal: 5,
          flexDirection: 'row',
          // justifyContent: 'space-between',
          // alignItems: 'center'
          // paddingHorizontal: 0
        }}>
          {/* <Text
            style={{
              fontSize: 18,
              color: (personalInfo.birthDate == '') ? '#999': '#000'
            }}
            >Birth Date</Text> */}
          {
            (personalInfo.birthDate == '') ? 
              <Link
                title="Select Date"
                titleStyle={{fontSize: 16}}
                onPress={toggleDatePickerVisibility}
              />
              :
              <View style={{flexDirection: 'row', flex: 1,justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 16}}>{moment(personalInfo.birthDate).format('MMM DD, YYYY')}</Text>
                <Link
                  title={<Icon name="close"/>}
                  titleStyle={{color: colors.primary}}
                  style={{fontSize: 18, marginLeft: 15}}
                  onPress={() => setFields('birthDate', '')}
                />
              </View>
          }
         
        </View>
        <Text style={stylesMain.customInputError}>{errors.birthDate}</Text>

        <Input
          label="Contact Number"
          value={personalInfo.contact}
          onChangeText={(val) => setFields('contact', val)}
          placeholder="0912345678"
          errorMessage={errors.contact}
          keyboardType = 'numeric'
        />

        <Input
          label="Email Address"
          placeholder="email@address.com"
          value={personalInfo.email}
          onChangeText={(val) => setFields('email', val)}
          errorMessage={errors.email}
        />

        <Input
          label="Philhealth Number (Optional)"
          placeholder=""
          value={personalInfo.philhealth}
          onChangeText={(val) => setFields('philhealth', val)}
          errorMessage={errors.philhealth}
        />

        <View style={{marginTop: 40}}>
          <Button
            title="NEXT"
            type="primary"
            onPress={nextScreen}
          />
        </View>
        
      </View>
         
      <DatePicker
        isVisible={isDatePickerVisible}
        toggle={toggleDatePickerVisibility}
        title="Select Birth Date"
        onSubmit={(date) => setFields('birthDate', date)}
      />
      
    </ScrollView>
  )
}

export default PersonalInfo;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  form: {
    marginBottom: 40
  }
})
