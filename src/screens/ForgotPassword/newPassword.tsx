import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {resetPassword} from '../../lib/api';
import {Item, Label, Input} from 'native-base';
import {changenewpass} from '../../screens/ApiCountoryBody';
import Loader from '../../components/loader';

const NewPassword = ({navigation, route}) => {
  const [mail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [password_confirmation, setCon_Password] = useState('');
  const [conErr, setConErr] = useState('');
  const {email, token} = route.params;
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resmsg, setresmsg] = useState('');

  const showToast = () => {
    if (Platform.OS == 'android') {
      ToastAndroid.show(' Password Change Successfuly', ToastAndroid.SHORT);
    } else {
      Alert.alert('Password Change Successfuly');
    }
  };

  const onChangeEmail = Mail => {
    if (ValidateEmail(Mail)) {
      setEmail(Mail);
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };
  const ValidateEmail = email => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        email.replace(/\s/g, ''),
      )
    ) {
      return true;
    }
    return false;
  };

  const newpass = () => {
    setresmsg('');
    setLoading(true);
    console.log('registration start');
    const data = new FormData();
    data.append('password', password);
    data.append('password_confirmation', password_confirmation);
    data.append('email', email);
    data.append('token', token);
    console.log('data,,,,,', data);
    console.log('datae..........', data);
    changenewpass(data)
      .then(res => {
        console.log('varified   respone..........', res);

        if (res.status == 'success') {
          console.log('successs===========', res.message);
          setresmsg(res.message);
          showToast();
          navigation.navigate('Login');
          setLoading(false);
        }

        setLoading(false);
      })
      .catch(error => {
        console.log('Wrong code', error.response.data);
        // if(error.response.data.error=="This password reset token is invalid.")
        // {
        //   console.log("no Email token  Found===========",error.response.data.error);
        //   setresmsg(error.response.data.error);
        //   setLoading(false);
        // }
        // else{
        //   console.log("Error Message",error)
        // }
        setLoading(false);
      });
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
          style={{marginLeft: 20, fontSize: 16, fontFamily: 'Nunito-SemiBold'}}>
          Fotgot Password
        </Text>
      </View>
      <View style={{paddingHorizontal: 15, marginTop: 10}}>
        <Text style={{fontSize: 16, fontFamily: 'Nunito-Regular'}}>
          Please enter your new password
        </Text>
        <Loader visible={loading} />
        {/* <Text>password to update:</Text> */}
      </View>
      <View style={{alignItems: 'center'}}>
        <Item
          floatingLabel
          style={{
            width: '90%',
            marginTop: 30,
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
            onChangeText={Mail => {
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
            value={password_confirmation}
            secureTextEntry
            onChangeText={Mail => {
              conErr ? setConErr('') : null;
              setCon_Password(Mail);
            }}
            selectionColor={'white'}
            placeholder="FIRST NAME"
            style={{
              // fontFamily: fonts['Gotham-Book'],
              fontSize: 14,
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
            if (password && password_confirmation) {
              if (password != password_confirmation) {
                setPasswordErr('sad');
                setConErr('sad');
              } else {
                newpass();
                // navigation.navigate('Login');
              }
            } else {
              if (!password && !password_confirmation) {
                setPasswordErr('asf');
                setConErr('arr');
              } else if (!password) {
                setPasswordErr('asf');
              } else if (!password_confirmation) {
                setPasswordErr('as');
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
export default NewPassword;
