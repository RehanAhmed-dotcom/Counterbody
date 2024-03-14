import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  StatusBar,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import {shadow} from '../../lib';
const Logo = require('../../images/logo_title.png');
const SPLASH = ({navigation}: {navigation: any}) => {
  const {top, bottom} = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.brown,
        paddingTop: top,
        paddingBottom: bottom,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar
        animated={true}
        backgroundColor={colors.brown}
        barStyle="light-content"
      />
      <Image
        source={Logo}
        width={wp(60)}
        height={wp(60)}
        style={{width: wp(70), height: wp(70)}}
      />
      <Text
        style={{
          marginTop: wp(3),
          fontWeight: 'bold',
          marginBottom: wp(10),
          fontSize: wp(3.5),
          color: colors.white,
          textAlign: 'center',
        }}>
        Create Account or Login
      </Text>
      {/* <TouchableOpacity onPress={kebrdiss}><Text style={{ fontSize: 16 }}>keeey</Text></TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}
        activeOpacity={0.8}
        style={{
          borderRadius: wp(20),
          ...shadow(5),
          width: wp(70),
          backgroundColor: colors.brown,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 18,
          marginBottom: 18,
        }}>
        <Text
          style={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: wp(3.5),
            color: colors.white,
            textAlign: 'center',
          }}>
          SIGN IN
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp');
        }}
        activeOpacity={0.8}
        style={{
          borderRadius: wp(20),
          ...shadow(5),
          width: wp(70),
          backgroundColor: colors.brown,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 18,
        }}>
        <Text
          style={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: wp(3.5),
            color: colors.white,
            textAlign: 'center',
          }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default SPLASH;
