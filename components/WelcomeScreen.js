import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { Dimensions, View, Image } from 'react-native';

export const WelcomeScreen = ({ navigation }) => {
  const navigateSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{padding: 16}}>
        <Image
          style={{
            width:  Dimensions.get('window').width*0.75,
            height: Dimensions.get('window').width*0.75
          }}
          source={require('../assets/images/coronavirus.png')}
        />
      </View>
      <Text category='h1'>Corona Network</Text>
      <Text style={{paddingLeft: 16, paddingRight: 16, paddingTop: 16, textAlign: 'justify'}}>
        The <Text style={{fontStyle: 'italic'}}>Corona Network</Text> is a mobile
        app to aid in social distancing during the Coronavirus pandemic. It helps
        keeping an account of physical contacts and tracking suspected and confirmed
        infections within your friend circle. The goal is to act as an early warning
        system to self-isolate and to omit meeting potential carriers.{'\n'}{'\n'}

        <Text style={{fontStyle: 'italic', fontWeight: 'bold'}}>Your data is stored
        exclusively on your mobile device and shared directly, end-to-end encrypted,
        with your approved contacts. No cloud, no server, no tracking.</Text>
      </Text>
      <Button key={"register"} onPress={navigateSignup}>Register new user</Button>
    </Layout>
  )
};
