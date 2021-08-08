import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button as BTN }  from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../styles/colors'


const BtnPrimary = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>

      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#90C857', '#52B246']} style={styles.primaryContainer}>
        <Text style={styles.primaryText}>
          {props.title}
        </Text>
      </LinearGradient>
      {/* <BTN
        containerStyle={[styles.primaryContainer]}
        titleStyle={[styles.primaryText]}
        {...props}
      /> */}
    </TouchableOpacity>
  )
}

const Button = (props) => {
  let btn = null;
  if (props.type == 'primary') {
    btn = <BtnPrimary {...props} />
  }else {
    btn = <BtnPrimary {...props} />
    // btn = <BTN style={[styles.buttonPrimary]} {...props} />
  }

  return btn;
  
};

export default Button;

const styles = StyleSheet.create({
  primaryContainer: {
    paddingVertical: 15,
    // backgroundColor: colors.primary,
    borderRadius: 5,
    paddingHorizontal: 8
  },

  primaryText: {
    color: '#fff',
    // fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'OpenSans-Bold'
    // fontFamily: 'sans-serif'
  }
})
