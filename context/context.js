// rn-coronanet - Coronavirus social distancing app
// Copyright (c) 2020 The rn-coronanet authors. All rights reserved.

import React from "react";
import { API } from "../hooks/hooks"

// defaultContext is the starting state for the app.
const defaultContext = {
  profile: {
    loading:     false,
    error:       {},
    status:      "",
    ok:          "",
    response:    {},
    makeRequest: () => Promise
  },
  createProfile: {
    loading:     false,
    error:       {},
    status:      "",
    ok:          "",
    response:    {},
    makeRequest: () => Promise
  },
  deleteProfile: {
    loading:     false,
    error:       {},
    status:      "",
    ok:          "",
    response:    {},
    makeRequest: () => Promise
  },
  updateProfile: {
    loading:     false,
    error:       {},
    status:      "",
    ok:          "",
    response:    {},
    makeRequest: () => Promise
  },
  hasMounted: false,
  triggerRefresh: () => {}
};

// Create a context to be accessible throughout the app
export const GhostBridgeContext = React.createContext(defaultContext);
