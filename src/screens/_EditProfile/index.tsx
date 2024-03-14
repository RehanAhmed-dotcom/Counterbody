/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Platform,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon1 from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Item, Label, Input, Icon} from 'native-base';
import colors from '../../constants/colors';
// import auth from "@react-native-firebase/auth";
// import storage from "@react-native-firebase/storage";
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RButton from '../../components/RoundedButton';
import Loader from '../../components/loader';
import ImagePickerModal from '../../components/ImagePickerModal';
import {devLogger, emailToUniqueString} from '../../lib/utilts';
import {shadow} from '../../lib';
import {userAuthorize} from '../../redux/actions';
import {profileedit} from '../../screens/ApiCountoryBody';
import {ScrollView} from 'react-native-gesture-handler';
const placeholderAvatar = require('../../images/placeholderWOC.png');
const BackButton = require('../../images/backImage.png');
const BackButtondark = require('../../images/backImagedark.png');
const Wrapper = Platform.OS == 'android' ? View : KeyboardAvoidingView;
import {updateuser} from '../../redux/actions';
const PROFILE = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {userData} = useSelector(({USER}) => USER);
  // const [fName, lName] = userData._user.displayName.split(" ");
  const {top, bottom} = useSafeAreaInsets();
  const {darkmd} = useSelector(({DARK}) => DARK);
  const [loading, setLoading] = useState<boolean>(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [first, setFirst] = useState(userData.firstname);
  const [firstErr, setFirstErr] = useState('');
  const [last, setLast] = useState(userData.lastname);
  const [lastErr, setLastErr] = useState('');
  const [pic, setPic] = useState(userData.image ? userData.image : '');
  const [pic1, setPic1] = useState('');

  const [choosePicker, setChoosePicker] = useState<boolean>(false);

  const bord = () => {
    Keyboard.dismiss();
  };

  const showToast = () => {
    if (Platform.OS == 'android') {
      ToastAndroid.show('Update Successfuly', ToastAndroid.SHORT);
    } else {
      Alert.alert('Update Successfuly');
    }
  };

  const Editcustom = () => {
    setLoading(true);
    console.log('registration start');
    const data = new FormData();
    data.append('firstname', first);
    data.append('lastname', last);

    if (pic1 != '') {
      {
        pic &&
          data.append('image', {
            uri: pic,
            type: 'image/jpeg',
            name: 'image' + new Date() + '.jpg',
          });
        console.log('data,,,,,', data);
      }
    }
    profileedit({Auth: userData.api_token}, data)
      .then(res => {
        console.log('Signup   respone..........', res);
        if (res.message == 'User Data Updated Successfully') {
          const locUser = {...res.userdata};
          userAuthorize(locUser)(dispatch);
          //  if(darkch)
          //  {
          //   updateuser({...userData, phoneno:true})(dispatch);

          //  }
          showToast();
          setLoading(false);
          navigation.goBack();
        } else {
          setLoading(false);
        }
      })
      .catch(error => {
        console.log('Error Message---------', error);
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
        setPic1(path);
      }
      setChoosePicker(false);
    });
  };
  const updateProfile = () => {
    if (first && last) {
      setLoading(true);
      if (pic) {
        const Rafo = storage().ref(
          'images/' + emailToUniqueString(userData.email),
        );

        Rafo.putFile(pic)
          .then(() => {
            Rafo.getDownloadURL().then(photoURL => {
              auth()
                .currentUser.updateProfile({
                  displayName: first + ' ' + last,
                  photoURL,
                })
                .then(
                  () => {
                    const locUser = {...userData};
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

            setTimeout(() => {
              navigation.goBack();
            }, 700);
          });
      } else {
        auth()
          .currentUser.updateProfile({
            displayName: first + ' ' + last,
          })
          .then(
            () => {
              const locUser = {...userData};
              locUser._user.displayName = first + ' ' + last;
              userAuthorize(locUser)(dispatch);
              console.log('user', locUser);
            },
            error => {},
          )
          .finally(() => {
            setLoading(false);
            setTimeout(() => {
              navigation.goBack();
            }, 700);
          });
      }
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
    <Wrapper behavior={'padding'} style={{flex: 1}}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: darkmd.payload ? '#111e25' : 'white',
        }}>
        <Loader visible={loading} />
        <ImagePickerModal
          visible={choosePicker}
          setVisible={setChoosePicker}
          pickBy={choosePic}
        />
        <ImageBackground
          source={darkmd.payload ? BackButtondark : BackButton}
          style={{
            height: hp(100),
            width: wp(100),
            paddingBottom: bottom,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              height: hp(18),
              justifyContent: 'center',
              paddingHorizontal: 15,
            }}>
            <Icon1
              style={{marginTop: 20}}
              name="arrowleft"
              color="white"
              size={wp(6)}
              onPress={() => navigation.goBack()}
            />
          </View>
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
                backgroundColor: colors.white,
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
                source={pic ? {uri: pic} : placeholderAvatar}
              />
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity onPress={bord}><Text>dfvff</Text></TouchableOpacity> */}
          <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
            <Item
              floatingLabel
              style={{
                width: '90%',
                marginTop: 10,
                marginBottom: 10,
                borderBottomColor: firstErr
                  ? 'red'
                  : darkmd.payload
                  ? '#202d34'
                  : '#797979',
              }}>
              <Label
                style={{
                  fontSize: 14,
                  color: darkmd.payload ? 'white' : '#797979',
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
                  color: darkmd.payload ? 'white' : 'black',
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
                borderBottomColor: lastErr
                  ? 'red'
                  : darkmd.payload
                  ? '#202d34'
                  : '#797979',
              }}>
              <Label
                style={{
                  fontSize: 14,
                  color: darkmd.payload ? 'white' : '#797979',
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
                placeholder="Last Name"
                style={{
                  fontSize: 16,
                  color: darkmd.payload ? 'white' : 'black',
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

                borderBottomColor: lastErr
                  ? 'red'
                  : darkmd.payload
                  ? '#202d34'
                  : '#797979',
              }}>
              <Label
                style={{
                  fontSize: 14,

                  color: darkmd.payload ? 'white' : '#797979',
                }}>
                Email *
              </Label>
              <Input
                disabled
                value={userData.email}
                selectionColor={'white'}
                placeholder="Last Name"
                style={{
                  fontSize: 16,
                  color: darkmd.payload ? 'white' : 'black',
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

                borderBottomColor: lastErr
                  ? 'red'
                  : darkmd.payload
                  ? '#202d34'
                  : '#797979',
              }}>
              <Label
                style={{
                  fontSize: 14,
                  color: darkmd.payload ? 'white' : '#797979',
                }}>
                Password *
              </Label>
              <Input
                disabled
                value={'*********'}
                selectionColor={'white'}
                style={{
                  fontSize: 16,
                  color: darkmd.payload ? 'white' : 'black',
                }}
                autoCapitalize="none"
                returnKeyType="next"
              />
            </Item>
          </View>
          <RButton title="Update Profile" onPress={Editcustom} />
        </ImageBackground>
      </ScrollView>
    </Wrapper>
  );
};

export default PROFILE;
