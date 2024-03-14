import {
  ActivityIndicator,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {Checkbox, RadioButton} from 'react-native-paper';
import {Item, Label} from 'native-base';
import React, {createRef, useEffect, useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {
  formquestion,
  formsubmit,
  rfpatientForm_ViewQuestion,
} from '../../screens/ApiCountoryBody';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import DatePicker from 'react-native-date-picker';
import Header from '../../components/HeaderWithBack';
import ICON from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../constants/colors';
import {date2String} from '../../lib/utilts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const RFPatient = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {userData} = useSelector(({USER}) => USER);
  const {top, bottom} = useSafeAreaInsets();
  const {darkmd} = useSelector(({DARK}) => DARK);
  const [date, setDate] = useState(date2String(new Date()));
  const [pickIt, setPickIt] = useState(false);
  const [sigid, setsigid] = useState('');
  const [sigcod, setsigcod] = useState('');

  const sign = createRef();
  const [imag, setimag] = useState('');

  const [formvi, setformvi] = useState([]);

  const [question, setquestion] = useState([]);
  // console.log("textinpt data",question);
  const additems = (id, ans) => {
    let ind = -1;
    let count = 0;
    if (question.length > 0) {
      // for(let y=0;y<question.length;y++)
      question.forEach(item => {
        if (item.question_id == id) {
          count = count + 1;
          ind = item.question_id;
          // setquestion([...question, {question_id:(id),answer:ans}])
          // console.log("textinpt data",question)
        }
      });
      if (count == 0) {
        setquestion([...question, {question_id: id, answer: ans}]);
        console.log('textinpt data', question);
      } else {
        // setquestion([...question, {question_id:(id),answer:ans}])
        console.log('textinpt data', ind);
        console.log('textinpt data', question);
        const newQuestion = question.find(quest => quest.question_id === ind);
        const index = question.findIndex(q => q.question_id === ind);
        const questionObject = {
          ...newQuestion,
          answer: ans,
        };
        console.log('index', index);

        let markers = [...question];
        markers[index] = questionObject;

        setquestion(markers);
      }
    } else {
      setquestion([...question, {question_id: id, answer: ans}]);
      console.log('textinpt data', question);
    }
  };
  // setquestion({...question, question:{quid:10,ans:10}});

  //     setquestion({...question,  questionid: {
  //       question: "a",
  //       answer: {
  //          fieldTwoOne: "b",
  //          fieldTwoTwo: "c"
  //          }
  //       },
  //  })

  const pic = require('../../images/logo.png');

  const checkuncheck = ids => {
    let y = '';
    let newQuestion = '';
    if (question.length > 0) {
      newQuestion = question.find(quest => quest.question_id === ids);
      // let rdi=newQuestion.answer;
      // y=rdi;
      if (newQuestion) {
        console.log(newQuestion.answer, '------');
        y = newQuestion.answer;
      }
    }

    return y;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // console.log('456789dfghjk');
      viewquestion();
    });

    return unsubscribe;
  }, [navigation]);

  const viewquestion = () => {
    setLoading(true);
    rfpatientForm_ViewQuestion({Auth: userData.api_token})
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

  const saveSign = () => {
    sign.current.saveImage();
  };
  console.log('----------RPAtient', formvi);
  const resetSign = () => {
    sign.current.resetImage();
    setimag('');
    // let markers=[...question];
    // const index = question.findIndex((q)=>q.question_id ===sigid)
    // console.log("signatur index",index)
    // if (index !== -1) {
    //   markers.splice(index, 1);
    //   setquestion(markers);
    // }
  };

  const _onSaveEvent = result => {
    setimag(`data:image/png;base64,${result.encoded}`);
    let y = [result.encoded];
    setsigcod(y);
  };
  const _onDragEvent = () => {
    console.log('dragged');
  };

  // console.log("Signature-----------------",imag);

  const Submitform = () => {
    // console.log("iddddddd",sigid)
    // saveSign()
    //   if(sigcod=="")
    //   {
    console.log('image base64', sigcod);
    let r = sigid;
    console.log('000000000000000000', r);
    setquestion([...question, {question_id: sigid, answer: sigcod}]);
    console.log('form data------=', question);
    setLoading(true);
    console.log('registration start');
    const data = {
      customer_id: 1,
      questions: question,
    };

    // const data=new FormData();
    // data.append('customer_id', 1);
    // question.forEach(item => {
    //   data.append("questions[]", item)
    // });

    // data.append('questions',[
    // question.forEach(item => {
    //   item
    //   console.log("answers,,,,,", item);
    //     })
    // ])
    console.log('data,,{{{{{{{{{{}}}}}}}}}},,,', data);

    console.log('Token,,,,,', userData.api_token);

    formsubmit({token: userData.api_token, data})
      .then(res => {
        console.log('Signup   respone.........ooo.', res);

        setLoading(false);
      })
      .catch(error => {
        console.log('Error Message', error);
        setLoading(false);
      });
  };
  // else{
  //   console.log("signature complete",sigcod)
  // }

  // }

  const [inita, setinital] = useState(0);
  const incrementst = () => {
    let y = inita + 1;
    setinital(y);
  };
  const Initialsview = ({item, index}) => (
    <View style={Styles.initialview1}>
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

  const yesornoview = ({item}) => (
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
          <Icon1 name={'checkbox-blank-outline'} size={20} color={'black'} />
          <Text
            style={[Styles.yesno, {color: darkmd.payload ? 'white' : 'black'}]}>
            Yes
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <RadioButton  uncheckedColor={darkmd.payload?"white":colors.brown} color={darkmd.payload?"white":colors.brown}  /> */}
          <Icon1 name={'checkbox-blank-outline'} size={20} color={'black'} />
          <Text
            style={[Styles.yesno, {color: darkmd.payload ? 'white' : 'black'}]}>
            No
          </Text>
        </View>
      </View>
    </View>
  );

  const treatmentcon = ({item}) => (
    <View style={Styles.initialview1}>
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
            {borderBottomColor: darkmd.payload ? 'white' : 'black'},
          ]}></Text>
      </View>
    </View>
  );

  const extrques = ({item}) => (
    <View style={Styles.view2}>
      {item.question == 'Have you been pregnant?' ? (
        <View style={{}}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
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
            <Text
              style={[
                Styles.radiodes1,
                {color: darkmd.payload ? 'white' : 'black'},
              ]}>
              {item.question}
            </Text>
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
            <Icon1 name={'checkbox-blank-outline'} size={20} color={'black'} />

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
            <Icon1 name={'checkbox-blank-outline'} size={20} color={'black'} />

            {/* <Checkbox
                uncheckedColor={darkmd.payload ? 'white' : colors.brown}
                color={darkmd.payload ? 'white' : colors.brown}
              /> */}
          </View>
        </View>
      ) : null}
      {item.question != 'Have you been pregnant?' ? (
        <View>
          <View>
            <View style={Styles.radiomainview}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                  {/* <RadioButton  uncheckedColor={darkmd.payload?"white":colors.brown} color={darkmd.payload?"white":colors.brown}  /> */}
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
      ) : null}
    </View>
  );

  const signature = ({item}) => (
    <View>
      <View>
        {!item.question.includes('[SIGNATURE]') &&
        !item.question.includes('[DATE]') ? (
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
        ) : null}

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
                      // onChangeText={(text)=>{additems(item.id,text)}}
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
                      color: darkmd.payload ? 'white' : 'black',
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
                    color: darkmd.payload ? 'white' : 'black',
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
                  color: darkmd.payload ? 'white' : 'black',
                  fontWeight: 'bold',
                  fontSize: 24,
                  textAlign: 'center',
                },
              ]}>
              EMS +RF PATIENT CONSENT FORM
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RFPatientEdit');
            }}
            activeOpacity={0.8}
            style={{
              position: 'absolute',
              top: 2,
              right: wp(5),
              zIndex: 5,
              backgroundColor: 'white',
              borderRadius: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 5,
              marginTop: 35,
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
              <ICON size={30} color={colors.black} name="md-pencil-sharp" />
            </View>
          </TouchableOpacity>
          <View style={{height: 40}} />
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={formvi.data}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <View>
                  {/* <Text>Question type {item.title}</Text> */}
                  {item.html_type == 'input' ? (
                    <FlatList
                      data={item.questions}
                      renderItem={Initialsview}
                      keyExtractor={(item, index) => item.id.toString()}
                    />
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
                            borderBottomWidth: 1,
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
                              borderBottomWidth: 2,
                              borderBottomColor: darkmd.payload
                                ? 'white'
                                : 'black',
                              width: wp(58),
                              color: darkmd.payload ? 'white' : 'black',
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
                        <Text
                          style={[
                            Styles.yesno1,
                            {color: darkmd.payload ? 'white' : '#999'},
                          ]}>
                          *For the full range of contraindications, warnings,
                          and cautions, consult your treatment provider.
                        </Text>
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
                    </View>
                  ) : null} */}
                  {item.html_type == 'checkbox' ? (
                    <View>
                      <View style={{alignItems: 'center', marginTop: 10}}>
                        <Text
                          style={[
                            Styles.yesno2,
                            {
                              fontSize: 16,
                              fontWeight: '600',
                              alignSelf: 'flex-start',
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
                    </View>
                  ) : null}
                </View>
              )}
            />
          </View>
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
              No Form yet Add..
            </Text>
          )}
        </View>
      )}
    </>
  );
};
export default RFPatient;
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
    color: 'black',
  },
  doted: {
    width: 5,
    height: 5,
  },
  circle: {
    borderWidth: 1,

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
    height: hp(6),
  },
  input: {
    width: wp(95),
    color: 'black',
    fontSize: 14,
  },
  text1: {
    fontSize: 12,
    fontWeight: 'normal',
    width: wp(87),
  },
  initialview1: {
    marginTop: 20,
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
