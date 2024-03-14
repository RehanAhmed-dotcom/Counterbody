import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Checkbox, RadioButton} from 'react-native-paper';
import {Deletevisit, viewvisit} from '../../screens/ApiCountoryBody';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {Input, Item, Label, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
// import { color } from "react-native-reanimated";
import {black, white} from 'react-native-paper/lib/typescript/styles/colors';
import {emailToUniqueString, getThisImageName} from '../../lib/utilts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// import db from "@react-native-firebase/database";
// import storage from "@react-native-firebase/storage";
import Header from '../../components/HeaderWithBack';
import ICON from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../../components/loader';
import RButton from '../../components/RoundedButton';
import {ScrollView} from 'react-native-gesture-handler';
import {SwiperFlatList} from '../../components/Swiper';
import colors from '../../constants/colors';
import {isArrayExpression} from '@babel/types';
//import { shadow } from "../../lib";
import {shadow} from '../../lib/index';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

const placeholder = require('../../images/photo.png');
const NewVisit = ({navigation, route}: {navigation: object; route: object}) => {
  const {darkmd} = useSelector(({DARK}) => DARK);
  const {top, bottom} = useSafeAreaInsets();
  const {userData} = useSelector(({USER}) => USER);
  const {customerId} = route.params;
  const [loading, setLoading] = useState(false);
  const [indexlist, setindexlist] = useState(0);
  const [loading1, setLoading1] = useState(false);
  const [VewfullScreen, setVewfullScreen] = useState('');
  const [openviewmodal, setopenviewmodal] = useState(false);
  const [list, setList] = useState([]);
  const [cuslist, setcusList] = useState([]);
  const [menuVisible, setmenuVisible] = useState(false);
  const [rd, setrd] = useState(0);

  // useEffect(() => {
  //   viewallvisit ();

  // }, []);
  const vieform = () => {
    setrd(0);
    console.log(rd);
    if (rd == 1) {
      navigation.navigate('HiTone', {customerId});
    } else if (rd == 2) {
      navigation.navigate('ShapeForm', {customerId});
    } else if (rd == 3) {
      navigation.navigate('NewAppointmentPolicy', {customerId});
    } else if (rd == 4) {
      navigation.navigate('ClientPostLLLT', {customerId});
    } else if (rd == 5) {
      navigation.navigate('ClientPostRFPatient', {customerId});
    }
  };
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  const onSwipeLeft = () => {
    console.log('left');
    if (indexlist - 1 > -1) {
      setindexlist(indexlist - 1);
    }
  };

  const onSwipeRight = () => {
    console.log('right');

    if (indexlist + 1 < list.length) {
      console.log('right11');
      setindexlist(parseInt(indexlist) + 1);
    }
  };
  const onSwipe = (gestureName, gestureState) => {
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    switch (gestureName) {
      case SWIPE_LEFT:
        onSwipeLeft();
        break;
      case SWIPE_RIGHT:
        onSwipeRight();
        break;
      default:
    }
  };
  const saveOPenlargeView = id => {
    setList([]);
    setopenviewmodal(true),
      cuslist.forEach(element => {
        element.visit_image.forEach(innerelement => {
          if (innerelement.id == id) {
            console.log('{{{{=====+++', element.visit_image);
            setList(element.visit_image);
            setopenviewmodal(true);
          }
        });
      });
  };
  const arr = [
    {
      image:
        'https://intechsol.co/contour/public/assets/images/customer/1637735562.jpg',
    },
    {
      image:
        'https://intechsol.co/contour/public/assets/images/customer/1637735562.jpg',
    },
  ];
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      viewallvisit();
    });

    return unsubscribe;
  }, [navigation]);

  // const viewallvisit= () => {
  //   viewvisit({Auth:userData.api_token}).then(res => {

  // setcusList(res.data)
  // console.log("555555555555----------5555555555",res)
  // });
  // }

  const viewallvisit = () => {
    console.log('registration start');
    const data = new FormData();
    data.append('customer_id', customerId);
    console.log('data,,,,,', data);

    viewvisit({Auth: userData.api_token}, data)
      .then(res => {
        console.log('Signup   respone..........', res.data);

        setcusList(res.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        // console.log("Error Message",error.response.data);
        if (error.response.data.message == 'Visit data not Found') {
          setcusList([]);
        } else {
          console.log('Error Message', error);
        }
      });
  };

  const delvisit = delid => {
    setLoading(true);
    console.log('registration start');
    const data = new FormData();
    data.append('visit_id', delid.id);
    console.log('data,,,,,', data);

    Deletevisit({Auth: userData.api_token}, data)
      .then(res => {
        console.log('Signup   respone..........', res);
        if (res.message == 'Visit deleted Successfully.') {
          if (cuslist.length == 1) {
            setcusList([]);
            viewallvisit();
          } else {
            viewallvisit();
          }
        } else {
          setLoading(false);
        }

        setLoading(false);
      })
      .catch(error => {
        console.log('Error Message------=========-----', error.response.data);

        setLoading(false);
      });
  };

  // useEffect(() => {
  //   // SplashScreen.hide();
  //   const fbRef = `/user/${emailToUniqueString(
  //     userData.email
  //   )}/visits/${customerId}`;
  //   const onValueChange = db()
  //     .ref(fbRef)
  //     .on("value", (snapshot) => {
  //       if (snapshot.exists()) {
  //         const locList: any[] = [];
  //         snapshot.forEach((element) => {
  //           const { key } = element;
  //           const Element = element.val();
  //           locList.push({ ...Element, key });
  //           console.log("User data: ", JSON.stringify({ ...Element, key }));
  //         });
  //         setList(locList);
  //       } else {
  //         setList([]);
  //       }
  //       setLoading(false);
  //     });

  //   return () => db().ref(fbRef).off("value", onValueChange);
  // }, []);

  const imageallsignelvisit = u => {
    console.log('uchbc78-----==', u[0] ? u[0].image : null);
    console.log('couny', u.length);
    for (let i = 0; i <= u.length; i++) {
      u[i].image;
      console.log(u[i].id, u[i].image);
    }
  };

  const deleteImageToo = (imageName: string) => {
    const Name = getThisImageName(imageName);
    storage()
      .ref('images/customers/visits/' + customerId + '/visit_' + Name)
      .delete();
  };
  const deleteIt = ({key, image}: any) => {
    Alert.alert(
      'Are you sure?',
      'you want to delete this visit',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'default',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            deleteImageToo(image);
            db()
              .ref(
                '/user/' +
                  emailToUniqueString(userData.email) +
                  '/visits/' +
                  customerId +
                  '/' +
                  key,
              )
              .remove();
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: bottom,
        backgroundColor: darkmd.payload ? '#111e25' : colors.white,
      }}>
      {/* <Header top={top} navigation={navigation} title="New Visit" /> */}
      {/* <StatusBar
        animated={true}
        backgroundColor={menuVisible?"white":colors.brown}
        barStyle="dark-content"
        
         /> */}
      <StatusBar
        animated={true}
        backgroundColor={darkmd.payload ? '#202d34' : colors.brown}
        barStyle={darkmd.payload ? 'light-content' : 'dark-content'}
      />
      <View
        style={{
          height: 56 + top,
          ...shadow(3),
          paddingHorizontal: 20,
          justifyContent: 'flex-end',
          backgroundColor: darkmd.payload ? '#202d34' : 'white',
        }}>
        <View
          style={{
            height: 56,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: darkmd.payload ? '#202d34' : 'white',
          }}>
          {/* <View  style={{ width: wp(25) }}></View> */}
          <Icon1
            name="arrowleft"
            color={darkmd.payload ? 'white' : 'black'}
            size={25}
            onPress={() => navigation.goBack()}
          />
          <View style={{paddingLeft: 60}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: darkmd.payload ? 'white' : 'black',
              }}>
              New Visit
            </Text>
          </View>
          <View
            style={{
              width: wp(25),
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => setmenuVisible(true)}
              style={{width: 27, height: 27, zIndex: 1}}>
              <Icon
                name="dots-vertical"
                color={darkmd.payload ? 'white' : 'black'}
                size={25}
              />
            </TouchableOpacity>

            {/* <Pressable
              onPress={() => {
                navigation.navigate("Profile");
              }}
            >
              <Image
                height={35}
                width={35}
                borderRadius={17.5}
                style={{ width: 35, height: 35 }}
                source={
                  userData !== null
                    ? userData.image
                      ? { uri: userData.image }
                      : placeholderAvatar
                    : placeholderAvatar
                }
              />
            </Pressable> */}
          </View>
        </View>
      </View>
      <ScrollView style={{}}>
        {!loading ? (
          cuslist.length > 0 ? (
            <View style={{height: wp(180)}}>
              <SwiperFlatList
                showPagination
                horizontal
                paginationStyleItemInactive={{
                  borderColor: colors.brown,
                  borderWidth: StyleSheet.hairlineWidth,
                  backgroundColor: darkmd.payload ? 'white' : colors.white,
                }}
                paginationStyle={{bottom: wp(0)}}
                paginationActiveColor={
                  darkmd.payload ? '#202d34' : colors.brown
                }
                data={cuslist}
                contentContainerStyle={{paddingTop: wp(6)}}
                renderItem={({item, index}) => (
                  <View
                    key={'Paginate_' + index}
                    style={{
                      alignItems: 'center',
                      width: wp(100),
                      paddingHorizontal: wp(2),
                    }}>
                    <View
                      style={{
                        marginTop: wp(4),
                        height: wp(65),
                        width: wp(90),
                        ...shadow(5),
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        overflow: 'hidden',
                        // backgroundColor:"red",
                        // flexDirection: "row",
                        alignSelf: 'center',
                        borderRadius: wp(2),
                        borderColor: 'white',
                        borderWidth: 0,

                        // flexWrap:'wrap'
                      }}>
                      {item.visit_image.length > 0 ? (
                        <View style={{flexDirection: 'row'}}>
                          {/* {loading ? (
                          <View style={{flex: 1, backgroundColor: 'white'}}>
                            <Loader visible={loading} />
                          </View>
                        ) : null} */}
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('EditVisit', {item});
                            }}
                            activeOpacity={0.8}
                            style={{
                              position: 'absolute',
                              top: wp(2),
                              right: wp(3),
                              zIndex: 5,
                              width: wp(11),
                              height: wp(11),
                              justifyContent: 'center',
                              alignItems: 'center',
                              ...shadow(3),
                              borderRadius: wp(11 / 2),
                              alignSelf: 'flex-end',
                              backgroundColor: darkmd.payload
                                ? '#202d34'
                                : 'white',
                            }}>
                            <ICON
                              size={30}
                              color={darkmd.payload ? 'white' : colors.brown}
                              name="md-pencil-sharp"
                            />
                          </TouchableOpacity>
                          <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}>
                            {item.visit_image.map(item => (
                              <TouchableOpacity
                                onPress={() => {
                                  saveOPenlargeView(item.id);
                                }}
                                key={item.id}
                                style={{
                                  backgroundColor: darkmd.payload
                                    ? '#111e25'
                                    : 'white',
                                  borderRadius: 0,
                                  height: wp(65),

                                  width: wp(90),
                                  flexDirection: 'row',
                                }}>
                                <Image
                                  source={{uri: item.image}}
                                  style={{
                                    height: '100%',
                                    width: wp(90),
                                    borderRadius: 0,
                                    alignSelf: 'center',
                                  }}
                                />
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                          {/* <View style={{backgroundColor:"red",borderRadius: wp(2),height: wp(65),
              width: wp(90),}}>
                <Image source={{uri:"https://intechsol.co/contour/public/assets/images/customer/1637735562.jpg"}} style={{
                  height: "100%",
                  width: wp(90),
                  borderRadius: wp(2),
                  alignSelf:'center'
                }}/>
              </View> */}
                          {/* {item.visit_image.length>0?(
                      
              <FlatList
              horizontal={true}
             contentContainerStyle={{flexGrow: 1}}
              //  ItemSeparatorComponent={
              //      () => <View style={{ width: 16}}/>
              //  }
              data={[{image:"https://intechsol.co/contour/public/assets/images/customer/1637735562.jpg"},{image:"https://intechsol.co/contour/public/assets/images/customer/1637735562.jpg"}]}
              // keyExtractor={item => item.id.toString()}
              renderItem={({item,index})=>(
                <View style={{backgroundColor:"red",borderRadius: wp(2),height: wp(65),
              width: wp(90),}}>
                <Image source={{uri:"https://intechsol.co/contour/public/assets/images/customer/1637735562.jpg"}} style={{
                  height: "100%",
                  width: wp(90),
                  borderRadius: wp(2),
                  alignSelf:'center'
                }}/>
              </View>
              )}
                  />
                  
                     ):null} */}
                        </View>
                      ) : (
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('EditVisit', {item});
                            }}
                            activeOpacity={0.8}
                            style={{
                              position: 'absolute',
                              top: wp(2),
                              right: wp(3),
                              zIndex: 5,
                              width: wp(11),
                              height: wp(11),
                              justifyContent: 'center',
                              alignItems: 'center',
                              ...shadow(3),
                              borderRadius: wp(11 / 2),
                              alignSelf: 'flex-end',
                              backgroundColor: darkmd.payload
                                ? '#111e25'
                                : 'white',
                            }}>
                            <ICON
                              size={30}
                              color={darkmd.payload ? 'white' : colors.brown}
                              name="md-pencil-sharp"
                            />
                          </TouchableOpacity>
                          <Image
                            width={wp(90)}
                            height={wp(65)}
                            style={{
                              height: wp(65),
                              width: wp(90),
                              borderRadius: wp(2),
                              backgroundColor: darkmd.payload
                                ? '#202d34'
                                : 'white',
                            }}
                            resizeMode={'contain'}
                            // source={item.visit_image ?{uri: imageallsignelvisit(item.visit_image) }: placeholder}
                            source={require('../../images/photo.png')}
                          />
                        </View>
                      )}
                    </View>
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
                        paddingHorizontal: wp(3),
                        backgroundColor: darkmd.payload ? '#202d34' : 'white',
                      }}>
                      <Text
                        style={{
                          fontWeight: '500',
                          fontSize: wp(4),
                          color: darkmd.payload ? 'white' : 'black',
                        }}>
                        Visit Date:{item.visit_date}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          delvisit(item);
                        }}
                        activeOpacity={0.8}
                        style={{position: 'absolute', right: 2}}>
                        <View
                          style={{
                            borderRadius: wp(11 / 2),
                            width: wp(11),
                            height: wp(11),
                            justifyContent: 'center',
                            alignItems: 'center',
                            ...shadow(3),
                            backgroundColor: darkmd.payload
                              ? '#111e25'
                              : 'white',
                          }}>
                          <ICON
                            size={30}
                            color={colors.iosRed}
                            name="trash-sharp"
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, padding: wp(2)}}>
                      <Item
                        floatingLabel
                        style={{
                          width: '100%',

                          marginVertical: 10,
                          borderBottomColor: darkmd.payload
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
                          value={item.procedure}
                          disabled={true}
                          selectionColor={colors.brown}
                          style={{
                            fontSize: 16,
                            fontWeight: '500',
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
                          borderBottomColor: darkmd.payload
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
                          value={item.measurement}
                          disabled={true}
                          selectionColor={colors.brown}
                          style={{
                            fontWeight: '500',
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
                          borderBottomColor: darkmd.payload
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
                          value={item.notes}
                          disabled={true}
                          selectionColor={colors.brown}
                          style={{
                            fontSize: 16,
                            fontWeight: '500',
                            color: darkmd.payload ? 'white' : 'black',
                          }}
                          autoCapitalize="none"
                          returnKeyType="next"
                        />
                      </Item>

                      <View>
                        {item.is_customer_fill == false ||
                        item.is_customer_shape_fill == false ||
                        item.is_customer_appointment_fill == false ? (
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: darkmd.payload ? 'white' : 'black',
                            }}>
                            Forms
                          </Text>
                        ) : null}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                          }}>
                          {item.is_customer_fill == false ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Icon2
                                name={
                                  rd == 1
                                    ? 'checkbox-marked'
                                    : 'checkbox-blank-outline'
                                }
                                size={20}
                                color={'black'}
                                onPress={() => setrd(1)}
                              />
                              {/* <RadioButton  uncheckedColor={darkmd.payload?"white":colors.brown} color={darkmd.payload?"white":colors.brown} value="1"  status={rd==1?'checked' : 'unchecked'}  onPress={()=>setrd(1)} /> */}
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: darkmd.payload ? 'white' : 'black',
                                }}>
                                EMS
                              </Text>
                            </View>
                          ) : null}
                          {item.is_customer_shape_fill == false ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              {/* <RadioButton  uncheckedColor={darkmd.payload?"white":colors.brown} color={darkmd.payload?"white":colors.brown} status={rd==2?'checked' : 'unchecked'}   value="2"  onPress={()=>setrd(2)} /> */}
                              <Icon2
                                name={
                                  rd == 2
                                    ? 'checkbox-marked'
                                    : 'checkbox-blank-outline'
                                }
                                size={20}
                                color={'black'}
                                onPress={() => setrd(2)}
                              />
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: darkmd.payload ? 'white' : 'black',
                                }}>
                                Cavitation & RF
                              </Text>
                            </View>
                          ) : null}
                          {item.is_customer_appointment_fill == false ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Icon2
                                name={
                                  rd == 3
                                    ? 'checkbox-marked'
                                    : 'checkbox-blank-outline'
                                }
                                size={20}
                                color={'black'}
                                onPress={() => setrd(3)}
                              />
                              {/* <RadioButton  uncheckedColor={darkmd.payload?"white":colors.brown} color={darkmd.payload?"white":colors.brown} status={rd==3?'checked' : 'unchecked'}   value="3"   onPress={()=>setrd(3)} /> */}
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: darkmd.payload ? 'white' : 'black',
                                }}>
                                Fat Freezing
                              </Text>
                            </View>
                          ) : null}
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            width: wp(90),
                            marginTop: 10,
                          }}>
                          {item.is_customer_lllt_fill == false ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Icon2
                                name={
                                  rd == 4
                                    ? 'checkbox-marked'
                                    : 'checkbox-blank-outline'
                                }
                                size={20}
                                color={'black'}
                                onPress={() => setrd(4)}
                              />
                              {/* <RadioButton  uncheckedColor={darkmd.payload?"white":colors.brown} color={darkmd.payload?"white":colors.brown} value="1"  status={rd==1?'checked' : 'unchecked'}  onPress={()=>setrd(1)} /> */}
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: darkmd.payload ? 'white' : 'black',
                                }}>
                                LLLT Fat Reduction
                              </Text>
                            </View>
                          ) : null}
                          {item.is_customer_ems_fill == false ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              {/* <RadioButton  uncheckedColor={darkmd.payload?"white":colors.brown} color={darkmd.payload?"white":colors.brown} status={rd==2?'checked' : 'unchecked'}   value="2"  onPress={()=>setrd(2)} /> */}
                              <Icon2
                                name={
                                  rd == 5
                                    ? 'checkbox-marked'
                                    : 'checkbox-blank-outline'
                                }
                                size={20}
                                color={'black'}
                                onPress={() => setrd(5)}
                              />
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: darkmd.payload ? 'white' : 'black',
                                }}>
                                EMS +RF PATIENT CONSENT FORM
                              </Text>
                            </View>
                          ) : null}
                        </View>
                      </View>
                    </View>
                    <Modal
                      animationType="fade"
                      transparent={true}
                      visible={menuVisible}>
                      <SafeAreaView style={{flexDirection: 'row'}}>
                        <View
                          onTouchStart={() => setmenuVisible(false)}
                          style={{
                            backgroundColor: '#00000088',
                            alignSelf: 'flex-start',
                            width: wp(55),
                            height: hp(30),
                          }}></View>

                        <View
                          style={{
                            borderRadius: 5,
                            backgroundColor: darkmd.payload
                              ? '#202d34'
                              : 'white',
                            width: wp(45),
                            height: hp(30),
                            alignSelf: 'flex-end',
                            elevation: 5,
                            paddingHorizontal: 0,
                          }}>
                          {item.is_customer_fill == true ? (
                            <View>
                              <TouchableOpacity
                                onPress={() => {
                                  setmenuVisible(false),
                                    navigation.navigate('CustomerForm', {
                                      customerId,
                                    });
                                }}
                                style={{
                                  backgroundColor: darkmd.payload
                                    ? '#202d34'
                                    : 'white',
                                  borderTopLeftRadius: 5,
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: 10,
                                    marginTop: 10,
                                    marginBottom: 10,
                                  }}>
                                  <Text
                                    style={{
                                      color: darkmd.payload ? 'white' : '#000',
                                      fontSize: 14,
                                      fontWeight: 'bold',
                                    }}>
                                    EMS
                                  </Text>
                                  <Icon1
                                    name="right"
                                    color={darkmd.payload ? 'white' : 'black'}
                                    size={14}
                                  />
                                </View>
                              </TouchableOpacity>
                            </View>
                          ) : null}
                          {item.is_customer_shape_fill == true ? (
                            <View>
                              <TouchableOpacity
                                onPress={() => {
                                  setmenuVisible(false),
                                    navigation.navigate('CustomerShapeForm', {
                                      customerId,
                                    });
                                }}
                                style={{
                                  backgroundColor: darkmd.payload
                                    ? '#202d34'
                                    : 'white',
                                  borderTopLeftRadius: 5,
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: 10,
                                    marginTop: 10,
                                    marginBottom: 10,
                                  }}>
                                  <Text
                                    style={{
                                      color: darkmd.payload ? 'white' : 'black',
                                      fontSize: 14,
                                      fontWeight: 'bold',
                                    }}>
                                    Cavitation & RF
                                  </Text>
                                  <Icon1
                                    name="right"
                                    color={darkmd.payload ? 'white' : 'black'}
                                    size={14}
                                  />
                                </View>
                              </TouchableOpacity>
                            </View>
                          ) : null}
                          {item.is_customer_appointment_fill == true ? (
                            <View>
                              <TouchableOpacity
                                onPress={() => {
                                  setmenuVisible(false),
                                    navigation.navigate(
                                      'CustomerAppointmentForm',
                                      {customerId},
                                    );
                                }}
                                style={{
                                  backgroundColor: 'white',
                                  borderTopLeftRadius: 5,
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: 10,
                                    marginTop: 10,
                                    marginBottom: 10,
                                  }}>
                                  <Text
                                    style={{
                                      color: darkmd.payload ? 'white' : 'black',
                                      fontSize: 14,
                                      fontWeight: 'bold',
                                    }}>
                                    Fat Freezing
                                  </Text>
                                  <Icon1
                                    name="right"
                                    color={darkmd.payload ? 'white' : 'black'}
                                    size={14}
                                  />
                                </View>
                              </TouchableOpacity>
                            </View>
                          ) : null}
                          {item.is_customer_lllt_fill == true ? (
                            <View>
                              <TouchableOpacity
                                onPress={() => {
                                  setmenuVisible(false),
                                    navigation.navigate('ClientViewLLLT', {
                                      customerId,
                                    });
                                }}
                                style={{
                                  backgroundColor: 'white',
                                  borderTopLeftRadius: 5,
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: 10,
                                    marginTop: 10,
                                    marginBottom: 10,
                                  }}>
                                  <Text
                                    style={{
                                      color: darkmd.payload ? 'white' : 'black',
                                      fontSize: 14,
                                      fontWeight: 'bold',
                                    }}>
                                    LLLT Fat Reduction
                                  </Text>
                                  <Icon1
                                    name="right"
                                    color={darkmd.payload ? 'white' : 'black'}
                                    size={14}
                                  />
                                </View>
                              </TouchableOpacity>
                            </View>
                          ) : null}
                          {item.is_customer_ems_fill == true ? (
                            <View>
                              <TouchableOpacity
                                onPress={() => {
                                  setmenuVisible(false),
                                    navigation.navigate('ClientViewRFPatient', {
                                      customerId,
                                    });
                                }}
                                style={{
                                  backgroundColor: 'white',
                                  borderTopLeftRadius: 5,
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: 10,
                                    marginTop: 10,
                                    marginBottom: 10,
                                  }}>
                                  <Text
                                    style={{
                                      color: darkmd.payload ? 'white' : 'black',
                                      fontSize: 14,
                                      fontWeight: 'bold',
                                    }}>
                                    EMS +RF PATIENT CONSENT FORM
                                  </Text>
                                  <Icon1
                                    name="right"
                                    color={darkmd.payload ? 'white' : 'black'}
                                    size={14}
                                  />
                                </View>
                              </TouchableOpacity>
                            </View>
                          ) : null}
                        </View>
                      </SafeAreaView>
                      <View
                        onTouchStart={() => setmenuVisible(false)}
                        style={{
                          backgroundColor: '#00000088',
                          width: wp(100),
                          height: hp(70),
                        }}></View>
                    </Modal>
                    {/* ):null} */}
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={loading1}>
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
                  </View>
                )}
              />
            </View>
          ) : (
            <View
              style={{
                height: hp(100),
                width: wp(100),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: darkmd.payload ? '#111e25' : 'white',
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: darkmd.payload ? 'white' : 'black',
                }}>
                No Visit Yet...
              </Text>
            </View>
          )
        ) : (
          <View
            style={{
              height: hp(100),
              width: wp(100),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: darkmd.payload ? '#111e25' : 'white',
            }}>
            <ActivityIndicator size="large" color={colors.brown} />
          </View>
        )}
      </ScrollView>
      {rd != 0 ? <RButton title="View Form" onPress={vieform} /> : null}
      <RButton
        title="Add New Visit"
        onPress={() => {
          navigation.navigate('NewVisit', {customerId});
        }}
      />
      <Modal animationType="fade" transparent={true} visible={openviewmodal}>
        {list.length > 0 ? (
          <GestureRecognizer
            onSwipe={(direction, state) => onSwipe(direction, state)}
            // onSwipeLeft={state => onSwipeLeft(state)}
            // onSwipeRight={state => onSwipeRight(state)}
            config={config}
            style={{
              flex: 1,
              backgroundColor: 'black',
              // alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() => setopenviewmodal(false)}
              style={{
                width: '12%',
                height: '6%',

                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode="contain"
                style={{width: '70%', height: '70%'}}
                source={require('../../images/ar.png')}
              />
            </TouchableOpacity>
            <Image
              resizeMode="cover"
              style={{width: '100%', height: '40%'}}
              source={{uri: list[indexlist].image}}
            />
            <View
              style={{
                width: '90%',
                height: '20%',
                flexDirection: 'row',
                backgroundColor: 'black',
                paddingHorizontal: 20,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => onSwipeLeft()}
                style={{
                  width: '25%',
                  height: '30%',

                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onSwipeRight()}
                style={{
                  width: '25%',
                  height: '30%',

                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>Next</Text>
              </TouchableOpacity>
            </View>
          </GestureRecognizer>
        ) : null}
      </Modal>
    </View>
  );
};
export default NewVisit;
