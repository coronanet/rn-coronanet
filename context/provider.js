// rn-coronanet - Coronavirus social distancing app
// Copyright (c) 2020 The rn-coronanet authors. All rights reserved.

import React, { useEffect } from "react";
import { View } from "react-native";

import { GhostBridgeContext } from "./context"
import { useGetProfile , useDeleteProfile, useCreateProfile, useUpdateProfile, useGatewayEnable } from "../hooks/hooks";

//reusable hook checks local storage checks prior prefference
const useEffectGhostBridge = () => {
  const profile       = useGetProfile();
  const createProfile = useCreateProfile();
  const deleteProfile = useDeleteProfile();
  const updateProfile = useUpdateProfile();
  const connect       = useGatewayEnable();

  const [hasMounted, setHasMounted] = React.useState(false);

  //TODO: clean up into one state object
  const coronaNetworkState = {
    profile,
    createProfile,
    deleteProfile,
    updateProfile,
    hasMounted
  }
  // Load User Profile State async
  useEffect(() => {
    console.log("init Corona net client")
    const loadProfile = async () =>{
      await profile.makeRequest()
      // null is falsy need to do explicit boolean comparison
    }
    loadProfile()
    setHasMounted(true)
  }, []);

  // Handle profile fetch side-effects
  useEffect(() => {
    const createProfile = async ()=> {
      await createProfile.makeRequest()
    }
    const connectToNetwork = async ()=> {
      await connect.makeRequest()
    }
    if ( profile.ok != null && profile.loading != true ) {
      console.log("handle profile fetch side effects")
      console.log(`loadProfile:\n loading: ${profile.loading}\n ok: ${profile.ok }\n status: ${profile.status}\n response: ${profile.response}`)
      if (profile.ok == true) {
        console.log("Profile Loaded Successfully, TODO: fetch contact state async")
        connectToNetwork()
      } else {
        //TODO: Remove auto create and trigger from front end, currently can't really delete but makes testing easier
        console.log("Profile does not exist, create one then route user to sign up")
        createProfile()
      }
    }
  }, [profile.ok, profile.loading]);

  // Handle createProfile side-effects
  useEffect(() => {
    const loadProfile = async () =>{
      await profile.makeRequest()
      // null is falsy need to do explicit boolean comparison
    }
    if ( createProfile.ok != null && createProfile.loading != true ) {
      console.log("handle created new user side effects")
      console.log(`createProfile:\n loading: ${createProfile.loading}\n ok: ${createProfile.ok }\n status: ${createProfile.status}\n response: ${createProfile.response}`)
      if (createProfile.ok == true) {
        console.log("Profile Created Successfully, load user and wait")
        loadProfile()
      } else {
        console.log("Failed to Create New User, invariant broken bail")
      }
    }
  }, [createProfile.ok, createProfile.loading]);

  // Handle deleteProfile side-effects
  useEffect(() => {
    const loadProfile = async () =>{
      await profile.makeRequest()
      // null is falsy need to do explicit boolean comparison
    }
    if ( deleteProfile.ok != null && deleteProfile.loading != true ) {
      console.log("handle deleted user side effects")
      console.log(`deleteProfile:\n loading: ${deleteProfile.loading}\n ok: ${deleteProfile.ok }\n status: ${deleteProfile.status}\n response: ${deleteProfile.response}`)
      if (deleteProfile.ok == true) {
        console.log("Profile Deleted Successfully, update profile and return to loading screen")
        loadProfile()
      } else {
        console.log("Failed to Delete User, invariant broken bail")
      }
    }
  }, [deleteProfile.ok, deleteProfile.loading]);

  async function triggerRefresh() {
    await profile.makeRequest()
    return true;
  }
  return [  profile, createProfile, deleteProfile, updateProfile, hasMounted, triggerRefresh];
}

export const GhostBridgeProvider = ({children}) => {
  const [profile, createProfile, deleteProfile, updateProfile, hasMounted, triggerRefresh] = useEffectGhostBridge();
  //TODO: loading screen while we build state

  if (!hasMounted) {
    return <View/>;
  }
  return (
    <GhostBridgeContext.Provider
      value = {{
        profile,
        createProfile,
        deleteProfile,
        updateProfile,
        triggerRefresh
      }}
    >
      {children}
    </GhostBridgeContext.Provider>
  );
};
