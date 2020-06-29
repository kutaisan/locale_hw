import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../views/HomeScreen';
import RestaurantScreen from '../views/RestaurantScreen';
import PastOrderScreen from '../views/PastOrderScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {THEME_COLOR} from '../config/config';

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Restaurants') {
            iconName = 'restaurant-menu';
          } else if (route.name === 'PastOrders') {
            iconName = 'update';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: THEME_COLOR,
      }}>
      <Tab.Screen name="Profile" component={HomeScreen} />
      <Tab.Screen name="Restaurants" component={RestaurantScreen} />
      <Tab.Screen name="PastOrders" component={PastOrderScreen} />
    </Tab.Navigator>
  );
}
