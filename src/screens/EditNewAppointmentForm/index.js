import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, Input, Item, Label} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Viewappointmentform, updattenewappointment} from '../ApiCountoryBody';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import Add from 'react-native-vector-icons/Ionicons';
import Cross from 'react-native-vector-icons/Entypo';
import Header from '../../components/HeaderWithBack';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import LogoCb from '../../components/LogoCB';
import RButton from '../../components/RoundedButton';
import {RadioButton} from 'react-native-paper';
import colors from '../../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// import {color} from 'react-native-reanimated';

const EditNewAppointmentForm = ({navigation, route}) => {
  const {darkmd} = useSelector(({DARK}) => DARK);
  const {top, bottom} = useSafeAreaInsets();
  const [formvi, setformvi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const dispatch = useDispatch();
  const {userData} = useSelector(({USER}) => USER);
  const [newqu, setnewqu] = useState('');
  const [typid, settypid] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [remov, setremov] = useState([]);
  const [added, setadded] = useState([]);

  const checkremv = ids => {
    // console.log("99999999",ids)
    let y = '00';
    for (let t = 0; t < remov.length; t++) {
      if (remov[t] == ids) {
        y = 'true';
        return y;
      }
    }
    // console.log("999888888888",ids,"=",y)
    return y;
  };

  const additem = () => {
    if (isModalVisible) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // console.log('456789dfghjk');
      viewappointmentquestion();
    });

    return unsubscribe;
  }, [navigation]);

  const viewappointmentquestion = () => {
    setLoading(true);
    Viewappointmentform({Auth: userData.api_token})
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

  const addnew = () => {
    setModalVisible(false);
    if (newqu && typid) {
      console.log('sdfghjklyui=========', newqu);
      console.log('sdfghjklyui=========', typid);
      setadded([...added, {question_type_id: typid, question: newqu}]);
      console.log('add question', added);
    }
  };

  const additemsinform = idi => {
    console.log(idi);
    settypid(idi);
    if (isModalVisible) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  };

  const updateform = () => {
    console.log('fghjk', remov, added);
    setLoading1(true);
    console.log('registration start');
    const data = {
      questions: added,
      remove: remov,
    };
    console.log('data,,{{{{{{{{{{}}}}}}}}}},,,', data);

    console.log('Token,,,,,', userData.api_token);

    updattenewappointment({token: userData.api_token, data})
      .then(res => {
        console.log('Signup   respone.........ooo.', res);
        if (res.message == 'Customer Data Update successfully') {
          setLoading1(false);
          navigation.goBack();
        }

        setLoading1(false);
      })
      .catch(error => {
        console.log('Error Message', error);
        setLoading1(false);
      });
  };

  const pictures = ({item}) => (
    <View>
      {checkremv(item.id) == '00' ? (
        <View>
          <View style={{alignItems: 'flex-end', width: wp(90)}}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Are you sure?',
                  'You want to remove this from form?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Remove',
                      onPress: () => setremov([...remov, item.id]),
                      style: 'destructive',
                    },
                  ],
                  {cancelable: false},
                );
              }}>
              <Cross
                name="circle-with-cross"
                color={darkmd.payload ? 'white' : 'red'}
                size={20}
              />
            </TouchableOpacity>
          </View>
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
                style={[
                  Style.text2,
                  {color: darkmd.payload ? 'white' : 'black'},
                ]}>
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
        </View>
      ) : null}
    </View>
  );

  const Consentform = ({item}) => (
    <View>
      {checkremv(item.id) == '00' ? (
        <View>
          <View style={{alignItems: 'flex-end', width: wp(90)}}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Are you sure?',
                  'You want to remove this from form?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Remove',
                      onPress: () => setremov([...remov, item.id]),
                      style: 'destructive',
                    },
                  ],
                  {cancelable: false},
                );
              }}>
              <Cross
                name="circle-with-cross"
                color={darkmd.payload ? 'white' : 'red'}
                size={20}
              />
            </TouchableOpacity>
          </View>
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
                style={[
                  Style.text2,
                  {color: darkmd.payload ? 'white' : 'black'},
                ]}>
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
        </View>
      ) : null}
    </View>
  );
  const Yesno = ({item}) => (
    <View>
      {checkremv(item.id) == '00' ? (
        <View>
          <View style={{alignItems: 'flex-end', width: wp(90)}}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Are you sure?',
                  'You want to remove this from form?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Remove',
                      onPress: () => setremov([...remov, item.id]),
                      style: 'destructive',
                    },
                  ],
                  {cancelable: false},
                );
              }}>
              <Cross
                name="circle-with-cross"
                color={darkmd.payload ? 'white' : 'red'}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={Style.radiomainview}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={[
                  Style.doted,
                  {backgroundColor: darkmd.payload ? 'white' : 'black'},
                ]}></View>
              <Text
                style={[
                  Style.radiodes,
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
                />
                <Text
                  style={[
                    Style.yesno,
                    {color: darkmd.payload ? 'white' : 'black'},
                  ]}>
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
                />
                <Text
                  style={[
                    Style.yesno,
                    {color: darkmd.payload ? 'white' : 'black'},
                  ]}>
                  No
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );

  const Expects = ({item}) => (
    <View>
      {checkremv(item.id) == '00' ? (
        <View>
          <View style={{alignItems: 'flex-end', width: wp(90)}}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Are you sure?',
                  'You want to remove this from form?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Remove',
                      onPress: () => setremov([...remov, item.id]),
                      style: 'destructive',
                    },
                  ],
                  {cancelable: false},
                );
              }}>
              <Cross
                name="circle-with-cross"
                color={darkmd.payload ? 'white' : 'red'}
                size={20}
              />
            </TouchableOpacity>
          </View>
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
                style={[
                  Style.text2,
                  {color: darkmd.payload ? 'white' : 'black'},
                ]}>
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
        </View>
      ) : null}
    </View>
  );

  const signature = ({item}) => (
    <View>
      <View>
        {checkremv(item.id) == '00' ? (
          item.question != 'Signature' &&
          item.question != 'Patient’s signature' ? (
            <View>
              <View style={{alignItems: 'flex-end', width: wp(90)}}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Are you sure?',
                      'You want to remove this from form?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'Remove',
                          onPress: () => setremov([...remov, item.id]),
                          style: 'destructive',
                        },
                      ],
                      {cancelable: false},
                    );
                  }}>
                  <Cross
                    name="circle-with-cross"
                    color={darkmd.payload ? 'white' : 'red'}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <Item
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
              </Item>
            </View>
          ) : null
        ) : null}

        {item.question == 'Signature' ? (
          <View>
            <View style={{width: wp(90), height: hp(30), alignSelf: 'center'}}>
              <Text
                style={[
                  Style.textinitials1,
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
      <Header top={top} navigation={navigation} title="Fat Freezing " />
      {formvi.message == 'Question Data' ? (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: darkmd.payload ? '#111e25' : 'white',
            paddingHorizontal: 15,
          }}>
          {/* <LogoCb/> */}
          <FlatList
            data={formvi.data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View>
                <View style={{marginTop: 20}}></View>
                {item.title == 'First Initial' ? (
                  <View style={{marginTop: 10}}>
                    <Text
                      style={[
                        Style.texthed,
                        {color: darkmd.payload ? 'white' : '#bd9d9e'},
                      ]}>
                      TREATMENT CONSENT FORM
                    </Text>

                    <FlatList
                      data={item.questions}
                      renderItem={Consentform}
                      keyExtractor={item => item.id.toString()}
                    />
                    <View style={{alignItems: 'flex-end', width: wp(90)}}>
                      <TouchableOpacity onPress={() => additemsinform(item.id)}>
                        <Add
                          name="md-add-circle"
                          color={darkmd.payload ? 'white' : 'black'}
                          size={40}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
                {item.title == 'Initial' ? (
                  <View style={{marginTop: 10}}>
                    <Text
                      style={[
                        Style.texthed1,
                        {color: darkmd.payload ? 'white' : '#bd9d9e'},
                      ]}>
                      {item.description}
                    </Text>
                    <FlatList
                      data={item.questions}
                      renderItem={Expects}
                      keyExtractor={item => item.id.toString()}
                    />
                    <View style={{alignItems: 'flex-end', width: wp(90)}}>
                      <TouchableOpacity onPress={() => additemsinform(item.id)}>
                        <Add
                          name="md-add-circle"
                          color={darkmd.payload ? 'white' : 'black'}
                          size={40}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
                {item.title == 'YesNo' ? (
                  <View style={{marginTop: 10}}>
                    <Text
                      style={[
                        Style.texthed1,
                        {color: darkmd.payload ? 'white' : '#bd9d9e'},
                      ]}>
                      {item.description}
                    </Text>
                    <FlatList
                      data={item.questions}
                      renderItem={Yesno}
                      keyExtractor={item => item.id.toString()}
                    />
                    <View style={{alignItems: 'flex-end', width: wp(90)}}>
                      <TouchableOpacity onPress={() => additemsinform(item.id)}>
                        <Add
                          name="md-add-circle"
                          color={darkmd.payload ? 'white' : 'black'}
                          size={40}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
                {item.title == 'Pictures' ? (
                  <View style={{marginTop: 10}}>
                    <Text
                      style={[
                        Style.texthed1,
                        {color: darkmd.payload ? 'white' : '#bd9d9e'},
                      ]}>
                      {item.description}
                    </Text>
                    <FlatList
                      data={item.questions}
                      renderItem={pictures}
                      keyExtractor={item => item.id.toString()}
                    />
                    <View style={{alignItems: 'flex-end', width: wp(90)}}>
                      <TouchableOpacity onPress={() => additemsinform(item.id)}>
                        <Add
                          name="md-add-circle"
                          color={darkmd.payload ? 'white' : 'black'}
                          size={40}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
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
                    {/* <View style={{alignItems:"flex-end",width:wp(90)}}>
      <TouchableOpacity onPress={()=>additemsinform(item.id)} >
<Add name="md-add-circle" color={darkmd.payload?"white":"black"} size={40}/>
</TouchableOpacity>
</View> */}
                  </View>
                ) : null}
              </View>
            )}
          />
          <View style={{alignSelf: 'center', marginTop: 10, marginBottom: 20}}>
            <Text
              style={[
                Style.text2,
                {color: darkmd.payload ? 'white' : 'black'},
              ]}>
              As with most medical procedures, there are risks and side effects.
              These have been explained to me in detail. I have read the above
              information, and I give my consent to be treated with this
              Cryolipolysis procedure.
            </Text>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            padding: wp(4),
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
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>
              No Form yet Add..
            </Text>
          )}
        </View>
      )}
      {remov.length > 0 || added.length > 0 ? (
        <RButton
          title="Submit Changes"
          onPress={() => {
            Alert.alert(
              'Are you sure?',
              'You want to Save Changes?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => updateform(),
                  style: 'destructive',
                },
              ],
              {cancelable: false},
            );
          }}
        />
      ) : null}
      <Modal animationType="slide" transparent={true} visible={loading1}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: '#00000088',
            width: wp(100),
            height: hp(100),
          }}>
          <ActivityIndicator size="large" color={colors.brown} />
        </View>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={isModalVisible}>
        <View
          style={{
            height: hp(40),
            width: wp(85),
            borderWidth: 0,
            borderRadius: wp(3),
            alignSelf: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
            marginTop: 70,
            backgroundColor: darkmd.payload ? '#202d34' : 'white',
          }}>
          <TouchableOpacity
            onPress={additem}
            style={{alignItems: 'flex-end', marginTop: 10, marginRight: 10}}>
            <Cross
              name="circle-with-cross"
              color={darkmd.payload ? 'white' : 'red'}
              size={20}
            />
          </TouchableOpacity>
          <View style={{alignSelf: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: darkmd.payload ? 'white' : 'black',
                marginTop: 15,
              }}>
              Write Your question here :
            </Text>
            <TextInput
              multiline={true}
              onChangeText={text => {
                setnewqu(text);
              }}
              numberOfLines={3}
              underlineColorAndroid={darkmd.payload ? '#202d34' : 'white'}
              require={true}
              style={[
                Style.input12,
                {
                  borderColor: darkmd.payload ? 'white' : 'black',
                  color: darkmd.payload ? 'white' : 'black',
                },
              ]}></TextInput>
          </View>
          <View style={{width: wp(75), alignSelf: 'center', marginTop: wp(10)}}>
            <TouchableOpacity
              onPress={addnew}
              style={{
                backgroundColor: darkmd.payload ? 'white' : colors.brown,
                width: wp(20),
                height: hp(4),
                justifyContent: 'center',
                alignSelf: 'flex-end',
                alignItems: 'center',
                borderRadius: wp(10),
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: darkmd.payload ? 'black' : 'white',
                  marginTop: 0,
                }}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default EditNewAppointmentForm;
const Style = StyleSheet.create({
  input12: {
    width: wp(75),
    color: 'black',
    height: hp(15),
    fontSize: 14,
    alignSelf: 'center',
    borderWidth: 1,

    marginTop: 5,
  },
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
    color: 'black',
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
