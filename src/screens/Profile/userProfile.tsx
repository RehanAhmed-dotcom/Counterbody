import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {logged, logoutuser} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAccount} from '../ApiCountoryBody';
const UserProfile = ({navigation}) => {
  const {user} = useSelector(({USER}) => ({
    user: USER.userData,
  }));
  const dispatch = useDispatch();
  const {userData} = useSelector(({USER}) => USER);
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../images/backImage.png')}
        style={{height: '100%', width: '100%'}}>
        <View
          style={{flex: 1, paddingHorizontal: 15, justifyContent: 'center'}}>
          <Icon
            name="arrowleft"
            size={20}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={{flex: 4, alignItems: 'center'}}>
          <View
            style={{
              height: 100,
              width: 100,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Image
              source={
                user?.userdata?.image
                  ? {uri: user?.userdata?.image}
                  : require('../../images/placeholder.png')
              }
              style={{height: 100, width: 100, borderRadius: 50}}
            />
            <Icon
              name="edit"
              style={{left: 30}}
              size={20}
              color="#45A0D1"
              onPress={() => navigation.navigate('UpdateProfile')}
            />
          </View>

          <View
            style={{
              width: wp(90),
              marginTop: hp(8),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{fontSize: 14, fontFamily: 'Nunito-Regular', bottom: 5}}>
              First Name
            </Text>
            <Text style={{fontSize: 14, fontFamily: 'Nunito-SemiBold'}}>
              {user?.userdata?.firstname}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              width: wp(90),
              borderBottomColor: '#797979',
              borderBottomWidth: 1,
            }}></View>
          <View
            style={{
              width: wp(90),
              marginTop: hp(8),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{fontSize: 14, fontFamily: 'Nunito-Regular', bottom: 5}}>
              Last Name
            </Text>
            <Text style={{fontSize: 14, fontFamily: 'Nunito-SemiBold'}}>
              {user?.userdata?.lastname}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              width: wp(90),
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
            }}></View>
          <View
            style={{
              width: wp(90),
              marginTop: hp(8),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{fontSize: 14, fontFamily: 'Nunito-Regular', bottom: 5}}>
              Email
            </Text>
            <Text style={{fontSize: 14, fontFamily: 'Nunito-SemiBold'}}>
              {user?.userdata?.email}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              width: wp(90),
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
            }}></View>
          <View
            style={{
              width: wp(90),
              marginTop: hp(8),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{fontSize: 14, fontFamily: 'Nunito-Regular', bottom: 5}}>
              Password
            </Text>
            <Text style={{fontSize: 14, fontFamily: 'Nunito-SemiBold'}}>
              ********
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              width: wp(90),
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
            }}></View>
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangePassword')}
            style={{
              height: hp(7),
              borderRadius: 30,
              paddingHorizontal: 30,
              width: wp(90),
              //   marginBottom: 30,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#45A0D1',
              elevation: 4,
            }}>
            <Text
              style={{color: 'white', fontSize: 16, fontFamily: 'Nunito-Bold'}}>
              Change Password
            </Text>
            <Icon name="arrowright" color="white" size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              () => logoutuser(false)(dispatch)
              // navigation.navigate('Login')
            }
            style={{
              height: hp(7),
              borderRadius: 30,
              paddingHorizontal: 30,
              width: wp(90),
              //   marginBottom: 30,
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#45A0D1',
              elevation: 4,
            }}>
            <Text
              style={{color: 'white', fontSize: 16, fontFamily: 'Nunito-Bold'}}>
              Logout
            </Text>
            <Icon name="arrowright" color="white" size={25} />
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={
              () => {
                
              }
              // navigation.navigate('Login')
            }
            style={{
              height: hp(7),
              borderRadius: 30,
              paddingHorizontal: 30,
              width: wp(90),
              //   marginBottom: 30,
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#45A0D1',
              elevation: 4,
            }}>
            <Text
              style={{color: 'white', fontSize: 16, fontFamily: 'Nunito-Bold'}}>
              Delete Account
            </Text>
            <Icon name="arrowright" color="white" size={25} />
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
    </View>
  );
};
export default UserProfile;
