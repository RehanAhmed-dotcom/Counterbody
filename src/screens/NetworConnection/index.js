import colors from 'constants/colors';
import React from 'react';
import {View, StyleSheet,Text,Image, TouchableOpacity} from 'react-native';
import {heightPercentageToDP as hp , widthPercentageToDP as wp} from 'react-native-responsive-screen'
import NetInfo from "@react-native-community/netinfo";
import { internetconnection } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const NetworkConnection = () => {
    const dispatch=useDispatch();
    const { isLoggedIn } = useSelector(({ USER }) => USER);
    const { userData } = useSelector(({ USER }) => USER);
    const { connection } = useSelector(({ USER }) => USER);
  
     
  
    let y=false;
   
  const Referesh=()=>{
    const unsubscribe = NetInfo.addEventListener(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        if(state.isConnected)
        {
          y=true;
          internetconnection(true)(dispatch);
        }
        else{
          y=false;
          internetconnection(false)(dispatch);
        }
      });
}
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:"center",backgroundColor:colors.brown}}>
      
      <Image
          source={require('../../images/no-internet(1).png')}
          style={{width:wp(40),height:hp(40),tintColor:"white"}}
          resizeMode="contain"
      />
      <TouchableOpacity onPress={Referesh} style={{borderRadius:5,width:wp(50),height:hp(7),alignSelf:'center',alignItems:'center',backgroundColor:colors.brown,elevation:4,justifyContent:'center'}}>
          <Text style={{fontSize:16,fontWeight:'bold',color:'white'}}>Referesh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({})

export default NetworkConnection;

