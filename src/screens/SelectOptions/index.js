import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Modal} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../constants/colors';
import {Suscribetrail} from '../ApiCountoryBody';
import {useDispatch, useSelector} from 'react-redux';
import {updateuser, updatepayment} from '../../redux/actions';

const SelectOption = ({navigation}) => {
  const [suboption, setsuboption] = useState(true);
  const {userData} = useSelector(({USER}) => USER);
  const dispatch = useDispatch();
  const {userpayment} = useSelector(({PAY}) => PAY);
  const Suscribetrailtouseapp = async () => {
    Suscribetrail({Auth: userData.api_token})
      .then(res => {
        // console.log('Payment respone..........', res.Data);
        updatepayment(res)(dispatch);

        if (res.Data.subscription_trial == true) {
          let trail = res.Data.subscription_trial;
          let endtrail = res.Data.trial_ends_at;
          // console.log('ddddddddd--------', trail, endtrail);
          // console.log(
          //   'Suscribe trail successfuly to end date',
          //   res.Data.trial_ends_at,
          // );

          updateuser({...userData, subscription_trial: true})(dispatch);

          // updateuser({...userData,trial_ends_at:endtrail})(dispatch);
          setsuboption(false);
          // console.log('halo0000000000000000000w');
          //  navigation.navigate("Home")
        } else {
          // console.log('halo0000000000000000000w');
        }
      })
      .catch(error => {
        console.log('Erroe Message', error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <Modal animationType="fade" transparent={true} visible={suboption}>
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
              elevation: 5,
              borderRadius: wp(4),
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: wp(10),
              backgroundColor: 'white',
              width: wp(80),
              height: hp(30),
            }}>
            {/* <Text>jklkh</Text> */}
            <TouchableOpacity
              onPress={Suscribetrailtouseapp}
              style={{
                height: hp(7),
                borderWidth: 0,
                width: wp(60),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: wp(10),
                backgroundColor: colors.brown,
                elevation: 3,
              }}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                Trail
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setsuboption(false);
              }}
              style={{
                height: hp(7),
                borderWidth: 0,
                width: wp(60),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: wp(10),
                backgroundColor: colors.brown,
                elevation: 3,
              }}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                Subscribe
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SelectOption;
