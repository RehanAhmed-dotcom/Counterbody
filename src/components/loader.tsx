import React from "react";
import { Modal, View, ActivityIndicator } from "react-native";
import colors from "../constants/colors";
import { useSelector,useDispatch } from "react-redux";

const Loader = ({
  visible,
  setVisibility = () => {},
}: {
  visible: boolean;
  setVisibility?: Function;
}) => {
  const { userData } = useSelector(({ USER }) => USER);
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          color={userData.phoneno?"white":colors.brown}
          size={"large"}
          animating={visible}
        />
      </View>
    </Modal>
  );
};
export default Loader;
