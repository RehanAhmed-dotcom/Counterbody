import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {Checkbox, RadioButton} from 'react-native-paper';
import {
  EditEmsQuestion,
  formquestion,
  rfpatientForm_ViewQuestion,
} from '../ApiCountoryBody';
import {Icon, Input, Item, Label} from 'native-base';
import React, {createRef, useEffect, useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {date2String, devLogger, emailToUniqueString} from '../../lib/utilts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import Add from 'react-native-vector-icons/Ionicons';
import Cross from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';
import Header from '../../components/HeaderWithBack';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import RButton from '../../components/RoundedButton';
import colors from '../../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const RFPatientEdit = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const {top, bottom} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {userData} = useSelector(({USER}) => USER);
  const [newqu, setnewqu] = useState('');
  const [typid, settypid] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const {darkmd} = useSelector(({DARK}) => DARK);
  const [remov, setremov] = useState([]);
  const [added, setadded] = useState([]);
  const additem = () => {
    if (isModalVisible) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
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

  console.log('-------', remov);

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
  const [date, setDate] = useState(date2String(new Date()));
  const [pickIt, setPickIt] = useState(false);

  const sign = createRef();
  const [imag, setimag] = useState('');

  const [specif_answer, setspecif_answer] = useState('');

  const [formvi, setformvi] = useState([]);

  const pic = require('../../images/logo.png');

  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    // console.log('456789dfghjk');
    viewquestion();
    // });

    // return unsubscribe;
  }, [navigation]);

  const viewquestion = () => {
    setLoading(true);
    rfpatientForm_ViewQuestion({Auth: userData.api_token})
      .then(res => {
        console.log('Form Question', res);
        if (res.message == 'Question Data') {
          setformvi(res);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(e => {
        setLoading(false);
        console.log('error message ', e);
      });
  };

  const saveSign = () => {
    sign.current.saveImage();
  };

  const resetSign = () => {
    sign.current.resetImage();
    setimag('');
  };

  const _onSaveEvent = result => {
    setimag(`data:image/png;base64,${result.encoded}`);
  };
  const _onDragEvent = () => {
    console.log('dragged');
  };

  console.log('Signature-----------------', imag);
  const Submitform = () => {
    saveSign();
  };

  const addnew = () => {
    setModalVisible(false);
    if (newqu && typid) {
      console.log('sdfghjklyui=========', newqu);
      console.log('sdfghjklyui=========', typid);
      setadded([...added, {question_type_id: typid, question: newqu}]);
      console.log('add question', added);
    } else {
      alert(`${newqu}${typid}`);
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

    EditEmsQuestion({token: userData.api_token, data})
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
  const [inita, setinital] = useState(0);
  const incrementst = () => {
    let y = 0;
    y = inita + 1;
    console.log(y);
    setinital(y);
  };

  const Initialsview = ({item, index}) => (
    <View style={Styles.initialview1}>
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

          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                Styles.bulletview1,
                {backgroundColor: darkmd.payload ? 'white' : 'black'},
              ]}>
              <Text style={Styles.bulit}></Text>
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
      ) : null}
    </View>
  );

  const yesornoview = ({item}) => (
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
                {/* <RadioButton uncheckedColor={darkmd.payload?"white":colors.brown} color={darkmd.payload?"white":colors.brown} /> */}
                <Icon1
                  name={'checkbox-blank-outline'}
                  size={20}
                  color={'black'}
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
                {/* <RadioButton uncheckedColor={darkmd.payload?"white":colors.brown} color={darkmd.payload?"white":colors.brown} /> */}
                <Icon1
                  name={'checkbox-blank-outline'}
                  size={20}
                  color={'black'}
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

  const treatmentcon = ({item}) => (
    <View style={Styles.initialview1}>
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
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                Styles.bulletview,
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
      ) : null}
    </View>
  );

  const signature = ({item}) => (
    <View>
      <View>
        {!item.question.includes('[SIGNATURE]') &&
        !item.question.includes('[Date]') ? (
          checkremv(item.id) == '00' ? (
            <View style={{flexDirection: 'row', width: wp(80)}}>
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
                  {item.question.split(':')[0]}
                </Label>
              </Item>

              <View style={{alignItems: 'flex-end', width: wp(10)}}>
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
            </View>
          ) : null
        ) : null}
        {/* {item.question=="Witness (in print)"?(
          checkremv(item.id)=="00"?(
          <View style={{flexDirection:'row',width:wp(80)}}>
            <Item
           
              style={{
                width: "100%",
                marginVertical: 10,
                borderBottomColor: "black"
              }}
            >
              <Label
                style={{
                  fontSize: 14,
                  color: "#797979",
                }}
              >
                Witness (in print): 
              </Label>
             
            </Item>
            <View style={{alignItems:"flex-end",width:wp(10)}}>
                  <TouchableOpacity onPress={() => {
                
                Alert.alert(
                  "Are you sure?",
                  "You want to remove this from form?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "Remove",
                      onPress: () => setremov([...remov, item.id]),
                      style: "destructive",
                    },
                  ],
                  { cancelable: false }
                );
              }}>
  <Cross name="circle-with-cross" color={darkmd.payload?"white":"red"} size={20}/>
  </TouchableOpacity>
  </View>
  </View>):null):null}
         */}

        {item.question.includes('[SIGNATURE]') ? (
          <View>
            <View style={{width: wp(90), height: hp(30), alignSelf: 'center'}}>
              <Text
                style={[
                  Styles.textinitials1,
                  {color: darkmd.payload ? 'white' : 'black'},
                ]}>
                {item.question.split(':')[0]}
              </Text>
              {/* <SignatureCapture
                      style={[{flex:1},Styles.signature]}
                      ref={sign}
                      onSaveEvent={_onSaveEvent}
                      onDragEvent={_onDragEvent}
                      saveImageFileInExtStorage={true}
                      showNativeButtons={false}
                      showTitleLabel={false}
                      backgroundColor="gray"
                      strokeColor="black"
                      minStrokeWidth={4}
                      maxStrokeWidth={4}
                      viewMode={"portrait"}
                      
                      /> */}
              <View
                style={{
                  width: wp(90),
                  backgroundColor: darkmd.payload ? 'white' : 'gray',
                  height: hp(26),
                }}></View>
            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>
              {/* <TouchableHighlight style={[Styles.buttonStyle,{backgroundColor: imag?"green":"#eeeeee",}]}
                          onPress={() => saveSign()} >
                          <Text style={{fontSize:16,color:"black",fontWeight:"bold"}}>Save</Text>
                      </TouchableHighlight> */}

              <View
                style={[
                  Styles.buttonStyle,
                  {backgroundColor: imag ? 'red' : '#eeeeee'},
                ]}>
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

  //   const extrquesradio = ({ item }) => (
  //       <View>
  //       <Text>{item.question}</Text>
  //           {item.question!="Have you been pregnant?"?(

  //           ):null}
  //       </View>
  //   )

  const extrques = ({item}) => (
    <View style={Styles.view2}>
      {item.question == 'Have you been pregnant?' ? (
        checkremv(item.id) == '00' ? (
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <View
                style={[
                  Styles.doted,
                  {backgroundColor: darkmd.payload ? 'white' : 'black'},
                ]}></View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: wp(90),
                  paddingHorizontal: 5,
                }}>
                <Text
                  style={[
                    Styles.radiodes1,
                    {color: darkmd.payload ? 'white' : 'black'},
                  ]}>
                  {item.question}
                </Text>
                {/* <TouchableOpacity onPress={() => {
                
                Alert.alert(
                  "Are you sure?",
                  "You want to remove this from form?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "Remove",
                      onPress: () => setremov([...remov, item.id]),
                      style: "destructive",
                    },
                  ],
                  { cancelable: false }
                );
              }}>
  <Cross name="circle-with-cross" color={darkmd.payload?"white":"red"} size={20}/>
  </TouchableOpacity> */}
              </View>
            </View>
            <View style={Styles.paranency}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={[
                    Styles.circle,
                    {borderColor: darkmd.payload ? 'white' : 'black'},
                  ]}></View>
                <Text
                  style={[
                    Styles.radiodes1,
                    {color: darkmd.payload ? 'white' : 'black'},
                  ]}>
                  C-section
                </Text>
              </View>
              <Icon1
                name={'checkbox-blank-outline'}
                size={20}
                color={'black'}
              />

              {/* <Checkbox
                  uncheckedColor={darkmd.payload ? 'white' : colors.brown}
                  color={darkmd.payload ? 'white' : colors.brown}
                /> */}
            </View>
            <View style={Styles.paranency}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={[
                    Styles.circle,
                    {borderColor: darkmd.payload ? 'white' : 'black'},
                  ]}></View>
                <Text
                  style={[
                    Styles.radiodes1,
                    {color: darkmd.payload ? 'white' : 'black'},
                  ]}>
                  Vaginal birth
                </Text>
              </View>
              <Icon1
                name={'checkbox-blank-outline'}
                size={20}
                color={'black'}
              />

              {/* <Checkbox
                  uncheckedColor={darkmd.payload ? 'white' : colors.brown}
                  color={darkmd.payload ? 'white' : colors.brown}
                /> */}
            </View>
          </View>
        ) : null
      ) : null}

      {item.question != 'Have you been pregnant?' ? (
        checkremv(item.id) == '00' ? (
          <View>
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
                    {/* <RadioButton  uncheckedColor={darkmd.payload?"white":colors.brown} color={darkmd.payload?"white":colors.brown}/> */}
                    <Icon1
                      name={'checkbox-blank-outline'}
                      size={20}
                      color={'black'}
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
                    {/* <RadioButton   uncheckedColor={darkmd.payload?"white":colors.brown} color={darkmd.payload?"white":colors.brown} /> */}
                    <Icon1
                      name={'checkbox-blank-outline'}
                      size={20}
                      color={'black'}
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
          </View>
        ) : null
      ) : null}
    </View>
  );

  return (
    <>
      <Header
        top={top}
        navigation={navigation}
        title="EMS +RF  PATIENT CONSENT FORM"
      />
      {formvi.message == 'Question Data' ? (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'ios' ? 30 : 0,
          }}
          style={[
            Styles.container,
            {backgroundColor: darkmd.payload ? '#111e25' : 'white'},
          ]}>
          <View>
            {loading ? (
              <ActivityIndicator
                size="large"
                color={darkmd.payload ? 'white' : colors.brown}
              />
            ) : null}

            <View style={{alignSelf: 'center'}}>
              {/* <View style={Styles.headingview}>
                  <Text
                    style={[
                      Styles.hitone,
                      {
                        color: darkmd.payload ? 'white' : colors.brown,
                        fontWeight: 'bold',
                        fontSize: 20,
                        letterSpacing: 0,
                      },
                    ]}>
                    HI
                  </Text>
                  <Text
                    style={[
                      Styles.hitone,
                      {
                        color: darkmd.payload ? 'white' : colors.brown,
                        fontWeight: 'bold',
                        fontSize: 20,
                        letterSpacing: 3,
                      },
                    ]}>
                    {' '}
                    TONE
                  </Text>
                </View> */}
              {/* <Text
                  style={[
                    Styles.hitone,
                    {
                      color: darkmd.payload ? 'white' : colors.brown,
                      fontWeight: 'normal',
                      fontSize: 14,
                    },
                  ]}>
                  HEIH INTENSITY Body SCULPTIN
                </Text> */}
              <Text
                style={[
                  Styles.hitone,
                  {
                    color: colors.black,
                    fontWeight: 'bold',
                    fontSize: 24,
                    textAlign: 'center',
                  },
                ]}>
                EMS +RF PATIENT CONSENT FORM
              </Text>
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={formvi.data}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <View>
                  {/* <Text>Question type {item.title}</Text> */}
                  {item.html_type == 'input' ? (
                    <View>
                      <FlatList
                        data={item.questions}
                        renderItem={Initialsview}
                        keyExtractor={(item, index) => item.id.toString()}
                      />

                      <View style={{alignItems: 'flex-end', width: wp(90)}}>
                        <TouchableOpacity
                          onPress={() => additemsinform(item.id)}>
                          <Add
                            name="md-add-circle"
                            color={darkmd.payload ? 'white' : 'black'}
                            size={40}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}
                  {item.html_type == 'radio' ? (
                    <View style={Styles.view2}>
                      <View style={Styles.aqview}>
                        <Text
                          style={[
                            Styles.aqtext,
                            {color: darkmd.payload ? 'white' : 'black'},
                          ]}>
                          {item.description}
                        </Text>
                      </View>
                      <FlatList
                        data={item.questions}
                        renderItem={yesornoview}
                        keyExtractor={item => item.id.toString()}
                      />
                      <View style={{alignItems: 'flex-end', width: wp(90)}}>
                        <TouchableOpacity
                          onPress={() => additemsinform(item.id)}>
                          <Add
                            name="md-add-circle"
                            color={darkmd.payload ? 'white' : 'black'}
                            size={40}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}
                  {/* {item.title == 'YesNo-(2)' ? (
                    <View style={Styles.view2}>
                      <View style={Styles.aqview}>
                        <Text
                          style={[
                            Styles.aqtext,
                            {color: darkmd.payload ? 'white' : 'black'},
                          ]}>
                          {item.description}
                        </Text>
                      </View>
                      <FlatList
                        data={item.questions}
                        renderItem={yesornoview}
                        keyExtractor={item => item.id.toString()}
                      />
                      <View style={{alignItems: 'flex-end', width: wp(90)}}>
                        <TouchableOpacity
                          onPress={() => additemsinform(item.id)}>
                          <Add
                            name="md-add-circle"
                            color={darkmd.payload ? 'white' : 'black'}
                            size={40}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}

                  {item.title == 'YesNo-(3)' ? (
                    <View style={Styles.view2}>
                      <View style={Styles.aqview}>
                        <Text
                          style={[
                            Styles.aqtext,
                            {color: darkmd.payload ? 'white' : 'black'},
                          ]}>
                          {item.description}
                        </Text>
                      </View>
                      <FlatList
                        data={item.questions}
                        renderItem={yesornoview}
                        keyExtractor={item => item.id.toString()}
                      />
                      <View style={{alignItems: 'flex-end', width: wp(90)}}>
                        <TouchableOpacity
                          onPress={() => additemsinform(item.id)}>
                          <Add
                            name="md-add-circle"
                            color={darkmd.payload ? 'white' : 'black'}
                            size={40}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}
                  {item.title == 'Yes Specify' ? (
                    <View style={Styles.view2}>
                      <View style={Styles.aqview}>
                        <Text
                          style={[
                            Styles.aqtext,
                            {color: darkmd.payload ? 'white' : 'black'},
                          ]}>
                          {item.description}
                        </Text>
                      </View>
                      <Text
                        style={[
                          Styles.input,
                          {
                            borderBottomColor: darkmd.payload
                              ? 'white'
                              : 'black',
                            borderBottomWidth: 2,
                          },
                        ]}></Text>
                    </View>
                  ) : null}

                  {item.title == 'Extra Question' ? (
                    <View>
                      <View style={Styles.aqview}>
                        <Text
                          style={[
                            Styles.aqtext,
                            {
                              color: darkmd.payload ? 'white' : 'black',
                              borderBottomColor: darkmd.payload
                                ? 'white'
                                : 'black',
                              borderBottomWidth: 2,
                              width: wp(58),
                            },
                          ]}>
                          {item.description}{' '}
                        </Text>
                      </View>
                      <FlatList
                        data={item.questions}
                        renderItem={extrques}
                        keyExtractor={item => item.id.toString()}
                      />
                      <View style={{alignItems: 'center', marginTop: 10}}>
                        <Text style={Styles.yesno1}>
                          *For the full range of contraindications, warnings,
                          and cautions, consult your treatment provider.
                        </Text>
                      </View>
                      <View style={{alignItems: 'flex-end', width: wp(90)}}>
                        <TouchableOpacity
                          onPress={() => additemsinform(item.id)}>
                          <Add
                            name="md-add-circle"
                            color={darkmd.payload ? 'white' : 'black'}
                            size={40}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}
                  {item.title == 'Initial-(2)' ? (
                    <View style={Styles.view2}>
                      <View style={Styles.aqview}>
                        <Text
                          style={[
                            Styles.aqtext,
                            {color: darkmd.payload ? 'white' : 'black'},
                          ]}>
                          {item.description}
                        </Text>
                      </View>
                      <FlatList
                        data={item.questions}
                        renderItem={treatmentcon}
                        keyExtractor={item => item.id.toString()}
                      />
                      <View style={{alignItems: 'flex-end', width: wp(90)}}>
                        <TouchableOpacity
                          onPress={() => additemsinform(item.id)}>
                          <Add
                            name="md-add-circle"
                            color={darkmd.payload ? 'white' : 'black'}
                            size={40}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null} */}
                  {item.html_type == 'checkbox' ? (
                    <View>
                      <View style={{alignItems: 'center', marginTop: 10}}>
                        <Text
                          style={[
                            Styles.yesno2,

                            {
                              alignSelf: 'flex-start',
                              fontSize: 14,
                              fontWeight: '600',
                              color: darkmd.payload ? 'white' : 'black',
                            },
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
  <Add name="md-add-circle" color="black" size={40}/>
  </TouchableOpacity>
  </View> */}
                    </View>
                  ) : null}
                </View>
              )}
            />

            {/* <View style={{width:wp(90),height:hp(30),backgroundColor:"white",marginBottom:20,borderWidth:1,borderColor:"black"}}>
   {console.log("signature image=====-========",imag)} */}
            {/* {imag?(
    <Image
       resizeMode="contain"
      source={ { uri:imag }}
      style={{width:100,height:100,borderWidth:3,borderColor:"black"}}
    />
  
  ):null} */}
            <View style={{height: Platform.OS === 'ios' ? 20 : 0}} />
            {remov.length > 0 || added.length > 0 ? (
              <RButton
                title="Submit Changes"
                onPress={() => {
                  Alert.alert(
                    'Are you sure?',
                    'You want to save changes?',
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
                <ActivityIndicator
                  size="large"
                  color={darkmd.payload ? 'white' : colors.brown}
                />
              </View>
            </Modal>

            <Modal
              animationType="fade"
              transparent={true}
              visible={isModalVisible}>
              <View
                style={{
                  height: hp(40),
                  width: wp(85),
                  borderWidth: 0,
                  borderRadius: wp(3),
                  alignSelf: 'center',
                  marginTop: 70,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2,
                  backgroundColor: darkmd.payload ? '#202d34' : 'white',
                }}>
                <TouchableOpacity
                  onPress={additem}
                  style={{
                    alignItems: 'flex-end',
                    marginTop: 10,
                    marginRight: 10,
                  }}>
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
                <View
                  style={{
                    width: wp(75),
                    alignSelf: 'center',
                    marginTop: wp(10),
                  }}>
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

            <Modal visible={pickIt} transparent={true}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  backgroundColor: '#00000088',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    width: '100%',
                    backgroundColor: colors.brown,
                    paddingBottom: bottom,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      paddingVertical: 5,
                      flexDirection: 'row',
                      paddingHorizontal: wp(2),
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: colors.white,
                        fontWeight: 'bold',
                        fontSize: 17,
                      }}
                      onPress={() => {
                        setPickIt(false);
                      }}>
                      CANCEL
                    </Text>
                    <Text
                      style={{
                        color: colors.white,
                        fontWeight: 'bold',
                        fontSize: 17,
                      }}
                      onPress={() => {
                        setPickIt(false);
                      }}>
                      OK
                    </Text>
                  </View>
                  <DatePicker
                    mode="date"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    textColor={colors.white}
                    date={new Date(date)}
                    onDateChange={dd => {
                      setDate(date2String(dd));
                    }}
                  />
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: darkmd.payload ? '#111e25' : 'white',
            justifyContent: 'center',
            alignItems: 'center',
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
              No Customer yet..
            </Text>
          )}
        </View>
      )}
    </>
  );
};
export default RFPatientEdit;
const Styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,

    margin: 10,
  },
  signature: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 1,
  },
  paranency: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: wp(70),
  },
  radiomainview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  radiodes: {
    fontSize: 12,
    width: wp(50),
    paddingLeft: 10,
  },
  radiodes1: {
    fontSize: 12,

    paddingLeft: 10,
  },
  yesno: {
    fontWeight: 'normal',
    fontSize: 12,
  },
  yesno1: {
    fontWeight: 'normal',
    fontSize: 12,

    textAlign: 'center',
  },
  yesno2: {
    fontWeight: 'normal',
    fontSize: 13,
  },
  doted: {
    width: 5,
    height: 5,
  },
  circle: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    width: 7,
    height: 7,
  },
  view2: {
    marginBottom: 10,
  },
  aqtext: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  aqview: {
    marginTop: 20,
  },
  bulletview: {
    width: 12,
    height: 12,
    borderRadius: 20,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  bulletview1: {
    width: 8,
    height: 8,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  bulit: {
    color: 'white',
    fontSize: 8,
  },
  textinitials: {
    fontSize: 14,
    fontWeight: 'bold',

    marginTop: 20,
  },
  textinitials1: {
    fontSize: 14,
    fontWeight: 'bold',

    marginBottom: 10,
  },
  inputview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  input1: {
    borderBottomWidth: 1,

    width: wp(78),
    color: 'black',
    height: hp(6),
  },
  input: {
    width: wp(95),
    color: 'black',
    fontSize: 14,
  },
  input12: {
    width: wp(75),

    height: hp(15),
    fontSize: 14,
    alignSelf: 'center',
    borderWidth: 1,

    marginTop: 5,
  },
  text1: {
    fontSize: 12,
    fontWeight: 'normal',

    width: wp(87),
  },
  initialview1: {
    marginTop: 10,
    paddingLeft: 5,
  },
  headingview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  hitone: {
    alignSelf: 'center',
    marginTop: 5,
  },
});
