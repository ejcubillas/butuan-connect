import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// pages
import Login from '../screens/authentication';
import { HistoryList } from '../screens/history';
import colors from '../styles/colors';

function HistoryStack() {
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
      <Stack.Screen name="History" component={HistoryList} options={{title: "History"}}/>
      <Stack.Screen name="HistoryInfo" component={HistoryList} options={{title: " "}}/>
    </Stack.Navigator>
  );
}

export default HistoryStack;