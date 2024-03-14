/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Icon1 from "react-native-vector-icons/AntDesign";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "../../constants/colors";
// import auth from "@react-native-firebase/auth";
import {
  emailToUniqueString,
  emailIsValid,
  validateEmail,
} from "../../lib/utilts";
import { Item, Label, Input, Icon } from "native-base";
import { shadow } from "../../lib";
import Loader from "../../components/loader";
import {emailvarified} from "../ApiCountoryBody/index"

const SubmitEmail = ({ navigation }) => {
  const { top, bottom } = useSafeAreaInsets();
  const [emailError, setEmailError] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [resmsg, setresmsg] = useState("");


  const sendemail=()=>{
    setresmsg("");
    setLoading(true);
    console.log("registration start");
    const data = new FormData();
    data.append('email', email);
    console.log("data,,,,,", data);
    emailvarified(data).then(res => {
      console.log('Signup   respone..........', res);
     
      
      if(res.message=="We have e-mailed your password reset link!")
      {
        console.log("successs===========",res.message);
        setresmsg(res.message);
        navigation.navigate("enterCode",{email:email});
        setLoading(false);
      }
      
      setLoading(false)
    }).catch((error)=>{
      console.log("Error Message",error.response.data.message);
      if(error.response.data.message=="We can't find a user with that e-mail address.")
      {
        console.log("no Email Found===========",error.response.data.message);
        setresmsg(error.response.data.message);
        setLoading(false);
      }
      setLoading(false);
    });
    
   
  
  }

  // const onChangeEmail = (Mail) => {
  //   if (validateEmail(Mail)) {
  //     setEmail(Mail);
  //     setEmailError(false);
  //   } else {
  //     setEmailError(true);
  //   }
  // };
  return (
    <View style={{ flex: 1, paddingBottom: bottom }}>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          height: 56 + top,
          ...shadow(3),
          paddingHorizontal: 15,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            height: 56,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15,
          }}
        >
          <Icon1 name="arrowleft" size={25} onPress={()=>navigation.goBack()} />
          <Text
            style={{
              marginLeft: 20,
              fontSize: 16, //fontFamily: 'Nunito-SemiBold',
              fontWeight: "bold",
            }}
          >
            Forgot Password
          </Text>
        </View>
      </View>
  
      <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
        <Text
          style={{
            fontSize: 16,
          }}
        >
          
          Enter your email to reset your password
        </Text>
      </View>
      <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
        <Text
          style={{
            fontSize: 14,
            color:resmsg=="We can't find a user with that e-mail address."?"red":"green"
          }}
        >
        {resmsg}
        </Text>
        <Loader visible={loading} />
      </View>
      <View style={{ alignItems: "center" }}>
        <Item
          floatingLabel
          style={{
            width: "90%",
            marginTop: 50,
            marginBottom: 30,
            borderBottomColor: validateEmail(email)
              ? emailErr
                ? "red"
                : "#45A0D1"
              : email == ""
              ? emailErr
                ? "red"
                : "#797979"
              : "red",
          }}
          success={validateEmail(email) === true}
          error={emailError}
        >
          <Label
            style={{
              fontSize: 14,
              //fontFamily: 'Nunito-Regular',
              color: "#797979",
            }}
          >
            Email
          </Label>
          <Input
            value={email}
            onChangeText={(Mail) => {
              emailErr ? setEmailErr("") : null;
              setEmail(Mail.toLowerCase());
            }}
            selectionColor={"white"}
            placeholder="FIRST NAME"
            style={{
              // fontFamily: fonts['Gotham-Book'],
              fontSize: 16,
              color: "black",
            }}
            // selectionColor={'white'}
            // {...globalStyles.placeholderTextColor}
            autoCapitalize="none"
            returnKeyType="next"
          />
          {email !== "" && validateEmail(email) === true && (
            <Icon name="checkmark-circle" style={{ color: colors.brown }} />
          )}
        </Item>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            validateEmail(email)
              ?sendemail()
              // auth().sendPasswordResetEmail(email).then(navigation.goBack)
              : setEmailErr("ask");
          }}
          style={{
            alignSelf: "center",
            height: hp(7),
            borderRadius: 30,
            paddingHorizontal: 30,
            width: wp(90),
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
            alignItems: "center",
            ...shadow(4),
            backgroundColor: colors.brown,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16, //fontFamily: 'Nunito-Bold'
            }}
          >
            Send
          </Text>
          <Icon1 name="arrowright" color="white" size={wp(8)} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SubmitEmail;
