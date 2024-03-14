import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
  Modal,
  BackHandler,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Item, Label, Input} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Appearance, useColorScheme} from 'react-native-appearance';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
// import db from "@react-native-firebase/database";
// import storage from "@react-native-firebase/storage";
import Flatlist from 'react-native-swipeable-list';
import {useSelector, useDispatch} from 'react-redux';
import {updateuser} from '../../redux/actions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import colors from '../../constants/colors';
import RButton from '../../components/RoundedButton';
import {shadow} from '../../lib';
import {confirmpayments, onetimepaymentapi} from '../ApiCountoryBody';
import {useFocusEffect} from '@react-navigation/core';
import Menus from '../../components/Menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Paycard from 'react-native-vector-icons/FontAwesome';
// rt { Colors } from "react-native/Libraries/NewAppScreen";
import Iconright from 'react-native-vector-icons/AntDesign';
import {
  validateEmail,
  emailToUniqueString,
  devLogger,
  emailIsValid,
  date2String,
} from '../../lib/utilts';
import DatePicker from 'react-native-date-picker';
// import stripe from 'react-native-stripe-payments';
// stripe.setOptions({ publishingKey: 'pk_test_51JzGFSIQ5jtZj5qxHaxY2wnpVnLQZ54GXkq4U0vIYyJuYApQzOugmA5VmkFSzbz7xxWiRs9WUlg8ZhLfi1LZyvYt00H7PioqkR' });
import {useStripe} from '@stripe/stripe-react-native';
const OneTimePayment = ({navigation}) => {
  const dispatch = useDispatch();
  const {top, bottom} = useSafeAreaInsets();
  const [date, setDate] = useState(date2String(new Date()));
  const [pickIt, setPickIt] = useState(false);
  const [payed, setpayed] = useState('');
  const [cardname, setcardname] = useState('');
  const [cardnumber, setcardnumber] = useState('');
  const [cvv, setcvv] = useState('');
  const {confirmPayment} = useStripe();
  const [menuVisible, setmenuVisible] = useState(false);
  const [ispaid, setIsPaid] = useState(false);
  const {userData} = useSelector(({USER}) => USER);
  const [PaymentIntentId, setPaymentIntentId] = useState('');
  const [CustomerId, setCustomerId] = useState('');
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading1, setloading1] = useState(false);

  const paymenttype = () => {
    //  let y="yt";
    let y = cardnumber.charAt(0);
    return y;
  };

  const createPaymentIntent = () => {
    setloading1(true);
    onetimepaymentapi({Auth: userData.api_token})
      .then(res => {
        // console.log('Payment respone..........', res.message);

        if (res.message == 'Payment Successfully') {
          console.log('successs===========', res.message);

          _createPaymentIntent(res);
        } else {
          setloading1(false);
        }
      })
      .catch(error => {
        setloading1(false);
        console.log('Erroe Message', error);
      });
  };

  let yresult = [];

  const _createPaymentIntent = async res => {
    try {
      // const data = new FormData();
      // data.append("order_id", id);
      // const res = await createPaymentIntent();

      console.log('return response', res);

      if (res && res.status == 'success') {
        yresult = res;
        setPaymentIntentId(res.payment_intent_id);
        setCustomerId(res.custome);
        initializePaymentSheet();
      }
    } catch (error) {
      console.log('Error Message', error);
    }
  };

  const initializePaymentSheet = async () => {
    let res = yresult;
    const {error} = await initPaymentSheet({
      customerId: res.custome,
      customerEphemeralKeySecret: res.ephemeralKey,
      paymentIntentClientSecret: res.paymentIntent,
      merchantDisplayName: 'CleanMe',
      allowsDelayedPaymentMethods: true,
      style: 'alwaysLight',
    });
    // console.log("hhhhhhhh",error)
    if (!error) {
      console.log('dfghj---------');

      openPaymentSheet();
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      setloading1(false);
      console.log('Error,,,,,,,,,', error);
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setIsPaid(true);

      // navigation.goBack()
      Paymentconfirm();
      console.log('hhhhhhhhhhhhhh');
    }
  };

  const Paymentconfirm = async () => {
    setloading1(false);
    console.log('Payment Intend Id', yresult.payment_intent_id);
    console.log('Customer Id', yresult.customer);
    const data = new FormData();
    data.append('payment_intent_id', yresult.payment_intent_id);
    data.append('customer_id', yresult.customer);
    confirmpayments({Auth: userData.api_token}, data)
      .then(res => {
        // console.log('Payment respone..........', res);

        if (res.message == 'Payment Successfully') {
          console.log('successs===========', res.message);
          setloading1(false);

          updateuser({...userData, stripe_customer_id: yresult.customer})(
            dispatch,
          );
        } else {
          setloading1(false);
        }
      })
      .catch(error => {
        setloading1(false);
        console.log('Erroe Message', error);
      });
  };

  const callpayment = () => {
    createPaymentIntent();
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
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
          <Text></Text>
          {/* <TouchableOpacity onPress={() =>navigation.goBack()}
           style={{ width: wp(10),borderRadius:wp(10),height:wp(10) ,backgroundColor:"white",justifyContent:'center',alignItems:'center'}}>
            <Iconright name="arrowleft" size={25} color="black"/>
          
          </TouchableOpacity> */}
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Payment
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setmenuVisible(true)}
            style={{width: 27, height: 27, zIndex: 1}}>
            <Icon name="dots-vertical" color="black" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1, paddingHorizontal: 15}}>
        <View style={[Styles.vievtxt, {marginTop: 20}]}>
          <Text style={[Styles.textsty, {width: wp(46)}]}>
            Applicaation Owner Name
          </Text>
          <Text style={[Styles.textsty, {width: wp(40), textAlign: 'right'}]}>
            Hassan Raza
          </Text>
        </View>
        <View style={[Styles.vievtxt, {marginTop: 20}]}>
          <Text style={[Styles.textsty, {width: wp(46)}]}>User Name</Text>
          <Text style={[Styles.textsty, {width: wp(40), textAlign: 'right'}]}>
            Hassan Raza
          </Text>
        </View>
        <View style={[Styles.vievtxt, {marginTop: 20}]}>
          <Text style={[Styles.textsty, {width: wp(46)}]}>
            Total Amount To Pay
          </Text>
          <Text style={[Styles.textsty, {width: wp(40), textAlign: 'right'}]}>
            34. $
          </Text>
        </View>
        <View style={[Styles.vievtxt, {marginTop: 20, backgroundColor: 'red'}]}>
          <Text style={[Styles.textsty, {width: wp(46)}]}>Payment Status</Text>
          <Text style={[Styles.textsty, {width: wp(40), textAlign: 'right'}]}>
            Unpaid
          </Text>
        </View>
      </View>
      <RButton title="Purchase" onPress={callpayment} />
      <Modal animationType="fade" transparent={true} visible={loading1}>
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
        <View style={{flexDirection: 'row'}}>
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
        </View>
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

export default OneTimePayment;
const Styles = StyleSheet.create({
  vievtxt: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: colors.brown,
    height: hp(8),
    width: hp(52),
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  textsty: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});
