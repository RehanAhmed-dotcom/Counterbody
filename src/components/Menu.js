import React, { useState, useEffect } from "react";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
  import {  View, Text,Alert } from "react-native";
  
 const Menus = () => (
    <View>
      <Text></Text>
      <Menu>
        <MenuTrigger text='Select action' />
        <MenuOptions customStyles={{optionWrapper: { padding: 5,height:100,width:300}, optionText: {color:'green'}}}>
          <MenuOption onSelect={() => Alert.alert("Save")} text='Save' />
          <MenuOption onSelect={() => Alert.alert("Save")} text='Save' />
          <MenuOption onSelect={() => Alert.alert("Save")} text='Save' />
          <MenuOption onSelect={() => Alert.alert("Delete")} >
            <Text style={{color: 'red'}}>Delete</Text>
          </MenuOption>
          <MenuOption onSelect={() => Alert.alert("Not called")} disabled={true} text='Disabled' />
        </MenuOptions>
      </Menu>
    </View>
  );

  export default Menus;