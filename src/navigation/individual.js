import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import colors from '../styles/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// pages
import TraceIndividual from '../screens/trace/individual';

function IndividualStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="IndividualTrace" component={TraceIndividual} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

export default IndividualStack;