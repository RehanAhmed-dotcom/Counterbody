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
import {Checkbox, RadioButton} from 'react-native-paper';
import {Icon, Input, Item, Label} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Udateusershapeform, formshapequestion} from '../ApiCountoryBody';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import Add from 'react-native-vector-icons/Ionicons';
import Cross from 'react-native-vector-icons/Entypo';
import Header from '../../components/HeaderWithBack';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import LogoCbShape from '../../components/LogoCbshape';
import RButton from '../../components/RoundedButton';
import colors from '../../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const EditCbShape = ({navigation, route}) => {
  const {top, bottom} = useSafeAreaInsets();
  const {darkmd} = useSelector(({DARK}) => DARK);
  const [formvi, setformvi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [remov, setremov] = useState([]);
  const [added, setadded] = useState([]);
  const [newqu, setnewqu] = useState('');
  const [newans, setnewans] = useState('');

  const [typid, settypid] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  console.log(remov);
  console.log(added);
  const {userData} = useSelector(({USER}) => USER);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // console.log('456789dfghjk');
      viewquestion();
    });

    return unsubscribe;
  }, [navigation]);

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

  const additemsinform = idi => {
    console.log(idi);
    settypid(idi);
    if (isModalVisible) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  };

  const additem = () => {
    if (isModalVisible) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  };

  const addnew = () => {
    setModalVisible(false);
    if (newqu && typid) {
      console.log('sdfghjklyui=========', newqu);
      console.log('sdfghjklyui=========', typid);
      if (typid == 1) {
        setadded([
          ...added,
          {question_type_id: typid, question: newqu, answer: newans},
        ]);
      } else {
        setadded([...added, {question_type_id: typid, question: newqu}]);
      }

      console.log('add question', added);
    }
  };
  const checkremv = ids => {
    // console.log("99999999",ids)
    let y = '00';
    for (let t = 0; t < remov.length; t++) {
      if (remov[t] == ids) {
        y = 'true';
        return y;
      }
    }
    return y;
  };
  const [newdqa, setnewdqa] = useState([]);
  const newlyadditem = ids => {
    // setnewdqa([])
    if (added.length > 0) {
      for (let t = 0; t < added.length; t++) {
        if (added[t].question_type_id == ids) {
          setnewdqa(...newdqa, added[t]);
          console.log('earysrudtflw64eyxructyv', added[t].question_type_id);
        }
      }
    }
  };

  const updateform = () => {
    setLoading1(true);
    console.log('registration start');
    const data = {
      questions: added,
      remove: remov,
    };
    console.log('data,,{{{{{{{{{{}}}}}}}}}},,,', data);

    console.log('Token,,,,,', userData.api_token);

    Udateusershapeform({token: userData.api_token, data})
      .then(res => {
        console.log('Signup   respone.........ooo.', res);
        if (res.message == 'Customer Data Update successfully') {
          navigation.goBack();
          setLoading1(false);
        }

        setLoading1(false);
      })
      .catch(error => {
        console.log('Error Message', error);
        setLoading1(false);
      });
  };

  const question = ({item}) => (
    <View>
      {checkremv(item.id) == '00' ? (
        <>
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
            <Text
              style={[
                Styles.ques,
                {color: darkmd.payload ? 'white' : 'black'},
              ]}>
              {item.question}
            </Text>
            <Text
              style={[
                Styles.quesdes,
                {color: darkmd.payload ? 'white' : 'black'},
              ]}>
              {item.answer}
            </Text>
          </View>
        </>
      ) : null}
    </View>
  );

  const yesno = ({item}) => (
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
                  style={[
                    Styles.yesno,
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
                  // onPress={()=>setrd(1)}
                />
                <Text
                  style={[
                    Styles.yesno,
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

  const initials = ({item}) => (
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
          <View style={Styles.initialview1}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                style={[
                  Styles.text1,
                  {color: darkmd.payload ? 'white' : 'black'},
                ]}>
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
                  {borderBottomColor: darkmd.payload ? 'white' : 'black'},
                ]}></Text>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );

  const sinature = ({item}) => (
    <View>
      <View>
        {item.question != 'Signature' ? (
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
              </View>
            ) : null}
          </View>
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
  return (
    <>
      <Header top={top} navigation={navigation} title="Edit Cavitation & RF" />
      {formvi.message == 'Question Data' ? (
        <ScrollView
          style={[
            Styles.container,
            {
              backgroundColor: darkmd.payload ? '#111e25' : 'white',
            },
          ]}>
          <LogoCbShape />

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
                {item.title == 'Initials' ? (
                  <View>
                    <FlatList
                      data={item.questions}
                      renderItem={initials}
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
                    <FlatList
                      data={item.questions}
                      renderItem={sinature}
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
      {remov.length > 0 || added.length > 0 ? (
        <View style={{backgroundColor: 'white', alignItems: 'center'}}>
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
        </View>
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
        {/* <View style={{alignItems:'center',justifyContent:'center',alignSelf:'center',backgroundColor:'#00000088',width:wp(100),height:hp(100)}}> */}

        <View
          style={{
            height: typid == 1 ? hp(60) : hp(40),
            width: wp(85),
            borderWidth: 0,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
            borderRadius: wp(3),
            alignSelf: 'center',
            marginTop: 0,
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
                Styles.input12,
                {
                  borderColor: darkmd.payload ? 'white' : 'black',
                  color: darkmd.payload ? 'white' : 'black',
                },
              ]}></TextInput>
          </View>
          {typid == 1 ? (
            <View style={{alignSelf: 'center'}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: darkmd.payload ? 'white' : 'black',
                  marginTop: 15,
                }}>
                Write Your Answer here :
              </Text>
              <TextInput
                multiline={true}
                onChangeText={text => {
                  setnewans(text);
                }}
                numberOfLines={3}
                underlineColorAndroid={darkmd.payload ? '#202d34' : 'white'}
                require={true}
                style={[
                  Styles.input12,
                  {
                    borderColor: darkmd.payload ? 'white' : 'black',
                    color: darkmd.payload ? 'white' : 'black',
                  },
                ]}></TextInput>
            </View>
          ) : null}
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
export default EditCbShape;
const Styles = StyleSheet.create({
  input12: {
    width: wp(75),

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
    height: hp(100),

    paddingHorizontal: 15,
  },
});
