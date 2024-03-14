import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  Modal,
  Platform,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input, Item, Label, Text} from 'native-base';
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {date2String, devLogger, emailToUniqueString} from '../../lib/utilts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import CameraRoll from '@react-native-community/cameraroll';
import Cross from 'react-native-vector-icons/Entypo';
// import storage from "@react-native-firebase/storage";
import DatePicker from 'react-native-date-picker';
// import db from "@react-native-firebase/database";
import Header from '../../components/HeaderWithBack';
import ICON from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerModal from '../../components/ImagePickerModal';
import Loader from '../../components/loader';
import RButton from '../../components/RoundedButton';
import {SwiperFlatList} from '../../components/Swiper';
import {addnewvisitofcustomer} from '../../screens/ApiCountoryBody';
import {black} from 'react-native-paper/lib/typescript/styles/colors';
import colors from '../../constants/colors';
import {shadow} from '../../lib';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const placeholder = require('../../images/photo.png');
const NewVisit = ({navigation, route}: {navigation: object; route: object}) => {
  const yourRef = useRef(null);
  const {top, bottom} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {userData} = useSelector(({USER}) => USER);
  const {darkmd} = useSelector(({DARK}) => DARK);
  const {customerId} = route.params;
  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [date, setDate] = useState(date2String(new Date()));
  const [pic, setPic] = useState([]);
  const [treatedArea, setTreatedArea] = useState<string>('');
  const [treatedAreaErr, setTreatedAreaErr] = useState<string>('');
  const [treatedAreaM1, setTreatedAreaM1] = useState<string>('');
  const [treatedAreaM1Err, setTreatedAreaM1Err] = useState<string>('');
  const [treatedAreaM2, setTreatedAreaM2] = useState<string>('');
  const [treatedAreaM2Err, setTreatedAreaM2Err] = useState<string>('');
  const [pickIt, setPickIt] = useState<boolean>(false);
  const [choosePicker, setChoosePicker] = useState<boolean>(false);
  const [response, setresponse] = useState('');
  const [imgid, setimgid] = useState(0);

  const [pic1, setPic1] = useState('');

  const showToast = () => {
    if (Platform.OS == 'android') {
      ToastAndroid.show('Visit added Successfully.', ToastAndroid.SHORT);
    } else {
      Alert.alert('Visit added Successfully.');
    }
  };

  const addnewvisit = () => {
    setLoading1(true);

    // console.log("registration start",pic[1]);
    const data = new FormData();
    // data.append('image', pic1);

    data.append('visit_date', date);
    data.append('procedure', treatedArea);
    data.append('measurement', treatedAreaM1);
    data.append('notes', treatedAreaM2);
    data.append('customer_id', customerId);
    if (pic.length > 0) {
      pic.forEach(item => {
        item.path &&
          data.append('image[]', {
            uri: item.path,
            type: 'image/jpeg',
            name: `image${Math.random()}.jpg`,
          });
      });
    }

    addnewvisitofcustomer({Auth: userData.api_token}, data)
      .then(res => {
        console.log('Signup   respone)))))))((((((()))))))..........', res);
        setresponse(res.message);

        if (res.message == 'Visit added Successfully.') {
          console.log('successs===========', res.message);
          navigation.goBack();
          showToast();
          setLoading1(false);
        } else {
          setLoading1(false);
        }
      })
      .catch(error => {
        console.log('Error Message-----', error);
        setLoading1(false);
      });
  };

  const removeimage = remimageid => {
    console.log('remove ides', remimageid);
    console.log('new imaes', pic);
    if (pic.length > 0) {
      const index = pic.findIndex(q => q.id == remimageid);
      console.log('inde--------------------x', index);
      if (index != -1) {
        pic.splice(index, 1);
      }
    }
    console.log('after image remove imaes', pic);
  };

  const choosePic = (choose = true) => {
    console.log('images---------=====', pic);

    ImagePicker[`open${choose ? 'Picker' : 'Camera'}`]({
      width: 512,
      height: 350,
      cropping: true,
    }).then(({size, path}) => {
      if (path) {
        if (!choose) {
          // CameraRoll.save(DCIM);
          CameraRoll.save(path);
          // CameraRoll.saveToCameraRoll('jpg', [path]);
        }
        let uid = pic.length + 1;
        console.log('unique id', uid);
        console.log('size', size);
        setPic1(path);
        setPic([...pic, {path: path, id: uid}]);
        console.log('images------selected---=====', pic);
      }
      setChoosePicker(false);
    });
  };
  const ValidateFirst = () => {
    if (date && treatedArea && treatedAreaM1 && treatedAreaM2) {
      return true;
    } else {
      if (treatedArea === '') {
        setTreatedAreaErr('Treated Area Required');
      }
      if (treatedAreaM1 === '') {
        setTreatedAreaM1Err('Treated Area Measurement required');
      }
      if (treatedAreaM2 === '') {
        setTreatedAreaM2Err('Treated Area Measurement required');
      }
    }
    return false;
  };
  const picUpload = () => {
    const Rafo = storage().ref(
      'images/customers/visits/' + customerId + '/' + 'visit_' + Date.now(),
    );

    Rafo.putFile(pic).then(snapshot => {
      Rafo.getDownloadURL().then(photoURL => {
        simpleDateSumbit(photoURL);
      });
    });
  };
  const simpleDateSumbit = (pic = '') => {
    //db().ref("/user/" + thisEmail + "/customers");
    const thisEmail = emailToUniqueString(userData.email);
    const reference1 = db().ref('/user/' + thisEmail + '/visits/' + customerId);
    const reference2 = db().ref(
      '/user/' + thisEmail + '/customers/' + customerKey,
    );
    reference1.push(
      {
        date,
        treatedArea,
        treatedAreaM1,
        treatedAreaM2,
        image: pic ? pic : null,
      },
      () => {
        reference2.update({lastVisit: date}, () => {
          setLoading(false), navigation.goBack();
        });
      },
    );
  };
  const Submit = () => {
    console.log('Pic--------', pic);
    if (pic.length > 0) {
      setLoading1(true);
      addnewvisit();
    } else {
      console.log('Pic is required');
      Alert.alert('Warning', 'Picture is required', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
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
        backgroundColor: darkmd.payload ? '#111e25' : colors.white,
      }}>
      <Header top={top} navigation={navigation} title="Add New Visit" />
      <ScrollView style={{flex: 1, padding: wp(2)}}>
        {!keyboardOpen && (
          <View
            style={{
              marginTop: wp(4),
              alignItems: 'center',
            }}>
            <View
              activeOpacity={0.8}
              style={{
                height: wp(65),
                width: wp(90),
                ...shadow(5),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: darkmd.payload ? '#202d34' : 'white',
              }}>
              {pic.length > 0 ? (
                <SwiperFlatList
                  horizontal
                  ItemSeparatorComponent={() => <View style={{width: 0}} />}
                  data={pic}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item, index}) => (
                    <View>
                      <Image
                        width={wp(90)}
                        height={wp(65)}
                        resizeMode={pic1 ? 'cover' : 'contain'}
                        style={{
                          height: wp(65),
                          width: wp(90),
                        }}
                        source={{uri: item.path}}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          removeimage(item.id);
                          setimgid(index);
                        }}
                        activeOpacity={0.8}
                        style={{
                          position: 'absolute',
                          top: 2,
                          right: wp(5),
                          top: wp(5),
                          zIndex: 5,
                        }}>
                        <View
                          style={{
                            borderRadius: wp(9 / 2),
                            width: wp(8),
                            height: wp(8),
                            justifyContent: 'center',
                            alignItems: 'center',
                            ...shadow(3),
                            backgroundColor: darkmd.payload
                              ? '#111e25'
                              : 'white',
                          }}>
                          {/* <ICON
                        size={30}
                        color={colors.brown}
                        name="md-pencil-sharp"
                      /> */}
                          <Cross
                            size={25}
                            color={darkmd.payload ? 'white' : colors.brown}
                            name="cross"
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              ) : (
                <Image
                  width={wp(90)}
                  height={wp(65)}
                  resizeMode="contain"
                  style={{
                    height: wp(65),
                    width: wp(90),
                  }}
                  source={placeholder}
                />
              )}
            </View>
          </View>
        )}
        <View
          style={{
            zIndex: 5,
            //borderRadius:wp(3),
            borderTopLeftRadius: wp(3),
            borderTopRightRadius: wp(3),
            top: -wp(5),
            height: wp(13),
            width: wp(90),
            ...shadow(7),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            alignSelf: 'center',
            backgroundColor: darkmd.payload ? '#202d34' : 'white',
          }}>
          <View>
            <Text
              style={{
                fontWeight: '500',
                fontSize: wp(4),
                color: darkmd.payload ? 'white' : 'black',
              }}>
              Add New Image In Visit
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setChoosePicker(true);
            }}
            activeOpacity={0.8}>
            <View
              style={{
                borderRadius: wp(11 / 2),
                width: wp(11),
                height: wp(11),
                justifyContent: 'center',
                alignItems: 'center',
                ...shadow(3),
                backgroundColor: darkmd.payload ? '#111e25' : 'white',
              }}>
              <ICON
                size={30}
                color={darkmd.payload ? 'white' : colors.brown}
                name="images"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, padding: wp(2)}}>
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
                  color: darkmd.payload ? 'white' : '#797979',
                }}>
                Date
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
              borderBottomColor: treatedAreaErr
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
                color: darkmd.payload ? 'white' : '#797979',
              }}>
              Procedure
            </Label>
            <Input
              value={treatedArea}
              onChangeText={Con => {
                treatedAreaErr && setTreatedAreaErr('');
                setTreatedArea(Con);
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
              borderBottomColor: treatedAreaM1Err
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
                color: darkmd.payload ? 'white' : '#797979',
              }}>
              Measurements
            </Label>
            <Input
              value={treatedAreaM1}
              onChangeText={Con => {
                treatedAreaM1Err && setTreatedAreaM1Err('');
                setTreatedAreaM1(Con);
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
              borderBottomColor: treatedAreaM2Err
                ? 'red'
                : darkmd.payload
                ? '#202d34'
                : colors.brown,
            }}>
            <Label
              style={{
                fontSize: 14,
                color: darkmd.payload ? 'white' : '#797979',
              }}>
              Notes
            </Label>
            <Input
              value={treatedAreaM2}
              onChangeText={Con => {
                treatedAreaM2Err && setTreatedAreaM2Err('');
                setTreatedAreaM2(Con);
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
        </View>
        <RButton title="Save and Continue" onPress={addnewvisit} />
      </ScrollView>

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
              backgroundColor: colors.brown,
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
      <Modal animationType="slide" transparent={true} visible={loading1}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: '#00000088',
            width: wp(100),
            height: hp(100),
          }}>
          <ActivityIndicator size="large" color={colors.brown} />
        </View>
      </Modal>
      <Loader visible={loading} />
      <ImagePickerModal
        visible={choosePicker}
        setVisible={setChoosePicker}
        pickBy={choosePic}
      />
    </View>
  );
};
export default NewVisit;
