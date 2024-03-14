import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Deletecustomer, viewcostomer} from '../../screens/ApiCountoryBody';
import {Input, Item, Label} from 'native-base';
// import { Appearance, useColorScheme } from 'react-native-appearance';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';
import React, {useEffect, useState} from 'react';
import {
  date2String,
  devLogger,
  emailIsValid,
  emailToUniqueString,
  validateEmail,
} from '../../lib/utilts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {internetconnection, userRefresh} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

import Checktrail from '../Checkpaystatus';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import DatePicker from 'react-native-date-picker';
import {FLIPPED_ALIAS_KEYS} from '@babel/types';
// import db from "@react-native-firebase/database";
// import storage from "@react-native-firebase/storage";
import Flatlist from 'react-native-swipeable-list';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Menus from '../../components/Menu';
import NetInfo from '@react-native-community/netinfo';
import RButton from '../../components/RoundedButton';
import SplashScreen from 'react-native-splash-screen';
import {color} from 'react-native-reanimated';
import colors from '../../constants/colors';
import {shadow} from '../../lib';
import style from './style';
import styles from './style';
import {updateuser} from '../../redux/actions';
import {useFocusEffect} from '@react-navigation/core';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Appearance.getColorScheme();

const placeholderAvatar = require('../../images/placeholderWOC.png');
const Home = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {userData} = useSelector(({USER}) => USER);
  const {userpayment} = useSelector(({PAY}) => PAY);
  const {top, bottom} = useSafeAreaInsets();
  const [list, setList] = useState([]);
  const [cuslist, setcusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setmenuVisible] = useState(false);
  const {darkmd} = useSelector(({DARK}) => DARK);

  // if(darkmd.payload=="03401892643")
  // {
  //   updateuser({...userData, phoneno:false})(dispatch);
  // }

  // const mscolor = useColorScheme();
  const [payed, setpayed] = useState('');
  const [del, setdel] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setcusList([]);
      setLoading(true);
      // console.log('456789dfghjk');
      viewallcustomer();
    });

    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   viewallcustomer ();

  // }, []);

  const viewallcustomer = () => {
    viewcostomer({Auth: userData.api_token})
      .then(res => {
        if (res.data) {
          setcusList(res.data);
        }
        // console.log('555555555555----------5555555555', res);
      })
      .catch(e => {
        console.log('error message ', e.response.data.message);
        if (e.response.data.message == 'Customer data not Found') {
          setcusList([]);
          console.log('success');
          setLoading(false);
        }
      });
  };

  const customerdel = cd => {
    setLoading(true);
    console.log('registration start');
    const data = new FormData();
    data.append('customer_id', cd.id);
    console.log('data,,,,,', data);

    Deletecustomer({Auth: userData.api_token}, data)
      .then(res => {
        console.log('Signup   respone..........', res);

        viewallcustomer();

        setLoading(false);
      })
      .catch(error => {
        console.log('Error Message', error.response.data);

        setLoading(false);
      });
  };

  const onDelete = (data: object) => {
    const logedInUserEmail = emailToUniqueString(userData.email);
    const custEmail = emailToUniqueString(data.email);
    //References
    const referenceCust = db().ref(
      '/user/' + logedInUserEmail + '/customers/' + data.key,
    );
    const referenceVisit = db().ref(
      '/user/' + logedInUserEmail + '/visits/' + custEmail,
    );
    const CustRafImage = storage().ref(
      'images/customers/' + emailToUniqueString(custEmail),
    );
    const listToRemove = storage().ref(
      'images/customers/visits/' + emailToUniqueString(custEmail),
    );
    // Deleter
    referenceCust.remove().catch(e => console.log('DeleteCustError', e));
    referenceVisit.remove().catch(e => console.log('DeleteVisitsError', e));
    CustRafImage.delete().catch(e => console.log('DeleteCustImageError', e));
    listToRemove
      .listAll()
      .then(res => {
        res.items.forEach(({path}) => {
          storage().ref(path).delete();
        });
      })
      .catch(e => {
        console.log('DeleteListError', e);
      });
  };

  const QuickActions = ({item, index}: {item: object; index: number}) => {
    return (
      <View style={styles.qaContainer}>
        <View
          style={[
            styles.buttonE,
            {backgroundColor: darkmd.payload ? '#202d34' : colors.brown},
          ]}>
          <Pressable
            onPress={() =>
              navigation.navigate('CustomerEditProfile', {dataToEdit: item})
            }>
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.button,
            {backgroundColor: darkmd.payload ? '#495659' : colors.iosRed},
          ]}>
          <Pressable
            onPress={() => {
              <Modal animationType="fade" transparent={true} visible={true}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    height: hp(100),
                    width: wp(100),
                  }}>
                  <Text>kjh</Text>
                </View>
              </Modal>;

              Alert.alert(
                'Are you sure?',
                'You want to delete this customer?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Delete',
                    onPress: () => customerdel(item),
                    style: 'destructive',
                  },
                ],
                {cancelable: false},
              );
            }}>
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  // useEffect(() => {
  //   SplashScreen.hide();
  //   const onValueChange = db()
  //     .ref(`/user/${emailToUniqueString(userData.email)}/customers`)
  //     .on("value", (snapshot) => {
  //       const locList = [];
  //       snapshot.forEach((element) => {
  //         const key = element.key;
  //         const Element = element.val();
  //         locList.push({ ...Element, key });
  //         console.log("User data: ", Element);
  //       });
  //       //  console.log("User data: ", locList);
  //       setList(locList);
  //       setLoading(false);
  //     });

  //   // Stop listening for updates when no longer required
  //   return () =>
  //     db()
  //       .ref(`/user/${emailToUniqueString(userData.email)}/customers`)
  //       .off("value", onValueChange);
  // }, []);

  const menufalse = () => {
    setmenuVisible(false);
  };
  // useEffect(() => {
  //   const backAction = () => {
  //     console.log("................")
  //    setmenuVisible(false)
  //    navigation.goBack();
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

  return (
    <>
      <>
        <View
          style={{
            flex: 1,
            paddingBottom: bottom,
            backgroundColor: darkmd.payload ? '#111e25' : '#fff',
          }}>
          {/* <StatusBar  barStyle="dark-content" /> */}
          <StatusBar
            animated={true}
            backgroundColor={darkmd.payload ? '#202d34' : colors.brown}
            barStyle={darkmd.payload ? 'light-content' : 'dark-content'}
          />

          <View
            style={{
              height: 56 + top,
              ...shadow(3),
              paddingHorizontal: 15,
              justifyContent: 'flex-end',
              backgroundColor: darkmd.payload ? '#202d34' : 'white',
            }}>
            <View
              style={{
                height: 56,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: wp(0),
                backgroundColor: darkmd.payload ? '#202d34' : 'white',
              }}>
              <View style={{width: wp(25)}}></View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: darkmd.payload ? 'white' : 'black',
                  }}>
                  Home
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

          <View
            onTouchStart={() =>
              menuVisible == true ? menufalse : console.log('-----------')
            }
            style={{flex: 1}}>
            {/* <Text>cdscdcxcc</Text> */}
            <Checktrail text="trail" />

            <Checktrail text="subscriptiontrail" />
            {cuslist.length > 0 ? (
              <Flatlist
                // ref={ref}
                style={{flex: 1}}
                contentContainerStyle={{
                  padding: wp(4),
                }}
                data={cuslist}
                keyExtractor={item => item.id.toString()}
                renderQuickActions={QuickActions}
                maxSwipeDistance={132}
                shouldBounceOnMount={false}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('CustomerProfile', {
                          customerId: item.id,
                        });
                      }}
                      activeOpacity={1}
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        padding: wp(4),
                        alignItems: 'center',
                        marginVertical: wp(2),
                        ...shadow(5),
                        backgroundColor: darkmd.payload ? '#202d34' : '#fff',
                      }}>
                      <Image
                        height={60}
                        width={60}
                        borderRadius={30}
                        style={{width: 60, height: 60, marginRight: wp(3)}}
                        source={
                          item.image ? {uri: item.image} : placeholderAvatar
                        }
                      />
                      <View>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 15,
                            marginBottom: 10,
                            color: darkmd.payload ? '#fff' : 'black',
                          }}>
                          {item.firstname + ' ' + item.lastname}
                        </Text>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 15,
                            color: darkmd.payload ? '#fff' : 'black',
                          }}>
                          Phone No: {item.phoneno}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  marginBottom: 30,
                  padding: wp(4),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: darkmd.payload ? '#111e25' : 'white',
                }}>
                {loading ? (
                  <ActivityIndicator
                    size="large"
                    color={darkmd.payload ? 'white' : colors.brown}
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: 'bold',
                      color: darkmd.payload ? '#fff' : 'black',
                    }}>
                    No Customer yet..
                  </Text>
                )}
              </View>
            )}
          </View>
          <RButton
            onPress={() => {
              navigation.navigate('NewCustomer');
            }}
            title="Add new Customer"
          />
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={menuVisible}
          //  onRequestClose={() => {
          //   Alert.alert("Modal has been closed.");
          //   setmenuVisible(false);
          // }}
          // onTouchStart={()=>setmenuVisible(false)}
        >
          <SafeAreaView style={{flexDirection: 'row'}}>
            <View
              onTouchStart={() => setmenuVisible(false)}
              style={{
                backgroundColor: '#00000088',
                alignSelf: 'flex-start',
                width: wp(45),
                height: hp(45),
              }}></View>
            <View
              style={{
                borderRadius: 5,
                backgroundColor: darkmd.payload ? '#202d34' : 'white',
                width: wp(55),
                height: hp(45),
                alignSelf: 'flex-end',
                elevation: 5,
                paddingHorizontal: 0,
              }}>
              {/* <TouchableOpacity onPress={()=>setmenuVisible(false)} style={{flexDirection:'row',
     justifyContent:'space-between',alignItems:'center',
     paddingHorizontal:5,elevation:2,backgroundColor:"white",height:30,borderTopLeftRadius:5}}>
               <Icon1 name="left" color="black" size={14} />
           <Text style={{color:'black',fontSize:14,fontWeight:'bold'}}>Back</Text>
           </TouchableOpacity> */}

              <TouchableOpacity
                onPress={() => {
                  setmenuVisible(false), navigation.navigate('Profile');
                }}
                style={{
                  backgroundColor: darkmd.payload ? '#202d34' : 'white',
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
                      color: darkmd.payload ? '#fff' : 'black',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    Profile
                  </Text>
                  <Image
                    height={20}
                    width={20}
                    borderRadius={17.5}
                    style={{width: 20, height: 20}}
                    source={
                      userData !== null
                        ? userData.image
                          ? {uri: userData.image}
                          : placeholderAvatar
                        : placeholderAvatar
                    }
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setmenuVisible(false), navigation.navigate('UserHiTone');
                }}
                style={{backgroundColor: darkmd.payload ? '#202d34' : 'white'}}>
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
                      color: darkmd.payload ? '#fff' : 'black',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    EMS
                  </Text>
                  <Icon1
                    name="right"
                    color={darkmd.payload ? '#fff' : 'black'}
                    size={14}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setmenuVisible(false), navigation.navigate('UserCbShape');
                }}
                style={{backgroundColor: darkmd.payload ? '#202d34' : 'white'}}>
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
                      color: darkmd.payload ? '#fff' : 'black',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    Cavitation & RF
                  </Text>
                  <Icon1
                    name="right"
                    color={darkmd.payload ? '#fff' : 'black'}
                    size={14}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setmenuVisible(false),
                    navigation.navigate('UserNewAppointmentPolicy');
                }}
                style={{backgroundColor: darkmd.payload ? '#202d34' : 'white'}}>
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
                      color: darkmd.payload ? '#fff' : 'black',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    Fat Freezing
                  </Text>
                  <Icon1
                    name="right"
                    color={darkmd.payload ? '#fff' : 'black'}
                    size={14}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setmenuVisible(false), navigation.navigate('UserLLLT');
                }}
                style={{backgroundColor: darkmd.payload ? '#202d34' : 'white'}}>
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
                      color: darkmd.payload ? '#fff' : 'black',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    LLLT Fat Reduction
                  </Text>
                  <Icon1
                    name="right"
                    color={darkmd.payload ? '#fff' : 'black'}
                    size={14}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setmenuVisible(false), navigation.navigate('RFPatient');
                }}
                style={{backgroundColor: darkmd.payload ? '#202d34' : 'white'}}>
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
                      color: darkmd.payload ? '#fff' : 'black',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    EMS +RF PATIENT CONSENT FORM
                  </Text>
                  <Icon1
                    name="right"
                    color={darkmd.payload ? '#fff' : 'black'}
                    size={14}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setmenuVisible(false),
                    navigation.navigate('SubscriptionTrailDetail');
                }}
                style={{backgroundColor: darkmd.payload ? '#202d34' : 'white'}}>
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
                      color: darkmd.payload ? '#fff' : 'black',
                      fontSize: 14,
                      fontWeight: 'bold',
                      width: wp(35),
                    }}>
                    Subscription and Trial Detail
                  </Text>
                  <Icon1
                    name="right"
                    color={darkmd.payload ? '#fff' : 'black'}
                    size={14}
                  />
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={() => {
                  setmenuVisible(false), navigation.navigate('SatingApp');
                }}
                style={{backgroundColor: darkmd.payload ? '#202d34' : 'white'}}>
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
                      color: darkmd.payload ? '#fff' : 'black',
                      fontSize: 14,
                      fontWeight: 'bold',
                      width: wp(35),
                    }}>
                    Setting
                  </Text>
                  <Icon1
                    name="right"
                    color={darkmd.payload ? '#fff' : 'black'}
                    size={14}
                  />
                </View>
              </TouchableOpacity> */}
            </View>
          </SafeAreaView>
          <View
            onTouchStart={() => setmenuVisible(false)}
            style={{
              backgroundColor: '#00000088',
              width: wp(100),
              height: hp(65),
            }}></View>
        </Modal>
      </>
    </>
  );
};
export default Home;
