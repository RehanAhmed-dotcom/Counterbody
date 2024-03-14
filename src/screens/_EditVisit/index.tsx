import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, Input, Item, Label, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  date2String,
  devLogger,
  emailToUniqueString,
  getThisImageName,
} from '../../lib/utilts';
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
import ICONs from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerModal from '../../components/ImagePickerModal';
import Loader from '../../components/loader';
import RButton from '../../components/RoundedButton';
import {SwiperFlatList} from '../../components/Swiper';
import {addnewvisitofcustomer} from '../../screens/ApiCountoryBody';
import colors from '../../constants/colors';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import {isEmptyStatement} from '@babel/types';
import {shadow} from '../../lib';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const placeholder = require('../../images/photo.png');
const NewVisit = ({navigation, route}: {navigation: object; route: object}) => {
  const {top, bottom} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {userData} = useSelector(({USER}) => USER);
  const {customerId, customerKey, index, detail, item} = route.params;
  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [date, setDate] = useState(item.visit_date);
  const [pic, setPic] = useState(
    item.visit_image.length > 0 ? item.visit_image : [],
  );
  const [pic1, setPic1] = useState([]);
  const [delimgid, setdelimgid] = useState([]);
  const [updateimgid, setupdateimgid] = useState([]);
  const [treatedArea, setTreatedArea] = useState<string>(
    item.procedure ? item.procedure : '',
  );
  const [treatedAreaErr, setTreatedAreaErr] = useState<string>('');
  const [treatedAreaM1, setTreatedAreaM1] = useState<string>(
    item.measurement ? item.measurement : '',
  );
  const [treatedAreaM1Err, setTreatedAreaM1Err] = useState<string>('');
  const [treatedAreaM2, setTreatedAreaM2] = useState<string>(
    item.notes ? item.notes : '',
  );
  const [treatedAreaM2Err, setTreatedAreaM2Err] = useState<string>('');
  const [pickIt, setPickIt] = useState<boolean>(false);
  const [imgid, setimgid] = useState(0);
  const [choosePicker, setChoosePicker] = useState<boolean>(false);
  const {darkmd} = useSelector(({DARK}) => DARK);
  const [ert, setert] = useState([]);
  console.log('sdfghjk4567---------=', item);
  console.log('sdfghjk4567---------=', pic);
  console.log('Customer idddddddddddd-------', item.customer_id);
  console.log('update id--', updateimgid);
  console.log('update pictures--', pic1);

  const choosePic = (choose = true) => {
    ImagePicker[`open${choose ? 'Picker' : 'Camera'}`]({
      width: 512,
      height: 350,
      cropping: true,
    }).then(({size, path, type}) => {
      if (path) {
        console.log('size', path);
        if (!choose) {
          // CameraRoll.save(DCIM);
          CameraRoll.save(path);
          // CameraRoll.saveToCameraRoll('jpg', [path]);
        }
        let y = 0;
        if (pic.length > 0) {
          y = pic[pic.length - 1];
          console.log('lllllllllllllllllllllllllllllll', y.id + 1);
          setPic([...pic, {id: y.id + 1, image: path}]);
          //    const tempArr = pic;
          //    tempArr[imgid].image=path;
          //    setPic(tempArr);

          //   const updtid = pic[imgid].id;
          // setupdateimgid([...updateimgid, {updtid}]);
          setPic1([...pic1, {id: y.id + 1, image: path}]);
          setert([...ert, {id: y.id + 1}]);
        } else {
          setPic([...pic, {id: y + 1, image: path}]);
          setPic1([...pic1, {id: y + 1, image: path}]);
          setert([...ert, {id: y + 1}]);
        }
      }

      setChoosePicker(false);
    });
  };

  const removeimage = remimageid => {
    console.log(remimageid);
    // const indexrem = updateimgid.findIndex((q)=>q.remimageid ==remimageid)

    // // if(indexrem!=-1)
    // // {
    // //   updateimgid.splice(indexrem, 1);
    // // }
    // if(indexrem==-1)
    // {
    //   const indexrems = pic1.findIndex((q)=>q.id ==remimageid)
    //   if(indexrems==-1)
    // {
    //   setupdateimgid([...updateimgid,{remimageid}])
    // }
    // }
    console.log('---------------', updateimgid);
    console.log('new imaes', pic1);
    if (pic1.length > 0) {
      const index = pic1.findIndex(q => q.id == remimageid);
      console.log('inde--------------------x', index);
      if (index != -1) {
        pic1.splice(index, 1);
      }
    }
    if (pic.length > 0) {
      const indexpic = pic.findIndex(q => q.id == remimageid);
      console.log('inde--------------------x', indexpic);
      if (index != -1) {
        pic.splice(indexpic, 1);
      }

      const remrt = ert.findIndex(q => q.id == remimageid);
      if (remrt == -1) {
        setupdateimgid([...updateimgid, {remimageid}]);
      }

      console.log('new imaes------------------------------------', pic1);
      console.log('new imaes------------------------------------', pic);
    }
  };

  const updatevisit = () => {
    setLoading1(true);
    console.log('update id--', updateimgid);
    console.log('update pictures--', pic1);

    console.log('visit id--', item.id);

    console.log('update---------images', pic1);

    // console.log("registration start",pic[1]);
    const data = new FormData();
    // data.append('image', pic1);

    data.append('visit_date', date);
    data.append('procedure', treatedArea);
    data.append('measurement', treatedAreaM1);
    data.append('notes', treatedAreaM2);
    data.append('visit_id', item.id);
    data.append('customer_id', item.customer_id);
    if (pic1.length > 0) {
      pic1.forEach(item => {
        item.image &&
          data.append('image[]', {
            uri: item.image,
            type: 'image/jpeg',
            name: `image${Math.random()}.jpg`,
          });
      });
    }
    if (updateimgid.length > 0) {
      updateimgid.forEach(item => {
        item.remimageid && data.append('delete_image[]', item.remimageid);
      });
    }

    setLoading(false);
    addnewvisitofcustomer({Auth: userData.api_token}, data)
      .then(res => {
        console.log('Signup   respone)))))))((((((()))))))..........', res);

        if (res.message == 'Visit added Successfully.') {
          setLoading1(false);
          console.log('successs===========', res.message);
          navigation.goBack();
        } else {
          setLoading1(false);
        }
      })
      .catch(error => {
        console.log('Error Message-----', error);
        setLoading1(false);
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

  const picUpload = (thisEmail: string) => {
    if (pic === detail.image) {
      simpleDateSumbit();
    } else {
      const nameOfImage =
        detail.image !== '' &&
        detail.image !== null &&
        detail.image !== undefined
          ? 'visit_' + getThisImageName(detail.image)
          : 'visit_' + Date.now();

      const Rafo = storage().ref(
        'images/customers/visits/' + customerId + '/' + nameOfImage,
      );
      Rafo.putFile(pic).then(snapShot => {
        Rafo.getDownloadURL().then(photoURL => {
          simpleDateSumbit(photoURL);
        });
      });
    }
  };
  const simpleDateSumbit = (picX = '') => {
    const thisEmail = emailToUniqueString(userData._user.email);
    const reference1 = db().ref(
      '/user/' + thisEmail + '/visits/' + customerId + '/' + detail.key,
    );
    reference1.update(
      picX
        ? {
            date,
            treatedArea,
            treatedAreaM1,
            treatedAreaM2,
            image: picX,
          }
        : {date, treatedArea, treatedAreaM1, treatedAreaM2},
      () => {
        //reference2.update({ lastVisit: date }, () => {
        setLoading(false), navigation.goBack();
        // });
      },
    );
    // const reference2 = db().ref(
    //   "/user/" + thisEmail + "/customers/" + customerKey
    // );
    // reference1.push(
    //   {
    //     date,
    //     treatedArea,
    //     treatedAreaM1,
    //     treatedAreaM2,
    //     image: pic ? pic : null,
    //   },
    //   () => {
    //     reference2.update({ lastVisit: date }, () => {
    //       setLoading(false), navigation.goBack();
    //     });
    //   }
    // );
  };
  const Submit = () => {
    if (ValidateFirst()) {
      setLoading(true);
      const thisEmail = emailToUniqueString(userData._user.email);
      pic ? picUpload(thisEmail) : simpleDateSumbit();
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
  // console.log("Data To Edit", detail);
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: bottom,
        backgroundColor: darkmd.payload ? '#111e25' : colors.white,
      }}>
      <Header top={top} navigation={navigation} title="Edit Visit" />
      <ScrollView>
        <View style={{flex: 1, padding: wp(2)}}>
          {!keyboardOpen && (
            <View
              style={{
                marginTop: wp(4),
                height: wp(65),
                width: wp(90),
                ...shadow(5),
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: wp(2),
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
                        width={wp(100)}
                        height={hp(100)}
                        style={{
                          height: hp(36.5),
                          width: wp(90),
                          borderRadius: wp(2),
                        }}
                        resizeMode={'cover'}
                        // source={item.visit_image ?{uri: imageallsignelvisit(item.visit_image) }: placeholder}
                        source={{uri: item.image}}
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
                          }}>
                          {/* <ICON
                        size={30}
                        color={colors.brown}
                        name="md-pencil-sharp"
                      /> */}
                          <Cross size={25} color={colors.brown} name="cross" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              ) : (
                <View
                  activeOpacity={0.8}
                  style={{
                    height: wp(65),
                    width: wp(90),
                    ...shadow(5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    width={wp(90)}
                    height={wp(65)}
                    style={{
                      height: wp(65),
                      width: wp(90),
                      borderRadius: wp(2),
                      backgroundColor: darkmd ? '#202d34' : 'white',
                    }}
                    resizeMode={'contain'}
                    // source={item.visit_image ?{uri: imageallsignelvisit(item.visit_image) }: placeholder}
                    source={require('../../images/photo.png')}
                  />
                </View>
              )}
              {/* </TouchableOpacity> */}
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
                  color: darkmd.payload ? 'white' : 'balck',
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
        </View>
      </ScrollView>
      <RButton title="Update and Continue" onPress={updatevisit} />
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
          <ActivityIndicator
            size="large"
            color={darkmd.payload ? 'white' : colors.brown}
          />
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
