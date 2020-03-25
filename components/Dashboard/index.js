import React from 'react';
import { useTheme } from '@ui-kitten/components';

import { createStackNavigator } from '@react-navigation/stack';
import { DashboardContent } from './DashboardScreen';

const Header = createStackNavigator();

export const DashboardScreen = () => {
    const theme = useTheme();

    return (
      <Header.Navigator headerMode="screen" screenOptions={{
        headerTintColor: 'white', headerStyle: {backgroundColor: theme['color-warning-default']}
      }}>
        <Header.Screen name="Dashboard" component={DashboardContent} options={{title: 'Péter Szilágyi – Home Quarantine'}}/>
      </Header.Navigator>
    );
};
