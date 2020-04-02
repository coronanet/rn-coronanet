
import React from "react";
import { API } from "../hooks/hooks"

const defaultContext = {
    profile: {
        response: {},
        status: "",
        loading: false,
        err: {},
        makeRequest: () => Promise
    },
    newProfile: {
        response: {},
        status: "",
        loading: false,
        err: {},
        makeRequest: () => Promise
    },
    deleteProfile: {
        response: {},
        status: "",
        loading: false,
        err: {},
        makeRequest: () => Promise
    },
    updateProfile: {
        response: {},
        status: "",
        loading: false,
        err: {},
        makeRequest: () => Promise
    },
    hasMounted: false,
    triggerRefresh: () => {}
};

export const GhostBridgeContext = React.createContext(defaultContext);