import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import colors from '../styles/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// pages
import Login from '../screens/authentication';
import { IndRegPersonalInfo, IndRegAccountInfo  } from '../screens/authentication/individual';
import HistoryStack from './historyStack';
import IndividualTraceStack from './individualTraceStack';
import NotificationStack from './notificationStack';
import AccountStack from './accountStack';

function IndividualTab() {

  const getTabBarVisibility = (route) => {
    // console.log(route);
    // console.log(route.state ? route.state.routes[route.state.index].name : '');
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === 'OrderRequestDetails' ||
      routeName === 'OrderDetails' || 
      routeName === 'AddProduct' ||
      routeName === 'StoreProfile' ||
      routeName === 'EditProduct' ||
      routeName === 'BusinessHours' || 
      routeName === 'AccountSettings' ||
      routeName === 'SetPassword'
      ) {
      return false;
    }
    return true;
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        // activeBackgroundColor: '#000'
        style: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10
          // padding: 10
        },

        activeTintColor: colors.primary,
        
      }}

      screenOptions={({route}) => ({
        tabBarIcon: ({ focused, color, size }) => {
          console.log(focused);
          let iconName;
          let iconType;
          let iconSize = 28;
          let iconColor;

          if (route.name == 'History') {
            iconName = 'history';
            iconColor = focused ? colors.primary : colors.secondary;
          } else if (route.name === 'Trace') {
            iconName = 'qrcode-scan';
            iconColor = focused ? colors.primary : colors.secondary;
          } else if (route.name === 'Notification') {
            iconName = 'bell-outline';
            iconColor = focused ? colors.primary : colors.secondary;
          }  else if (route.name === 'Account') {
            iconName = 'account-outline';
            iconColor = focused ? colors.primary : colors.secondary;
          } 

          // You can return any component that you like here!
          return <Icon name={iconName} type="material-community" size={iconSize} color={color} />;
        },
      })}
      
    >
      <Tab.Screen
        name="Trace"
        component={IndividualTraceStack}
        options={({route}) => ({
          tabBarLabel: 'Trace',
          tabBarVisible: getTabBarVisibility(route),
        })}  
        title='Trace'
      />

      <Tab.Screen
        name="History"
        component={HistoryStack}
        options={({route}) => ({
          tabBarLabel: 'History',
          tabBarVisible: getTabBarVisibility(route)
        })}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationStack}
        options={({route}) => ({
          tabBarLabel: 'Notification',
          tabBarVisible: getTabBarVisibility(route)
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={({route}) => ({
          tabBarLabel: 'Account',
          tabBarVisible: getTabBarVisibility(route)

          
        })}
        />
    </Tab.Navigator>
  );
}

export default IndividualTab;