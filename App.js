/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SNSMobileSDK from '@sumsub/react-native-mobilesdk-module';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  let launchSNSMobileSDK = () => {
    // From your backend get an access token for the applicant to be verified.
    // The token must be generated with `levelName` and `userId`,
    // where `levelName` is the name of a level configured in your dashboard.
    //
    // The sdk will work in the production or in the sandbox environment
    // depend on which one the `accessToken` has been generated on.
    //
    let accessToken = 'your_access_token';

    let snsMobileSDK = SNSMobileSDK.init(accessToken, () => {
      // this is a token expiration handler, will be called if the provided token is invalid or got expired
      // call your backend to fetch a new access token (this is just an example)
      return fetch('http://example.org/', {
        method: 'GET',
      }).then(resp => {
        // return a fresh token from here
        return 'new_access_token';
      });
    })
      .withHandlers({
        // Optional callbacks you can use to get notified of the corresponding events
        onStatusChanged: event => {
          console.log(
            'onStatusChanged: [' +
              event.prevStatus +
              '] => [' +
              event.newStatus +
              ']',
          );
        },
        onLog: event => {
          console.log('onLog: [Idensic] ' + event.message);
        },
      })
      .withDebug(true)
      .withLocale('en') // Optional, for cases when you need to override the system locale
      .build();

    snsMobileSDK
      .launch()
      .then(result => {
        console.log('SumSub SDK State: ' + JSON.stringify(result));
      })
      .catch(err => {
        console.log('SumSub SDK Error: ' + JSON.stringify(err));
      });
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text>{Platform.constants.Release}</Text>
        <Button
          title={'sumsub'}
          style={{marginTop: 300}}
          onPress={launchSNSMobileSDK}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
