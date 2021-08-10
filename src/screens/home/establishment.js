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
import QRScanner from '../../components/qrscanner';
import ScanResultIndividual from '../../components/scan-result/individual';

const QRWidth = Dimensions.get('window').width * .6;

const TraceEstablishment = (props) => {
  const dispatch = useDispatch();
  const [showScanner, setShowScanner] = useState(false);
  const [showResult, setShowResult] = useState(false);
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
          
          <Text style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 15, color: colors.secondary}}>Show your QR</Text>  
          <QRCode
            value="60d6bf9872571ae8024ab0eb"
            size={QRWidth}
          />
          <View style={{ marginTop: 15, paddingHorizontal: 40}}>
            <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: 'bold', color: colors.secondary}}>SM City Butuan</Text>
            <Text style={{ textAlign: 'center', color: colors.secondary}}>J C Aquino Ave, Butuan City</Text>  
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 1, paddingRight: 7}}>
            <Button
              title="SCAN ENTRANCE"
              type="primary"
              onPress={() => {
                setShowScanner(true);
              }}
            />
          </View>
          <View style={{flex: 1, paddingLeft: 7}}>
            <Button
              title="SCAN EXIT"
              type="primary"
              onPress={() => {
                setShowScanner(true);
              }}
            />
          </View>
          
          
        </View>
        
        <Text style={{ textAlign: 'center', color: colors.secondary, marginTop: 15}}>Scan the QR Code of the individual.</Text> 
      </ListContainer>

      <QRScanner
        isVisible={showScanner}
        close={() => {
          setShowScanner(false);
          // setShowResult(true);
        }}
        success={(data) => {
          setShowScanner(false);
          setShowResult(true);
        }}

      />

      <ScanResultIndividual
        isVisible={showResult}
        close={() => {
          setShowResult(false)
        }}


      />
    </ScrollView>
  )
  
  
}

export default TraceEstablishment;

const styles = StyleSheet.create({
  
})
