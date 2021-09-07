import React from 'react';
import { View, StyleSheet} from 'react-native';
import {
  MaterialIndicator,
} from 'react-native-indicators';
import Modal from 'react-native-modal';
import colors from '../../styles/colors';

const ProgressOverlay = (props) => {
  return (
    <Modal
        isVisible={props.isVisible}
        animationIn="bounceIn"
        animationOut="bounceOut"
        statusBarTranslucent={true}
        easing="ease-in-out"
        onModalHide={props.onModalHide}
      >
        <View style={styles.indicatorContainer}>
          <MaterialIndicator color={colors.primary}/>
        </View>
      </Modal>
      
  )
}

export default ProgressOverlay;

const styles = StyleSheet.create({
  
  indicatorContainer: {
    padding: 30, 
    backgroundColor: '#fff', 
    position: 'absolute', 
    borderRadius: 5, 
    alignSelf :'center'
  }

})
