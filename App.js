import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {Store, persistor} from './src/redux/store';

import Checkpaystatus from './src/screens/Checkpaystatus';
import {LogBox} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Root from './src/navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {StripeProvider} from '@stripe/stripe-react-native';

const App = () => {
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);
  // LogBox.ignoreAllLogs();

  setInterval(() => {
    // Checkpaystatus('trail');
    // Checkpaystatus('subscriptiontrail');
    const token = Store.getState().USER.userData?.api_token;
    const logi = Store.getState().USER.userData;
    // console.log('------8888', token, logi);
    Checkpaystatus('trail', token, logi);
    Checkpaystatus('subscriptiontrail', token, logi);
  }, 15000);

  return (
    <StripeProvider
      publishableKey={
        'pk_test_51IdudfCvAFj9FKm2BjB9BBL8Os9tP9oShx9SWEZKChOsVUJj2tmoW4suTr1FK8TcqV8g6vzeNo8BPAxC1PGy3Ip1003XooWJb9'
      }
      merchantIdentifier="merchant.com.contourbody.app">
      <SafeAreaProvider>
        <Provider store={Store}>
          <PersistGate loading={null} persistor={persistor}>
            <Root />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </StripeProvider>
  );
};

export default App;
