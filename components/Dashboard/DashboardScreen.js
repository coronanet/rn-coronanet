import React from 'react';
import { Icon, Layout, Text, Button, Card, CardHeader, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { View, SafeAreaView, ScrollView } from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import moment from "moment";

const Footer = createBottomTabNavigator();

export const DashboardContent = () => (
  <Footer.Navigator tabBar={props => <DashboardNavbar {...props} />}>
    <Footer.Screen name='Timeline' component={DashboardTimeline}/>
    <Footer.Screen name='Contacts' component={DashboardContacts}/>
    <Footer.Screen name='Events'   component={DashboardEvents}/>
  </Footer.Navigator>
);

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
);