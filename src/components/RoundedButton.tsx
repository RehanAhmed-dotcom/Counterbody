import React, { useRef, useEffect } from "react";
import { TouchableOpacity, Text, Pressable, Animated } from "react-native";
import Icon1 from "react-native-vector-icons/AntDesign";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../constants/colors";
import { shadow } from "../lib";
import { useSelector,useDispatch } from "react-redux";

const RoundedButton = ({
  onPress = () => {},
  style = {},
  title = "",
}: {
  onPress: Function;
  style?: object;
  title: string;
}) => {
  const animatedScale = useRef(new Animated.Value(0)).current;
  const  {darkmd} = useSelector(({ DARK }) => DARK);
  useEffect(() => {
    animatedScale.setValue(1);
  }, []);

  const handleOnPress = () => {
    animatedScale.setValue(0.8);
    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 24,
      speed: 0.1,
      useNativeDriver: true,
    }).start();
    //onPress();
  };
  return (
    <Pressable onPress={onPress}>
      <Animated.View
        //onPress={onPress}
        style={[
          {
            alignSelf: "center",
            height: 55,
            borderRadius: 30,
            paddingHorizontal: 30,
            width: wp(90),
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
            alignItems: "center",
            ...shadow(4),
            backgroundColor: darkmd.payload?"#202d34":colors.brown,
          },
          style,
          { transform: [{ scale: animatedScale }] },
        ]}
      >
        <Text style={{ fontWeight: "bold", color:darkmd.payload?"#fff":"#fff" , fontSize: 16 }}>
          {title}
        </Text>
        <Icon1 name="arrowright" color={darkmd.payload?"#fff":"#fff"}  size={wp(8)} />
      </Animated.View>
    </Pressable>
  );
};

export default RoundedButton;
