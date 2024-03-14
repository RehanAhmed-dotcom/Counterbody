import React, {Fragment, useEffect, useState} from 'react';
import {internetconnection, userRefresh} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

import ChangePass from '../screens/_ChangePassword';
import Checkpaystatus from '../screens/Checkpaystatus';
import ClientEditViewLLLT from '../screens/ClientEditViewLLLT';
import ClientEditViewRFPatient from '../screens/ClientEditViewRFPatient';
import ClientPostLLLT from '../screens/ClientPostLLLT';
import ClientPostRFPatient from '../screens/ClientPostRFPatient';
import ClientViewLLLT from '../screens/ClientViewLLLT';
import ClientViewRFPatient from '../screens/ClientViewRFPatient';
import CustomerAppointmentForm from '../screens/CustomerAppointmentForm';
import CustomerEditProfile from '../screens/_EditCustomer';
import CustomerEditShapeForm from '../screens/CustomerEditShapeForm';
import CustomerForm from '../screens/CustomerForm';
import CustomerProfile from '../screens/_CustomerProfile';
import CustomerShapeForm from '../screens/CustomerShapeform';
import EditCbShape from '../screens/EditCbShape';
import EditCustomerAppointmentForm from '../screens/EditCustomerAppointmentForm';
import EditCustomerForm from '../screens/EditCustomerForm';
import EditHiTone from '../screens/EditHiTone';
import EditNewAppointmentForm from '../screens/EditNewAppointmentForm';
import EditProfile from '../screens/_EditProfile';
import EditVisit from '../screens/_EditVisit';
import ForgetPass from '../screens/_ForgetPassword';
import HiTone from '../screens/HiTone';
import Home from '../screens/_Home';
import Login from '../screens/_SignIn';
import {NavigationContainer} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import NetworkConnection from '../screens/NetworConnection';
import NewAppointmentPolicy from '../screens/NewAppointmentPolicy';
import NewCustomer from '../screens/_NewCustomer';
import NewVisit from '../screens/_NewVisit';
import OneTimePayment from '../screens/OneTimePayment';
import Profile from '../screens/_Profile';
import RFPatient from '../screens/RFPatient';
import RFPatientEdit from '../screens/RFPatientEdit';
import SatingApp from '../screens/SatingApp';
import SelectOption from '../screens/SelectOptions';
import ShapeForm from '../screens/ShapeForm';
import SignUp from '../screens/_SignUp';
import Splash from '../screens/_Splash';
import SubscriptionPayment from '../screens/SubscriptionPayment';
import SubscriptionTrailDetail from '../screens/SubscriptionTrailDetail';
import UserCbShape from '../screens/UserCbShape';
import UserHiTone from '../screens/UserHiTone';
import UserLLLT from '../screens/UserLLLT';
import UserLLLTEdit from '../screens/UserLLLTEdit';
import UserNewAppointmentPolicy from '../screens/UserNewAppointmentPolicy';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import enterCode from '../screens/ForgotPassword/enterCode';
import newPassword from '../screens/ForgotPassword/newPassword';

// import { AppearanceProvider } from 'react-native-appearance';

//Screens

// import AuthSelection from '../screens/Auth/authSelection';
// import UserProfile from '../screens/Profile/userProfile';
// import Home from '../screens/Home/home';
// import ChangePassword from '../screens/ForgotPassword/changePassword';
// import SubmitEmail from '../screens/ForgotPassword/submitEmail';
// import NewPassword from '../screens/ForgotPassword/newPassword';
// import EnterCode from '../screens/ForgotPassword/enterCode';
// import Contestants from '../screens/Contestants/contestants';
// import AuctionLeague from '../screens/AuctionLeague/auctionLeague';
// import Podcast from '../screens/Podcast/podcast';
// import Youtube from '../screens/Youtube/youtube';
// import LineUp from '../screens/LineUp/lineUp';
// import SnakeLeague from '../screens/SnakeLeague/snakeLeague';
// import UpdateProfile from '../screens/Profile/updateProfile';
enableScreens();
const Stack = createNativeStackNavigator();
const Root = () => {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(({USER}) => USER);
  const {userData} = useSelector(({USER}) => USER);
  const {userpayment} = useSelector(({PAY}) => PAY);
  // console.log('userData', userData);
  return (
    // <AppearanceProvider>
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          // userpayment.message == 'You Suscribe Trail' ||
          // userpayment.message == 'You subscribtion status' ||
          userData.subscription_status == true ||
          userData.subscription_trial == true ? (
            <Fragment>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="SatingApp" component={SatingApp} />
              <Stack.Screen
                name="SubscriptionTrailDetail"
                component={SubscriptionTrailDetail}
              />
              <Stack.Screen name="ChangePass" component={ChangePass} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen
                name="CustomerProfile"
                component={CustomerProfile}
              />
              <Stack.Screen name="NewCustomer" component={NewCustomer} />
              <Stack.Screen
                name="CustomerEditProfile"
                component={CustomerEditProfile}
              />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="EditVisit" component={EditVisit} />
              <Stack.Screen name="NewVisit" component={NewVisit} />
              <Stack.Screen name="HiTone" component={HiTone} />
              <Stack.Screen name="ShapeForm" component={ShapeForm} />
              <Stack.Screen
                name="NewAppointmentPolicy"
                component={NewAppointmentPolicy}
              />
              <Stack.Screen
                name="ClientPostRFPatient"
                component={ClientPostRFPatient}
              />

              <Stack.Screen name="UserHiTone" component={UserHiTone} />
              <Stack.Screen name="UserCbShape" component={UserCbShape} />
              <Stack.Screen
                name="UserNewAppointmentPolicy"
                component={UserNewAppointmentPolicy}
              />
              <Stack.Screen name="EditHiTone" component={EditHiTone} />
              <Stack.Screen name="RFPatientEdit" component={RFPatientEdit} />
              <Stack.Screen name="EditCbShape" component={EditCbShape} />
              <Stack.Screen
                name="EditNewAppointmentForm"
                component={EditNewAppointmentForm}
              />
              <Stack.Screen name="CustomerForm" component={CustomerForm} />
              <Stack.Screen
                name="CustomerShapeForm"
                component={CustomerShapeForm}
              />
              <Stack.Screen
                name="ClientViewRFPatient"
                component={ClientViewRFPatient}
              />
              <Stack.Screen name="RFPatient" component={RFPatient} />
              <Stack.Screen name="UserLLLTEdit" component={UserLLLTEdit} />
              <Stack.Screen name="UserLLLT" component={UserLLLT} />
              <Stack.Screen
                name="CustomerAppointmentForm"
                component={CustomerAppointmentForm}
              />
              <Stack.Screen name="ClientViewLLLT" component={ClientViewLLLT} />
              <Stack.Screen
                name="EditCustomerForm"
                component={EditCustomerForm}
              />
              <Stack.Screen
                name="ClientEditViewRFPatient"
                component={ClientEditViewRFPatient}
              />
              <Stack.Screen
                name="EditCustomerAppointmentForm"
                component={EditCustomerAppointmentForm}
              />
              <Stack.Screen
                name="ClientEditViewLLLT"
                component={ClientEditViewLLLT}
              />
              <Stack.Screen name="ClientPostLLLT" component={ClientPostLLLT} />
              <Stack.Screen
                name="CustomerEditShapeForm"
                component={CustomerEditShapeForm}
              />
              <Stack.Screen name="Checkpaystatus" component={Checkpaystatus} />
              {/* <Stack.Screen name="enterCode" component={enterCode} /> */}
            </Fragment>
          ) : (
            <Fragment>
              <Stack.Screen
                name="SubscriptionPayment"
                component={SubscriptionPayment}
              />
              <Stack.Screen name="SelectOption" component={SelectOption} />
              {/* <Stack.Screen name="OneTimePayment" component={OneTimePayment} /> */}
              <Stack.Screen name="ChangePass" component={ChangePass} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
            </Fragment>
          )
        ) : (
          <Fragment>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgetPass} />
            <Stack.Screen name="enterCode" component={enterCode} />
            <Stack.Screen name="newPassword" component={newPassword} />
          </Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    // </AppearanceProvider>
  );
};

export default Root;
