import React from 'react';
import { ScrollView } from 'react-native';
import { Layout, Text, Card, CardHeader } from '@ui-kitten/components';

import moment from "moment";
import { loadProfile } from '../hooks';
export const DashboardTimeline = () => {
    const [profile, loading] = loadProfile();
    return (
      <Layout>
        <ScrollView style={{ padding: 8 }}>
          <Card style={{ marginBottom: 4 }} header={() => <CardHeader title={`${profile.name} – Negative`} description={moment("20200314", "YYYYMMDD").fromNow()} />} status='success'>
            <Text style={{ fontStyle: 'italic', paddingBottom: 8 }} category='p2'>Tested for the virus, results are negative.</Text>
            <Layout style={{ flexDirection: 'row', paddingBottom: 8 }}>
              <Layout style={{ paddingRight: 8 }}>
                <Text category='p2'>Tested:</Text>
                <Text category='p2'>Results:</Text>
              </Layout>
              <Layout>
                <Text category='p2'>March 12, 2020</Text>
                <Text category='p2'>March 14, 2020</Text>
              </Layout>
            </Layout>
            <Text style={{ fontStyle: 'italic', textAlign: 'justify' }} appearance='hint' category='p2'>
              "Exam came back negative. It did include a warning that it might not
              detect small quantities of virus if you’re asymptomatic (which is my
              case). I might have been lucky, or maybe I already got it a long time
              ago (I had a strong flu after EthDenver and SF Blockchain week)."
            </Text>
          </Card>
          {/* Example cards */}
          <Card style={{ marginVertical: 4 }} header={() => <CardHeader title='Alex Van de Sande – Self Suspect' description={moment("20200312", "YYYYMMDD").fromNow()} />} status='warning'>
            <Text style={{ fontStyle: 'italic', paddingBottom: 8 }} category='p2'>Self-isolated and requested testing for the virus.</Text>
            <Text style={{ fontStyle: 'italic', textAlign: 'justify' }} appearance='hint' category='p2'>
              "Just tested myself for Sars-Cov-19 virus. Had mild flu symptoms but
              since I’ve been in close contact with people who tested positive it
              was the right thing to do. I could’ve done for free on the clinic in
              Brazil but decided to get home tested for $50."
            </Text>
          </Card>
          <Card style={{ marginVertical: 4 }} header={() => <CardHeader title='Alex Van de Sande – Auto Suspect' description={moment("20200311", "YYYYMMDD").fromNow()} />} status='warning'>
            <Text style={{ fontStyle: 'italic', paddingBottom: 8 }} category='p2'>Attended event with 8 confirmed virus carriers.</Text>
            <Layout style={{ flexDirection: 'row', paddingBottom: 8 }}>
              <Layout style={{ paddingRight: 8 }}>
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
          <Card style={{ marginTop: 4, marginBottom: 12 }} header={() => <CardHeader title='Zhen Yu Yong – Positive' description={moment("20200311", "YYYYMMDD").fromNow()} />} status='danger'>
            <Text style={{ fontStyle: 'italic', paddingBottom: 8 }} category='p2'>Tested for the virus, results are positive.</Text>
            <Layout style={{ flexDirection: 'row', paddingBottom: 8 }}>
              <Layout style={{ paddingRight: 8 }}>
                <Text category='p2'>Tested:</Text>
                <Text category='p2'>Results:</Text>
              </Layout>
              <Layout>
                <Text category='p2'>March 11, 2020</Text>
                <Text category='p2'>March 11, 2020</Text>
              </Layout>
            </Layout>
            <Text style={{ fontStyle: 'italic', textAlign: 'justify' }} appearance='hint' category='p2'>
              "I fell ill yesterday and have just been diagnosed with #COVID2019.
              Everybody who had close contact @EthCC or @ETHLondonwith me should
              take extra precautions and/or get tested"
            </Text>
          </Card>
        </ScrollView>
      </Layout>
    );
  };