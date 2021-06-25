import React, { useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

const ContentPlaceholder = (props) => {

  let width = props.width || 100;
  let height = props.height || 20;
  let color = props.color || '#ededed'

  return (
    <Animatable.View {...props} style={{width, height, backgroundColor: color, marginVertical: 5}} animation="fadeIn" direction="alternate" iterationCount="infinite" easing="ease-in-out"/>
  )
}

export default ContentPlaceholder;
