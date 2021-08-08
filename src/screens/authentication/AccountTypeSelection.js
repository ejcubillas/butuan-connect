import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BottomSheet, ListItem, Icon } from 'react-native-elements'; 
import Modal from 'react-native-modal';
import { Link, TextRegular, TextSubHeading } from '../../components/ui';
import { stylesMain } from '../../styles/main';
import * as Animatable from 'react-native-animatable';
import colors from '../../styles/colors';

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
    <Modal
      animationIn="slideInUp"
      isVisible={props.isVisible}
      style={{margin: 0}}
      onBackButtonPress={props.toggle}
      onBackdropPress={props.toggle}
    >
      <Animatable.View animationIn='fadeInUp' animationOut='fadeOutDown' duration={300} style={{paddingBottom: 15, backgroundColor: '#fff', position: 'absolute', bottom: 0, width:'100%'}}>
        <View style={[stylesMain.titleContainer, styles.headerContainer]}>
          <TextSubHeading>Register as</TextSubHeading>
          
          <Link title={<Icon name="close" color={colors.primary}/>} onPress={props.toggle}/>
          
        </View>
        
        {options.map((val, i) => (
          <ListItem key={i} containerStyle={{}} onPress={() => {props.onPress(val.type)}}>
            <ListItem.Content>
              <TextRegular style={{fontSize: 16}}>{val.title}</TextRegular>
            </ListItem.Content>
          </ListItem>
        ))}
      </Animatable.View>
      
    </Modal>
  )
}


const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20
  }
})

export default AccountTypeSelection;