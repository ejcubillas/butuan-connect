import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button as BTN }  from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../styles/colors'


const BtnPrimary = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>

      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[(props.gradient1) ? props.gradient1 : '#90C857', (props.gradient2) ? props.gradient2 : '#52B246']} style={[styles.primaryContainer, {...props.style}]}>
        <Text style={[styles.primaryText, props.textStyle]}>
          {props.title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const BtnError = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>

      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.error, colors.error]} style={[styles.primaryContainer, {...props.style}]}>
        <Text style={[styles.primaryText, props.textStyle]}>
          {props.title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const Button = (props) => {
  let btn = null;
  if (props.type == 'primary') {
    btn = <BtnPrimary {...props} />
  }else if (props.type == 'error') {
    btn = <BtnError {...props} />
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
