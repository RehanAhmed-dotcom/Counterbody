import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {changePass} from '../../lib/api';
import {Item, Label, Input} from 'native-base';
const ChangePassword = ({navigation}) => {
  const {user} = useSelector(({USER}) => ({
    user: USER.userData,
  }));
  const [email, setEmail] = useState('');
  const [old, setOld] = useState('');
  const [oldErr, setOldErr] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [con_Password, setCon_Password] = useState('');
  const [conErr, setConErr] = useState('');

  const [emailError, setEmailError] = useState(false);
  const onChangeEmail = (Mail) => {
    if (ValidateEmail(Mail)) {
      setEmail(Mail);
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };
  const ValidateEmail = (email) => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        email.replace(/\s/g, ''),
      )
    ) {
      return true;
    }
    return false;
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 56,
          backgroundColor: 'white',
          elevation: 3,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
        }}>
        <Icon name="arrowleft" size={20} onPress={() => navigation.goBack()} />
        <Text
          style={{marginLeft: 20, fontFamily: 'Nunito-SemiBold', fontSize: 16}}>
          Change Password
        </Text>
      </View>
      <View style={{paddingHorizontal: 15, marginTop: 10}}>
        <Text style={{fontSize: 16, fontFamily: 'Nunito-SemiBold'}}>
          Please enter old and new
        </Text>
        <Text style={{fontSize: 16, fontFamily: 'Nunito-SemiBold'}}>
          password to update:
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Item
          floatingLabel
          style={{
            width: '90%',
            marginBottom: 10,
            marginTop: 10,
            borderBottomColor: oldErr ? 'red' : '#797979',
          }}
          // error={emailError}
        >
          <Label
            style={{
              fontSize: 14,
              fontFamily: 'Nunito-Regular',
              color: '#797979',
            }}>
            Old Password
          </Label>
          <Input
            value={old}
            secureTextEntry
            onChangeText={(Mail) => {
              oldErr ? setOldErr('') : null;
              setOld(Mail);
            }}
            selectionColor={'white'}
            placeholder="FIRST NAME"
            style={{
              // fontFamily: fonts['Gotham-Book'],
              fontSize: 16,
              color: 'black',
            }}
            // selectionColor={'white'}
            // {...globalStyles.placeholderTextColor}
            autoCapitalize="none"
            returnKeyType="next"
          />
          {/* {emailError && (
              <Text style={{color: 'red', fontSize: 10}}>Invalid Email</Text>
            )} */}
        </Item>
        <Item
          floatingLabel
          style={{
            width: '90%',
            marginBottom: 10,
            borderBottomColor: passwordErr ? 'red' : '#797979',
          }}
          // error={emailError}
        >
          <Label
            style={{
              fontSize: 14,
              fontFamily: 'Nunito-Regular',
              color: '#797979',
            }}>
            New Password
          </Label>
          <Input
            value={password}
            secureTextEntry
            onChangeText={(Mail) => {
              passwordErr ? setPasswordErr('') : null;
              setPassword(Mail);
            }}
            selectionColor={'white'}
            placeholder="FIRST NAME"
            style={{
              // fontFamily: fonts['Gotham-Book'],
              fontSize: 16,
              color: 'black',
            }}
            // selectionColor={'white'}
            // {...globalStyles.placeholderTextColor}
            autoCapitalize="none"
            returnKeyType="next"
          />
          {/* {emailError && (
              <Text style={{color: 'red', fontSize: 10}}>Invalid Email</Text>
            )} */}
        </Item>
        <Item
          floatingLabel
          style={{
            width: '90%',
            marginBottom: 10,
            borderBottomColor: conErr ? 'red' : '#797979',
          }}
          // error={emailError}
        >
          <Label
            style={{
              fontSize: 14,
              fontFamily: 'Nunito-Regular',
              color: '#797979',
            }}>
            Confirm new Password
          </Label>
          <Input
            value={con_Password}
            secureTextEntry
            onChangeText={(Mail) => {
              conErr ? setConErr('') : null;
              setCon_Password(Mail);
            }}
            selectionColor={'white'}
            placeholder="Confirm new Password"
            style={{
              // fontFamily: fonts['Gotham-Book'],
              fontSize: 16,
              color: 'black',
            }}
            // selectionColor={'white'}
            // {...globalStyles.placeholderTextColor}
            autoCapitalize="none"
            returnKeyType="next"
          />
          {/* {emailError && (
              <Text style={{color: 'red', fontSize: 10}}>Invalid Email</Text>
            )} */}
        </Item>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            if (old && password && con_Password) {
              if (password != con_Password) {
                setPasswordErr('sad');
                setConErr('sad');
              } else {
                changePass({
                  Auth: user?.userdata?.api_token,
                  old_password: old,
                  password: password,
                  password_confirmation: con_Password,
                }).then((responce) => {
                  if (responce.status == 'success') {
                    console.log('rsp', responce);
                    navigation.navigate('Home');
                  } else if (responce.status == 'error') {
                    console.log('rsp', responce);
                    Alert.alert('Wrong old password');
                  } else {
                    Alert.alert('Something went wrong');
                  }
                });
              }
            } else {
              if (!old && !password && !con_Password) {
                setOldErr('sad');
                setPasswordErr('as');
                setConErr('ass');
              } else if (!old) {
                setOldErr('asd');
              } else if (!password) {
                setPasswordErr('assd');
              } else if (!con_Password) {
                setConErr('asdd');
              }
            }
          }}
          style={{
            height: hp(7),
            borderRadius: 30,
            paddingHorizontal: 30,
            marginTop: 20,
            width: wp(90),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#45A0D1',
            elevation: 4,
          }}>
          <Text
            style={{color: 'white', fontSize: 16, fontFamily: 'Nunito-Bold'}}>
            Update
          </Text>
          <Icon name="arrowright" color="white" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ChangePassword;
