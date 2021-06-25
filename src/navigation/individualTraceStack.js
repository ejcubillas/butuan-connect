import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// pages
import Login from '../screens/authentication';
import TraceIndividual from '../screens/trace/individual';
import colors from '../styles/colors';

function IndividualTraceStack() {
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
      <Stack.Screen name="IndividualTrace" component={TraceIndividual} options={{title: "Butuan Contact Tracing"}}/>
      {/* <Stack.Screen name="HistoryInfo" component={HistoryList} options={{title: " "}}/> */}
    </Stack.Navigator>
  );
}

export default IndividualTraceStack;