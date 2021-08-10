import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import {
  MaterialIndicator,
} from 'react-native-indicators';
import colors from '../styles/colors';
const Splash = () => {
  return (
    <View style={[styles.container]}>
      <MaterialIndicator color={colors.primary}/>
    </View>
  )
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})
