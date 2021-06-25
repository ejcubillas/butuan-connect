import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// pages
import Login from '../screens/authentication';
import { NotificationList } from '../screens/notification';
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
      <Stack.Screen name="Notification" component={NotificationList} options={{title: "Notifications"}}/>
    </Stack.Navigator>
  );
}

export default HistoryStack;