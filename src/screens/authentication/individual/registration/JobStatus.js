import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { stylesMain } from '../../../../styles/main';
import { Input, Button, TextLabel } from '../../../../components/ui';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
// components
// import AccountTypeSelection from './AccountTypeSelection';

const Address = (props) => {
  const dispatch = useDispatch();
  const [isEmployed, setIsEmployed] = useState(true);
  
  const [jobStatus, setJobStatus] = useState({
    occupation: '',
    company: '',
    companyAddress: '',
  });

  const [errors, setErrors] = useState({
    occupation: '',
    company: '',
    companyAddress: '',
  });

  useEffect(() => {
    if (!isEmployed) {
      setJobStatus({
        occupation: '',
        company: '',
      })
    }
    
  }, [isEmployed])

  useEffect(() => {
    console.log(props.route.params);
  }, [])

  
  const setFields = (field, value, required = true) => {
    setJobStatus({
      ...jobStatus,
      [field]: value
    })

    if (required && value == '' && isEmployed) {
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
  }

  const checkErrors = () => {
    /// for the required fields

    let onError = false;
    const errorMsg = 'This field is required.'
    if ((jobStatus.occupation == '' ||
        jobStatus.company == '' ||
        jobStatus.companyAddress == '') && isEmployed
      ) {
      onError = true; 

      setErrors({
        ...errors,
        occupation: (jobStatus.occupation == '') ? errorMsg : '',
        company: (jobStatus.company == '') ? errorMsg : '',
        companyAddress: (jobStatus.companyAddress == '') ? errorMsg : '',
      })
    }

    return onError;
  }

  const nextScreen = () => {

    const onError = checkErrors();
    if (!onError) {
      props.navigation.navigate('RegisterIndividualSelfie', {
        personalInfo: props.route.params.personalInfo,
        address: props.route.params.address,
        jobStatus: {
          ...jobStatus,
          isEmployed: (isEmployed) ? 'EMPLOYED' : 'UNEMPLOYED'
        }
      })
    }   

    // temp
    // props.navigation.navigate('RegisterIndividualSelfie', {
    //   personalInfo: props.route.params.personalInfo,
    //   address: props.route.params.address,
    //   jobStatus: {
    //     ...jobStatus,
    //     isEmployed: (isEmployed) ? 'EMPLOYED' : 'UNEMPLOYED'
    //   }
    // })
  }


  return (
    <ScrollView style={[stylesMain.container]}>
      
      <View style={[styles.form]}>
        <TextLabel>Are you employed?</TextLabel>
        <View style={stylesMain.pickerContainer}>
          <Picker
            mode="dropdown"
            style={{ marginHorizontal: -12, backgroundColor: '#fff', padding: 0}}
            selectedValue={isEmployed}
            onValueChange={(val, index) => setIsEmployed(val)}>
              <Picker.Item label="YES" value={true}  style={stylesMain.pickerItemStyle}/>
              <Picker.Item label="NO" value={false}  style={stylesMain.pickerItemStyle}/>
          </Picker>
        </View>
        <Text style={stylesMain.customInputError}>{errors.province}</Text>
        
        {
          (isEmployed) ? 
           <>
              <Input
                label="Occupation"
                placeholder=""
                value={jobStatus.occupation}
                onChangeText={(val) => setFields('occupation', val)}
                errorMessage={errors.occupation}
              />
              <Input
                label="Company"
                placeholder=""
                value={jobStatus.company}
                onChangeText={(val) => setFields('company', val)}
                errorMessage={errors.company}
              />

              <Input
                label="Company Address"
                placeholder=""
                value={jobStatus.companyAddress}
                onChangeText={(val) => setFields('companyAddress', val)}
                errorMessage={errors.companyAddress}
              />
           </> : null
        }
        
        
        

        <View style={{marginTop: 40}}>
          <Button
            title="NEXT"
            type="primary"
            onPress={nextScreen}
          />
        </View>
        
      </View>
      
      
      

      
    </ScrollView>
  )
}

export default Address;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    // paddingBottom: 40
  },
  form: {
    marginBottom: 40
  }
})
