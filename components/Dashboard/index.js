import React from 'react';
import { useTheme } from '@ui-kitten/components';

import { createStackNavigator } from '@react-navigation/stack';
import { DashboardContent } from './DashboardScreen';
import { loadProfile } from '../hooks';

const Header = createStackNavigator();

export const DashboardScreen = () => {
  const theme = useTheme();
  const [profile, loading] = loadProfile();

  return (
    <Header.Navigator headerMode="screen" screenOptions={{
      headerTintColor: 'white', headerStyle: { backgroundColor: theme['color-warning-default'] }
    }}>
      <Header.Screen name="Dashboard" component={DashboardContent} options={{ title: `${profile.name} – Home Quarantine` }} />
    </Header.Navigator>
  );
};
