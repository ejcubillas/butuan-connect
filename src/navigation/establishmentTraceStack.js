import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// pages
import Login from '../screens/authentication';
import TraceEstablishment from '../screens/home/establishment';
import colors from '../styles/colors';

function EstablishmentTraceStack() {
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
      <Stack.Screen name="TraceEstablishment" component={TraceEstablishment} options={{ headerShown: false}}/>
      {/* <Stack.Screen name="HistoryInfo" component={HistoryList} options={{title: " "}}/> */}
    </Stack.Navigator>
  );
}

export default EstablishmentTraceStack;