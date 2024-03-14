import {Image, StyleSheet, Text, View} from 'react-native';

import React from 'react';

const LogoCbshape = () => {
  // const {darkmd} = useSelector(({DARK}) => DARK);

  return (
    <View style={{alignSelf: 'center', marginVertical: 10}}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: 'black',
          marginTop: 10,
          alignSelf: 'center',
        }}>
        Cavitation & RF{'\n'} Consent Form
      </Text>
    </View>
  );
};
export default LogoCbshape;
