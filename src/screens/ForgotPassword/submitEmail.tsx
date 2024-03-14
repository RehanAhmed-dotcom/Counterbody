import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {forgotMail} from '../../lib/api';
import {Item, Label, Input, Icon} from 'native-base';
const SubmitEmail = ({navigation}) => {
  const [emailError, setEmailError] = useState(false);
  const [emailErr, setEmailErr] = useState('');
  const [email, setEmail] = useState('');
  const onChangeEmail = (Mail) => {
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
        <Icon1 name="arrowleft" size={20} onPress={() => navigation.goBack()} />
        <Text
          style={{marginLeft: 20, fontSize: 16, fontFamily: 'Nunito-SemiBold'}}>
          Forgot Password
        </Text>
      </View>
      <View style={{paddingHorizontal: 15, marginTop: 10}}>
        <Text style={{fontSize: 16, fontFamily: 'Nunito-Regular'}}>
          Enter your email to reset your
        </Text>
        <Text style={{fontSize: 16, fontFamily: 'Nunito-Regular'}}>
          password
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Item
          floatingLabel
          style={{
            width: '90%',
            marginTop: 50,
            marginBottom: 30,
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
            onChangeText={(Mail) => {
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
        </Item>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            if (validateEmail(email)) {
              forgotMail({email}).then((responce) => {
                // console.log('rss', responce);
                if (responce) {
                  navigation.navigate('EnterCode', {email});
                }
              });
              //
            } else {
              setEmailErr('ask');
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
            Send
          </Text>
          <Icon1 name="arrowright" color="white" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SubmitEmail;
