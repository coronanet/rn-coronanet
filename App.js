import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, light as theme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { AppNavigator } from './navigation.component';

import {GhostBridgeProvider} from './context/context'

const App = () => (
  <React.Fragment>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider mapping={mapping} theme={theme}>
      <GhostBridgeProvider>
        <AppNavigator/>
      </GhostBridgeProvider>    
    </ApplicationProvider>
  </React.Fragment>
);

export default App;
