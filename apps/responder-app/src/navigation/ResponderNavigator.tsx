import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ResponderHomeScreen } from '../screens/ResponderHomeScreen';
import { JobTrackingScreen } from '../screens/JobTrackingScreen';

const Stack = createStackNavigator();

export const ResponderNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={ResponderHomeScreen} />
      <Stack.Screen name="JobTracking" component={JobTrackingScreen} />
    </Stack.Navigator>
  );
};
