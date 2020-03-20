import React from 'react';
import { ApplicationProvider, useTheme, IconRegistry, Icon, Layout, Text, Input, Button, CheckBox, List, ListItem, Card, CardHeader, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { mapping, light as theme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { AppNavigator } from './navigation.component';

const App = () => (
  <React.Fragment>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider mapping={mapping} theme={theme}>
      <AppNavigator/>
    </ApplicationProvider>
  </React.Fragment>
);

export default App;
