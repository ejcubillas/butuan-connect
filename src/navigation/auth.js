import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// pages
import Login from '../screens/authentication';
import { IndRegPersonalInfo, IndRegAccountInfo  } from '../screens/authentication/individual';

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold'
        }

      }}
    >
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="RegisterIndividualPersonalInfo" component={IndRegPersonalInfo} options={{title: "Let's get started!"}}/>
      <Stack.Screen name="RegisterIndividualAccountInfo" component={IndRegAccountInfo} options={{title: "Create your account"}}/>
    </Stack.Navigator>
  );
}

export default AuthStack;