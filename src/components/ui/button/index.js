import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button as BTN }  from 'react-native-elements';
import colors from '../../../styles/colors'


const BtnPrimary = (props) => {
  return (
    <BTN
      containerStyle={[styles.primaryContainer]}
      titleStyle={[styles.primaryText]}
      {...props}
    />
  )
}

const Button = (props) => {
  let btn = null;
  if (props.type == 'primary') {
    btn = <BtnPrimary {...props} />
  }else {
    btn = <BTN style={[styles.buttonPrimary]} {...props} />
  }

  return btn;
  
};

export default Button;

const styles = StyleSheet.create({
  primaryContainer: {
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: 5
  },

  primaryText: {
    color: '#fff'
  }
})
