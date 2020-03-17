import React from 'react';
import { ApplicationProvider, useTheme, IconRegistry, Icon, Layout, Text, Input, Button, CheckBox, List, ListItem, Card, CardHeader, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { mapping, light as theme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Dimensions, View, Image, SafeAreaView, ScrollView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import QRCode from 'react-native-qrcode-svg';
import moment from "moment";

const Header = createStackNavigator();
const Footer = createBottomTabNavigator();

const App = () => (
  <React.Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={theme}>
      <WelcomeScreen />
      {/* <SignupScreen />    */}
      {/* <DashboardScreen /> */}
    </ApplicationProvider>
  </React.Fragment>
);

const WelcomeScreen = () => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{padding: 16}}>
        <Image
          style={{
            width:  Dimensions.get('window').width*0.75,
            height: Dimensions.get('window').width*0.75
          }}
          source={require('./assets/images/coronavirus.png')}
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
      <Button key={"register"}>Register new user</Button>
    </Layout>
  )
};

const SignupScreen = () => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center', top: -Dimensions.get('window').width*0.75/3}}>
      <View style={{paddingHorizontal: 16}}>
        <Image
          style={{
            width:  Dimensions.get('window').width*0.75,
            height: Dimensions.get('window').width*0.75
          }}
          source={require('./assets/images/coronavirus.png')}
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
      <CheckBox style={{paddingLeft: 16, paddingRight: 16, paddingBottom: 16}} text={
        `I understand that all information shown in the app was added voluntarily by users, and as such might be stale, incomplete and inaccurate. I acknowledge that the app *cannot* be used to indicate safety from the virus, it can only indicate potential danger. I agree to relieve the app authors of any and all liability and I assume resposibility for all my actions.`} />
      <Button key={"register"} onPress={() => {alert("Hi")}}>Create user</Button>
    </Layout>
  )
}

const DashboardScreen = () => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Header.Navigator headerMode="screen" screenOptions={{
        headerTintColor: 'white', headerStyle: {backgroundColor: theme['color-warning-default']}
      }}>
        <Header.Screen name="Dashboard" component={DashboardContent} options={{title: 'Péter Szilágyi – Home Quarantine'}}/>
      </Header.Navigator>
    </NavigationContainer>
  )
}

const DashboardContent = () => (
  <Footer.Navigator tabBar={props => <DashboardNavbar {...props} />}>
    <Footer.Screen name='Timeline' component={DashboardTimeline}/>
    <Footer.Screen name='Contacts' component={DashboardContacts}/>
    <Footer.Screen name='Events'   component={DashboardEvents}/>
  </Footer.Navigator>
)

const DashboardNavbar = ({navigation, state}) => {
  const onSelect = (index) => {
    navigation.navigate(state.routeNames[index]);
  };
  return (
    <SafeAreaView>
      <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
        <BottomNavigationTab title='TIMELINE' icon={(style) => <Icon {...style} name='activity-outline'/>} />
        <BottomNavigationTab title='CONTACTS' icon={(style) => <Icon {...style} name='people-outline'/>} />
        <BottomNavigationTab title='EVENTS'   icon={(style) => <Icon {...style} name='droplet-outline'/>} />
      </BottomNavigation>
    </SafeAreaView>
  );
};

const DashboardTimeline = () => (
  <Layout>
    <ScrollView style={{padding: 8}}>
      <Card style={{marginBottom: 4}} header={() => <CardHeader title='Alex Van de Sande – Negative' description={moment("20200314", "YYYYMMDD").fromNow()}/>} status='success'>
        <Text style={{fontStyle: 'italic', paddingBottom: 8}} category='p2'>Tested for the virus, results are negative.</Text>
        <Layout style={{flexDirection: 'row', paddingBottom: 8}}>
          <Layout style={{paddingRight: 8}}>
            <Text category='p2'>Tested:</Text>
            <Text category='p2'>Results:</Text>
          </Layout>
          <Layout>
            <Text category='p2'>March 12, 2020</Text>
            <Text category='p2'>March 14, 2020</Text>
          </Layout>
        </Layout>
        <Text style={{fontStyle: 'italic', textAlign: 'justify'}} appearance='hint' category='p2'>
          "Exam came back negative. It did include a warning that it might not
          detect small quantities of virus if you’re asymptomatic (which is my
          case). I might have been lucky, or maybe I already got it a long time
          ago (I had a strong flu after EthDenver and SF Blockchain week)."
        </Text>
      </Card>
      <Card style={{marginVertical: 4}} header={() => <CardHeader title='Alex Van de Sande – Self Suspect' description={moment("20200312", "YYYYMMDD").fromNow()}/>} status='warning'>
        <Text style={{fontStyle: 'italic', paddingBottom: 8}} category='p2'>Self-isolated and requested testing for the virus.</Text>
        <Text style={{fontStyle: 'italic', textAlign: 'justify'}} appearance='hint' category='p2'>
          "Just tested myself for Sars-Cov-19 virus. Had mild flu symptoms but
          since I’ve been in close contact with people who tested positive it
          was the right thing to do. I could’ve done for free on the clinic in
          Brazil but decided to get home tested for $50."
        </Text>
      </Card>
      <Card style={{marginVertical: 4}} header={() => <CardHeader title='Alex Van de Sande – Auto Suspect' description={moment("20200311", "YYYYMMDD").fromNow()}/>} status='warning'>
        <Text style={{fontStyle: 'italic', paddingBottom: 8}} category='p2'>Attended event with 8 confirmed virus carriers.</Text>
        <Layout style={{flexDirection: 'row', paddingBottom: 8}}>
          <Layout style={{paddingRight: 8}}>
            <Text category='p2'>Event:</Text>
            <Text category='p2'>Date:</Text>
            <Text category='p2'>Place:</Text>
          </Layout>
          <Layout>
            <Text category='p2'>EthCC 3</Text>
            <Text category='p2'>March 3-5, 2020</Text>
            <Text category='p2'>Maison de la Mutualité, Paris, France</Text>
          </Layout>
        </Layout>
      </Card>
      <Card style={{marginTop: 4, marginBottom: 12}} header={() => <CardHeader title='Zhen Yu Yong – Positive' description={moment("20200311", "YYYYMMDD").fromNow()}/>} status='danger'>
        <Text style={{fontStyle: 'italic', paddingBottom: 8}} category='p2'>Tested for the virus, results are positive.</Text>
        <Layout style={{flexDirection: 'row', paddingBottom: 8}}>
          <Layout style={{paddingRight: 8}}>
            <Text category='p2'>Tested:</Text>
            <Text category='p2'>Results:</Text>
          </Layout>
          <Layout>
            <Text category='p2'>March 11, 2020</Text>
            <Text category='p2'>March 11, 2020</Text>
          </Layout>
        </Layout>
        <Text style={{fontStyle: 'italic', textAlign: 'justify'}} appearance='hint' category='p2'>
          "I fell ill yesterday and have just been diagnosed with #COVID2019.
          Everybody who had close contact @EthCC or @ETHLondonwith me should
          take extra precautions and/or get tested"
        </Text>
      </Card>
    </ScrollView>
  </Layout>
)

const DashboardContacts = () => (
  <Layout>
    <ScrollView style={{padding: 8}}>
      <View style={{flexDirection:"row"}}>
        <View style={{flex:1, paddingRight: 4}}>
          <Button appearance='outline' status='info'>Add new contact</Button>
        </View>
      </View>
      <Card style={{marginVertical: 4}} header={() => <CardHeader title='Positive carriers'/>} status='danger' titleStyle={{}}>
        <Text style={{fontStyle: 'italic', textAlign: 'justify', paddingBottom: 8}} category='p2'>
          Contacts in this list self-reported positive virus infection. Avoid them
          until relevant authorities give the green light for them to rejoin society.
        </Text>
        {/*<Text style={{fontStyle: 'italic', fontWeight: 'bold', textAlign: 'justify'}} category='p2'>
          No contacts are reporting infection currently.
        </Text>*/}
        <Layout style={{flexDirection: 'row'}}>
          <Layout style={{paddingRight: 8}}>
            <Text style={{fontWeight: 'bold'}} category='p2'>Zhen Yu Yong:</Text>
          </Layout>
          <Layout>
            <Text category='p2'>March 11, 2020</Text>
          </Layout>
        </Layout>
      </Card>
      <Card style={{marginVertical: 4}} header={() => <CardHeader title='Potential carriers'/>} status='warning'>
        <Text style={{fontStyle: 'italic', textAlign: 'justify', paddingBottom: 8}} category='p2'>
          Contacts in this list either self-reported potential virus infection,
          or they have been flagged automatically for participating in an event
          with a confirmed positive carrier. Request them to self-isolate for two
          weeks and avoid meeting them until their isolation time expires.
        </Text>
        {/*<Text style={{fontStyle: 'italic', fontWeight: 'bold', textAlign: 'justify'}} category='p2'>
          No contacts are reporting suspicion currently.
        </Text>*/}
        <Layout style={{flexDirection: 'row'}}>
          <Layout style={{paddingRight: 8}}>
            <Text style={{fontWeight: 'bold'}} category='p2'>Guillaume Ballet:</Text>
          </Layout>
          <Layout style={{paddingRight: 8}}>
            <Text category='p2'>Suspicion:</Text>
            <Text category='p2'>Expiry:</Text>
          </Layout>
          <Layout>
            <Text category='p2'>March 5, 2020</Text>
            <Text category='p2'>March 19, 2020</Text>
          </Layout>
        </Layout>
      </Card>
      <Card style={{marginTop: 4, marginBottom: 12}} header={() => <CardHeader title='Unknown status'/>} status='info'>
        <Text style={{fontStyle: 'italic', textAlign: 'justify'}} category='p2'>
          Contacts in this list *seem* to not be current carriers of the virus based
          on the data they self-reported. They may still be unaware, or unwilling to
          self report. Avoid people who you do not trust to thruthfully share their
          status.
        </Text>
        <Layout style={{flexDirection: 'row', paddingTop: 8}}>
          <Layout style={{paddingRight: 8}}>
            <Text style={{fontWeight: 'bold'}} category='p2'>Alex Van De Sande:</Text>
          </Layout>
          <Layout>
            <Text category='p2'>Negative at March 14, 2020</Text>
          </Layout>
        </Layout>
      </Card>
    </ScrollView>
  </Layout>
)

const DashboardEvents = () => (
  <Layout>
    <ScrollView style={{padding: 8}}>
      <View style={{flexDirection:"row"}}>
        <View style={{flex:1, paddingRight: 4}}>
          <Button appearance='outline' status='info'>Create new event</Button>
        </View>
        <View style={{flex:1, paddingLeft: 4}}>
          <Button appearance='outline' status='info'>Join existing event</Button>
        </View>
      </View>
      <Card style={{marginVertical: 4}} header={() => <CardHeader title='CoronaNet Test Event' description='March 15-30, 2020 – My Home'/>} status='info'>
        <Text style={{fontStyle: 'italic', textAlign: 'justify'}} category='p2'>
          Maintained by Péter Szilágyi. Last sync 2 hours ago.
        </Text>
        <Layout style={{flexDirection: 'row', paddingVertical: 8}}>
          <Layout style={{paddingRight: 8}}>
            <Text category='p2'>2</Text>
          </Layout>
          <Layout>
            <Text category='p2'>participants did not report</Text>
          </Layout>
        </Layout>
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontStyle: 'italic', textAlign: 'justify'}} category='p2'>
            Event open until March 30, 2020. Participants can join via:
          </Text>
          <View style={{paddingTop: 8}}>
            <QRCode value="coronanet-event://dba018aee0d45c7a805f1d5ddcb1ad843d9f3d006972999e3b8fed747193d691" />
          </View>
        </Layout>
      </Card>
      <Card style={{marginVertical: 4}} header={() => <CardHeader title='Stateless Summit – Infected' description='March 7-8, 2020 – Paris, France'/>} status='danger'>
        <Text style={{fontStyle: 'italic', textAlign: 'justify'}} category='p2'>
          Maintained by Piper Merriam. Last sync 1 hour ago.
        </Text>
        <Layout style={{flexDirection: 'row', paddingVertical: 8}}>
          <Layout style={{paddingRight: 8}}>
            <Text category='p2' status='danger'>2</Text>
            <Text category='p2' status='warning'>4</Text>
            <Text category='p2' status='success'>2</Text>
            <Text category='p2'>22</Text>
          </Layout>
          <Layout>
            <Text category='p2' status='danger'>self-reported positive infection</Text>
            <Text category='p2' status='warning'>self-reported pending testing</Text>
            <Text category='p2' status='success'>self-reported negative tests</Text>
            <Text category='p2'>participants did not report</Text>
          </Layout>
        </Layout>
        <Text style={{fontStyle: 'italic', textAlign: 'justify'}} category='p2'>
          Event ended March 8, 2020; cannot be joined any more. This entry will
          be automatically deleted on April 8, 2020.
        </Text>
      </Card>
      <Card style={{marginBottom: 12}} header={() => <CardHeader title='EthCC 3 – Infected' description='March 3-5, 2020 – Paris, France'/>} status='danger' titleStyle={{}}>
        <Text style={{fontStyle: 'italic', textAlign: 'justify'}} category='p2'>
          Maintained by John Doe. Last sync 3 days ago.
        </Text>
        <Layout style={{flexDirection: 'row', paddingVertical: 8}}>
          <Layout style={{paddingRight: 8}}>
            <Text category='p2' status='danger'>9</Text>
            <Text category='p2' status='warning'>7</Text>
            <Text category='p2' status='success'>4</Text>
            <Text category='p2'>256</Text>
          </Layout>
          <Layout>
            <Text category='p2' status='danger'>self-reported positive infection</Text>
            <Text category='p2' status='warning'>self-reported pending testing</Text>
            <Text category='p2' status='success'>self-reported negative tests</Text>
            <Text category='p2'>participants did not report</Text>
          </Layout>
        </Layout>
        <Text style={{fontStyle: 'italic', textAlign: 'justify'}} category='p2'>
          Event ended March 5, 2020; cannot be joined any more. Will be auto-deleted
          on April 5, 2020.
        </Text>
      </Card>
    </ScrollView>
  </Layout>
)

export default App;
