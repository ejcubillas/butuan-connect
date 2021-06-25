import * as React from 'react';
// import { Input } from 'react-native-elements';
import { TextInput } from 'react-native';

const Input = (props) => {
  return (
    <TextInput
      {...props}
      style={{
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginVertical: 5,
        fontSize: 16
      }}
      placeholderTextColor='#999'
    />
  );
};

export default Input;