import React, {useState} from 'react';
import {Button, View} from 'react-native';
import { Icon } from 'react-native-elements';
import Link from '../link';
import TextSubHeading from '../text';
import Modal from 'react-native-modal';
import colors from '../../../styles/colors';

function InfoModal(props) {

  return (
      <Modal
        isVisible={props.isVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        backdropColor="#fff"
        backdropOpacity={1}
        onBackButtonPress={props.toggle}  
      >
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
            
            <Link
              title={<Icon name="close" color={colors.primary} size={30}/>}
              onPress={props.toggle}
              // style={{marginBottom: 20}}
            />

            <TextSubHeading style={{paddingLeft: 15}}>{props.title}</TextSubHeading>
          </View>
          
          {props.children}
        </View>
      </Modal>
  );
}

export default InfoModal;