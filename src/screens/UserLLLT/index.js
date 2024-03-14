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
import {Icon, Input, Item, Label} from 'native-base';
import {LLTFoemQuestionView, Viewappointmentform} from '../ApiCountoryBody';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../../components/HeaderWithBack';
import ICON from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import LogoCb from '../../components/LogoCB';
import {RadioButton} from 'react-native-paper';
import colors from '../../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const UserNewAppointmentPolicy = ({navigation, route}) => {
  const {top, bottom} = useSafeAreaInsets();
  const [formvi, setformvi] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {userData} = useSelector(({USER}) => USER);
  const {darkmd} = useSelector(({DARK}) => DARK);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // console.log('456789dfghjk');
      viewappointmentquestion();
    });

    return unsubscribe;
  }, [navigation]);

  const viewappointmentquestion = () => {
    setLoading(true);
    LLTFoemQuestionView({Auth: userData.api_token})
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

  const pictures = ({item}) => (
    <View style={Style.initialview1}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            Style.bulletview1,
            {backgroundColor: darkmd.payload ? 'white' : 'black'},
          ]}>
          <Text style={Style.bulit}></Text>
        </View>
        <Text> </Text>
        <Text
          style={[Style.text2, {color: darkmd.payload ? 'white' : 'black'}]}>
          {item.question}
        </Text>
      </View>
      <View style={Style.inputview}>
        <Text
          style={[
            Style.textinitials,
            {color: darkmd.payload ? 'white' : 'black'},
          ]}>
          {' '}
          Initials:{' '}
        </Text>
        <Text
          style={[
            Style.input1,
            {borderBottomColor: darkmd.payload ? 'white' : 'black'},
          ]}></Text>
      </View>
    </View>
  );

  const procedure1 = ({item}) => (
    <View style={Style.initialview1}>
      <View style={{flexDirection: 'row'}}>
        {/* <View
          style={[
            Style.bulletview1,
            {backgroundColor: darkmd.payload ? 'white' : 'black'},
          ]}>
          <Text style={Style.bulit}></Text>
        </View> */}
        <Text> </Text>
        <Text
          style={[Style.text2, {color: darkmd.payload ? 'white' : 'black'}]}>
          {item.question}
        </Text>
      </View>
    </View>
  );

  const procedure = ({item}) => (
    <View style={Style.initialview1}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            Style.bulletview1,
            {bordercolor: darkmd.payload ? 'white' : 'black'},
          ]}>
          <Text style={Style.bulit}></Text>
        </View>
        <Text> </Text>
        <Text
          style={[Style.text2, {color: darkmd.payload ? 'white' : 'black'}]}>
          {item.question}
        </Text>
      </View>
    </View>
  );
  const Consentform = ({item}) => (
    <View style={Style.initialview1}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            Style.bulletview1,
            {backgroundColor: darkmd.payload ? 'white' : 'black'},
          ]}>
          <Text style={Style.bulit}></Text>
        </View>
        <Text> </Text>
        <Text
          style={[Style.text2, {color: darkmd.payload ? 'white' : 'black'}]}>
          {item.question}
        </Text>
      </View>
      <View style={Style.inputview}>
        <Text
          style={[
            Style.textinitials,
            {color: darkmd.payload ? 'white' : 'black'},
          ]}>
          Initials:
        </Text>
        <Text
          style={[
            Style.input1,
            {borderBottomColor: darkmd.payload ? 'white' : 'black'},
          ]}></Text>
      </View>
    </View>
  );

  const Yesnocheck = ({item}) => (
    <View style={Style.radiomainview}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={[
            Style.doted,
            {backgroundColor: darkmd.payload ? 'white' : 'black'},
          ]}></View>
        <Text
          style={[Style.radiodes, {color: darkmd.payload ? 'white' : 'black'}]}>
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
            // onPress={() => additems(item.id, 'yes')}
          />
        </View>
      </View>
    </View>
  );
  const Yesno = ({item}) => (
    <View style={Style.radiomainview}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={[
            Style.doted,
            {backgroundColor: darkmd.payload ? 'white' : 'black'},
          ]}></View>
        <Text
          style={[Style.radiodes, {color: darkmd.payload ? 'white' : 'black'}]}>
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
            // onPress={() => additems(item.id, 'yes')}
          />
          <Text
            style={[Style.yesno, {color: darkmd.payload ? 'white' : 'black'}]}>
            Yes
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <RadioButton
            uncheckedColor={darkmd.payload ? 'white' : colors.brown}
            color={darkmd.payload ? 'white' : colors.brown}
          /> */}
          <Icon1
            name={'checkbox-blank-outline'}
            size={20}
            color={'black'}
            // onPress={() => additems(item.id, 'yes')}
          />
          <Text
            style={[Style.yesno, {color: darkmd.payload ? 'white' : 'black'}]}>
            No
          </Text>
        </View>
      </View>
    </View>
  );

  const Expects = ({item}) => (
    <View style={Style.initialview1}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            Style.bulletview1,
            {backgroundColor: darkmd.payload ? 'white' : 'black'},
          ]}>
          <Text style={Style.bulit}></Text>
        </View>
        <Text> </Text>
        <Text
          style={[Style.text2, {color: darkmd.payload ? 'white' : 'black'}]}>
          {item.question}
        </Text>
      </View>
      <View style={Style.inputview}>
        <Text
          style={[
            Style.textinitials,
            {color: darkmd.payload ? 'white' : 'black'},
          ]}>
          {' '}
          Initials:{' '}
        </Text>
        <Text
          style={[
            Style.input1,
            {borderBottomColor: darkmd.payload ? 'white' : 'black'},
          ]}></Text>
      </View>
    </View>
  );
  const decribees = ({item}) => (
    <View
      style={{
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20,
      }}>
      <Text style={[Style.text2, {color: darkmd.payload ? 'white' : 'black'}]}>
        {item.question}
      </Text>
    </View>
  );

  const signature = ({item}) => (
    <View>
      <View>
        {!item.question.toString().includes('[SIGNATURE]') ? (
          <View
            style={{
              width: '100%',
              marginVertical: 10,
              borderBottomColor: darkmd.payload ? 'white' : 'black',
            }}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
              }}>
              {item.question.split('[INPUT]')[0]}________________
              {item.question.split('[INPUT]')[1]}
            </Text>
          </View>
        ) : null}

        {item.question.toString().includes('[SIGNATURE]') ? (
          <View>
            <View style={{width: wp(90), height: hp(30), alignSelf: 'center'}}>
              <Text
                style={[
                  Style.textinitials1,
                  {color: darkmd.payload ? 'white' : 'black'},
                ]}>
                {item.question.split('[SIGNATURE]')[0]}
              </Text>

              <View
                style={{
                  width: wp(90),
                  backgroundColor: darkmd.payload ? 'white' : 'gray',
                  height: hp(26),
                }}></View>
            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={[Style.buttonStyle, {backgroundColor: '#eeeeee'}]}>
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

  return (
    <>
      <Header top={top} navigation={navigation} title="LLLT Fat Reduction" />
      {formvi.message == 'Question Data' ? (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'ios' ? 30 : 0,
          }}
          style={{
            flex: 1,
            backgroundColor: darkmd.payload ? '#111e25' : 'white',
            paddingHorizontal: 15,
          }}>
          {/* <LogoCb /> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UserLLLTEdit');
            }}
            activeOpacity={0.8}
            style={{
              position: 'absolute',
              top: 2,
              right: wp(5),
              zIndex: 5,
              backgroundColor: 'white',
              borderRadius: 20,
              // marginBottom: wp(10),
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 5,
              marginTop: 20,
              marginLeft: 10,
            }}>
            <View
              style={{
                borderRadius: wp(11 / 2),
                width: wp(11),
                height: wp(11),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ICON size={30} color={'black'} name="md-pencil-sharp" />
            </View>
          </TouchableOpacity>
          <View style={{height: 40}} />
          <View style={{marginTop: 10}}>
            <Text style={[Style.texthed, {color: 'black'}]}>
              LLLT Fat Reduction
            </Text>

            {/* <FlatList
                      data={item.questions}
                      renderItem={Consentform}
                      keyExtractor={item => item.id.toString()}
                    /> */}
          </View>
          <FlatList
            data={formvi.data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View>
                <View style={{marginTop: 20}}></View>

                {item.html_type == 'checkbox' ? (
                  <View style={{marginTop: 10}}>
                    <Text style={[Style.texthed1, {color: 'black'}]}>
                      {item.description}
                    </Text>
                    <FlatList
                      data={item.questions}
                      renderItem={Yesnocheck}
                      // keyExtractor={item => item.id.toString()}
                    />
                  </View>
                ) : null}
                {item.html_type == 'radio' ? (
                  <View style={{marginTop: 10}}>
                    <Text style={[Style.texthed1, {color: 'black'}]}>
                      MEDICAL HISTORY (continued)
                    </Text>
                    <FlatList
                      data={item.questions}
                      renderItem={Yesno}
                      keyExtractor={item => item.id.toString()}
                    />
                  </View>
                ) : null}

                {item.html_type == 'input' ? (
                  <View style={{marginTop: 10}}>
                    <Text style={[Style.texthed1, {color: 'black'}]}>
                      {item.description}
                    </Text>
                    <FlatList
                      data={item.questions}
                      renderItem={signature}
                      keyExtractor={item => item.id.toString()}
                    />
                  </View>
                ) : null}

                {item.html_type == 'noinput' ? (
                  <View style={{marginTop: 10}}>
                    <Text style={[Style.texthed1, {color: 'black'}]}>
                      {item.description}
                    </Text>
                    <FlatList
                      data={item.questions}
                      renderItem={procedure}
                      keyExtractor={item => item.id.toString()}
                    />
                  </View>
                ) : null}

                {item.html_type == 'text' ? (
                  <>
                    <Text style={[Style.texthed, {color: 'black'}]}>
                      INFORMED CONSENT FOR LLLT
                    </Text>
                    <View
                      style={{
                        alignSelf: 'center',
                        marginTop: 10,
                        marginBottom: 20,
                      }}>
                      <FlatList
                        data={item.questions}
                        renderItem={procedure1}
                        keyExtractor={item => item.id.toString()}
                      />
                    </View>
                    {/* <Text style={[Style.texthed, {color: 'black'}]}>
                      INFORMED CONSENT FOR LLLT
                    </Text> */}
                  </>
                ) : null}
                {item.title == 'Signature' ? (
                  <View>
                    <View style={{alignItems: 'center', marginTop: 10}}>
                      <Text
                        style={[
                          Style.texthed1,
                          {color: darkmd.payload ? 'white' : '#bd9d9e'},
                        ]}>
                        {item.description}
                      </Text>
                    </View>
                    <FlatList
                      data={item.questions}
                      renderItem={signature}
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
                color: darkmd.payload ? 'white' : 'balck',
              }}>
              No Form yet Add..
            </Text>
          )}
        </View>
      )}
    </>
  );
};
export default UserNewAppointmentPolicy;
const Style = StyleSheet.create({
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

  texthed: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  texthed1: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  input1: {
    borderBottomWidth: 1,

    width: wp(78),

    height: hp(6),
  },
  textinitials: {
    fontSize: 14,
    fontWeight: 'bold',

    marginTop: 20,
  },
  inputview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  text2: {
    fontSize: 12,
    fontWeight: 'normal',

    width: wp(87),
  },
  bulit: {
    color: 'white',
    fontSize: 8,
  },
  bulletview1: {
    height: wp(2),
    width: wp(2),
    borderRadius: wp(2),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  initialview1: {
    marginTop: 10,
    paddingLeft: 5,
  },
  dotview: {
    backgroundColor: 'black',
    height: wp(2),
    width: wp(2),
    borderRadius: wp(2),
  },
  text1: {
    marginLeft: 10,
    color: 'black',
    fontSize: 13,
    width: wp(80),
  },
});
