import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const Splash = () => {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator size="large" color="#000"/>
    </View>
  )
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
