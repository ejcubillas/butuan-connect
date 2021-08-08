import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
const Stack = createStackNavigator();

// pages
import Login from '../screens/authentication';
import { IndRegPersonalInfo, IndRegAccountInfo, IndRegAddressInfo, IndRegJobStatusInfo, IndRegJobSelfie  } from '../screens/authentication/individual';

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
          fontFamily: 'OpenSans-Bold'
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

      }}
    >
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="RegisterIndividualPersonalInfo" component={IndRegPersonalInfo} options={{title: "Let's get started!"}}/>
      <Stack.Screen name="RegisterIndividualAccountInfo" component={IndRegAccountInfo} options={{title: "Create your account"}}/>
      <Stack.Screen name="RegisterIndividualJobStatusInfo" component={IndRegJobStatusInfo} options={{title: "Job Status"}}/>
      <Stack.Screen name="RegisterIndividualAddressInfo" component={IndRegAddressInfo} options={{title: "Address"}}/>
      <Stack.Screen name="RegisterIndividualSelfie" component={IndRegJobSelfie} options={{title: "Upload Photo"}}/>
    </Stack.Navigator>
  );
}

export default AuthStack;