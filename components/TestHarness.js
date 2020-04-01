import React, { useMemo } from 'react';
import { View, Text} from 'react-native';
import { GhostBridgeContext} from '../context/context'

export const TestHarness = () => {
  const {profile} = React.useContext(GhostBridgeContext)
  const {loading,ok,status,response} = profile;
  return useMemo(()=>{
    console.log(`component render:\n loading: ${loading}\n ok: ${ok }\n status: ${status}\n response: ${response}`)
    
    return (
      <View>
        <Text>
           loading:{String(loading)}  ok:{String(ok) } status:{status} response:{response}
        </Text>
      </View>
    )
  },[loading,ok,status,response]);
};