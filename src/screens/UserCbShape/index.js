import {
  ActivityIndicator,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Checkbox, RadioButton} from 'react-native-paper';
import {Icon, Input, Item, Label} from 'native-base';
import React, {createRef, useEffect, useState} from 'react';
import {formshapequestion, formsubmit} from '../ApiCountoryBody';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../../components/HeaderWithBack';
import ICON from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import LogoCbShape from '../../components/LogoCbshape';
import colors from '../../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const UserCbShape = ({navigation, route}) => {
  const {top, bottom} = useSafeAreaInsets();
  const [formvi, setformvi] = useState([]);
  const [loading, setLoading] = useState(true);
  const {darkmd} = useSelector(({DARK}) => DARK);
  const {userData} = useSelector(({USER}) => USER);
  // console.log('formiv', formvi[0].questions);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // console.log('456789dfghjk');
      viewquestion();
    });

    return unsubscribe;
  }, [navigation]);
  console.log('cc---', formvi);
  const viewquestion = () => {
    setLoading(true);
    formshapequestion({Auth: userData.api_token})
      .then(res => {
        console.log('Form Question', res);
        if (res.message == 'Question Data') {
          setLoading(false);
          setformvi(res);
        } else {
          setLoading(false);
        }
      })
      .catch(e => {
        setLoading(false);
        console.log('error message ', e);
      });
  };

  const question = ({item}) => (
    <View>
      <Text style={[Styles.ques, {color: darkmd.payload ? 'white' : 'black'}]}>
        {item.question}
      </Text>
      <Text
        style={[Styles.quesdes, {color: darkmd.payload ? 'white' : 'black'}]}>
        {item.answer}
      </Text>
    </View>
  );

  const yesno = ({item}) => (
    <View style={Styles.radiomainview}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={[
            Styles.doted,
            {backgroundColor: darkmd.payload ? 'white' : 'black'},
          ]}></View>
        <Text
          style={[
            Styles.radiodes,
            {color: darkmd.payload ? 'white' : 'black'},
          ]}>
          {item.question}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <RadioButton
            uncheckedColor={darkmd.payload ? 'white' : colors.brown}
            color={darkmd.payload ? 'white' : colors.brown}
          /> */}
          <Icon1
            name={'checkbox-blank-outline'}
            size={20}
            color={'black'}
            // onPress={()=>setrd(1)}
          />
          <Text
            style={[Styles.yesno, {color: darkmd.payload ? 'white' : 'black'}]}>
            Yes
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon1
            name={'checkbox-blank-outline'}
            size={20}
            color={'black'}
            // onPress={()=>setrd(1)}
          />
          <Text
            style={[Styles.yesno, {color: darkmd.payload ? 'white' : 'black'}]}>
            No
          </Text>
        </View>
      </View>
    </View>
  );

  const initials = ({item}) => (
    <View style={Styles.initialview1}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={[
            Styles.bulletview1,
            {backgroundColor: darkmd.payload ? '#111e25' : 'white'},
          ]}>
          <View
            style={[
              Styles.doted,
              {backgroundColor: darkmd.payload ? 'white' : 'black'},
            ]}></View>
        </View>
        <Text> </Text>
        <Text
          style={[Styles.text1, {color: darkmd.payload ? 'white' : 'black'}]}>
          {item.question}
        </Text>
      </View>
      <View style={Styles.inputview}>
        <Text
          style={[
            Styles.textinitials,
            {color: darkmd.payload ? 'white' : 'black'},
          ]}>
          {' '}
          Initials:{' '}
        </Text>
        <Text
          style={[
            Styles.input1,
            {
              borderBottomColor: darkmd.payload ? 'white' : 'black',
              color: darkmd.payload ? 'white' : 'black',
            },
          ]}></Text>
      </View>
    </View>
  );

  const sinature = ({item}) => (
    <View>
      {item.question == 'Date' ? (
        <View>
          {/* {savedate==1?additems(item.id,date):null} */}

          <Item
            floatingLabel
            style={{
              width: '100%',
              marginVertical: 10,
              borderBottomColor: darkmd.payload ? 'white' : colors.brown,
            }}>
            <Label
              style={{
                fontSize: 14,
                //fontFamily: 'Nunito-Regular',
                color: darkmd.payload ? 'white' : '#797979',
              }}>
              Date
            </Label>
            <Input
              editable={false}
              disabled
              selectionColor={colors.brown}
              style={{
                fontSize: 16,
                color: darkmd.payload ? 'white' : 'black',
              }}
              autoCapitalize="none"
              returnKeyType="next"
            />
          </Item>
        </View>
      ) : null}
      <View>
        {item.question != 'Signature' && item.question != 'Date' ? (
          <Item
            floatingLabel
            style={{
              width: '100%',
              marginVertical: 10,
              borderBottomColor: darkmd.payload ? 'white' : 'black',
            }}>
            <Label
              style={{
                fontSize: 14,
                color: darkmd.payload ? 'white' : '#797979',
              }}>
              {item.question}
            </Label>
            <Input
              dataDetectorTypes="phoneNumber"
              editable={false}
              selectionColor={colors.brown}
              style={{
                fontSize: 16,
                color: darkmd.payload ? 'white' : 'black',
              }}
              returnKeyType={'done'}
            />
          </Item>
        ) : null}

        {item.question == 'Signature' ? (
          <View>
            <View style={{width: wp(90), height: hp(30), alignSelf: 'center'}}>
              <Text
                style={[
                  Styles.textinitials1,
                  {color: darkmd.payload ? 'white' : 'black'},
                ]}>
                {' '}
                Patient’s signature:{' '}
              </Text>
              <View
                style={{
                  width: wp(90),
                  backgroundColor: darkmd.payload ? 'white' : 'gray',
                  height: hp(26),
                }}></View>
            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={[Styles.buttonStyle, {backgroundColor: '#eeeeee'}]}>
                <Text
                  style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                  Reset
                </Text>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
  // const renderItem = ({item}) => (
  //   <View>
  //     <FlatList
  //       data={item.questions}
  //       renderItem={question}
  //       keyExtractor={item => item.id.toString()}
  //     />
  //   </View>
  // );
  return (
    <>
      <Header top={top} navigation={navigation} title="Cavitation & RF" />

      {true ? (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'ios' ? 30 : 0,
          }}
          style={[
            Styles.container,
            {backgroundColor: darkmd.payload ? '#111e25' : 'white'},
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 60,
            }}>
            <Text></Text>
            <View>
              <LogoCbShape />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EditCbShape');
                }}
                activeOpacity={0.8}
                style={{
                  position: 'absolute',
                  backgroundColor: 'white',
                  borderRadius: 20,

                  zIndex: 7,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 5,
                  marginTop: 20,
                }}>
                <View
                  style={{
                    borderRadius: wp(11 / 2),
                    width: wp(11),
                    height: wp(11),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ICON
                    size={30}
                    color={darkmd.payload ? '#202d34' : colors.brown}
                    name="md-pencil-sharp"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height: 0}} />
          <Text
            style={[
              Styles.cbmaintxt,
              {color: darkmd.payload ? 'white' : 'black'},
            ]}>
            Cavitation and RF is a combination of Ultrasonic Cavitation and
            Radio Frequency Skin Tightening
          </Text>

          <FlatList
            data={formvi.data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View>
                {item.title == 'Question' ? (
                  <View>
                    <FlatList
                      data={item.questions}
                      renderItem={question}
                      keyExtractor={item => item.id.toString()}
                    />
                  </View>
                ) : null}
                {item.title == 'YesNo' ? (
                  <View>
                    <Text
                      style={[
                        Styles.yesnohead,
                        {color: darkmd.payload ? 'white' : 'black'},
                      ]}>
                      {item.description}
                    </Text>
                    <FlatList
                      data={item.questions}
                      renderItem={yesno}
                      keyExtractor={item => item.id.toString()}
                    />
                  </View>
                ) : null}
                {item.title == 'Initials' ? (
                  <View>
                    <FlatList
                      data={item.questions}
                      renderItem={initials}
                      keyExtractor={item => item.id.toString()}
                    />
                  </View>
                ) : null}
                {item.title == 'Signature' ? (
                  <View>
                    <FlatList
                      data={item.questions}
                      renderItem={sinature}
                      keyExtractor={item => item.id.toString()}
                    />
                  </View>
                ) : null}
              </View>
            )}
          />
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: darkmd.payload ? '#111e25' : 'white',
          }}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={darkmd.payload ? 'white' : colors.brown}
            />
          ) : (
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: darkmd.payload ? 'white' : 'black',
              }}>
              No Form yet Added..
            </Text>
          )}
        </View>
      )}
      {/*  */}
    </>
  );
};
export default UserCbShape;
const Styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,

    margin: 10,
  },
  textinitials1: {
    fontSize: 14,
    fontWeight: 'bold',

    marginBottom: 10,
  },
  input1: {
    borderBottomWidth: 1,

    width: wp(78),

    height: hp(6),
  },
  textinitials: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
  inputview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  text1: {
    fontSize: 12,
    fontWeight: 'normal',

    width: wp(87),
  },
  bulit: {
    color: 'white',
    fontSize: 8,
  },
  bulletview1: {
    width: 12,
    height: 12,
    borderRadius: 20,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  initialview1: {
    marginTop: 20,
    paddingLeft: 5,
  },
  yesnohead: {
    fontSize: 14,
    fontWeight: 'bold',

    marginTop: 10,
  },
  yesno: {
    fontWeight: 'normal',
    fontSize: 12,
  },
  radiodes: {
    fontSize: 12,
    width: wp(50),
    paddingLeft: 10,
  },
  doted: {
    width: 5,
    height: 5,
  },
  radiomainview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  quesdes: {
    fontSize: 10,
  },
  ques: {
    fontSize: 12,
    fontWeight: 'bold',

    marginTop: 5,
  },
  cbmaintxt: {
    fontSize: 12,
    fontWeight: 'bold',

    marginTop: 10,
  },
  container: {
    flex: 1,

    paddingHorizontal: 15,
  },
});
