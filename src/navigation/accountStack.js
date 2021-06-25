import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// pages
import Login from '../screens/authentication';
import { IndividualAccount } from '../screens/account';
import colors from '../styles/colors';

function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0
        },
        // headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: colors.primary,
          fontSize: 22
        }

      }}
    >
      <Stack.Screen name="Account" component={IndividualAccount} options={{title: "Account"}}/>
    </Stack.Navigator>
  );
}

export default AccountStack;