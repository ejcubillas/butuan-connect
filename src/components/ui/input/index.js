import * as React from 'react';
import { Input } from 'react-native-elements';
import { TextLabel } from '../text';
// import { TextInput } from 'react-native';

const TextInput = (props) => {
  return (
    <Input
      {...props}
      
      style={{marginTop: 0}}
      placeholderTextColor="#999"
      label={(props.label) ? <TextLabel style={{marginLeft: 0}}>{props.label}</TextLabel> : null}
      inputStyle={{
        fontFamily: 'OpenSans-Regular'
      }}
      // labelStyle={{marginLeft: -15}}
      // containerStyle={{marginBottom: 10}}
    />
  );
};

export default TextInput;