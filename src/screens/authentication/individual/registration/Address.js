import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { stylesMain } from '../../../../styles/main';
import { Input, Button, Link } from '../../../../components/ui';
import { TextLabel } from '../../../../components/ui';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getProvinces, getMunicipalityByProvince, getBarangayByMunicipality } from '../../../../utils/address';
import { ScrollView } from 'react-native';
// components
// import AccountTypeSelection from './AccountTypeSelection';

const Address = (props) => {
  const dispatch = useDispatch();
  const [isButuanResident, setIsButuanResident] = useState(true);
  const [places, setPlaces] = useState({
    provinces: [],
    municipalities: [],
    barangays: []
  })
  const [address, setAddress] = useState({
    province: 'AGUSAN DEL NORTE',
    municipality: 'CITY OF BUTUAN (Capital)',
    barangay: '',
    streetHouseNumber: ''
  });

  const [errors, setErrors] = useState({
    province: '',
    municipality: '',
    barangay: '',
    streetHouseNumber: ''
  });

  useEffect(() => {
    const prov = getProvinces();
    setPlaces({
      ...places,
      provinces: prov
    })
  }, [])

  useEffect(() => {
    if (isButuanResident) {
      setAddress({
        ...address,
        province: 'AGUSAN DEL NORTE',
        municipality: 'CITY OF BUTUAN (Capital)',
      });
  
      municipalityChange('AGUSAN DEL NORTE', 'CITY OF BUTUAN (Capital)');
    }else {
      
      const prov = getProvinces();
      setPlaces({
        ...places,
        provinces: prov,
        barangays: [],
        municipalities: []
      })

      setAddress({
        ...address,
        province: '',
        municipality: '',
      });

      
    }
    
  }, [isButuanResident])

  const provinceChange = (province) => {
    const mun = getMunicipalityByProvince(province);
    setPlaces({
      ...places,
      municipalities: mun
    })
  }

  const municipalityChange = (province, mun) => {
    const barangays = getBarangayByMunicipality(province, mun);
    setPlaces({
      ...places,
      barangays: barangays
    })
  }
  
  const setFields = (field, value, required = true) => {
    if (field == 'province') provinceChange(value)
    if (field == 'municipality') municipalityChange(address.province, value)

    setAddress({
      ...address,
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
  }

  const checkErrors = () => {
    /// for the required fields

    let onError = false;
    const errorMsg = 'This field is required.'
    if (address.province == '' ||
        address.municipality == '' ||
        address.barangay == '' ||
        address.streetHouseNumber == ''
      ) {
      onError = true; 

      setErrors({
        ...errors,
        province: (address.province == '') ? errorMsg : '',
        municipality: (address.municipality == '') ? errorMsg : '',
        barangay: (address.barangay == '') ? errorMsg : '',
        streetHouseNumber: (address.streetHouseNumber == '') ? errorMsg : '',
      })
    }

    return onError;
  }

  const nextScreen = () => {

    const onError = checkErrors();
    if (!onError) {
      props.navigation.navigate('RegisterIndividualJobStatusInfo', {
        personalInfo: props.route.params.personalInfo,
        address: {
          ...address,
          isButuanResident: (isButuanResident) ? 'YES' : 'NO'
        },
        
      })
    }    


    // temp
    // props.navigation.navigate('RegisterIndividualJobStatusInfo', {
    //   personalInfo: props.route.params.personalInfo,
    //   address: {
    //     ...address,
    //     isButuanResident: (isButuanResident) ? 'YES' : 'NO'
    //   }
    // })
  }


  return (
    <ScrollView style={[stylesMain.container]}>
      
      <View style={[styles.form]}>
        <TextLabel>Butuan Resident?</TextLabel>
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
            selectedValue={isButuanResident}
            onValueChange={(val, index) => setIsButuanResident(val)}>
              <Picker.Item label="YES" value={true} style={stylesMain.pickerItemStyle}/>
              <Picker.Item label="NO" value={false} style={stylesMain.pickerItemStyle}/>
          </Picker>
        </View>

        {
          (!isButuanResident) ?
          <>
            <TextLabel>Province</TextLabel>
            <View style={stylesMain.pickerContainer}>
              <Picker
                mode="dropdown"
                style={{ marginHorizontal: -12, backgroundColor: '#fff', padding: 0}}
                selectedValue={address.province}
                onValueChange={(val, index) => setFields('province', val)}>
                  <Picker.Item label="Select Province" value="" style={stylesMain.pickerItemPlaceholderStyle}/>
                {
                  places.provinces.map((prov, provIdx) => <Picker.Item key={provIdx} label={prov} value={prov} style={stylesMain.pickerItemStyle}/>)
                }
              </Picker>
            </View>
            <Text style={stylesMain.customInputError}>{errors.province}</Text>
            
            <TextLabel >City/Municipality</TextLabel>
            <View style={stylesMain.pickerContainer}>
              <Picker
                mode="dropdown"
                style={{ marginHorizontal: -12, backgroundColor: '#fff', padding: 0}}
                selectedValue={address.municipality}
                onValueChange={(val, index) => setFields('municipality', val)}>
                  <Picker.Item label="Select City/Municipality" value=""  style={stylesMain.pickerItemPlaceholderStyle}/>
                {
                  places.municipalities.map((mun, munIdx) => <Picker.Item key={munIdx} label={mun} value={mun}  style={stylesMain.pickerItemStyle}/>)
                }
              </Picker>
            </View>
            <Text style={stylesMain.customInputError}>{errors.municipality}</Text>
          </>
          : null

        }
        
        
        <TextLabel>Barangay</TextLabel>
        <View style={stylesMain.pickerContainer}>
          <Picker
            mode="dropdown"
            style={{ marginHorizontal: -12, backgroundColor: '#fff', padding: 0}}
            selectedValue={address.barangay}
            onValueChange={(val, index) => setFields('barangay', val)}>
              <Picker.Item label="Select Barangay" value="" style={stylesMain.pickerItemPlaceholderStyle}/>
            {
              places.barangays.map((baranagay, baranagayIdx) => <Picker.Item key={baranagayIdx} label={baranagay} value={baranagay} style={stylesMain.pickerItemStyle} />)
            }
          </Picker>
        </View>
        <Text style={stylesMain.customInputError}>{errors.barangay}</Text>
        

        <Input
          label="Street House Number"
          placeholder=""
          value={address.streetHouseNumber}
          onChangeText={(val) => setFields('streetHouseNumber', val)}
          errorMessage={errors.streetHouseNumber}
        />
        
        

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
