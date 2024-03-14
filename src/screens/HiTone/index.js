import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Addsignaturesofallforms,
  formquestion,
  formsubmit,
} from '../ApiCountoryBody';
import {Checkbox, RadioButton} from 'react-native-paper';
import {Icon, Input, Item, Label} from 'native-base';
import React, {createRef, useEffect, useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {date2String, devLogger, emailToUniqueString} from '../../lib/utilts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {log, sin} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';

import CheckBox from 'react-native-check-box';
import DatePicker from 'react-native-date-picker';
import Header from '../../components/HeaderWithBack';
import ICON from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import RButton from '../../components/RoundedButton';
import SignatureCapture from 'react-native-signature-capture';
import colors from '../../constants/colors';
import style from '../../screens/_Home/style';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// import style from 'screens/_Home/style';

const HiTone = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const {customerId} = route.params;
  const [fdate, setfdate] = useState('');
  const dispatch = useDispatch();
  const {userData} = useSelector(({USER}) => USER);
  const {darkmd} = useSelector(({DARK}) => DARK);

  const {top, bottom} = useSafeAreaInsets();

  const [date, setDate] = useState(date2String(new Date()));
  const [pickIt, setPickIt] = useState(false);
  const [sigid, setsigid] = useState('');
  const [sigcod, setsigcod] = useState('');
  console.log('my id of signature', sigid);
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
        y = newQuestion.answer;
      }
    }

    return y;
  };

  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    // console.log('456789dfghjk');
    viewquestion();
    // });

    // return unsubscribe;
  }, []);

  console.log('cc---', formvi);

  const viewquestion = () => {
    setLoading(true);
    formquestion({Auth: userData.api_token})
      .then(res => {
        console.log('Form Question signature id', JSON.stringify(res));
        if (res.message == 'Question Data') {
          setLoading(false);
          setformvi(res);
          // {!sigid?setsigid(item.id):null}
          let sgid = '';
          let dtid = '';

          let aray1 = [];
          let y = res.data;
          y.forEach(item => {
            let u = item.questions;

            u.forEach(item => {
              console.log('question for signature', item);
              let y = '-1';
              let t = item.id;
              if (true) {
                let yt = [...aray1, {question_id: t, answer: y}];
                aray1 = yt;

                console.log('sdfhjkertyuicvbnj', aray1);
              }
              if (item.question == 'Signature') {
                console.log('signature component', item);
                sgid = item.id;
                console.log(
                  'ppppppppppppppppp0000000-----------pppppppppppp',
                  item.id,
                );
              }
              if (item.question == 'Date') {
                dtid = item.id;
                console.log(
                  'ppppppppppppppppp0000000-----------ppppdatepp',
                  item.id,
                );
              }
            });
          });

          setfdate(dtid);
          setsigid(sgid);
          setquestion(aray1);

          console.log('===========my signature id', sgid);
        } else {
          setLoading(false);
        }
      })
      .catch(e => {
        setLoading(false);
        console.log('error message ', e);
      });
  };

  const assform = () => {
    if (question.length > 0) {
      Submitform();
      saveSign();
    } else {
      saveSign();
    }
  };

  const saveSign = () => {
    // let ty=Submitform()
    // console.log("response of signature and data",ty)
    // if(ty==true)
    // {
    if (sign.current != null) {
      console.log('1111111111111111');
      sign.current.saveImage();
    } else {
      setLoading1(false);
      navigation.goBack();
    }
  };

  const resetSign = () => {
    sign.current.resetImage();
  };

  const _onSaveEvent = result => {
    setimag(`data:image/png;base64,${result.encoded}`);
    console.log(result);
    setsigcod(result);
    console.log('===============', result.pathName);

    let rt = result;
    if (rt) {
      Signatureadd(rt);
    } else {
      setLoading1(false);
      console.log('==========================================');
    }
    // additems(sigid,rt)
  };
  const _onDragEvent = () => {
    console.log('dragged');
  };

  // console.log("Signature-----------------",imag);

  const datesetofform = () => {
    let ry = '';
    ry = date;
    additems(fdate, ry);
    return true;
  };

  const Signatureadd = (rtar, sid) => {
    if (rtar) {
      console.log(
        '11111-----111111111',
        `data:image/png;base64,${rtar.encoded}`,
      );
      let formname = 'hitone';
      let imagecod = rtar.encoded;
      const data = new FormData();
      data.append('customer_id', customerId);
      data.append('signature_id', sid);
      data.append('form_name', formname);
      data.append('image', imagecod);

      // rt.forEach(item => {
      //   item.pathName
      //     &&
      // data.append('image', {
      //         uri: yt.replace("file://", ""),
      //         type: 'image/jpeg',
      //         name: `image.jpg`,
      //       })
      // })
      console.log('999999999', rtar.pathName);
      console.log('--------hassan hi tones', data);
      Addsignaturesofallforms({Auth: userData.api_token}, data)
        .then(res => {
          console.log(
            'Signup   respone)))))))(((((((------------------)))))))..........',
            res,
          );
          // setresponse(res.message);

          if (res.status == 'success') {
            navigation.goBack();
            setLoading1(false);
          } else {
            setLoading1(false);
          }
        })
        .catch(error => {
          if (error.response.data.message == 'Image Not Found') {
            setLoading1(false);
            console.log('response from ', error.response.data.message);
          } else {
            setLoading1(false);
            console.log('Error Message-----', error);
          }
        });
    } else {
      console.log('---------no imageaddd---------');
    }
  };
  const Submitform = () => {
    let y = datesetofform();
    console.log(y);
    setLoading2(true);
    console.log(fdate);
    console.log(date);

    console.log(question);

    if (question.length > 0) {
      console.log('registration start');
      const data = {
        customer_id: customerId,
        questions: question,
      };

      console.log('data,,{{{{{{{{{{}}}}}}}}}},,,', data);

      console.log('Token,,,,,', userData.api_token);

      formsubmit({token: userData.api_token, data})
        .then(res => {
          setLoading2(false);
          navigation.goBack();
          console.log('Signup   respone.........ooo.', res);
          // if(res.message="Customer Data saved successfully")
          // {
          // }
          // setLoading1(false)
          console.log('333333333333333333333');
        })
        .catch(error => {
          console.log('Error Message', error);
          setLoading2(false);
        });
    } else {
      setLoading2(false);
      navigation.goBack();
    }

    // setLoading1(false);
    // return y
  };

  const Initialsview = ({item, index}) => (
    <View style={Styles.initialview1}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            Styles.bulletview1,
            {backgroundColor: darkmd.payload ? 'white' : 'white'},
          ]}>
          <Text
            style={[
              Styles.bulit,
              {color: darkmd.payload ? 'white' : 'white'},
            ]}></Text>
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
        <TextInput
          onChangeText={text => {
            additems(item.id, text);
          }}
          style={[
            Styles.input1,
            {
              color: darkmd.payload ? 'white' : 'black',
              borderBottomColor: darkmd.payload ? 'white' : 'black',
            },
          ]}></TextInput>
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
          {/* <RadioButton
            uncheckedColor={darkmd.payload ? 'white' : colors.brown}
            color={darkmd.payload ? 'white' : colors.brown}
            status={checkuncheck(item.id) == 'yes' ? 'checked' : 'unchecked'}
            onPress={() => additems(item.id, 'yes')}
          /> */}
          <Icon1
            name={
              checkuncheck(item.id) == 'yes'
                ? 'checkbox-marked'
                : 'checkbox-blank-outline'
            }
            size={20}
            color={'black'}
            onPress={() => additems(item.id, 'yes')}
          />
          <Text
            style={[Styles.yesno, {color: darkmd.payload ? 'white' : 'black'}]}>
            Yes
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon1
            name={
              checkuncheck(item.id) == 'no'
                ? 'checkbox-marked'
                : 'checkbox-blank-outline'
            }
            size={20}
            color={'black'}
            onPress={() => additems(item.id, 'no')}
          />
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
        <TextInput
          onChangeText={text => {
            additems(item.id, text);
          }}
          style={[
            Styles.input1,
            {
              color: darkmd.payload ? 'white' : 'black',
              borderBottomColor: darkmd.payload ? 'white' : 'black',
            },
          ]}></TextInput>
      </View>
    </View>
  );

  const extrques = ({item}) => (
    <View style={Styles.view2}>
      {item.question == 'Have you been pregnant?' ? (
        <View style={{flex: 1}}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <View
              style={[
                Styles.doted,
                {backgroundColor: darkmd.payload ? 'white' : 'black'},
              ]}></View>
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
            <Icon1
              name={
                checkuncheck(item.id) == 'csection'
                  ? 'checkbox-marked'
                  : 'checkbox-blank-outline'
              }
              size={20}
              color={'black'}
              onPress={() => additems(item.id, 'csection')}
            />
            {/* <Checkbox
              uncheckedColor={darkmd.payload ? 'white' : colors.brown}
              color={darkmd.payload ? 'white' : colors.brown}
              status={
                checkuncheck(item.id) == 'csection' ? 'checked' : 'unchecked'
              }
              onPress={() => {
                additems(item.id, 'csection');
              }}
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
              name={
                checkuncheck(item.id) == 'Vaginal'
                  ? 'checkbox-marked'
                  : 'checkbox-blank-outline'
              }
              size={20}
              color={'black'}
              onPress={() => additems(item.id, 'Vaginal')}
            />
            {/* <Checkbox
              uncheckedColor={darkmd.payload ? 'white' : colors.brown}
              color={darkmd.payload ? 'white' : colors.brown}
              status={
                checkuncheck(item.id) == 'Vaginal' ? 'checked' : 'unchecked'
              }
              onPress={() => {
                additems(item.id, 'Vaginal');
              }}
            /> */}
          </View>
        </View>
      ) : null}
      {item.question != 'Have you been pregnant?' ? (
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
              <Icon1
                name={
                  checkuncheck(item.id) == 'yes'
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                }
                size={20}
                color={'black'}
                onPress={() => additems(item.id, 'yes')}
              />
              {/* <RadioButton
                uncheckedColor={darkmd.payload ? 'white' : colors.brown}
                color={darkmd.payload ? 'white' : colors.brown}
                status={
                  checkuncheck(item.id) == 'yes' ? 'checked' : 'unchecked'
                }
                onPress={() => additems(item.id, 'yes')}
              /> */}
              <Text
                style={[
                  Styles.yesno,
                  {color: darkmd.payload ? 'white' : 'black'},
                ]}>
                Yes
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon1
                name={
                  checkuncheck(item.id) == 'no'
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                }
                size={20}
                color={'black'}
                onPress={() => additems(item.id, 'no')}
              />
              {/* <RadioButton
                uncheckedColor={darkmd.payload ? 'white' : colors.brown}
                color={darkmd.payload ? 'white' : colors.brown}
                status={checkuncheck(item.id) == 'no' ? 'checked' : 'unchecked'}
                onPress={() => additems(item.id, 'no')}
              /> */}
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
      ) : null}
    </View>
  );

  const signature = ({item}) => (
    <View>
      <View>
        {item.question == 'Date' ? (
          <View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setPickIt(true);
              }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: 5,
              }}></TouchableOpacity>
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
                value={date}
                disabled
                selectionColor={colors.brown}
                style={{
                  fontSize: 16,
                  color: 'black',
                }}
                autoCapitalize="none"
                returnKeyType="next"
              />
            </Item>
          </View>
        ) : null}

        {item.question != 'Signature' &&
        item.question != 'Patient’s signature' &&
        item.question != 'Date' ? (
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
              onChangeText={text => {
                additems(item.id, text);
              }}
              selectionColor={colors.brown}
              style={{
                fontSize: 16,
                color: 'black',
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
              <SignatureCapture
                style={[{flex: 1}, Styles.signature]}
                ref={sign}
                // onChangeText={(text)=>{additems(item.id,text)}}
                onSaveEvent={result => {
                  setimag(`data:image/png;base64,${result.encoded}`);
                  console.log(result);
                  setsigcod(result);
                  console.log('===============', result.pathName);

                  let rt = result;
                  if (rt) {
                    Signatureadd(rt, item.id);
                  } else {
                    setLoading1(false);
                    console.log('==========================================');
                  }
                }}
                onDragEvent={_onDragEvent}
                saveImageFileInExtStorage={true}
                showNativeButtons={false}
                showTitleLabel={false}
                backgroundColor={darkmd.payload ? 'white' : 'gray'}
                strokeColor="black"
                minStrokeWidth={4}
                maxStrokeWidth={4}
                viewMode={'portrait'}
              />
            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>
              {/* <TouchableHighlight style={[Styles.buttonStyle,{backgroundColor: imag?"green":"#eeeeee",}]}
                        onPress={() => saveSign()} >
                        <Text style={{fontSize:16,color:"black",fontWeight:"bold"}}>Save</Text>
                    </TouchableHighlight> */}

              <TouchableHighlight
                style={[
                  Styles.buttonStyle,
                  {backgroundColor: imag ? 'red' : '#eeeeee'},
                ]}
                onPress={() => resetSign()}>
                <Text
                  style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                  Reset
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );

  return (
    <>
      <Header top={top} navigation={navigation} title="EMS" />
      {formvi.message == 'Question Data' ? (
        <>
          <ScrollView>
            <View
              style={[
                Styles.container,
                {backgroundColor: darkmd.payload ? '#111e25' : 'white'},
              ]}>
              <View style={{alignSelf: 'center'}}>
                <Text
                  style={[
                    Styles.hitone,
                    {
                      color: darkmd.payload ? 'white' : 'black',
                      fontWeight: 'bold',
                      fontSize: 24,
                    },
                  ]}>
                  EMS TREATMENT
                </Text>
              </View>

              {/* <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("EditHiTone");
                    }}
                    activeOpacity={0.8}
                    style={{
                      position: "absolute",
                      top: 2,
                      right: wp(5),
                      zIndex: 5,
                      backgroundColor:'white',
                      borderRadius:20,
                      elevation:5,
                      marginTop:20,
                      marginLeft:10
                    }}
                  >
                    <View
                      style={{
                        borderRadius: wp(11 / 2),
                        width: wp(11),
                        height: wp(11),
                        justifyContent: "center",
                        alignItems: "center",
                      
                      }}
                    >
                      <ICON
                        size={30}
                        color={colors.brown}
                        name="md-pencil-sharp"
                      />
                    </View>
                  </TouchableOpacity> */}

              <FlatList
                showsVerticalScrollIndicator={false}
                data={formvi.data}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <View>
                    {/* <Text>Question type {item.title}</Text> */}
                    {item.title == 'First Initials' ? (
                      <FlatList
                        data={item.questions}
                        renderItem={Initialsview}
                        keyExtractor={(item, index) => item.id.toString()}
                      />
                    ) : null}
                    {item.title == 'Yes and No' ? (
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
                        <FlatList
                          data={item.questions}
                          keyExtractor={item => item.id.toString()}
                          renderItem={({item}) => (
                            <TextInput
                              multiline={true}
                              onChangeText={text => {
                                additems(item.id, text);
                              }}
                              numberOfLines={3}
                              underlineColorAndroid={
                                darkmd.payload ? 'white' : 'black'
                              }
                              require={true}
                              style={Styles.input}></TextInput>
                          )}
                        />
                      </View>
                    ) : null}

                    {item.title == 'Extra Question' ? (
                      <View>
                        <View style={Styles.aqview}>
                          <Text
                            style={[
                              Styles.aqtext,
                              {
                                borderBottomColor: darkmd.payload
                                  ? 'white'
                                  : 'black',
                                borderBottomWidth: 2,
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
                          <Text style={Styles.yesno1}>
                            *For the full range of contraindications, warnings,
                            and cautions, consult your treatment provider.
                          </Text>
                        </View>
                      </View>
                    ) : null}
                    {item.title == 'Treatment considerations' ? (
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
                    ) : null}
                    {item.title == 'Signature' ? (
                      <View>
                        <View style={{alignItems: 'center', marginTop: 10}}>
                          <Text
                            style={[
                              Styles.yesno2,
                              {color: darkmd.payload ? 'white' : 'black'},
                            ]}>
                            {item.description}
                          </Text>
                        </View>

                        <FlatList
                          data={item.questions}
                          renderItem={signature}
                          keyExtractor={item => item.id.toString()}
                        />
                        <View style={{alignItems: 'center', marginTop: 10}}>
                          <Text style={Styles.yesno1}>
                            *For the full range of possible adverse effects and
                            expected device-related treatment sequelae,consult
                            your treatment provider.
                          </Text>
                        </View>
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
          <View style={{backgroundColor: darkmd.payload ? '#111e25' : 'white'}}>
            <RButton title="Submit" onPress={assform} />
          </View>
        </>
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
      <Modal animationType="slide" transparent={true} visible={loading2}>
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
      <Modal animationType="slide" transparent={true} visible={loading1}>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            height: hp(100),
          }}>
          <ActivityIndicator size="large" color={colors.brown} />
        </View>
      </Modal>
    </>
  );
};
export default HiTone;
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
    color: '#999',
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
    width: 7,
    height: 7,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  bulit: {
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
    borderBottomColor: 'black',
    width: wp(78),

    height: hp(6),
  },
  input: {
    width: wp(95),
    color: 'black',
    fontSize: 14,
    borderBottomWidth: 0,
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
    backgroundColor: 'white',
  },
  hitone: {
    alignSelf: 'center',
    marginTop: 5,
  },
});
