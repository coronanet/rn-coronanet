import {useFetch} from "./useFetch"

// Gateway API
// Manage the Corona Network P2P gateway
export const useNetworkStatus = () =>{
  return useFetch('https://corona-network/gateway', "GET", null)
}
export const useConnect = () =>{
  return useFetch('https://corona-network/gateway', "PUT", null)
}
export const useDisconnect = () =>{
  return useFetch('https://corona-network/gateway', "DELETE", null)
}


// Profile API 
// Manage the local Corona Network profile
export const useNewProfile = () =>{
  return useFetch('https://corona-network/profile', "POST", null)
}
export const useGetProfile = () =>{
  return useFetch('https://corona-network/profile', "GET", null)
}
export const useUpdateProfile = (body={"name": "test"}) =>{
  return useFetch('https://corona-network/profile', "PUT", body)
}
export const useDeleteProfile = () =>{
  return useFetch('https://corona-network/profile', "DELETE", null)
}
// Manage the local Corona Network Avatar
export const useGetAvatar = () =>{
  return useFetch('https://corona-network/profile/avatar', "GET", null)
}
export const useUpdateAvatar = (body={}) =>{
  return useFetch('https://corona-network/profile/avatar', "PUT", body)
}
export const useDeleteAvatar = () =>{
  return useFetch('https://corona-network/profile/avatar', "DELETE", null)
}


// Contacts API

// Pairing 
// Manage pairing to new users in the Corona Network
export const useStartPairing = () =>{
  return useFetch('https://corona-network/pairing', "POST", null)
}
export const usePairingStatus = () =>{
  return useFetch('https://corona-network/pairing', "GET", null)
}
export const usePairWithCode = (body="") =>{
  return useFetch('https://corona-network/pairing', "PUT", body)
}

// Profiles
// Manage your contact list in the Corona Network
export const useGetContacts = () =>{
  return useFetch('https://corona-network/contacts', "GET", null)
}
export const useDeleteContactById = (id="") =>{
  return useFetch(`https://corona-network/contacts/${id}`, "DELETE", null)
}
export const useGetProfileById = (id="") =>{
  return useFetch(`https://corona-network/contacts/${id}/profile`, "GET", null)
}
export const useUpdateContactById = (id="", body={"name": "test"}) =>{
  return useFetch(`https://corona-network/contacts/${id}/profile`, "PUT", body)
}
export const useGetAvatarById = (id="") =>{
  return useFetch(`https://corona-network/contacts/${id}/profile`, "GET", null)
}

//CDN API
//Immutable objects infinitely cacheable
export const useGetImageByHash = (sha3="") =>{
  return useFetch(`https://corona-network//cdn/images/${sha3}`, "GET", null)
}

export const API = {
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
  useGetImageByHash
}


