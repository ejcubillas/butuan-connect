import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text }  from 'react-native-elements';
import colors from '../../../styles/colors'

const Link = (props) => {

  return (
    <TouchableOpacity
      {...props}
    >
      <Text style={{color: colors.primary, ...props.titleStyle, fontFamily: 'OpenSans-SemiBold'}}>{props.title}</Text>
    </TouchableOpacity>
  )
  
};

export default Link;

const styles = StyleSheet.create({
  primaryContainer: {
    paddingVertical: 5,
    backgroundColor: colors.primary,
    borderRadius: 5
  },

  primaryText: {
    color: '#fff'
  }
})
