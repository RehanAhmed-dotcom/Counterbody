/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Alert,
  Platform,
  Text,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../../constants/colors';
// import auth from "@react-native-firebase/auth";
import {devLogger} from '../../lib/utilts';
import {Item, Label, Input} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import RButton from '../../components/RoundedButton';
import Header from '../../components/HeaderWithBack';
import {changeprofile} from '../../screens/ApiCountoryBody';
import Loader from '../../components/loader';

const ChangePassword = ({navigation}) => {
  const {top, bottom} = useSafeAreaInsets();
  const {userData} = useSelector(({USER}) => USER);
  const {darkmd} = useSelector(({DARK}) => DARK);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [oldPasswordErr, setOldPasswordErr] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordErr, setNewPasswordErr] = useState<string>('');
  const [confirmPasswordErr, setConfirmPasswordErr] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [u, setu] = useState<string>('');
  const showToast = u => {
    if (Platform.OS == 'android') {
      ToastAndroid.show(u, ToastAndroid.SHORT);
    } else {
      Alert.alert(u);
    }
  };

  const changeuserpassword = () => {
    setLoading(true);
    console.log('registration start');
    const data = new FormData();
    data.append('old_password', oldPassword);
    data.append('password', newPassword);
    data.append('password_confirmation', confirmPassword);
    console.log('data,,,,,', data);

    changeprofile({Auth: userData.api_token}, data)
      .then(res => {
        console.log('Signup   respone..........', res);
        if (res.status) {
          setLoading(false);

          showToast('Password change successfuly');
          navigation.goBack();
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('Error Message', error.response.data);
        if (
          error.response.data.message.old_password ==
          'Your old password was incorrect'
        ) {
          showToast('Incorrect password');
          console.log('incorrect56789');
        } else if (
          error.response.data.message.old_password ==
          'The old password must be at least 6 characters.'
        ) {
          console.log('incorrect ');

          showToast('Incorrect password');
        } else if (
          error.response.data.message.password ==
          'The password must be at least 6 characters.'
        ) {
          console.log('incorrect 888');

          showToast('Minimum 6 Characters are required');
        } else {
          console.log('Error Message', error.response.data);
        }

        setLoading(false);
      });
  };

  const ValidateFirst = () => {
    if (newPasswordErr && oldPassword && confirmPassword === newPassword) {
      setNewPasswordErr('');
      setOldPasswordErr('');
      setConfirmPasswordErr('');
      return true;
    } else if (!oldPassword) {
      setOldPasswordErr("Shouldn't be empty");
    } else if (!newPasswordErr) {
      setNewPasswordErr("Shouldn't be empty");
    } else if (newPasswordErr !== confirmPassword) {
      setConfirmPasswordErr('confirm password must match to New password');
    }
    return false;
  };
  const LetsChangePassword = () => {
    const user = auth().currentUser;
    const credentials = auth.EmailAuthProvider.credential(
      userData._user.email,
      oldPassword,
    );
    user
      .reauthenticateWithCredential(credentials)
      .then(() => {
        user
          .updatePassword(newPassword)
          .then(navigation.goBack)
          .catch(error => {
            devLogger('updatePasswordError', error);
          });
      })
      .catch(error => {
        devLogger('reauthenticationError', error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: bottom,
        backgroundColor: darkmd.payload ? '#111e25' : '#fff',
      }}>
      <Header top={top} navigation={navigation} title="Change Password" />
      <View style={{paddingHorizontal: 15, marginTop: 15}}>
        <Text
          style={{
            fontSize: 16,
            color: darkmd.payload ? 'white' : 'black',
          }}>
          Please enter current and new password to update:
        </Text>
      </View>
      <Loader visible={loading} />
      <View style={{alignItems: 'center'}}>
        <Item
          floatingLabel
          style={{
            width: '90%',
            marginTop: 30,
            marginBottom: 10,
            borderBottomColor: darkmd.payload ? '#202d34' : colors.brown,
          }}
          // success={validateEmail(email) === true}
          error={oldPasswordErr !== ''}>
          <Label
            style={{
              fontSize: 14,
              color: darkmd.payload ? 'white' : '#797979',
            }}>
            Old password
          </Label>
          <Input
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
            selectionColor={colors.brown}
            placeholder="Old password"
            style={{
              // fontFamily: fonts['Gotham-Book'],
              fontSize: 16,
              color: darkmd.payload ? 'white' : 'black',
            }}
            // selectionColor={'white'}
            // {...globalStyles.placeholderTextColor}
            autoCapitalize="none"
            returnKeyType="next"
          />
        </Item>
        <Item
          floatingLabel
          style={{
            marginBottom: 10,
            width: '90%',
            borderBottomColor: darkmd.payload ? '#202d34' : colors.brown,
          }}
          // success={validateEmail(email) === true}
          error={newPasswordErr !== ''}>
          <Label
            style={{
              fontSize: 14,
              //fontFamily: 'Nunito-Regular',
              color: darkmd.payload ? 'white' : '#797979',
            }}>
            New password
          </Label>
          <Input
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            selectionColor={colors.brown}
            placeholder="New password"
            style={{
              // fontFamily: fonts['Gotham-Book'],
              fontSize: 16,
              color: darkmd.payload ? 'white' : 'black',
            }}
            // selectionColor={'white'}
            // {...globalStyles.placeholderTextColor}
            autoCapitalize="none"
            returnKeyType="next"
          />
        </Item>
        <Item
          floatingLabel
          style={{
            width: '90%',
            marginBottom: 30,
            borderBottomColor: darkmd ? '#202d34' : colors.brown,
          }}
          //success={validateEmail(email) === true}
          error={confirmPasswordErr !== ''}>
          <Label
            style={{
              fontSize: 14,
              //fontFamily: 'Nunito-Regular',
              color: darkmd.payload ? 'white' : '#797979',
            }}>
            Confirm password
          </Label>
          <Input
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            selectionColor={colors.brown}
            placeholder="Confirm password"
            style={{
              // fontFamily: fonts['Gotham-Book'],
              fontSize: 16,
              color: darkmd.payload ? 'white' : 'black',
            }}
            autoCapitalize="none"
            returnKeyType="done"
          />
        </Item>
      </View>
      <View style={{alignItems: 'center'}}>
        <RButton
          title="Update"
          onPress={() => {
            if (ValidateFirst()) changeuserpassword();
          }}
        />
      </View>
    </View>
  );
};
export default ChangePassword;
