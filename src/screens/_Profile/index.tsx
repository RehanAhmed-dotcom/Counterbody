/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../constants/colors';
// import auth from "@react-native-firebase/auth";
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RButton from '../../components/RoundedButton';
import {logout} from '../../redux/actions';
import {devLogger} from '../../lib/utilts';
import {deleteAccount} from '../ApiCountoryBody';
import {shadow} from '../../lib';
const placeholderAvatar = require('../../images/placeholderWOC.png');
const BackButton = require('../../images/backImage.png');
const BackButtondark = require('../../images/backImagedark.png');

const PROFILE = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {userData} = useSelector(({USER}) => USER);
  const {darkmd} = useSelector(({DARK}) => DARK);
  const {top, bottom} = useSafeAreaInsets();
  console.log('===========', userData.email);
  // console.log("-====-=----------",userData._user.displayName);
  const deleteUserAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            logout()(dispatch);
            deleteAccount({Auth: userData.api_token})
              .then(res => {
                console.log('res of delete api', res);
              })
              .catch(e => {
                // setLoading(false);
                console.log('error message in delete api', e);
              });
          },
        },
      ],
    );
  };
  const LetsLogout = () => {
    logout()(dispatch);
    // auth()
    //   .signOut()
    //   .then(() => {});
  };
  if (userData) {
    // const [fName, lName] = userData._user.displayName.split(" "); //
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: darkmd.payload ? '#111e25' : 'white',
        }}>
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
            <View
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
                  userData.image ? {uri: userData.image} : placeholderAvatar
                }
              />
            </View>
            <View
              style={{
                position: 'absolute',
                zIndex: 5,
                top: wp(10),
                right: wp(30),
                borderRadius: 17.5,
                justifyContent: 'center',
                alignItems: 'center',
                width: 35,
                height: 35,
                ...shadow(5),
              }}>
              <Icon2
                name="edit"
                color={darkmd.payload ? '#111e25' : colors.brown}
                size={30}
                onPress={() => {
                  navigation.navigate('EditProfile');
                }}
              />
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <StaticField
              title="First Name"
              description={userData.firstname}
              theams={darkmd.payload}
            />
            <StaticField
              title="Last Name"
              description={userData.lastname}
              theams={darkmd.payload}
            />
            <StaticField
              title="Email"
              description={userData.email}
              theams={darkmd.payload}
            />
            <StaticField
              title="Password"
              description="********"
              theams={darkmd.payload}
            />
            <Text></Text>
          </View>
        </ImageBackground>
        <View style={{marginTop: -45}}>
          <RButton
            title="Change Password"
            onPress={() => {
              navigation.navigate('ChangePass');
            }}
          />
          <RButton title="Logout" onPress={LetsLogout} />
          <RButton title="Account Delete" onPress={deleteUserAccount} />
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ImageBackground
          source={BackButton}
          style={{
            height: hp(100),
            width: wp(100),
          }}
        />
      </View>
    );
  }
};

const StaticField = ({
  title = '',
  description = '',
  theams = false,
}: {
  description?: string;
  title?: string;
  theams: boolean;
}) => {
  return (
    <View
      style={{
        width: wp(90),
        marginTop: hp(7),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        borderBottomColor: theams ? '#202d34' : 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}>
      <Text
        style={{fontSize: 14, bottom: 5, color: theams ? 'white' : 'black'}}>
        {title}
      </Text>
      <Text style={{fontSize: 14, color: theams ? 'white' : 'black'}}>
        {description}
      </Text>
    </View>
  );
};

export default PROFILE;
