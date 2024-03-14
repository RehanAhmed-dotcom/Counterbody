import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  Image,
  SafeAreaView,
  Modal,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Flatlist from 'react-native-swipeable-list';
import {useSelector, useDispatch} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import {shadow} from '../../lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Right from 'react-native-vector-icons/Entypo';
import Suboption from '../SelectOptions';
import {
  subscriptionplanlist,
  strippaymentforsubscription,
  getClientSecret,
  checksubscriptionandtrailstatus,
  appleApiConfirm,
} from '../ApiCountoryBody';
import {
  PlatformPay,
  PlatformPayButton,
  confirmPlatformPayPayment,
  isPlatformPaySupported,
} from '@stripe/stripe-react-native';
import {updateuser, updatepayment} from '../../redux/actions';
import PaymentView from '../PaymentView';
const placeholderAvatar = require('../../images/placeholderWOC.png');
const SubscriptionPayment = ({navigation}) => {
  const {userData} = useSelector(({USER}) => USER);
  const {userpayment} = useSelector(({PAY}) => PAY);
  const {top} = useSafeAreaInsets();
  const [isApplePaySupported, setIsApplePaySupported] = useState(false);
  const [menuVisible, setmenuVisible] = useState(false);
  const [screenType, setScreenType] = useState('content');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [subcriptinlist, setsubcriptinlist] = useState('');
  const [pay, setPay] = useState(false);
  const [loadin, setloadin] = useState(false);
  const dispatch = useDispatch();
  const [trailcheck, settrailcheck] = useState(false);

  const [item, setItem] = useState('');
  // console.log('loadin', loadin);
  useEffect(() => {
    (async function () {
      setIsApplePaySupported(await isPlatformPaySupported());
    })();
  }, [isPlatformPaySupported]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // console.log('456789dfghjk');
      ListofSubscriptionList();
      status_of_scription_and_trail();
    });

    return unsubscribe;
  }, [navigation]);
  const status_of_scription_and_trail = async () => {
    checksubscriptionandtrailstatus({Auth: userData.api_token})
      .then(res => {
        // console.log('Payment respone..........', res);
        if (res.trail_status == true) {
          settrailcheck(false);
        } else {
          settrailcheck(true);
        }
      })
      .catch(error => {
        console.log('Erroe Message', error);
      });
  };

  const ListofSubscriptionList = () => {
    setloadin(true);
    subscriptionplanlist({Auth: userData.api_token})
      .then(res => {
        // console.log('Form Questions', res);
        if (res.message == 'Subscription Plan Successfully') {
          // console.log('ggggggg');
          setloadin(false);
          setsubcriptinlist(res.data);
        } else {
          setloadin(false);
        }
      })
      .catch(e => {
        setloadin(false);
        console.log('error message ', e);
      });
  };

  if (isFullScreen) {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  }
  const subscribepayment = ite => {
    setPay(true);
    setItem(ite);
    console.log('hlow');
  };
  const onCheckStatus = async paymentResponse => {
    setloadin(true);
    let response = JSON.parse(paymentResponse);
    if (!response) {
      setloadin(false);
    } else if (response.error) {
      setloadin(false);
    } else {
      // setPaymentStatus('Please wait while confirming your payment!');
      // setIsVisible(true);

      let jsonResponse = JSON.parse(paymentResponse);
      console.log('token id', jsonResponse.token.id);
      const data = new FormData();
      data.append('user_id', userData.id);
      data.append('tokenId', jsonResponse.token.id);
      data.append('stripe_plan', item.stripe_product_id);
      data.append('plan_duration', item.plan_duration);
      data.append('duration', item.duration);

      // try {
      //   const stripeResponse = await axios.post(
      //     `${BASE_URL}/api/stripe-payment`,
      //     data,
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //         accept: "application/json",
      //       },
      //     }
      //   );

      strippaymentforsubscription({Auth: userData.api_token}, data)
        .then(res => {
          const stripeResponse = res;
          console.log('response of api of  strippaymentforsubscription', res);
          console.log('response of api', res.paid);
          if (stripeResponse) {
            console.log('111111111');
            const paid = stripeResponse.paid;
            if (paid == true) {
              console.log('11111111122222222');
              // addUser(stripeResponse.data.data)(dispatch);
              // setPaymentStatus('Payment Success');
              setPay(false);
              setloadin(false);

              updatepayment(res)(dispatch);
              console.log('-----------', userpayment);
              updateuser({
                ...userData,
                is_subscribe: true,
                subscription_status: true,
              })(dispatch);
            } else {
              console.log('11111111122222222333333333');
              // setPaymentStatus('Payment failed due to some issue');
              setloadin(false);
            }
          } else {
            console.log('11111111122222222333333444444444444');
            // setPaymentStatus('Payment failed due to some issue');
            setloadin(false);
          }
        })
        .catch(error => {
          console.log('111111111222222223333334444444444445555555555555');
          // setPaymentStatus('Payment failed due to some issue');
          setloadin(false);
        });
    }
  };
  const fetchPaymentIntentClientSecret = async item => {
    let data1 = '';
    const data = new FormData();
    data.append('price', item.price);
    data.append('stripe_plan', item.stripe_product_id);
    data.append('plan_duration', item.plan_duration);
    data.append('duration', item.duration);
    await getClientSecret({Auth: userData.api_token}, data)
      .then(res => {
        data1 = res;
        console.log('res in client secret', res);
      })
      .catch(err => {
        console.log('error in get client secret1', err);
        console.log('err', err.response);
      });
    return data1;
  };
  const ApplePayApiConfirm = res => {
    setloadin(true);
    const data = new FormData();
    data.append('add_month_date', res.add_month_date);
    data.append('clientSecret', res.clientSecret);
    data.append('payment_intent', res.payment_intent);
    data.append('stripe_plan', res.stripe_plan);
    appleApiConfirm({Auth: userData.api_token}, data)
      .then(res => {
        console.log(
          'res of applepayapiconfirm.............................',
          res,
        );
        if (res.status == 'success') {
          if (res.paid) {
            // setPaymentStatus('Payment Success');
            setloadin(false);
            updatepayment(res)(dispatch);
            updateuser({
              ...userData,
              is_subscribe: true,
              subscription_status: true,
            })(dispatch);
            Alert.alert('Payment Successful', 'Your payment has been done');
          } else {
            // setPaymentStatus('Payment failed due to some issue');
            setloadin(false);
          }
        }
      })
      .catch(err => {
        console.log(
          'err in applepayapiconfirm+++...............++++++++++',
          err,
        );
        console.log('erruuuuuuu......', err.response);
        // setPaymentStatus('Payment failed due to some issue');
        setloadin(false);
      });
  };
  const payApplePayment = async item => {
    // console.log('item in state', item);
    const res = await fetchPaymentIntentClientSecret(item);

    // console.log('cllient secret after updates done', res);
    const {error} = await confirmPlatformPayPayment(res.clientSecret, {
      applePay: {
        cartItems: [
          {
            label: item.sub_title,
            amount: item.price,
            paymentType: PlatformPay.PaymentType.Immediate,
            paymentMethod: PlatformPay.ApplePayMerchantCapability.SupportsDebit,
          },
        ],
        merchantCountryCode: 'US',
        currencyCode: item.currency.toUpperCase(),
        // requiredShippingAddressFields: [PlatformPay.ContactField.PostalAddress],
        requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
      },
    });

    if (error) {
      // handle error
      console.log('error in apple pay', error);
    } else {
      ApplePayApiConfirm(res);
    }
  };
  const suscriptionpayment = ({item}) => (
    <View>
      <View style={styles.cardview}>
        <View style={styles.cardheader}>
          <Text style={styles.headrtext}>Package </Text>
          <Text style={styles.headrtext}>{item.title}</Text>
        </View>
        <View style={[styles.cardheader, {marginTop: wp(0)}]}>
          <Text style={styles.headrtext}>Package Price</Text>
          <Text style={styles.headrtext}>$ {item.price}. </Text>
        </View>
        <View style={[styles.cardheader, {marginTop: wp(0)}]}>
          <Text style={styles.headrtext}>Currency</Text>
          <Text style={styles.headrtext}>{item.currency} </Text>
        </View>
        <TouchableOpacity
          onPress={() => subscribepayment(item)}
          // onPress={() => applepay()}
          style={styles.suscribbutn}>
          <Text style={styles.btntext}>Subscribe</Text>
        </TouchableOpacity>
        {Platform.OS == 'ios' && (
          <PlatformPayButton
            onPress={() => {
              // onApplePayPress(item);
              payApplePayment(item);
              // handleApplePay(item);
            }}
            type={PlatformPay.ButtonType.Order}
            appearance={PlatformPay.ButtonStyle.Black}
            borderRadius={4}
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 20,
              height: 50,
            }}
          />
        )}
      </View>
    </View>
  );
  return (
    <View style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor={colors.brown}
        barStyle="dark-content"
      />

      <View
        style={{
          height: 56 + top,
          ...shadow(3),
          paddingHorizontal: 15,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            height: 56,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: wp(0),
          }}>
          <View style={{width: wp(25)}}></View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'black',
              }}>
              Subscribe a Package
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
              <Icon name="dots-vertical" color="black" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{marginBottom: wp(15)}}>
        {pay ? (
          <Modal
            isVisible={pay}
            style={{margin: 0, flex: 1}}
            animationType="fade"
            transparent={true}
            onBackButtonPress={() => setPay(false)}>
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: '#00000088',
                alignSelf: 'flex-start',
                width: wp(100),
                height: hp(100),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => setPay(false)}
                style={{
                  position: 'absolute',
                  top: 47,
                  left: 15,
                  zIndex: 100,
                  backgroundColor: colors.brown,
                  borderRadius: wp(10),
                  width: wp(9),
                  height: wp(9),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Right name="cross" size={25} color="black" />
              </TouchableOpacity>
              <View style={{borderWidth: 1, width: wp(100), height: hp(100)}}>
                <PaymentView
                  onCheckStatus={onCheckStatus}
                  paymentPackage={item}
                />
              </View>
            </SafeAreaView>
          </Modal>
        ) : null}
        {trailcheck && !loadin ? <Suboption /> : null}

        {/* <Text style={{alignSelf:'center',fontSize:18,color:'black',fontWeight: "bold",marginTop:wp(1)}}>Purchase Application</Text> */}
        <Flatlist
          // ref={ref}

          contentContainerStyle={{
            padding: wp(4),
          }}
          data={subcriptinlist}
          keyExtractor={item => item.id.toString()}
          renderItem={suscriptionpayment}
        />
      </View>
      <Modal animationType="fade" transparent={true} visible={loadin}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000088',
            alignSelf: 'flex-start',
            width: wp(100),
            height: hp(100),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={colors.brown} />
        </View>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={menuVisible}>
        <SafeAreaView style={{flexDirection: 'row'}}>
          <View
            onTouchStart={() => setmenuVisible(false)}
            style={{
              backgroundColor: '#00000088',
              alignSelf: 'flex-start',
              width: wp(45),
              height: hp(30),
            }}></View>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: 'white',
              width: wp(55),
              height: hp(30),
              alignSelf: 'flex-end',
              elevation: 5,
              paddingHorizontal: 0,
            }}>
            <TouchableOpacity
              onPress={() => {
                setmenuVisible(false), navigation.navigate('Profile');
              }}
              style={{backgroundColor: 'white', borderTopLeftRadius: 5}}>
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
                  style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  btntext: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  btntext1: {color: 'black', fontSize: 16, fontWeight: 'bold'},
  headrtext: {
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    // width: wp(40),
  },
  cardheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // backgroundColor: colors.brown,
    // height: hp(16),
    // borderRadius: 10,
    // borderBottomLeftRadius: hp(20),
    // borderBottomRightRadius: hp(20),
    // elevation: 3,
    width: wp(85),
    // borderWidth:1,

    height: hp(7),
    backgroundColor: 'lightgray',
    alignSelf: 'center',
    elevation: 2,
  },
  cardview: {
    backgroundColor: 'white',
    height: hp(40),
    width: wp(95),
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',

    borderRadius: 10,
    elevation: 2,
  },
  suscribbutn: {
    backgroundColor: colors.brown,
    marginTop: wp(5),
    elevation: 2,
    width: wp(85),
    height: hp(7),
    borderWidth: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    // marginRight: 5,
  },
  suscribbutn1: {
    // backgroundColor: colors.brown,

    elevation: 0,
    width: wp(90),
    height: hp(6),
    borderWidth: 0,
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 0,
    marginTop: 10,
  },
});

export default SubscriptionPayment;
