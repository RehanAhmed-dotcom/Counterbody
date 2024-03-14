/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Item, Label, Input, Icon} from 'native-base';
import {useDispatch} from 'react-redux';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import auth from "@react-native-firebase/auth";
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {userAuthorize} from '../../redux/actions';
import {validateEmail} from '../../lib/utilts';
import RButton from '../../components/RoundedButton';
import colors from '../../constants/colors';
import Loader from '../../components/loader';
import {login} from '../../screens/ApiCountoryBody';
// import {  useSelector } from "react-redux";
const SIGN_IN = ({navigation}: {navigation: object}) => {
  const Wrapper = Platform.OS == 'android' ? View : KeyboardAvoidingView;
  const kebrdiss = () => {
    Keyboard.dismiss();
  };

  const {bottom} = useSafeAreaInsets();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [emailErr, setEmailErr] = useState<string>('');
  const [passwordErr, setPasswordErr] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const [response, setresponse] = useState<string>('');

  // const onAuthStateChanged = (User: object) => {
  //   if (User) {
  //     userAuthorize(User)(dispatch);
  //   }
  //   if (initializing) setInitializing(false);
  // };
  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber;
  // }, []);

  const registered = () => {
    setresponse('');
    setLoading(true);
    console.log('registration start');
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    console.log('data,,,,,', data);
    login(data)
      .then(res => {
        console.log('   respone..........', res.userdata);

        if (res.message == 'User Logged In Successfully') {
          console.log('successs===========', res.message);
          setresponse(res.message);
          const locUser = {...res.userdata};
          // locUser._user.displayName = res.userdata.firstname + " " + res.userdata.lastname;
          userAuthorize(locUser)(dispatch);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(error => {
        if (error.response.data.message == 'Invalid Username or Password') {
          setLoading(false);
          setresponse(error.response.data.message);
        } else {
          setLoading(false);
          console.log('Error Message', error);
        }
      });
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../images/backImage.png')}
        style={{
          height: hp(100),
          width: wp(100),
          paddingBottom: bottom,
          justifyContent: 'space-between',
        }}>
        <Wrapper behavior="padding">
          <ScrollView>
            <View
              style={{
                height: hp(20),
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
                height: hp(60),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 15,
                  marginBottom: 25,
                }}>
                <Text>
                  <Text style={{fontSize: 16}}>
                    Welcome to the{' '}
                    <Text style={{fontWeight: 'bold'}}>Contour Body</Text>
                  </Text>
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: 'red',
                    marginTop: 50,
                    width: '90%',
                  }}>
                  {response == 'Invalid Username or Password' ? response : null}
                </Text>
              </View>
              <Item
                floatingLabel
                style={{
                  width: '90%',
                  marginBottom: 20,
                  borderBottomColor: validateEmail(email)
                    ? emailErr
                      ? 'red'
                      : '#45A0D1'
                    : email == ''
                    ? emailErr
                      ? 'red'
                      : '#797979'
                    : 'red',
                }}
                success={validateEmail(email) === true}
                error={emailErr !== ''}>
                <Label
                  style={{
                    fontSize: 14,
                    color: '#797979',
                  }}>
                  Email
                </Label>
                <Input
                  value={email}
                  onChangeText={Mail => {
                    emailErr ? setEmailErr('') : null;
                    setEmail(Mail.toLowerCase());
                  }}
                  selectionColor={colors.brown}
                  style={{
                    fontSize: 16,
                    color: 'black',
                  }}
                  autoCapitalize="none"
                  returnKeyType="next"
                />
                {email !== '' && validateEmail(email) === true && (
                  <Icon name="checkmark-circle" style={{color: colors.brown}} />
                )}
              </Item>
              <Item
                floatingLabel
                style={{
                  width: '90%',
                  marginBottom: 10,
                  borderBottomColor: passwordErr ? 'red' : '#797979',
                }}>
                <Label
                  style={{
                    fontSize: 14,
                    color: '#797979',
                  }}>
                  Password
                </Label>
                <Input
                  value={password}
                  secureTextEntry
                  onChangeText={Pass => {
                    passwordErr ? setPasswordErr('') : null;
                    setPassword(Pass);
                  }}
                  selectionColor={colors.brown}
                  placeholder="FIRST NAME"
                  style={{
                    fontSize: 16,
                    color: 'black',
                  }}
                  autoCapitalize="none"
                  returnKeyType="next"
                />
              </Item>

              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <RButton
              title="Login"
              onPress={() => {
                if (validateEmail(email) && password) {
                  registered();
                  // setLoading(true);
                  // auth()
                  //   .signInWithEmailAndPassword(email, password)
                  //   .then(() => {
                  //     console.log("User signed in!");
                  //   })
                  //   .catch((error) => {
                  //     if (error.code === "auth/invalid-email") {
                  //       setEmailErr("That email address is invalid!");
                  //     } else if (error.code === "auth/user-not-found") {
                  //       setEmailErr("This email address is not registered!");
                  //     }
                  //     console.log("Error", error);
                  //   })
                  //   .finally(() => {
                  //     setLoading(false);
                  //   });
                } else {
                  if (!validateEmail(email) && !password) {
                    setEmailErr('asf');
                    setPasswordErr('asdf');
                  } else if (!validateEmail(email)) {
                    setEmailErr('asf');
                  } else if (!password) {
                    setPasswordErr('asdf');
                  }
                }
              }}
            />
          </ScrollView>
        </Wrapper>
      </ImageBackground>
    </View>
    // <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
    //   <Loader visible={loading} />
    //   <ImageBackground
    //     source={require("../../images/backImage.png")}
    //     style={{
    //       height: hp(100),
    //       width: wp(100),
    //       paddingBottom: bottom,
    //       justifyContent: "space-between",
    //     }}
    //   >
    //     <View
    //       style={{
    //         height: hp(20),
    //         justifyContent: "center",
    //         paddingHorizontal: 15,
    //       }}
    //     >
    //       <Icon1
    //         style={{ marginTop: 20 }}
    //         name="arrowleft"
    //         color="white"
    //         size={wp(6)}
    //         onPress={()=>navigation.goBack()}
    //       />
    //     </View>
    //     <View
    //       style={{
    //         height: hp(60),
    //         alignItems: "center",
    //         justifyContent: "center",
    //       }}
    //     >

    //       <View
    //         style={{ width: "100%", paddingHorizontal: 15, marginBottom: 25 }}
    //       >
    //         <Text>
    //           <Text style={{ fontSize: 16 }}>
    //             Welcome to the{" "}
    //             <Text style={{ fontWeight: "bold" }}>Contour Body</Text>
    //           </Text>
    //         </Text>

    //         <Text style={{ fontSize: 12,color:'red', marginTop: 50, width:"90%"}}>
    //            {response=="Invalid Username or Password"?response:null}
    //             </Text>
    //       </View>
    //       <Item
    //         floatingLabel
    //         style={{
    //           width: "90%",
    //           marginBottom: 20,
    //           borderBottomColor: validateEmail(email)
    //             ? emailErr
    //               ? "red"
    //               : "#45A0D1"
    //             : email == ""
    //             ? emailErr
    //               ? "red"
    //               : "#797979"
    //             : "red",
    //         }}
    //         success={validateEmail(email) === true}
    //         error={emailErr!==''}
    //       >
    //         <Label
    //           style={{
    //             fontSize: 14,
    //             color: "#797979",
    //           }}
    //         >
    //           Email
    //         </Label>
    //         <Input
    //           value={email}
    //           onChangeText={(Mail) => {
    //             emailErr ? setEmailErr("") : null;
    //             setEmail(Mail.toLowerCase());
    //           }}
    //           selectionColor={colors.brown}
    //           style={{
    //             fontSize: 16,
    //             color: "black",
    //           }}
    //           autoCapitalize="none"
    //           returnKeyType="next"
    //         />
    //         {email !== "" && validateEmail(email) === true && (
    //           <Icon name="checkmark-circle" style={{ color: colors.brown }} />
    //         )}
    //       </Item>
    //       <Item
    //         floatingLabel
    //         style={{
    //           width: "90%",
    //           marginBottom: 10,
    //           borderBottomColor: passwordErr ? "red" : "#797979",
    //         }}
    //       >
    //         <Label
    //           style={{
    //             fontSize: 14,
    //             color: "#797979",
    //           }}
    //         >
    //           Password
    //         </Label>
    //         <Input
    //           value={password}
    //           secureTextEntry
    //           onChangeText={(Pass) => {
    //             passwordErr ? setPasswordErr("") : null;
    //             setPassword(Pass);
    //           }}
    //           selectionColor={colors.brown}
    //           placeholder="FIRST NAME"
    //           style={{
    //             fontSize: 16,
    //             color: "black",
    //           }}
    //           autoCapitalize="none"
    //           returnKeyType="next"
    //         />
    //       </Item>

    //       <View
    //         style={{
    //           width: "90%",
    //           flexDirection: "row",
    //           justifyContent: "flex-end",
    //         }}
    //       >
    //         <TouchableOpacity
    //           onPress={() => navigation.navigate("ForgotPassword")}
    //         >
    //           <Text style={{ fontSize: 14, fontWeight: "bold" }}>
    //             Forgot password?
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //     <RButton
    //       title="Login"
    //       onPress={() => {
    //         if (validateEmail(email) && password) {
    //           registered();
    //           // setLoading(true);
    //           // auth()
    //           //   .signInWithEmailAndPassword(email, password)
    //           //   .then(() => {
    //           //     console.log("User signed in!");
    //           //   })
    //           //   .catch((error) => {
    //           //     if (error.code === "auth/invalid-email") {
    //           //       setEmailErr("That email address is invalid!");
    //           //     } else if (error.code === "auth/user-not-found") {
    //           //       setEmailErr("This email address is not registered!");
    //           //     }
    //           //     console.log("Error", error);
    //           //   })
    //           //   .finally(() => {
    //           //     setLoading(false);
    //           //   });
    //         } else {
    //           if (!validateEmail(email) && !password) {
    //             setEmailErr("asf");
    //             setPasswordErr("asdf");
    //           } else if (!validateEmail(email)) {
    //             setEmailErr("asf");
    //           } else if (!password) {
    //             setPasswordErr("asdf");
    //           }
    //         }
    //       }}
    //     />
    //   </ImageBackground>
    // </ScrollView>
  );
};
export default SIGN_IN;
