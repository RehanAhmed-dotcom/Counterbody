import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {verifyPin} from '../../lib/api';
const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 20},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#45A0D1',
    borderBottomWidth: 1,
  },
  cellRoot2: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'red',
    borderBottomWidth: 1,
  },
  cellRoot1: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#797979',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#45A0D1',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Nunito-SemiBold',
  },
});
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {varifyemailcode} from "../ApiCountoryBody"
import Loader from "../../components/loader";

const enterCode = ({navigation, route}) => {
  const CELL_COUNT = 4;
  const {email} = route.params;
  // const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({token, cellCount: CELL_COUNT});
  const [token, setValue] = useState('');
  const [valueErr, setValueErr] = useState('');
  const [codeErr, setCodeErr] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [resmsg, setresmsg] = useState("");
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    token,
    setValue,
  });


  const Varifedcode=()=>{
    setresmsg("");
    setLoading(true);
    console.log("registration start");
    const data = new FormData();
    data.append('token', token);
    console.log("data,,,,,", data);
    varifyemailcode(data).then(res => {
      console.log('varified   respone..........', res.message);
     
      
      if(res.message=="Success")
      {
        console.log("successs===========",res.message);
        setresmsg(res.message);
        navigation.navigate("newPassword", {email, token});
              setLoading(false);
      }
      
      setLoading(false)
    }).catch((error)=>{
      console.log("Wrong code",error.response.data.error);
      if(error.response.data.error=="This password reset token is invalid.")
      {
        console.log("no Email token  Found===========",error.response.data.error);
        setresmsg(error.response.data.error);
        setLoading(false);
      }
      else{
        console.log("Error Message",error)
      }
      setLoading(false);
    });
    
   
  
  }



  return (
    <View style={{flex: 1}}>
      
      <View
        style={{
          height: 56,
          backgroundColor: 'white',
          elevation: 3,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
        }}>
        <Icon name="arrowleft" size={20} onPress={() => navigation.goBack()} />
        <Text
          style={{marginLeft: 20, fontSize: 16, fontFamily: 'Nunito-SemiBold'}}>
          Forgot Password
        </Text>
      </View>
      <View style={{paddingHorizontal: 15, marginTop: 20}}>
        <Text style={{fontSize: 16, fontFamily: 'Nunito-Regular'}}>
          Please enter your Verification Code
        </Text>
        <Text
          style={{
            marginTop: 20,
            color: '#797979',
            fontSize: 14,
            fontFamily: 'Nunito-Regular',
          }}>
          We have send a verification code to your registered email ID.
        </Text>
        <Loader visible={loading} />
        {resmsg=="This password reset token is invalid."?(
        <Text
          style={{
            marginTop: 20,
            color:"red",
            fontSize: 12,
            fontFamily: 'Nunito-Regular',
          }}>
          This reset code is invalid.Enter correct code
        </Text>):null}
       
      </View>
      <View style={{paddingHorizontal: 40, marginVertical: 10}}>
        <CodeField
          ref={ref}
          {...props}
          value={token}
          onChangeText={(text) => {
            valueErr ? setValueErr('') : null;
            setValue(text);
          }}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[
                symbol
                  ? styles.cellRoot
                  : valueErr
                  ? styles.cellRoot2
                  : styles.cellRoot1,
                isFocused && styles.focusCell,
              ]}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            if (token) {
              // verifyPin({token}).then((responce) => {
              //   if (responce.status == 'error') {
              //     Alert.alert('Wrong Code entered');
              //   } else if (responce.status == 'success') {
              //     navigation.navigate('NewPassword', {email, token});
              //   }
              // });
              Varifedcode();
              // navigation.navigate('NewPassword');
            } else {
              setValueErr('ask');
            }
          }}
          style={{
            height: hp(7),
            borderRadius: 30,
            paddingHorizontal: 30,
            marginTop: 20,
            width: wp(90),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#45A0D1',
          }}>
          <Text
            style={{color: 'white', fontSize: 16, fontFamily: 'Nunito-Bold'}}>
            Verify
          </Text>
          <Icon name="arrowright" color="white" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default enterCode;
