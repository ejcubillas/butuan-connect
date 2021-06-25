import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { stylesMain } from '../../styles/main';
import { ContentPlaceholder, ListContainer, Button } from '../../components/ui';
import { Divider } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../styles/colors';

// components
const QRWidth = Dimensions.get('window').width * .6;


const TraceIndividual = (props) => {
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    // dispatch(login('ej', 'password')())
  }, [dispatch])

  setTimeout(() => {
  }, 2000)

  return (
    <ScrollView>
      <ListContainer>
        <View 
          onLayout={(e) => {
            // console.log(e);
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          
          <Text style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 15, color: colors.secondary}}>Show your QR to the establishment</Text>  
          <QRCode
            value="{name: Ernest Jay Cubillas, barangay: 'Libertad'}"
            size={QRWidth}
          />
          <View style={{ marginTop: 15, paddingHorizontal: 40}}>
            <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: 'bold', color: colors.secondary}}>Ernest Jay Cubillas</Text>
            <Text style={{ textAlign: 'center', color: colors.secondary}}>Block 123 Lot 23 Northtown, Libertad</Text>  
          </View>
          
        </View>
      </ListContainer>
      <ListContainer style={{flexDirection: 'row', alignItems: 'center', }}>
        <View style={{flex: 1}}>
          <Divider
            orientation="horizontal"
            color={colors.secondary}
          />
        </View>
        <Text style={{marginHorizontal: 15, color: colors.secondary}}>or</Text>
        <View style={{flex: 1}}>
          <Divider
            orientation="horizontal"
            color={colors.secondary}
          />
        </View>
      </ListContainer>

      <ListContainer style={{}}>
        <Button
          title="SCAN QR"
          type="primary"
        />
        <Text style={{ textAlign: 'center', color: colors.secondary, marginTop: 15}}>Scan the QR Code of the establishment.</Text> 
      </ListContainer>
    </ScrollView>
  )
  
  
}

export default TraceIndividual;

const styles = StyleSheet.create({
  
})
