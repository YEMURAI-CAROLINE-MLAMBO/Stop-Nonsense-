import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { IncidentTrackingScreen } from '../screens/IncidentTrackingScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { SupportScreen } from '../screens/SupportScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="IncidentTracking" component={IncidentTrackingScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
    </Stack.Navigator>
  );
};
