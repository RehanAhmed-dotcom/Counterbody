import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../../components/HeaderWithBack';
import Rigthicon from 'react-native-vector-icons/AntDesign';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {userdetail} from '../ApiCountoryBody';

const placeholderAvatar = require('../../images/placeholderWOC.png');
const SubscriptionTrailDetail = ({navigation}) => {
  const {top, bottom} = useSafeAreaInsets();
  const {darkmd} = useSelector(({DARK}) => DARK);
  const {userData} = useSelector(({USER}) => USER);
  const {userpayment} = useSelector(({PAY}) => PAY);
  const [user, setuser] = useState([]);
  const [imagevi, setimagevi] = useState(false);
  const [imageviful, setimageviful] = useState(false);
  console.log('Data in payment', userpayment.data);
  console.log('Data in stripe payment in informatin', userpayment.stripedata);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // console.log('456789dfghjk');
      viewquestion();
    });

    return unsubscribe;
  }, [navigation]);

  const viewquestion = () => {
    // setLoading(true)
    userdetail({Auth: userData.api_token})
      .then(res => {
        console.log('user information', res);
        if (res.message == 'Get User Data Successfully') {
          setuser(res.userdata);
        } else {
        }
      })
      .catch(e => {
        console.log('error message ', e);
      });
  };

  return (
    <>
      <Header
        top={top}
        navigation={navigation}
        title="Subscription And Trial Detail"
      />
      <View
        style={[
          styles.container,
          {backgroundColor: darkmd.payload ? '#111e25' : 'white'},
        ]}>
        <Modal animationType="fade" transparent={true} visible={imageviful}>
          <View>
            <View
              style={{
                paddingHorizontal: 3,
                backgroundColor: 'white',
                width: wp(100),
                height: hp(8),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setimageviful(false);
                }}
                style={{
                  backgroundColor: 'white',
                  width: wp(8),
                  height: wp(8),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Rigthicon name="arrowleft" size={20} />
              </TouchableOpacity>
              <Text style={styles.textsc3}>
                {user.firstname} {user.lastname}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'black',
              alignSelf: 'flex-start',
              width: wp(100),
              height: hp(92),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                justifyContent: 'flex-end',
                backgroundColor: 'white',
                width: wp(100),
                height: hp(45),
              }}>
              <Image
                resizeMode="cover"
                style={{width: wp(100), height: hp(45)}}
                source={user.image ? {uri: user.image} : placeholderAvatar}
              />
            </View>
          </View>
        </Modal>
        <Modal animationType="fade" transparent={true} visible={imagevi}>
          <View
            style={{
              backgroundColor: '#00000088',
              alignSelf: 'flex-start',
              width: wp(100),
              height: hp(100),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                justifyContent: 'flex-end',
                backgroundColor: 'white',
                width: wp(80),
                height: hp(45),
              }}>
              <View
                style={{
                  paddingHorizontal: 3,
                  backgroundColor: 'white',
                  width: wp(80),
                  height: hp(5),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setimagevi(false);
                  }}
                  style={{
                    backgroundColor: 'white',
                    width: wp(8),
                    height: wp(8),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Rigthicon name="arrowleft" size={20} />
                </TouchableOpacity>
                <Text style={styles.textsc3}>
                  {user.firstname} {user.lastname}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setimagevi(false), setimageviful(true);
                }}>
                <Image
                  resizeMode="cover"
                  style={{width: wp(80), height: hp(40)}}
                  source={user.image ? {uri: user.image} : placeholderAvatar}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Text
          style={[styles.heading, {color: darkmd.payload ? 'white' : 'black'}]}>
          Personal Information
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: darkmd.payload ? '#111e25' : 'white',
            marginTop: wp(2),
          }}>
          <View
            style={{
              justifyContent: 'space-around',
              paddingVertical: 10,
              borderWidth: 0,
              width: wp(66),
              height: hp(20),
            }}>
            <View style={styles.viewtext}>
              <Text
                style={[
                  styles.textsc1,
                  {color: darkmd.payload ? 'white' : 'black'},
                ]}>
                Name
              </Text>
              <Text
                style={[
                  styles.textsc,
                  {color: darkmd.payload ? 'white' : 'black'},
                ]}>
                {user.firstname} {user.lastname}
              </Text>
            </View>
            <View style={styles.viewtext}>
              <Text
                style={[
                  styles.textsc1,
                  {color: darkmd.payload ? 'white' : 'black'},
                ]}>
                Email
              </Text>
              <Text
                style={[
                  styles.textsc,
                  {color: darkmd.payload ? 'white' : 'black'},
                ]}>
                {user.email}
              </Text>
            </View>

            <View style={styles.viewtext}>
              <Text
                style={[
                  styles.textsc1,
                  {color: darkmd.payload ? 'white' : 'black'},
                ]}>
                Account Create
              </Text>
              <Text
                style={[
                  styles.textsc,
                  {color: darkmd.payload ? 'white' : 'black'},
                ]}>
                {userData.created_at.split('T')[0]}
              </Text>
            </View>
          </View>
          <View style={styles.imagestyle1}>
            <TouchableOpacity
              onPress={() => {
                setimagevi(true);
              }}>
              <Image
                style={styles.imagestyle}
                source={user.image ? {uri: user.image} : placeholderAvatar}
              />
            </TouchableOpacity>
          </View>
        </View>
        {user.subscription_status == true ? (
          <View>
            <Text
              style={[
                styles.heading,
                {color: darkmd.payload ? 'white' : 'black', marginTop: wp(15)},
              ]}>
              Subscription Information
            </Text>
            <View
              style={{
                borderWidth: 0,
                width: wp(90),
                height: hp(20),
                justifyContent: 'space-around',
              }}>
              <View style={styles.viewtext}>
                <Text
                  style={[
                    styles.textsc2,
                    {color: darkmd.payload ? 'white' : 'black'},
                  ]}>
                  Subscription Start Date
                </Text>
                <Text
                  style={[
                    styles.textsc,
                    {color: darkmd.payload ? 'white' : 'black'},
                  ]}>
                  {user.subscription_valid.split('-')[0]}-
                  {user.subscription_valid.split('-')[1] - 1 <= 0
                    ? 12
                    : user.subscription_valid.split('-')[1] - 1}
                  -{user.subscription_valid.split('-')[2]}
                </Text>
              </View>
              {/* <View style={styles.viewtext}>
<Text style={[styles.textsc2,{color:darkmd.payload?"white":"black"}]}>Package</Text>
<Text style={[styles.textsc,{color:darkmd.payload?"white":"black",}]}>{userpayment.stripedata.stripe_price}</Text>
</View> */}
              <View style={styles.viewtext}>
                <Text
                  style={[
                    styles.textsc2,
                    {color: darkmd.payload ? 'white' : 'black'},
                  ]}>
                  Subscribe Status
                </Text>
                {user.subscription_status ? (
                  <Text
                    style={[
                      styles.textsc,
                      {color: darkmd.payload ? 'white' : 'black'},
                    ]}>
                    true
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.textsc,
                      {color: darkmd.payload ? 'white' : 'black'},
                    ]}>
                    false
                  </Text>
                )}
              </View>

              <View style={styles.viewtext}>
                <Text
                  style={[
                    styles.textsc2,
                    {color: darkmd.payload ? 'white' : 'black'},
                  ]}>
                  Subscription Expire Date
                </Text>
                <Text
                  style={[
                    styles.textsc,
                    {color: darkmd.payload ? 'white' : 'black'},
                  ]}>
                  {user.subscription_valid}
                </Text>
              </View>

              <View style={styles.viewtext}>
                <Text
                  style={[
                    styles.textsc2,
                    {color: darkmd.payload ? 'white' : 'black'},
                  ]}>
                  Paid Status
                </Text>
                {user.subscription_status ? (
                  <Text
                    style={[
                      styles.textsc,
                      {color: darkmd.payload ? 'white' : 'black'},
                    ]}>
                    true
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.textsc,
                      {color: darkmd.payload ? 'white' : 'black'},
                    ]}>
                    false
                  </Text>
                )}
              </View>
            </View>
          </View>
        ) : null}
        {user.subscription_trial == true && user.subscription_status != true ? (
          <View>
            <Text
              style={[
                styles.heading,
                {color: darkmd.payload ? 'white' : 'black', marginTop: wp(15)},
              ]}>
              Trial Information
            </Text>
            <View
              style={{
                borderWidth: 0,
                width: wp(90),
                height: hp(20),
                justifyContent: 'space-around',
              }}>
              {/* 
<View style={styles.viewtext}>
<Text style={[styles.textsc2,{color:darkmd.payload?"white":"black"}]}>Trail Start Date</Text>
<Text style={[styles.textsc,{color:darkmd.payload?"white":"black",}]}>{userData.trial_ends_at.split("-")[0]}-{userData.trial_ends_at.split("-")[1]-1<=0?12:userData.trial_ends_at.split("-")[1]-1}-{userData.trial_ends_at.split("-")[2]}</Text>
</View> */}
              <View style={styles.viewtext}>
                <Text
                  style={[
                    styles.textsc2,
                    {color: darkmd.payload ? 'white' : 'black'},
                  ]}>
                  Package
                </Text>
                {user.subscription_trial ? (
                  <Text
                    style={[
                      styles.textsc,
                      {color: darkmd.payload ? 'white' : 'black'},
                    ]}>
                    Trial
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.textsc,
                      {color: darkmd.payload ? 'white' : 'black'},
                    ]}>
                    Subscribe
                  </Text>
                )}
              </View>
              <View style={styles.viewtext}>
                <Text
                  style={[
                    styles.textsc2,
                    {color: darkmd.payload ? 'white' : 'black'},
                  ]}>
                  Trial Status
                </Text>
                {user.subscription_trial ? (
                  <Text
                    style={[
                      styles.textsc,
                      {color: darkmd.payload ? 'white' : 'black'},
                    ]}>
                    true
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.textsc,
                      {color: darkmd.payload ? 'white' : 'black'},
                    ]}>
                    false
                  </Text>
                )}
              </View>

              <View style={styles.viewtext}>
                <Text
                  style={[
                    styles.textsc2,
                    {color: darkmd.payload ? 'white' : 'black'},
                  ]}>
                  Trial Expire
                </Text>
                <Text
                  style={[
                    styles.textsc,
                    {color: darkmd.payload ? 'white' : 'black'},
                  ]}>
                  {user.trial_ends_at.split('T')[0]}
                </Text>
              </View>

              {/* <View style={styles.viewtext}>
<Text style={[styles.textsc2,{color:darkmd.payload?"white":"black"}]}>Paid Status</Text>
{userpayment.paid?<Text style={[styles.textsc,{color:darkmd.payload?"white":"black",}]}>true</Text>:<Text style={[styles.textsc,{color:darkmd.payload?"white":"black",}]}>false</Text>}
</View> */}
            </View>
          </View>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {fontSize: 18, fontWeight: 'bold', marginTop: wp(2)},
  textsc: {
    fontSize: 14,
    alignSelf: 'flex-start',
    width: wp(40),
    alignSelf: 'center',
  },
  textsc1: {
    fontSize: 14,
    fontWeight: 'bold',
    width: wp(20),
    alignSelf: 'center',
  },
  textsc2: {
    fontSize: 14,
    fontWeight: 'bold',
    width: wp(50),
    alignSelf: 'center',
  },
  viewtext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(65),
  },
  textsc3: {
    fontSize: 14,
    fontWeight: 'bold',
    width: wp(60),
    alignSelf: 'center',
    color: 'black',
  },

  imagestyle: {
    width: wp(23),
    height: wp(23),
    borderRadius: wp(23),
  },
  imagestyle1: {
    width: wp(27),
    height: hp(20),
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default SubscriptionTrailDetail;
