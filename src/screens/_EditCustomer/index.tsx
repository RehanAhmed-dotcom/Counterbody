import React, { useEffect, useState } from "react";
import { View, Keyboard, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Item, Label, Input, Icon } from "native-base";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/HeaderWithBack";
import RButton from "../../components/RoundedButton";
import Loader from "../../components/loader";
import colors from "../../constants/colors";
import ImagePickerModal from "../../components/ImagePickerModal";
// import auth from "@react-native-firebase/auth";
// import storage from "@react-native-firebase/storage";
// import db from "@react-native-firebase/database";
import {Editcustomer,addnewcostomer} from '../../screens/ApiCountoryBody'
import {
  validateEmail,
  emailToUniqueString,
  devLogger,
  emailIsValid,
} from "../../lib/utilts";
const NewCustomer = ({
  navigation,
  route,
}: {
  navigation: object;
  route: object;
}) => {
  const { top, bottom } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { dataToEdit } = route.params;
  const { userData } = useSelector(({ USER }) => USER);
  const  {darkmd} = useSelector(({ DARK }) => DARK);

  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);
  const [first, setFirst] = useState<string>(dataToEdit.firstname);
  const [last, setLast] = useState<string>(dataToEdit.lastname);
  const [email, setEmail] = useState<string>(dataToEdit.email);
  const [phone, setPhone] = useState<string>(dataToEdit.phoneno);
  const [avatar, setAvatar] = useState<string>(dataToEdit.image);
  const [avatar1, setAvatar1] = useState("");
  // const [avatar1, setAvatar1] = useState<string | null>(dataToEdit.image);
  const [firstErr, setFirstErr] = useState<string>("");
  const [lastErr, setLastErr] = useState<string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [phoneErr, setPhoneErr] = useState<string>("");
  const [imageEdited, setImageEdited] = useState<boolean>(false);
  const [choosePicker, setChoosePicker] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  console.log("Cust-----------", dataToEdit);




  const Editcustom=()=>{
 
    setLoading(true);
    console.log("registration start");
    
    const data = new FormData();
    data.append('firstname', first);
    data.append('lastname', last);
    data.append('email',email);
    data.append('phoneno', phone);
    if(avatar1)
    {
      avatar &&
      data.append('image', {
        uri: avatar,
        type: 'image/jpeg',
        name: 'image' + new Date() + '.jpg',
      });
    console.log("data,,,,,", data);
    }
    data.append('customer_id', dataToEdit.id);
    addnewcostomer({Auth:userData.api_token},data).then(res => {
      console.log('Signup   respone..........', res.message);
     
      
      if(res.message=="Customer added Successfully.")
      {
        console.log("successs===========",res.message);
        navigation.navigate("Home")
        // const locUser = { ...res.userdata };
        // locUser._user.displayName = first + " " + last;
        //  userAuthorize(locUser)(dispatch);

        setLoading(false);
      }
      setLoading(false)
    }).catch((error)=>{
      console.log("Error Message",error);
      // if (error.response.data.message.email === "The email has already been taken.") {
      //   setEmailErr("Already Exist");
      //   setLoading(false);
      //   //console.log("That email address is already in use!");
      // }
      // if (error.response.data.message.email === "auth/invalid-email") {
      //   setEmailErr("That email address is invalid!");
      //   //console.log("That email address is invalid!");
      // }
      setLoading(false);
    });
  
   
  
  }
  


  const choosePic = (choose = true) => {
  
    ImagePicker[`open${choose ? "Picker" : "Camera"}`]({
      width: 512,
      height: 512,
      cropping: true,
    }).then(({ size, path }) => {
      if (path) {
        console.log("size", size);
        setAvatar(path);
        setAvatar1(path);
        setImageEdited(true);
      }
      setChoosePicker(false);
    });
  };
  const ValidateFirst = () => {
    if (first && last && validateEmail(email) && phone) {
      return true;
    } else {
      if (first === "") {
        setFirstErr("First name required");
      }
      if (last === "") {
        setLastErr("Last name required");
      }
      if (!validateEmail(email)) {
        setEmailErr("Valid email required");
      }
      if (phone === "") {
        setPhoneErr("Number is required");
      }
    }
    return false;
  };
  const picUpload = (thisEmail: string) => {
    const Rafo = storage().ref(
      "images/customers/" + emailToUniqueString(thisEmail)
    );
    Rafo.putFile(avatar).then((snapshot) => {
      Rafo.getDownloadURL().then((photoURL) => {
        simpleDateSumbit(photoURL);
      });
    });
  };
  const simpleDateSumbit = (pic = "") => {
    const thisEmail = emailToUniqueString(userData._user.email);
    const reference = db().ref(
      "/user/" + thisEmail + "/customers/" + dataToEdit.key
    );
    reference.update(
      {
        firstName: first,
        lastName: last,
        //email,
        phone,
        avatar: pic ? pic : avatar ? avatar : null,
      },
      () => {
        setLoading(false);
        navigation.goBack();
      }
    );
  };
  const Submit = () => {
    if (ValidateFirst()) {
      setLoading(true);
      const thisEmail = emailToUniqueString(email);
      avatar && imageEdited ? picUpload(thisEmail) : simpleDateSumbit();
    }
  };
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => setKeyboardOpen(true));
    Keyboard.addListener("keyboardDidHide", () => setKeyboardOpen(false));
    return () => {
      Keyboard.removeListener("keyboardDidShow", () => setKeyboardOpen(true));
      Keyboard.removeListener("keyboardDidHide", () => setKeyboardOpen(false));
    };
  }, []);
  return (
    <View
      style={{ flex: 1, paddingBottom: bottom, backgroundColor:darkmd.payload?"#111e25":colors.white }}
    >
      <Loader visible={loading} />
      <ImagePickerModal
        visible={choosePicker}
        setVisible={setChoosePicker}
        pickBy={choosePic}
      />
      <Header top={top} navigation={navigation} title="Edit Customer" />
      <View style={{ flex: 1, padding: wp(2) }}>
        {!keyboardOpen && (
          <View
            style={{
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => setChoosePicker(true)}>
              <Image
                width={wp(20)}
                height={wp(20)}
                borderRadius={wp(10)}
                style={{
                  height: wp(20),
                  width: wp(20),
                }}
                source={
                  avatar
                    ? { uri: avatar }
                    : require("../../images/placeholder.png")
                }
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={{ flex: 1, padding: wp(2) }}>
          <Item
            floatingLabel
            style={{
              width: "100%",
              marginVertical: 10,
              
              borderBottomColor: firstErr ? "red" :darkmd.payload?"#202d34": colors.brown,
            }}
          >
            <Label
              style={{
                fontSize: 14,
                //fontFamily: 'Nunito-Regular',
                color:darkmd.payload?"white": "#797979",
              }}
            >
              First Name
            </Label>
            <Input
              value={first}
              onChangeText={(Con) => {
                firstErr && setFirstErr("");
                setFirst(Con);
              }}
              selectionColor={darkmd.payload?"#202d34":colors.brown}
              placeholder="FIRST NAME"
              style={{
                fontSize: 16,
                color:darkmd.payload?"white":"black",
              }}
              autoCapitalize="none"
              returnKeyType="next"
            />
          </Item>
          <Item
            floatingLabel
            style={{
              width: "100%",

              marginVertical: 10,
              borderBottomColor: lastErr ? "red" :darkmd.payload?"#202d34": colors.brown,
            }}
            // error={emailError}
          >
            <Label
              style={{
                fontSize: 14,
                //fontFamily: 'Nunito-Regular',
                color: darkmd.payload?"white":"#797979",
              }}
            >
              Last Name
            </Label>
            <Input
              value={last}
              onChangeText={(Con) => {
                lastErr && setLastErr("");
                setLast(Con);
              }}
              selectionColor={colors.brown}
              placeholder="LAST NAME"
              style={{
                fontSize: 16,
                color: darkmd.payload?"white":"black",
              }}
              autoCapitalize="none"
              returnKeyType="next"
            />
          </Item>
          <Item
            floatingLabel
            style={{
              width: "100%",
              marginVertical: 10,
              borderBottomColor: emailErr ? "red" :darkmd.payload?"#202d34": colors.brown,
            }}
            // error={emailError}
          >
            <Label
              style={{
                fontSize: 14,
                color:darkmd.payload?"white": "#797979",
              }}
            >
              Email
            </Label>
            <Input
              value={email}
              disabled
              // onChangeText={(Con) => {
              //   emailErr && setEmailErr("");
              //   setEmail(Con);
              // }}
              selectionColor={colors.brown}
              style={{
                fontSize: 16,
                color: darkmd.payload?"white":"black",
              }}
              autoCapitalize="none"
              returnKeyType="next"
            />
          </Item>
          <Item
            floatingLabel
            style={{
              width: "100%",
              marginVertical: 10,
              borderBottomColor: phoneErr ? "red" :darkmd.payload?"#202d34": colors.brown,
            }}
          >
            <Label
              style={{
                fontSize: 14,
                color:darkmd.payload?"white": "#797979",
              }}
            >
              Phone No
            </Label>
            <Input
              value={phone}
              dataDetectorTypes="phoneNumber"
              onChangeText={(Con) => {
                phoneErr && setPhoneErr("");
                setPhone(Con);
              }}
              selectionColor={colors.brown}
              style={{
                fontSize: 16,
                color:darkmd.payload?"white": "black",
              }}
              maxLength={12}
              keyboardType="phone-pad"
              returnKeyType={"done"}
            />
          </Item>
        </View>
      </View>
      <RButton title="Submit and Continue" onPress={Editcustom} />
    </View>
  );
};
export default NewCustomer;
