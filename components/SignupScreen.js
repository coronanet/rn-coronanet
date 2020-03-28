import React, { useState, useEffect } from 'react';
import { Layout, Text, Input, Button, CheckBox } from '@ui-kitten/components';
import { Dimensions, View, Image, ScrollView } from 'react-native';

export const SignupScreen = ({ navigation }) => {
  const navigateDash = () => {
    console.log("Creating profile");
    
    // TODO
    // Create new user profile and navigate to dashboard
    fetch('https://corona-network/profile', { method: 'POST' })
      .then(resp => {
        console.log(resp);
        if(resp.status === 200) {
          return true;
        } else {
          throw Error(resp.status);
        }
      })
      // .then(resp => console.log(resp))
      .then(resp => {
        console.log(resp);
        if(resp) {
          const profileInfo = {
            name: fName
          }
          console.log(profileInfo);
          
          fetch('https://corona-network/profile', { method: 'PUT', body: JSON.stringify(profileInfo) })
            .then(resp => {
              if(resp.status === 200) {
                console.log("Profile created successfully. Navigate to dash");
                navigation.navigate('Dashboard');
              }
            })
        }
      })
      .catch(e => console.error(e));
  };
  const [checked, setChecked] = useState(false);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ height: (Dimensions.get('window').width * 0.75 / 1.75) - 25 }}>
          <Image
            style={{
              top: -Dimensions.get('window').width * 0.75 / 1.75,
              width: Dimensions.get('window').width * 0.75,
              height: Dimensions.get('window').width * 0.75
            }}
            source={require('../assets/images/coronavirus.png')}
          />
        </View>
        <View style={{ width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
          <Text category='h4'>Register new user</Text>
          <Text style={{ paddingTop: 16, textAlign: 'justify' }}>
            Although this app does not enforce you to specify your real name, doing
            so nonetheless will help you and your contacts more clearly track the
            current status of the pandemic within your friend circle.{'\n'}{'\n'}
            <Text style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
              To avoid wasting developer time on niceties, for the forseeable future, you will not be able to change your name once registered.
            </Text>
          </Text>
          <View style={{ flexDirection: "row", padding: 16 }}>
            <View style={{ flex: 1, paddingRight: 8 }}>
              <Input value={fName} placeholder='Given Name' onChangeText={setFName} />
            </View>
            <View style={{ flex: 1, paddingLeft: 8 }}>
              <Input value={lName} placeholder='Family Name' onChangeText={setLName} />
            </View>
          </View>
          <View style={{ flexDirection: "row", padding: 16 }}>
            <CheckBox style={{ paddingLeft: 16, paddingRight: 16 }}
              text={
                `I understand that all information shown in the app was added voluntarily by users, and as such might be stale, incomplete and inaccurate. I acknowledge that the app *cannot* be used to indicate safety from the virus, it can only indicate potential danger. I agree to relieve the app authors of any and all liability and I assume resposibility for all my actions.`
              }
              checked={checked}
              onChange={onCheckedChange} />
          </View>
        </View>
      </ScrollView>
      <Button key={"register"} onPress={navigateDash} disabled={!checked || !fName}>Create user</Button>
    </Layout>
  );
};
