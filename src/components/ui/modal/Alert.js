import React from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'; 
import Modal from 'react-native-modal';
import colors from '../../../styles/colors';
import { TextHeading, TextRegular, TextSubHeading } from '../text';
import Warning from '../../../icons/warning.svg';
import Checked from '../../../icons/checked.svg';
import { Touchable } from 'react-native';

const AlertModal = (props) => {

  let title = null;
  let icon = <Warning height={70} width={70}/>
  if (props.type === 'success') {
    title = 'Yay!'
    icon = <Checked height={70} width={70}/>
  }else if (props.type === 'error') {
    title = 'Oops!'
  }

  return (
    // <View style={{flex: 1}}>
    <Modal
        isVisible={props.isVisible}
        animationIn="bounceIn"
        animationOut="bounceOut"
        statusBarTranslucent={true}
        easing="ease-in-out"
        onBackButtonPress={props.handleClose}
        onBackdropPress={props.handleClose}
        style={styles.modal}
      >
        <View style={styles.container}>
          <View style={styles.icon}>
            {icon}
          </View>
          <View style={styles.content}>
            <TextHeading>{title}</TextHeading>
            <TextRegular style={styles.contentText}>{props.content}</TextRegular>
          </View>
          
          <View style={styles.actionContainer}>
            <TouchableOpacity onPress={props.handleClose}>
              <TextSubHeading style={{ ...styles.actionBtn, color: (props.type === 'error') ? colors.error : colors.primary }}>
                {
                  (props.type === 'error') ? 'OK, TRY AGAIN' : 'OK, COOL'
                }
              </TextSubHeading>
            </TouchableOpacity>
          </View>
        </View>
        
      </Modal>
    // </View>
  )
}

export default AlertModal;

const styles = StyleSheet.create({
  
  container: {
    padding: 20,
    backgroundColor: '#fff', 
    position: 'absolute', 
    borderRadius: 5, 
    alignSelf :'center',
    width: '100%',
    // flexDirection: 'row',
    alignItems: 'center'

  },

  content: {
    alignItems: 'center',
    paddingHorizontal: 15,
    // paddingRight: 45
  },
  
  contentText: {
    marginVertical: 5,
    textAlign: 'center'
  },

  icon: {
    // paddingRight: 15
  },

  actionContainer: {
    marginTop: 10
    // backgroundColor: '#eee'
  },

  actionBtn: {
    // backgroundColor: '#eee',
    fontSize: 16,
    color: '#fff'
  },

  modal: {
    padding: 20
  }

})
