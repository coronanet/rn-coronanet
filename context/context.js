import React, { useEffect, createContext} from "react";
import {
    useNetworkStatus,
    useConnect,
    useDisconnect,
    useNewProfile,
    useGetProfile,
    useUpdateProfile,
    useDeleteProfile,
    useGetAvatar,
    useUpdateAvatar,
    useDeleteAvatar,
    useStartPairing,
    usePairingStatus,
    usePairWithCode,
    useGetContacts,
    useDeleteContactById,
    useGetProfileById,
    useUpdateContactById,
    useGetAvatarById,
    useGetImageByHash,
    API
} from "../hooks/hooks"

const defaultContext = {
    coronaNetworkState: null,
    triggerRefresh: () => {}
};

const GhostBridgeContext = createContext(defaultContext);

//reusable hook checks local storage checks prior prefference
const useEffectGhostBridge = () => {
    
    const [profile, setProfile] = React.useState({})
    const {contacts, setContacts} = React.useState({})
    const [hasMounted, setHasMounted] = React.useState(false);
    const [refresh, trigger] = useState(false);

    const coronaNetworkState = {
        profile,
        contacts,
        networkStatus,
        hasMounted
    }

    const loadProfileData = async () => {
        const [_profile, profileLoading, profileError, loadProfile] = useGetProfile();
        const [_avatar, avatarLoading, avatarError, loadAvatar] = useGetAvatar();   
        await loadProfile()
        await loadAvatar()
        
        setProfile ({ ..._profile, profileLoading, profileError, loadProfile, _avatar, avatarLoading, avatarError, loadAvatar});
        
        if (profileError){
            //TODO:replace with signup screen then remove once coronaNetworkState is exposed
            await API.useDeleteProfile().makeRequest()
            await API.useNewProfile().makeRequest()
            await API.useUpdateProfile({"name":"Q"}).makeRequest()
        }
    }

    const loadContactProfiles = async () => {
        const [contacts, contactsLoading, contactsError, loadContacts] = useGetContacts()
        await loadContacts()
        const contactData = {}
        if (contacts){
            Promise.all(contacts.map(async (id)=>{
                const [_profile, profileLoading, profileError, loadProfile] = useGetProfileById(id);
                const [avatar, avatarLoading, avatarError, loadAvatar] = useGetAvatarById(id); 
                await loadProfile()
                await loadAvatar()      
                contactData[id] = { ..._profile, profileLoading, profileError, loadProfile, avatar, avatarLoading, avatarError, loadAvatar};

            }))
            setContacts(contactData)
        }
    }

    useEffect(() => {
        console.log("init Corona net client")

        await loadProfileData()
        console.log(profile)
        // await loadContactProfiles()

        await useConnect().makeRequest()
     
        const [status, statusLoading, statusError, loadStatus] = useNetworkStatus()
        await loadStatus()
        console.log(status)
        //TODO: load everything display loading indicator in the meantime
        setHasMounted(true)
    }, []);

    //TODO: force data refresh
    useEffect(() =>{
   
    },[refresh])

    async function triggerRefresh() {
        trigger(!refresh)
        return true;
    }

    return [coronaNetworkState, triggerRefresh];
}

const GhostBridgeProvider = ({children}) => {
    const [coronaNetworkState, triggerRefresh] = useEffectGhostBridge();
    //TODO: loading screen while we build state
    if (!coronaNetworkState.hasMounted){ return <div/>; }

    return (
            <GhostBridgeContext.Provider 
                value = {{ 
                    coronaNetworkState,
                    triggerRefresh
                }}
            >
            {children}
            </GhostBridgeContext.Provider>
    );
};

export {GhostBridgeProvider, GhostBridgeContext}; 