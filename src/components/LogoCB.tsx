import React from 'react';
import { Text, View,StyleSheet } from 'react-native';
import {widthPercentageToDP as wp , heightPercentageToDP as hp} from "react-native-responsive-screen"
import { useDispatch, useSelector } from "react-redux";
const LogoCB = () => {
    const  {darkmd} = useSelector(({ DARK }) => DARK);
  return (
      <>
      
    <View style={{flex:1,backgroundColor:darkmd.payload?"#111e25":"white"}}>
    <View style={[Styles.backcontainer,{ backgroundColor:darkmd.payload?"#202d34":'#bd9d9e',}]}>
    <View style={[Styles.circleciew,{ backgroundColor:darkmd.payload?"#202d34":'#bd9d9e',}]}>
      <Text style={Styles.text1} >C B</Text>
      </View>
      <Text style={Styles.text2}>COUTOUR BODY</Text>
      <Text style={Styles.text3}>Body Scuoting Studio</Text>
      </View>
      <Text style={[Styles.text4,{color:darkmd.payload?"white":'#bd9d9e',}]}>New Appointment Policy</Text>
      <Text style={[Styles.text5,,{color:darkmd.payload?"white":'#bd9d9e',}]}>Keeping you and our Staff Safe and Healthy</Text>
      <Text style={[Styles.text6 ,{color:darkmd.payload?"white":'#bd9d9e',}]}>Due to Covid-19 We have the following procedures in place</Text>
    </View>
    <View>
    <View style={{flexDirection:"row",alignItems:'center',justifyContent:"center"}}>
<View style={[Styles.dotview,{ backgroundColor:darkmd.payload?"white":'black',}]}></View>
    <Text style={[Styles.text11,{ color:darkmd.payload?"white":'black',}]}>Santise your hands on arrival</Text>
    </View>
    <View style={{flexDirection:"row",alignItems:'center',justifyContent:"center"}}>
<View style={[Styles.dotview,{ backgroundColor:darkmd.payload?"white":'black',}]}></View>
    <Text style={[Styles.text11,{ color:darkmd.payload?"white":'black',}]}>If you have a face mask, please bring and wear</Text>
    </View>
    <View style={{flexDirection:"row",alignItems:'center',justifyContent:"center"}}>
<View style={[Styles.dotview,{ backgroundColor:darkmd.payload?"white":'black',}]}></View>
    <Text style={[Styles.text11,{ color:darkmd.payload?"white":'black',}]}>Clients and Staff only allowed in Treatment rooms</Text>
    </View>
    <View style={{flexDirection:"row",alignItems:'center',justifyContent:"center"}}>
<View style={[Styles.dotview,{ backgroundColor:darkmd.payload?"white":'black',}]}></View>
    <Text style={[Styles.text11,{ color:darkmd.payload?"white":'black',}]}>Please cancel your appointment if feeling unwell (we will be taking clients temperatures on arrival)</Text>
    </View>
    <View style={{flexDirection:"row",alignItems:'center',justifyContent:"center"}}>
<View style={[Styles.dotview,{ backgroundColor:darkmd.payload?"white":'black',}]}></View>
    <Text style={[Styles.text11,{ color:darkmd.payload?"white":'black',}]}>Please be punctual to your appointment</Text>
    </View>
    </View>
    </>
  )
}
export default LogoCB;
const Styles=StyleSheet.create({
    dotview:{
       
        height:wp(2),
        width:wp(2),
        borderRadius:wp(2)
      },
      text11:{
      marginLeft:10,
       
        fontSize:13,
        width:wp(80)
      },
    circleciew:{
  
        borderColor:'white',
        borderWidth:2.5,
        width:wp(12),
        height:wp(12),
        borderRadius:wp(10),
        alignItems:"center",
        justifyContent:'center',
        alignSelf:'center'
    },
    text1:{
color:'white',
alignSelf:'center',
fontSize:20,
fontWeight:"bold"


    },
    text2:{
        color:'white',
        alignSelf:'center',
        fontSize:12,
        fontWeight:'bold',
        marginTop:5

    },
    text3:{
        color:'white',
        alignSelf:'center',
        fontSize:8,
        marginTop:2
    },
    text4:{
        
        alignSelf:'center',
        fontSize:14,
        fontWeight:'bold',
        marginTop:10
    },
    text5:{
       
        alignSelf:'center',
        fontSize:12,
        
        marginTop:5
    },
    text6:{
       
        alignSelf:'center',
        fontSize:12,
        fontWeight:'bold',
        marginTop:12
    },
    backcontainer:{
       
        width:wp(30),
        height:hp(15),
        alignSelf:'center',
        justifyContent:'center',
        marginTop:20
    }
})