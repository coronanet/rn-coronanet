import React, { useEffect } from "react";
import { GhostBridgeContext } from "./context"
import { useGetProfile , useDeleteProfile, useNewProfile, useUpdateProfile, useConnect} from "../hooks/hooks";
import { View } from "react-native";


//reusable hook checks local storage checks prior prefference
const useEffectGhostBridge = () => {
    
    const profile = useGetProfile();
    const newProfile = useNewProfile();
    const deleteProfile = useDeleteProfile();
    const updateProfile = useUpdateProfile();
    const connect = useConnect();

    const [hasMounted, setHasMounted] = React.useState(false);
    
    //TODO: clean up into one state object
    const coronaNetworkState = {
        profile,
        newProfile,
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
            await newProfile.makeRequest()
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

    // Handle newProfile side-effects 
    useEffect(() => {
        const loadProfile = async () =>{
            await profile.makeRequest()
            // null is falsy need to do explicit boolean comparison 
        }
        if ( newProfile.ok != null && newProfile.loading != true ) {
            console.log("handle created new user side effects")
            console.log(`newProfile:\n loading: ${newProfile.loading}\n ok: ${newProfile.ok }\n status: ${newProfile.status}\n response: ${newProfile.response}`)
            if (newProfile.ok == true) {
                console.log("Profile Created Successfully, load user and wait")
                loadProfile()
            } else {
                console.log("Failed to Create New User, invariant broken bail")
            }
        }
    }, [newProfile.ok, newProfile.loading]);

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

    return [  profile, newProfile, deleteProfile, updateProfile, hasMounted, triggerRefresh];
}

export const GhostBridgeProvider = ({children}) => {
    const [profile, newProfile, deleteProfile, updateProfile, hasMounted, triggerRefresh] = useEffectGhostBridge();
    //TODO: loading screen while we build state
    
    if (!hasMounted){ return <View/>; }
    return (
            <GhostBridgeContext.Provider 
                value = {{ 
                    profile, 
                    newProfile, 
                    deleteProfile, 
                    updateProfile, 
                    triggerRefresh
                }}
            >
                {children}
            </GhostBridgeContext.Provider>
    );
};