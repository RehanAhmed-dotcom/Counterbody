import React, {useEffect, useState} from 'react';
import {
  View,
  Keyboard,
  Platform,
  Alert,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Modal,
  Text,
  // Alert,
  ScrollView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Item, Label, Input, Icon} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/HeaderWithBack';
import RButton from '../../components/RoundedButton';
import Loader from '../../components/loader';
import colors from '../../constants/colors';
import ImagePickerModal from '../../components/ImagePickerModal';
// import auth from "@react-native-firebase/auth";
// import storage from "@react-native-firebase/storage";
// import db from "@react-native-firebase/database";
import {addnewcostomer} from '../../screens/ApiCountoryBody';
import DatePicker from 'react-native-date-picker';
import Styles from '../../styles';
import {
  validateEmail,
  emailToUniqueString,
  devLogger,
  emailIsValid,
  date2String,
} from '../../lib/utilts';
import HiTone from 'screens/HiTone';
const NewCustomer = ({
  navigation,
  route,
}: {
  navigation: object;
  route: object;
}) => {
  const {top, bottom} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {userData} = useSelector(({USER}) => USER);
  const {darkmd} = useSelector(({DARK}) => DARK);
  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);
  const [first, setFirst] = useState<string>('');
  const [last, setLast] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [firstErr, setFirstErr] = useState<string>('');
  const [lastErr, setLastErr] = useState<string>('');
  const [emailErr, setEmailErr] = useState<string>('');
  const [phoneErr, setPhoneErr] = useState<string>('');
  const [avatar, setAvatar] = useState<string | null>('');
  const [choosePicker, setChoosePicker] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setresponse] = useState('');
  const [date, setDate] = useState(date2String(new Date()));
  const [pickIt, setPickIt] = useState<boolean>(false);
  // console.log("-------------token-----------------",userData.api_token);
  // const [stoken, setstoken] = useState(userData.api_token);
  const [cusage, setcusage] = useState(0);

  const getAge = () => {
    setcusage(0);
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    setcusage(age);
    console.log('age', age);
  };

  const hitone = () => {
    getAge();
    console.log(cusage);
    navigation.navigate('HiTone', {
      first,
      last,
      email,
      phone,
      cusage,
      dateee: date,
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
        setAvatar(path);
      }
      setChoosePicker(false);
    });
  };
  const ValidateFirst = () => {
    if (first && last && validateEmail(email) && phone) {
      return true;
    } else {
      if (first === '') {
        setFirstErr('First name required');
      }
      if (last === '') {
        setLastErr('Last name required');
      }
      if (!validateEmail(email)) {
        setEmailErr('Valid email required');
      }
      if (phone === '') {
        setPhoneErr('Number is required');
      }
    }
    return false;
  };
  const picUpload = (thisEmail: string) => {
    const Rafo = storage().ref(
      'images/customers/' + emailToUniqueString(thisEmail),
    );
    Rafo.putFile(avatar).then(snapshot => {
      Rafo.getDownloadURL().then(photoURL => {
        simpleDateSumbit(photoURL);
      });
    });
  };
  const simpleDateSumbit = (pic = '') => {
    const thisEmail = emailToUniqueString(userData._user.email);
    const reference = db().ref('/user/' + thisEmail + '/customers');
    reference.push(
      {
        firstName: first,
        lastName: last,
        email,
        phone,
        avatar: pic ? pic : null,
      },
      () => {
        setLoading(false);
        navigation.goBack();
      },
    );
  };
  const showToast = () => {
    if (Platform.OS == 'android') {
      ToastAndroid.showWithGravity(
        'Email and Name is required',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    } else {
      Alert.alert('Email and Name is required');
    }
    // ToastAndroid.show("Email and Name is required", ToastAndroid.SHORT);
  };

  const Addnewcustomer = () => {
    if (first && last && email) {
      setLoading(true);
      console.log('registration start');
      const data = new FormData();
      data.append('firstname', first);
      data.append('lastname', last);
      data.append('email', email);
      data.append('phoneno', phone);

      {
        avatar &&
          data.append('image', {
            uri: avatar,
            type: 'image/jpeg',
            name: 'image' + new Date() + '.jpg',
          });
        console.log('data,,,,,', data);
      }
      addnewcostomer({Auth: userData.api_token}, data)
        .then(res => {
          console.log('Signup   respone..........', res.message);
          setresponse(res.message);

          if (res.message == 'Customer added Successfully.') {
            console.log('successs===========', res.message);
            navigation.navigate('Home');
            // const locUser = { ...res.userdata };
            // locUser._user.displayName = first + " " + last;
            //  userAuthorize(locUser)(dispatch);

            setLoading(false);
          }
          setLoading(false);
        })
        .catch(error => {
          setEmailErr('');
          console.log('Error Message', error.response.data);
          // if (error.response.data.message.email === "The email has already been taken.") {
          //   setEmailErr("Already Exist");
          //   setLoading(false);
          //   //console.log("That email address is already in use!");
          // }
          // if (error.response.data.message.email === "auth/invalid-email") {
          //   setEmailErr("That email address is invalid!");
          //   //console.log("That email address is invalid!");
          // }
          setLoading(false);
        });
    } else {
      showToast();
    }
  };

  const Submit = () => {
    if (ValidateFirst()) {
      setLoading(true);
      const thisEmail = emailToUniqueString(email);
      avatar ? picUpload(thisEmail) : simpleDateSumbit();
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
    <View
      style={{
        flex: 1,
        paddingBottom: bottom,
        backgroundColor: darkmd.payload ? Styles.dark : Styles.txtcolor,
      }}>
      <Loader visible={loading} />
      <ImagePickerModal
        visible={choosePicker}
        setVisible={setChoosePicker}
        pickBy={choosePic}
      />
      <Header top={top} navigation={navigation} title="Add New Customer" />
      <ScrollView style={{flex: 1, padding: wp(2)}}>
        {!keyboardOpen && (
          <View
            style={{
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setChoosePicker(true)}>
              <Image
                width={wp(20)}
                height={wp(20)}
                borderRadius={wp(10)}
                style={{
                  height: wp(20),
                  width: wp(20),
                }}
                source={
                  avatar
                    ? {uri: avatar}
                    : require('../../images/placeholder.png')
                }
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={{flex: 1, padding: wp(2)}}>
          <Item
            floatingLabel
            style={{
              width: '100%',
              marginVertical: 10,
              borderBottomColor: firstErr
                ? 'red'
                : darkmd.payload
                ? '#202d34'
                : colors.brown,
            }}>
            <Label
              style={{
                fontSize: 14,
                //fontFamily: 'Nunito-Regular',
                color: darkmd.payload ? '#fff' : '#797979',
              }}>
              First Name
            </Label>
            <Input
              value={first}
              onChangeText={Con => {
                firstErr && setFirstErr('');
                setFirst(Con);
              }}
              selectionColor={colors.brown}
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
              width: '100%',

              marginVertical: 10,
              borderBottomColor: lastErr
                ? 'red'
                : darkmd.payload
                ? '#202d34'
                : colors.brown,
            }}
            // error={emailError}
          >
            <Label
              style={{
                fontSize: 14,
                //fontFamily: 'Nunito-Regular',
                color: darkmd.payload ? '#fff' : '#797979',
              }}>
              Last Name
            </Label>
            <Input
              value={last}
              onChangeText={Con => {
                lastErr && setLastErr('');
                setLast(Con);
              }}
              selectionColor={colors.brown}
              placeholder="LAST NAME"
              style={{
                fontSize: 16,
                color: darkmd.payload ? 'white' : 'black',
              }}
              autoCapitalize="none"
              returnKeyType="next"
            />
          </Item>

          <View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setPickIt(true);
              }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: 5,
              }}></TouchableOpacity>
            <Item
              floatingLabel
              style={{
                width: '100%',
                marginVertical: 10,
                borderBottomColor: darkmd.payload ? '#202d34' : colors.brown,
              }}>
              <Label
                style={{
                  fontSize: 14,
                  //fontFamily: 'Nunito-Regular',
                  color: darkmd.payload ? '#fff' : '#797979',
                }}>
                Date of birth
              </Label>
              <Input
                value={date}
                disabled
                selectionColor={colors.brown}
                style={{
                  fontSize: 16,
                  color: darkmd.payload ? 'white' : 'black',
                }}
                autoCapitalize="none"
                returnKeyType="next"
              />
            </Item>
          </View>

          <Item
            floatingLabel
            style={{
              width: '100%',
              marginVertical: 10,
              borderBottomColor: emailErr
                ? 'red'
                : darkmd.payload
                ? '#202d34'
                : colors.brown,
            }}
            // error={emailError}
          >
            <Label
              style={{
                fontSize: 14,
                color: darkmd.payload ? '#fff' : '#797979',
              }}>
              Email
            </Label>
            <Input
              value={email}
              onChangeText={Con => {
                emailErr && setEmailErr('');
                setEmail(Con);
              }}
              selectionColor={colors.brown}
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
              width: '100%',
              marginVertical: 10,
              borderBottomColor: phoneErr
                ? 'red'
                : darkmd.payload
                ? '#202d34'
                : colors.brown,
            }}>
            <Label
              style={{
                fontSize: 14,
                color: darkmd.payload ? '#fff' : '#797979',
              }}>
              Phone No
            </Label>
            <Input
              value={phone}
              dataDetectorTypes="phoneNumber"
              onChangeText={Con => {
                phoneErr && setPhoneErr('');
                setPhone(Con);
              }}
              selectionColor={colors.brown}
              style={{
                fontSize: 16,
                color: darkmd.payload ? 'white' : 'black',
              }}
              maxLength={12}
              keyboardType="phone-pad"
              returnKeyType={'done'}
            />
          </Item>
        </View>

        {/* <RButton title="Hi Tone" onPress={()=>hitone()} /> */}
      </ScrollView>

      <RButton title="Save and Continue" onPress={Addnewcustomer} />

      <Modal visible={pickIt} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: '#00000088',
          }}>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
              backgroundColor: darkmd.payload ? '#202d34' : colors.brown,
              paddingBottom: bottom,
            }}>
            <View
              style={{
                width: '100%',
                paddingVertical: 5,
                flexDirection: 'row',
                paddingHorizontal: wp(2),
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontWeight: 'bold',
                  fontSize: 17,
                }}
                onPress={() => {
                  setPickIt(false);
                }}>
                CANCEL
              </Text>
              <Text
                style={{
                  color: colors.white,
                  fontWeight: 'bold',
                  fontSize: 17,
                }}
                onPress={() => {
                  setPickIt(false);
                }}>
                OK
              </Text>
            </View>
            <DatePicker
              mode="date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              textColor={colors.white}
              date={new Date(date)}
              onDateChange={dd => {
                setDate(date2String(dd));
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default NewCustomer;
