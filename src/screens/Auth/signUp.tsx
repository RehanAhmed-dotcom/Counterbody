import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {register} from '../../lib/api';
import CheckBox from 'react-native-check-box';
import {useDispatch, useSelector} from 'react-redux';
import {logged, userdata} from '../../redux/actions';
import {Item, Label, Input, Icon} from 'native-base';
import Icon1 from 'react-native-vector-icons/AntDesign';
// import {launchImageLibrary} from 'react-native-image-picker';
const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const [first, setFirst] = useState('');
  const [firstErr, setFirstErr] = useState('');
  const [last, setLast] = useState('');
  const [lastErr, setLastErr] = useState('');
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [con_Password, setCon_Password] = useState('');
  const [conErr, setConErr] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [contactErr, setContactErr] = useState('');
  const [pic, setPic] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedErr, setIsCheckedErr] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [emailError, setEmailError] = useState(false);
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
  const choosePic = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    // launchImageLibrary(options, (response) => {
    //   console.log('Response = ', response.uri);

    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     const source = {uri: response.uri};

    //     // You can also display the image using data:
    //     // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    //     setPic(source);
    //   }
    // });
  };
  // console.log(first);
  // console.log(firstErr);
  // console.log(last);
  // console.log(lastErr);
  // console.log(email);
  // console.log(emailErr);
  // console.log(password);
  // console.log(passwordErr);
  // console.log(con_Password);
  // console.log(conErr);
  // console.log(contactNo);
  // console.log(contactErr);
  // console.log(isChecked);
  // console.log(isCheckedErr);

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../images/backImage.png')}
        style={{flex: 1, height: '100%', width: '100%'}}>
        <View
          style={{
            // flex: 1,
            height: hp(12),
            justifyContent: 'center',
            paddingHorizontal: 15,
            // backgroundColor: 'blue',
          }}>
          <Icon1
            name="arrowleft"
            size={20}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </View>
        <ScrollView>
          <View
            style={{
              // flex: 6,
              // height: hp(70),
              alignItems: 'center',
              // bottom: 20,
              // backgroundColor: 'red',
            }}>
            <View style={{height: 100, width: 100}}>
              <TouchableOpacity onPress={choosePic}>
                {pic ? (
                  <Image
                    style={{
                      height: 100,
                      //   borderWidth: 1,
                      // borderColor: 'black',
                      borderRadius: 50,
                      width: 100,
                      // marginBottom: hp('5%'),
                    }}
                    source={pic}
                  />
                ) : (
                  <Image
                    source={require('../../images/placeholder.png')}
                    style={{height: 100, width: 100}}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={{width: wp(90)}}>
              <Text
                style={{
                  fontFamily: 'Nunito-Bold',
                  fontSize: 16,
                  marginTop: 20,
                }}>
                Create An Account
              </Text>
            </View>
            <Item
              floatingLabel
              style={{
                width: '90%',
                marginTop: 10,
                marginBottom: 10,
                borderBottomColor: firstErr ? 'red' : '#797979',
              }}
              // error={emailError}
            >
              <Label
                style={{
                  fontSize: 14,
                  fontFamily: 'Nunito-Regular',
                  color: '#797979',
                }}>
                First Name
              </Label>
              <Input
                value={first}
                onChangeText={(Con) => {
                  firstErr ? setFirstErr('') : null;
                  setFirst(Con);
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
                // marginTop: 10,
                borderBottomColor: lastErr ? 'red' : '#797979',
              }}
              // error={emailError}
            >
              <Label
                style={{
                  fontSize: 14,
                  fontFamily: 'Nunito-Regular',
                  color: '#797979',
                }}>
                Last Name
              </Label>
              <Input
                value={last}
                onChangeText={(Con) => {
                  lastErr ? setLastErr('') : null;
                  setLast(Con);
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
                // marginTop: 10,
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
                Password
              </Label>
              <Input
                value={password}
                secureTextEntry
                onChangeText={(Con) => {
                  passwordErr ? setPasswordErr('') : null;
                  setPassword(Con);
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
                Confirm Password
              </Label>
              <Input
                secureTextEntry
                value={con_Password}
                onChangeText={(Con) => {
                  conErr ? setConErr('') : null;
                  setCon_Password(Con);
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
                borderBottomColor: contactErr ? 'red' : '#797979',
              }}
              // error={emailError}
            >
              <Label
                style={{
                  fontSize: 14,
                  fontFamily: 'Nunito-Regular',
                  color: '#797979',
                }}>
                Contact no
              </Label>
              <Input
                keyboardType="number-pad"
                value={contactNo}
                onChangeText={(Con) => {
                  contactErr ? setContactErr('') : null;
                  setContactNo(Con);
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
            {/* <View style={{flexDirection: 'row', marginTop: 10, width: wp(90)}}>
              <CheckBox
                uncheckedCheckBoxColor={isCheckedErr ? 'red' : '#45A0D1'}
                checkedCheckBoxColor="#45A0D1"
                style={{}}
                onClick={() => {
                  isCheckedErr ? setIsCheckedErr('') : null;
                  setIsChecked(!isChecked);
                  setDisableButton(false);
                }}
                isChecked={isChecked}
              />
              <Text
                style={{
                  marginLeft: 5,
                  color: '#45A0D1',
                  // fontFamily: 'Raleway-Regular',
                }}>
                I accept all terms and conditions
              </Text>
            </View> */}
          </View>

          <View
            style={{
              flex: 1,
              // height: hp(18),
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              // backgroundColor: 'blue',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (
                  first &&
                  last &&
                  validateEmail(email) &&
                  password &&
                  con_Password &&
                  // isCheckedErr &&
                  contactNo
                ) {
                  if (password != con_Password) {
                    setPasswordErr('sad');
                    setConErr('sad');
                  } else {
                    const data = new FormData();
                    data.append('firstname', first);
                    data.append('lastname', last);
                    data.append('phoneno', contactNo);
                    data.append('email', email);
                    data.append('password', password);
                    data.append('password_confirmation', con_Password);
                    {
                      pic
                        ? data.append('image', {
                            uri: pic.uri,
                            type: 'image/jpeg',
                            name: 'image' + new Date() + '.jpg',
                          })
                        : null;
                    }
                    register(data).then((responce) => {
                      if (responce) {
                        if (responce.validaterror == 1) {
                          Alert.alert('Email not Avalible');
                        } else {
                          logged(responce)(dispatch);
                        }
                      } else {
                        Alert.alert('Something went wrong!!');
                      }
                    });
                    //
                  }
                }
                //  else if(!isChecked){}
                else {
                  if (
                    !first &&
                    !last &&
                    !validateEmail(email) &&
                    !password &&
                    !con_Password &&
                    !contactNo
                  ) {
                    setFirstErr('sad');
                    setLastErr('sad');
                    setEmailErr('sad');
                    setPasswordErr('sad');
                    setConErr('sad');
                    setContactErr('sad');
                  } else if (!first) {
                    setFirstErr('asf');
                  } else if (!last) {
                    setLastErr('asf');
                  } else if (!validateEmail(email)) {
                    setEmailErr('asf');
                  } else if (!password) {
                    setPasswordErr('asf');
                  } else if (!con_Password) {
                    setConErr('asf');
                  } else if (!contactNo) {
                    setContactErr('asf');
                  }
                }
              }}
              style={{
                height: hp(7),
                borderRadius: 30,
                paddingHorizontal: 30,
                width: wp(90),
                //   marginBottom: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // bottom: 10,
                backgroundColor: '#45A0D1',
                elevation: 4,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: 'Nunito-Bold',
                }}>
                Sign Up
              </Text>
              <Icon1 name="arrowright" color="white" size={25} />
            </TouchableOpacity>
            <Text style={{marginTop: 10}}>
              <Text style={{fontSize: 14, fontFamily: 'Nunito-Regular'}}>
                Already have an account
              </Text>
              <Text
                onPress={() => navigation.navigate('Login')}
                style={{
                  color: '#45A0D1',
                  fontSize: 14,
                  fontFamily: 'Nunito-SemiBold',
                }}>
                {' '}
                Login
              </Text>
              {/* </TouchableOpacity> */}
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
export default SignUp;
