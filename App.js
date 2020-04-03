import React from 'react';

import {GhostBridgeProvider} from './context/provider'
import {TestHarness} from "./components/TestHarness"

const App = () => (
  <React.Fragment>
      <GhostBridgeProvider>
        <TestHarness/>
      </GhostBridgeProvider>    
  </React.Fragment>
);

export default App;
