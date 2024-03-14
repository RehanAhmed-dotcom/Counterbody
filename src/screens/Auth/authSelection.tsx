import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import SplashScreen from 'react-native-splash-screen';

const AuthSelection = ({navigation}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../../images/logo.png')}
        style={{height: 200, width: 200}}
      />
      <Text
        style={{
          marginTop: hp(10),
          fontSize: 16,
          fontFamily: 'Nunito-SemiBold',
        }}>
        Create Account or Login
      </Text>
      <View style={{alignItems: 'center', marginTop: 30}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{
            height: hp(7),
            borderRadius: 30,
            paddingHorizontal: 30,
            width: wp(90),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#45A0D1',
            elevation: 4,
          }}>
          <Text
            style={{color: 'white', fontSize: 16, fontFamily: 'Nunito-Bold'}}>
            Login
          </Text>
          <Icon name="arrowright" color="white" size={25} />
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={{
            height: hp(7),
            borderRadius: 30,
            paddingHorizontal: 30,
            width: wp(90),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#45A0D1',
            elevation: 4,
          }}>
          <Text
            style={{color: 'white', fontSize: 16, fontFamily: 'Nunito-Bold'}}>
            Sign Up
          </Text>
          <Icon name="arrowright" color="white" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AuthSelection;
