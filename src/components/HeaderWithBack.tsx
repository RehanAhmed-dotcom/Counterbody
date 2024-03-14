import React, {Fragment} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Icon from 'react-native-vector-icons/AntDesign';
import color from '../constants/colors';
import {shadow} from '../lib';

const Header = ({
  top = 0,
  title = '',
  navigation = {},
}: {
  top: number;
  title: string;
  navigation: object;
}) => {
  const {darkmd} = useSelector(({DARK}) => DARK);
  return (
    <Fragment>
      <StatusBar
        barStyle={!darkmd.payload ? 'dark-content' : 'light-content'}
        backgroundColor={darkmd.payload ? '#202d34' : color.brown}
      />
      <View
        style={{
          height: 56 + top,
          ...shadow(3),
          paddingHorizontal: 15,
          justifyContent: 'flex-end',
          backgroundColor: darkmd.payload ? '#202d34' : 'white',
        }}>
        <View
          style={{
            height: 56,
            flexDirection: 'row',
            alignItems: 'center',

            paddingHorizontal: 15,
          }}>
          <Icon
            name="arrowleft"
            color={darkmd.payload ? 'white' : 'black'}
            size={25}
            onPress={navigation.goBack}
          />
          <Text
            style={{
              marginLeft: 20,
              fontSize: 16, //fontFamily: 'Nunito-SemiBold',
              fontWeight: 'bold',
              color: darkmd.payload ? 'white' : 'black',
            }}>
            {title}
          </Text>
        </View>
      </View>
    </Fragment>
  );
};
export default Header;
