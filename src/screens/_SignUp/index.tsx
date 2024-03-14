/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import CheckBox from 'react-native-check-box';
import {useDispatch} from 'react-redux';
import {Item, Label, Input, Icon} from 'native-base';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import auth from "@react-native-firebase/auth";
// import storage from "@react-native-firebase/storage";
import colors from '../../constants/colors';
import {shadow} from '../../lib';
import {userAuthorize} from '../../redux/actions';
import {validateEmail, emailToUniqueString} from '../../lib/utilts';
import RButton from '../../components/RoundedButton';
import Loader from '../../components/loader';
import ImagePickerModal from '../../components/ImagePickerModal';
import {signup} from '../../screens/ApiCountoryBody';
const SignUp = ({navigation}: {navigation: object}) => {
  const {bottom} = useSafeAreaInsets();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const dispatch = useDispatch();
  const [first, setFirst] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [firstErr, setFirstErr] = useState('');
  const [last, setLast] = useState('');
  const [lastErr, setLastErr] = useState('');
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [con_Password, setCon_Password] = useState('');
  const [conErr, setConErr] = useState('');
  //const [contactNo, setContactNo] = useState('');
  //const [contactErr, setContactErr] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedErr, setIsCheckedErr] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [pic, setPic] = useState('');
  const [choosePicker, setChoosePicker] = useState<boolean>(false);
  const [response, setresponse] = useState('');
  const Wrapper = Platform.OS == 'android' ? View : KeyboardAvoidingView;
  const registered = () => {
    setLoading(true);
    console.log('registration start');
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('password_confirmation', con_Password);
    data.append('firstname', first);
    data.append('lastname', last);
    data.append('phoneno', '03401892643');
    // data.append('image_url', pic);
    {
      pic &&
        data.append('image', {
          uri: pic,
          type: 'image/jpeg',
          name: 'image' + new Date() + '.jpg',
        });
      console.log('data,,,,,', data);
    }
    signup(data)
      .then(res => {
        console.log('Signup   respone..........', res);
        setresponse(res);

        if (res.message == 'User Registered Successfully') {
          console.log('successs===========', res.message);
          const locUser = {...res.userdata};
          // locUser._user.displayName = first + " " + last;
          userAuthorize(locUser)(dispatch);
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(error => {
        setEmailErr('');
        console.log('Error Message', error.response.data.message.email);
        if (
          error.response.data.message.email ===
          'The email has already been taken.'
        ) {
          setEmailErr('Already Exist');
          setLoading(false);
          //console.log("That email address is already in use!");
        }
        if (error.response.data.message.email === 'auth/invalid-email') {
          setEmailErr('That email address is invalid!');
          //console.log("That email address is invalid!");
        }
        setLoading(false);
      });
  };
  const choosePic = (choose = true) => {
    ImagePicker[`open${choose ? 'Picker' : 'Camera'}`]({
      width: 512,
      height: 512,
      cropping: true,
    }).then(({size, path}) => {
      if (path) {
        console.log('size', size);
        setPic(path);
      }
      setChoosePicker(false);
    });
  };
  // const Submit = () => {
  //   setLoading(true);
  //   registered();
  //   setLoading(false);

  // }

  const Submit = () => {
    setLoading(true);
    console.log('star submiting');
    auth()
      .createUserWithEmailAndPassword(email, password)
      // console.log("save picture")
      .then(Resp => {
        console.log('reponse here', Resp);
        if (pic) {
          const Rafo = storage().ref('images/' + emailToUniqueString(email));
          Rafo.putFile(pic)
            .then(() => {
              console.log('pic in file', Rafo);
              Rafo.getDownloadURL().then(photoURL => {
                Resp.user
                  .updateProfile({
                    displayName: first + ' ' + last,
                    photoURL,
                  })
                  .then(
                    () => {
                      const locUser = {...Resp.user};
                      locUser._user.displayName = first + ' ' + last;
                      locUser._user.photoURL = photoURL;
                      userAuthorize(locUser)(dispatch);
                      console.log('user', locUser);
                    },
                    error => {},
                  );
              });
            })
            .catch(e => console.log('uploading image error => ', e))
            .finally(() => {
              setLoading(false);
            });
        } else {
          Resp.user
            .updateProfile({
              displayName: first + ' ' + last,
            })
            .then(
              () => {
                const locUser = {...Resp.user};
                locUser._user.displayName = first + ' ' + last;
                // console.log("user", locUser);
                userAuthorize(locUser)(dispatch);
              },
              error => {},
            )
            .finally(() => {
              setLoading(false);
            });
        }
        //console.log("User account created & signed in!");
      })
      .catch(error => {
        console.log('Error Message', error);

        if (error.code === 'auth/email-already-in-use') {
          setEmailErr('Already Exist');
          //console.log("That email address is already in use!");
        }
        if (error.code === 'auth/invalid-email') {
          setEmailErr('That email address is invalid!');
          //console.log("That email address is invalid!");
        }
      })
      .finally(() => {});
  };
  const letValidateAndThenSubmit = () => {
    if (
      first &&
      last &&
      validateEmail(email) &&
      password &&
      con_Password &&
      isChecked
    ) {
      password !== con_Password
        ? (setPasswordErr('sad'), setConErr('sad'))
        : console.log('before submit');

      //Submit();
      registered();
    } else if (
      !first ||
      !last ||
      !validateEmail(email) ||
      !password ||
      !con_Password
    ) {
      if (
        !first &&
        !last &&
        !validateEmail(email) &&
        !password &&
        !con_Password
        //&&!contactNo
      ) {
        setFirstErr('sad');
        setLastErr('sad');
        setEmailErr('sad');
        setPasswordErr('sad');
        setConErr('sad');
        //setContactErr("sad");
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
      }
    } else if (!isChecked) {
      setIsCheckedErr('Terms and conditions to be accepted!');
    }
  };
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));
    return () => {
      Keyboard.removeListener('keyboardDidShow', () => setKeyboardOpen(true));
      Keyboard.removeListener('keyboardDidHide', () => setKeyboardOpen(false));
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <Loader visible={loading} />
      <ImagePickerModal
        visible={choosePicker}
        setVisible={setChoosePicker}
        pickBy={choosePic}
      />
      <ImageBackground
        source={require('../../images/backImage.png')}
        style={{
          height: hp(100),
          width: wp(100),
          paddingBottom: bottom,
        }}>
        <View
          style={{
            height: hp(20),
            justifyContent: 'center',
            paddingHorizontal: 15,
          }}>
          <Icon1
            style={{marginTop: 20}}
            name="arrowleft"
            size={wp(6)}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </View>
        {!keyboardOpen && (
          <View
            style={{
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setChoosePicker(true);
              }}
              activeOpacity={0.8}
              style={{
                height: wp(35),
                width: wp(35),
                borderRadius: wp(17.5),
                ...shadow(5),
              }}>
              <Image
                style={{
                  height: wp(35),
                  width: wp(35),
                  borderRadius: wp(17.5),
                }}
                source={
                  pic ? {uri: pic} : require('../../images/placeholder.png')
                }
              />
            </TouchableOpacity>
          </View>
        )}
        <Wrapper style={{flex: 1}} behavior="padding">
          <ScrollView
            style={{flex: 1, backgroundColor: colors.white}}
            contentContainerStyle={{paddingBottom: 30}}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <View style={{width: wp(90)}}>
                <Text
                  style={{
                    //fontFamily: 'Nunito-Bold',
                    fontWeight: 'bold',
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
                }}>
                <Label
                  style={{
                    fontSize: 14,

                    color: '#797979',
                  }}>
                  First Name *
                </Label>
                <Input
                  value={first}
                  onChangeText={Con => {
                    firstErr ? setFirstErr('') : null;
                    setFirst(Con);
                  }}
                  selectionColor={'white'}
                  placeholder="FIRST NAME"
                  style={{
                    fontSize: 16,
                    color: 'black',
                  }}
                  autoCapitalize="none"
                  returnKeyType="next"
                />
              </Item>
              <Item
                floatingLabel
                style={{
                  width: '90%',
                  marginBottom: 10,

                  borderBottomColor: lastErr ? 'red' : '#797979',
                }}>
                <Label
                  style={{
                    fontSize: 14,

                    color: '#797979',
                  }}>
                  Last Name *
                </Label>
                <Input
                  value={last}
                  onChangeText={Con => {
                    lastErr ? setLastErr('') : null;
                    setLast(Con);
                  }}
                  selectionColor={'white'}
                  placeholder="FIRST NAME"
                  style={{
                    fontSize: 16,
                    color: 'black',
                  }}
                  autoCapitalize="none"
                  returnKeyType="next"
                />
              </Item>
              <Item
                floatingLabel
                style={{
                  width: '90%',
                  marginBottom: 10,

                  borderBottomColor: validateEmail(email)
                    ? emailErr
                      ? 'red'
                      : colors.brown
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

                    color: '#797979',
                  }}>
                  Email *
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
                    fontSize: 16,
                    color: 'black',
                  }}
                  autoCapitalize="none"
                  returnKeyType="next"
                />
                {email !== '' && validateEmail(email) === true && (
                  <Icon name="checkmark-circle" style={{color: colors.brown}} />
                )}
              </Item>
              <Item
                floatingLabel
                style={{
                  width: '90%',
                  marginBottom: 10,
                  borderBottomColor: passwordErr ? 'red' : '#797979',
                }}>
                <Label
                  style={{
                    fontSize: 14,

                    color: '#797979',
                  }}>
                  Password *
                </Label>
                <Input
                  value={password}
                  secureTextEntry
                  onChangeText={Con => {
                    passwordErr ? setPasswordErr('') : null;
                    setPassword(Con);
                  }}
                  selectionColor={'white'}
                  placeholder="FIRST NAME"
                  style={{
                    fontSize: 16,
                    color: 'black',
                  }}
                  autoCapitalize="none"
                  returnKeyType="next"
                />
              </Item>
              <Item
                floatingLabel
                style={{
                  width: '90%',
                  marginBottom: 10,
                  borderBottomColor: conErr ? 'red' : '#797979',
                }}>
                <Label
                  style={{
                    fontSize: 14,

                    color: '#797979',
                  }}>
                  Confirm Password *
                </Label>
                <Input
                  secureTextEntry
                  value={con_Password}
                  onChangeText={Con => {
                    conErr ? setConErr('') : null;
                    setCon_Password(Con);
                  }}
                  selectionColor={'white'}
                  placeholder="FIRST NAME"
                  style={{
                    fontSize: 16,
                    color: 'black',
                  }}
                  autoCapitalize="none"
                  returnKeyType="next"
                />
              </Item>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  width: wp(90),
                  alignItems: 'center',
                }}>
                <CheckBox
                  uncheckedCheckBoxColor={isCheckedErr ? 'red' : colors.brown}
                  checkedCheckBoxColor={colors.brown}
                  style={{}}
                  onClick={() => {
                    isCheckedErr && setIsCheckedErr('');
                    setIsChecked(!isChecked);
                  }}
                  isChecked={isChecked}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    color: colors.brown,
                  }}>
                  I accept all terms and conditions
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <RButton
                title="SignUp"
                onPress={letValidateAndThenSubmit}
                style={{marginBottom: 10}}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 14,
                }}>
                Already have an account{' '}
                <Text
                  onPress={() => navigation.navigate('Login')}
                  style={{
                    color: colors.brown,
                    fontWeight: 'bold',
                  }}>
                  Login!
                </Text>
              </Text>
            </View>
          </ScrollView>
        </Wrapper>
      </ImageBackground>
    </View>
  );
};
export default SignUp;
