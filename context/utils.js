
export const loadContactProfiles = async () => {
    const [contacts, contactsLoading, contactsError, loadContacts] = useGetContacts()
    await loadContacts()
    const contactData = {}
    if (contacts){
        Promise.all(contacts.map(async (id)=>{
            const [_profile, profileLoading, profileError, loadProfile] = useGetContactProfile(id);
            const [avatar, avatarLoading, avatarError, loadAvatar] = useGetContactAvatar(id);
            await loadProfile()
            await loadAvatar()
            contactData[id] = { ..._profile, profileLoading, profileError, loadProfile, avatar, avatarLoading, avatarError, loadAvatar};

        }))
        setContacts(contactData)
    }
}

export const loadProfileData = async () => {
    const [_profile, profileLoading, profileError, loadProfile] = useGetProfile();
    const [_avatar, avatarLoading, avatarError, loadAvatar] = useGetAvatar();
    await loadProfile()
    await loadAvatar()

    setProfile ({ ..._profile, profileLoading, profileError, loadProfile, _avatar, avatarLoading, avatarError, loadAvatar});

    if (profileError){
        //TODO:replace with signup screen then remove once coronaNetworkState is exposed
        await API.useDeleteProfile().makeRequest()
        await API.useCreateProfile().makeRequest()
        await API.useUpdateProfile({"name":"Q"}).makeRequest()
    }
}
