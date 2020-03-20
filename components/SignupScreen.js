import React from 'react';
import { Layout, Text, Input, Button, CheckBox } from '@ui-kitten/components';
import { Dimensions, View, Image } from 'react-native';

export const SignupScreen = ({ navigation }) => {
  const navigateDash = () => {
    console.log("Navigate to dashboard");
    
    navigation.navigate('Dashboard');
  };
  return (
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center', top: -Dimensions.get('window').width*0.75/3}}>
        <View style={{paddingHorizontal: 16}}>
          <Image
            style={{
              width:  Dimensions.get('window').width*0.75,
              height: Dimensions.get('window').width*0.75
            }}
            source={require('../assets/images/coronavirus.png')}
          />
        </View>
        <Text category='h4'>Register new user</Text>
        <Text style={{paddingLeft: 16, paddingRight: 16, paddingTop: 16, textAlign: 'justify'}}>
          Although this app does not enforce you to specify your real name, doing
          so nonetheless will help you and your contacts more clearly track the
          current status of the pandemic within your friend circle.{'\n'}{'\n'}
  
          <Text style={{fontStyle: 'italic', fontWeight: 'bold'}}>To avoid wasting
          developer time on niceties, for the forseeable future, you will not be able
          to change your name once registered.</Text>
        </Text>
        <View style={{flexDirection:"row", padding: 16}}>
          <View style={{flex:1, paddingRight: 8}}>
            <Input placeholder='Given Name'/>
          </View>
          <View style={{flex:1, paddingLeft: 8}}>
            <Input placeholder='Family Name'/>
          </View>
        </View>
        {/* <CheckBox style={{paddingLeft: 16, paddingRight: 16, paddingBottom: 16}} text={
          `I understand that all information shown in the app was added voluntarily by users, and as such might be stale, incomplete and inaccurate. I acknowledge that the app *cannot* be used to indicate safety from the virus, it can only indicate potential danger. I agree to relieve the app authors of any and all liability and I assume resposibility for all my actions.`} /> */}
        <Button key={"register"} onPress={navigateDash}>Create user</Button>
        {/* <Button key={"register"} onPress={navigateSignup}>Register new user</Button> */}
      </Layout>
  );
};