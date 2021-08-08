import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

const TextRegular = (props) => <Text {...props} style={[styles.regular, {...props.style}]} >{props.children}</Text>
const TextLabel = (props) => <Text {...props} style={[styles.label, {...props.style}]} >{props.children}</Text>
const TextHeading = (props) => <Text {...props} style={[styles.heading, {...props.style}]} >{props.children}</Text>
const TextSubHeading = (props) => <Text {...props} style={[styles.subHeading, {...props.style}]} >{props.children}</Text>

export {
  TextRegular,
  TextLabel,
  TextHeading,
  TextSubHeading
};


const styles = StyleSheet.create({
  regular: {
    fontFamily: 'OpenSans-Regular'
  },

  label: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    marginTop: 5,
    // marginBottom: -5,
    color: '#999',
    marginLeft: 10,
  },

  heading: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 20,
    color: '#222',
  },

  subHeading: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: '#222'
  },


})
