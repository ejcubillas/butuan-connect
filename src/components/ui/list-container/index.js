import React, { useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';

const ListContainer = (props) => {

  if (props.touchable) {
    return (
      <TouchableOpacity {...props} style={[styles.container, props.style]}>
        {props.children}
      </TouchableOpacity>  
    )
  }


  return (
    <View {...props} style={[styles.container, props.style]}>
      {props.children}
    </View>
  )
}

export default ListContainer;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    // paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    // borderBottomWidth: 2
  }
})