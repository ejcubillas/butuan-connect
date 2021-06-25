import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BottomSheet, ListItem, Icon } from 'react-native-elements'; 
import { Link } from '../../components/ui';
import { stylesMain } from '../../styles/main';
import * as Animatable from 'react-native-animatable';

const AccountTypeSelection = (props) => {

  const options = [
    {
      title: 'Individual',
      type: 'individual'
    },
    {
      title: 'Establishment',
      type: 'establishment'
    }
  ]
  
  return (
    <BottomSheet
      modalProps={{
        // transparent: false,
        animationType: 'fade',
        onRequestClose: () => {
          props.toggle();
        }
      }}
      isVisible={props.isVisible}
      containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}
    >
      <Animatable.View animation='fadeInUp' duration={300}>
        <View style={[stylesMain.titleContainer, styles.headerContainer]}>
          <Text style={stylesMain.modalHeader}>Register as</Text>
          
          <Link title={<Icon name="close"/>} onPress={() => {props.toggle()}}/>
          
        </View>
        
        {options.map((val, i) => (
          <ListItem key={i} containerStyle={{}} onPress={() => {props.onPress(val.type)}}>
            <ListItem.Content>
              <ListItem.Title>{val.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </Animatable.View>
      
    </BottomSheet>
  )
}


const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default AccountTypeSelection;