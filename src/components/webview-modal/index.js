import React, {useState} from 'react';
import {Button, View, Text, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements';
import { Link } from '../ui';
import Modal from 'react-native-modal';
import colors from '../../styles/colors';
import { WebView } from 'react-native-webview';

function WebViewModal(props) {
  return (
      <Modal
        isVisible={props.isVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        backdropColor="#fff"
        backdropOpacity={1}
        onBackButtonPress={props.handleClose}  
      >
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
            
            <Link
              title={<Icon name="close" color={colors.primary} size={30}/>}
              onPress={props.handleClose}
              // style={{marginBottom: 20}}
            />
          </View>
          
          <View style={{flex: 1}}>
            <WebView source={{uri: props.uri}}/>
          </View>
        </View>
      </Modal>
  );
}

export default WebViewModal;