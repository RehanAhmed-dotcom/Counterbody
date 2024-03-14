import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";

const ImagePickerModal = ({
  visible,
  setVisible,
  pickBy,
}: {
  visible: boolean;
  setVisible: Function;
  pickBy: Function;
}) => {
  const  {darkmd} = useSelector(({ DARK }) => DARK);
  const { top, bottom } = useSafeAreaInsets();
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#00000088",
          paddingTop: top,
          paddingBottom: bottom,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setVisible(false);
          }}
          activeOpacity={1}
          style={{ flex: 1 }}
        />
        <View
          style={{
            width: "100%",
            padding: "3%",
          }}
        >
          <View
            style={{
              borderRadius: 12,
              backgroundColor: darkmd.payload?"#111e25":colors.white,
              width: "100%",
              marginBottom: 18,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                pickBy(false);
              }}
              activeOpacity={0.8}
              style={{
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderColor:darkmd.payload?"#202d34":"#ECECEC",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 18,
              }}
            >
              <Text style={{ color: colors.iosBlueL, fontSize: 17 }}>
                Camera
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                pickBy(true);
              }}
              activeOpacity={0.8}
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 18,
              }}
            >
              <Text style={{ color: colors.iosBlueL, fontSize: 17 }}>
                Photos
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}
            activeOpacity={0.8}
            style={{
              borderRadius: 12,
              backgroundColor: darkmd.payload?"#111e25":colors.white,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 18,
            }}
          >
            <Text style={{ color: colors.iosRedL, fontSize: 17 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default ImagePickerModal;
