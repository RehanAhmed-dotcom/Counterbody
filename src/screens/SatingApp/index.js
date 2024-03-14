import React  from "react";
import {View,Text} from "react-native"
import { Switch } from 'react-native-paper';
import Header from "../../components/HeaderWithBack";
import color from "../../constants/colors"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {widthPercentageToDP as wp,heightPercentageToDP as hp } from "react-native-responsive-screen"
import { useSelector,useDispatch } from "react-redux";
import { darkthem } from "../../redux/actions";
import Drmd from "react-native-vector-icons/Entypo"

const SatingApp=({navigation})=>{
    const  {darkmd} = useSelector(({ DARK }) => DARK);
    const dispatch=useDispatch();
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    console.log("999999999999999999999",darkmd)
    const onToggleSwitch = () => {
            darkthem(!darkmd.payload)(dispatch);   
            console.log("99999------------------99999999",darkmd.payload)
    };
    const { top, bottom } = useSafeAreaInsets();
    console.log("hl;o");
    return(
        <>
                    <Header top={top} navigation={navigation} title="Setting" />
        <View style={{flex:1,backgroundColor:darkmd.payload?"#111e25":"white",paddingHorizontal:15}}>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:0,marginTop:wp(3)}}>
<Text style={{color:darkmd.payload?"white":"black"}}>Dark Mode</Text>
<Drmd color={darkmd.payload?"white":"black"} name={darkmd.payload?"moon":"light-up"} size={20}/>
<Switch color={color.brown} value={darkmd.payload?true:false} onValueChange={onToggleSwitch} />

        </View>
        </View>
        </>
    )

}
export default SatingApp;