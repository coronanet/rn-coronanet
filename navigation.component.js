import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import components
import { SignupScreen } from './components/SignupScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { DashboardScreen } from './components/Dashboard';

const Stack = createStackNavigator();

const BaseNavigator = () => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Welcome' component={WelcomeScreen}/>
    <Stack.Screen name='Signup' component={SignupScreen}/>
    <Stack.Screen name='Dashboard' component={DashboardScreen}/>
  </Stack.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <BaseNavigator/>
  </NavigationContainer>
);
