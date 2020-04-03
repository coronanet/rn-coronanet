// rn-coronanet - Coronavirus social distancing app
// Copyright (c) 2020 The rn-coronanet authors. All rights reserved.

// This file contains the API endpoint invokers as defined in the Corona Network API spec:
//   https://editor.swagger.io/?url=https://raw.githubusercontent.com/coronanet/go-coronanet/master/spec/api.yaml
//
// A few endpoints are deliberately missing from the list below:
//  - GET /profile/avatar is not an API call, rather servers a redirected image
//  - GET /contacts/${id}/profile/avatar is similar to /profile/avatar, an image
//  - GET /cnd/images/${sha3} is not an API call, rather servers immutable images

import {useFetch} from "./useFetch"

// Gateway API: Manage the Corona Network P2P gateway
export const useGatewayStatus = () =>{
  return useFetch('https://corona-network/gateway', "GET", null)
}
export const useGatewayEnable = () =>{
  return useFetch('https://corona-network/gateway', "PUT", null)
}
export const useGatewayDisable = () =>{
  return useFetch('https://corona-network/gateway', "DELETE", null)
}

// Profile API: Manage the local Corona Network profile
export const useCreateProfile = () =>{
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
export const useUpdateAvatar = (body={}) =>{
  return useFetch('https://corona-network/profile/avatar', "PUT", body)
}
export const useDeleteAvatar = () =>{
  return useFetch('https://corona-network/profile/avatar', "DELETE", null)
}

// Contacts API - Pairing: Manage pairing to new users in the Corona Network
export const useInitPairing = () =>{
  return useFetch('https://corona-network/pairing', "POST", null)
}
export const useWaitPairing = () =>{
  return useFetch('https://corona-network/pairing', "GET", null)
}
export const useJoinPairing = (body="") =>{
  return useFetch('https://corona-network/pairing', "PUT", body)
}

// Contacts API - Profile: Manage your contact list in the Corona Network
export const useGetContacts = () =>{
  return useFetch('https://corona-network/contacts', "GET", null)
}
export const useDeleteContact = (id="") =>{
  return useFetch(`https://corona-network/contacts/${id}`, "DELETE", null)
}
export const useGetContactProfile = (id="") =>{
  return useFetch(`https://corona-network/contacts/${id}/profile`, "GET", null)
}
export const useUpdateContact = (id="", body={"name": "test"}) =>{
  return useFetch(`https://corona-network/contacts/${id}/profile`, "PUT", body)
}

// Export all the callable API endpoints
export const API = {
  useGatewayStatus,
  useGatewayEnable,
  useGatewayDisable,

  useCreateProfile,
  useGetProfile,
  useUpdateProfile,
  useDeleteProfile,
  useUpdateAvatar,
  useDeleteAvatar,

  useInitPairing,
  useWaitPairing,
  useJoinPairing,

  useGetContacts,
  useDeleteContact,
  useGetContactProfile,
  useUpdateContact
}
