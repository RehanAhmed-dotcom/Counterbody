import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  TextInput,
  Alert,
} from 'react-native';
import {Item, Label, Input, Icon} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../lib/api';

import SplashScreen from 'react-native-splash-screen';
import {logged, userdata} from '../../redux/actions';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const dispatch = useDispatch();

  const onChangeEmail = Mail => {
    if (validateEmail(Mail)) {
      setEmail(Mail);
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };
  const validateEmail = (emailC: String) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      emailC.replace(/\s/g, ''),
    );
  };
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        source={require('../../images/backImage.png')}
        style={{height: hp(100), width: wp(100)}}>
        {/* <KeyboardAvoidingView behavior="height"> */}
        <View
          style={{
            // backgroundColor: 'red',
            // flex: 1,
            height: hp(20),
            justifyContent: 'center',
            paddingHorizontal: 15,
            // bottom: 30,
          }}>
          <Icon1
            style={{marginTop: 20}}
            name="arrowleft"
            color="white"
            size={20}
            onPress={() => navigation.navigate('AuthSelection')}
          />
        </View>
        <View
          style={{
            // flex: 3,
            height: hp(60),
            // backgroundColor: 'blue',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{width: '100%', paddingHorizontal: 15, marginBottom: 25}}>
            <Text>
              <Text style={{fontFamily: 'Nunito-SemiBold', fontSize: 16}}>
                {' '}
                Welcome to the
              </Text>{' '}
              <Text style={{fontFamily: 'Nunito-Bold', fontSize: 16}}>
                R.R.F.F
              </Text>
            </Text>
          </View>
          <Item
            floatingLabel
            style={{
              width: '90%',
              marginTop: 50,
              marginBottom: 20,
              borderBottomColor: validateEmail(email)
                ? emailErr
                  ? 'red'
                  : '#45A0D1'
                : email == ''
                ? emailErr
                  ? 'red'
                  : '#797979'
                : 'red',
            }}
            success={validateEmail(email) === true}
            error={emailError}>
            <Label
              style={{
                fontSize: 14,
                fontFamily: 'Nunito-Regular',
                color: '#797979',
              }}>
              Email
            </Label>
            <Input
              value={email}
              onChangeText={Mail => {
                emailErr ? setEmailErr('') : null;
                setEmail(Mail.toLowerCase());
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
            {email !== '' && validateEmail(email) === true && (
              <Icon name="checkmark-circle" style={{color: '#45A0D1'}} />
            )}
            {/* {emailError && (
              <Text style={{color: 'red', fontSize: 10}}>Invalid Email</Text>
            )} */}
          </Item>
          <Item
            floatingLabel
            style={{
              width: '90%',
              // height: hp(7),
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
              Password
            </Label>
            <Input
              value={password}
              secureTextEntry
              onChangeText={Pass => {
                passwordErr ? setPasswordErr('') : null;
                setPassword(Pass);
              }}
              selectionColor={'white'}
              placeholder="FIRST NAME"
              style={{
                // height: hp(7),
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

          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SubmitEmail')}>
              <Text style={{fontSize: 14, fontFamily: 'Nunito-SemiBold'}}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            // flex: 1,
            height: hp(20),
            // backgroundColor: 'red',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              if (validateEmail(email) && password) {
                login({email, password}).then(responce => {
                  if (responce) {
                    console.log(responce);
                    logged(responce)(dispatch);
                    // navigation.navigate('Home');
                  } else {
                    Alert.alert('Wrong Email or Password');
                  }
                });
                // navigation.navigate('Home');
              } else {
                if (!validateEmail(email) && !password) {
                  setEmailErr('asf');
                  setPasswordErr('asdf');
                } else if (!validateEmail(email)) {
                  setEmailErr('asf');
                } else if (!password) {
                  setPasswordErr('asdf');
                }
              }
              // navigation.navigate('Home');
            }}
            style={{
              height: hp(7),
              borderRadius: 30,
              paddingHorizontal: 30,
              width: wp(90),
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
              alignItems: 'center',
              backgroundColor: '#45A0D1',
              elevation: 4,
            }}>
            <Text
              style={{color: 'white', fontSize: 16, fontFamily: 'Nunito-Bold'}}>
              Login
            </Text>
            <Icon1 name="arrowright" color="white" size={25} />
          </TouchableOpacity>
        </View>
        {/* </KeyboardAvoidingView> */}
      </ImageBackground>
    </View>
  );
};
export default Login;
