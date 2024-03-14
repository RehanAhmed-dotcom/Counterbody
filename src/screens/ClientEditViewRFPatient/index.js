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
  ClientViewRFSubmit,
  SubmitEditRFPAtient,
} from '../ApiCountoryBody';
import {Checkbox, RadioButton} from 'react-native-paper';
import {Icon, Input, Item, Label} from 'native-base';
import React, {createRef, useEffect, useRef, useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {date2String, devLogger, emailToUniqueString} from '../../lib/utilts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import DatePicker from 'react-native-date-picker';
import Header from '../../components/HeaderWithBack';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import RButton from '../../components/RoundedButton';
import SignatureCapture from 'react-native-signature-capture';
import colors from '../../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ClientEditViewRFPatient = ({navigation, route}) => {
  const fval = useRef(false);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [fdata, setfdata] = useState(false);
  const {customerId} = route.params;
  const dispatch = useDispatch();
  const {userData} = useSelector(({USER}) => USER);
  const {top, bottom} = useSafeAreaInsets();
  const [date, setDate] = useState(date2String(new Date()));
  const [date1, setDate1] = useState(date2String(new Date()));
  const [pickIt, setPickIt] = useState(false);
  const [sigid, setsigid] = useState('');

  const [fdate, setfdate] = useState('');
  const [fdatea, setfdatea] = useState('');
  const [chsig, setchsig] = useState('0');
  const reset = () => {
    setchsig('1');
  };

  const [sigcod, setsigcod] = useState('');

  const sign = createRef();
  const [imag, setimag] = useState('');

  const [userformvi, setuserformvi] = useState([]);
  const [useransformvi, setuseransformvi] = useState([]);

  const [formvi, setformvi] = useState([]);

  const [question, setquestion] = useState([]);
  // console.log("textinpt data",question);
  const additems = (id, ans, ansid) => {
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
        setquestion([
          ...question,
          {question_id: id, answer: ans, answer_id: ansid},
        ]);
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
      setquestion([
        ...question,
        {question_id: id, answer: ans, answer_id: ansid},
      ]);
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
  }, [navigation]);

  // const viewquestion = () => {
  //   setLoading(true)
  //   formquestion({Auth:userData.api_token}).then(res => {

  //   console.log("Form Question",res)
  //   if(res.message=="Question Data")
  //   {
  //     setLoading(false)
  //   setformvi(res);
  //   }
  //   else{
  //     setLoading(false)
  //   }
  //   }).catch(e => {
  //     setLoading(false)
  //     console.log('error message ', e);
  //   });
  //   }

  const viewquestion = () => {
    setLoading(true);
    console.log('registration start');
    const data = new FormData();
    data.append('customer_id', customerId);
    console.log('data,,,,,', data);

    ClientViewRFSubmit({Auth: userData.api_token}, data)
      .then(res => {
        console.log('Signup   respone..........', res);

        setformvi(res);
        let sgid = '';
        let ansgid = '';
        let dtid = '';
        let andid = '';
        let aray1 = [];
        let y = res.data;
        y.forEach(item => {
          if (item.title == 'First Initials') {
            let u = item.questions;
            // setuserformvi(...userformvi,{u});
            setuseransformvi(u);
            console.log('888888888888--------', item.questions);
          }

          let u = item.questions;
          u.forEach(item => {
            let y = '-1';
            let t = item.id;
            //   if(true)
            //   {
            //     let yt =[...aray1, {question_id:(t),answer:y}]
            //     aray1=yt

            // console.log("sdfhjkertyuicvbnj",aray1)
            //   }
            if (item.question == 'Signature') {
              sgid = item.id;
              ansgid = item.answer_id;
              console.log(
                'ppppppppppppppppp0000000-----------pppppppppppp',
                item.id,
              );
            }
            if (item.question == 'Date') {
              dtid = item.id;
              andid = item.answer_id;
              console.log(
                'ppppppppppppppppp0000000-----------ppppdatepp',
                item.id,
              );
            }
          });
        });

        setfdatea(andid);
        setfdate(dtid);
        setsigid(sgid);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error Message', error);
        setLoading(false);
      });
  };

  const Signatureadd = (rtar, sid) => {
    if (rtar) {
      console.log(
        '11111-----111111111',
        `data:image/png;base64,${rtar.encoded}`,
      );
      let formname = 'ems';
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
      console.log('--------hassan', data);
      Addsignaturesofallforms({Auth: userData.api_token}, data)
        .then(res => {
          console.log(
            'Signup   respone)))))))(((((((------------------)))))))..........',
            res,
          );
          // setresponse(res.message);

          if (res.status == 'success') {
            setLoading1(false);
            navigation.goBack();
          } else {
            setLoading1(false);
          }
        })
        .catch(error => {
          if (error.response.data.message == 'Image Not Found') {
            console.log('response from ', error.response.data.message);
          } else {
            setLoading1(false);
            console.log('Error Message-----', error);
          }
        });
    } else {
      setLoading1(false);
      console.log('---------no imageaddd---------');
    }
  };
  // console.log("Signature-----------------",imag);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     console.log("456789dfghjk")
  //     viewformquestion ();
  //     });

  //   return unsubscribe;
  // }, [navigation]);

  // if(userformvi)
  // {
  //   console.log("jjjjjjjjjjjjjjjjj--------",userformvi)
  // }
  // const viewformquestion = () => {
  //   setLoading(true)
  //   formquestion({Auth:userData.api_token}).then(res => {

  //   console.log("Form Question",res)

  //     setLoading(false)
  //     let y=res.data;
  //     y.forEach(item => {
  //       if(item.title=="First Initials")
  //       {
  //         let u=item.questions;
  //         // setuserformvi(...userformvi,{u});
  //         setuserformvi(u)
  //         console.log("888888888888--------",item.questions)
  //       }

  //     });

  //     // console.log("jjjjjjjjjjjjjjjjj--------",userformvi)

  //   }).catch(e => {
  //     setLoading(false)
  //     console.log('error message ', e);
  //   });
  //   }

  const Submitform = () => {
    setLoading1(true);
    if (question.length > 0) {
      console.log('form data------=', question);
      // setLoading(true);
      console.log('registration start');
      const data = {
        customer_id: customerId,
        questions: question,
      };

      console.log('data,,{{{{{{{{{{}}}}}}}}}},,,', data);

      console.log('Token,,,,,', userData.api_token);

      SubmitEditRFPAtient({token: userData.api_token, data})
        .then(res => {
          console.log('Signup   respone.........ooo.', res);
          if ((res.message = 'Customer Data saved successfully')) {
            console.log('22222222222222222');
            setLoading1(false);
            navigation.goBack();
          }

          // setLoading1(false)
        })
        .catch(error => {
          console.log('Error Message', error);
          setLoading1(false);
        });
      // return fval;
    } else {
      setLoading1(false);
      navigation.goBack();
    }
  };
  // else{
  //   console.log("signature complete",sigcod)
  // }

  // }

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
    // console.log("000000000000",sign.current)
    // console.log("response of signature and data",ty.current)
    if (sign.current != null) {
      console.log('1111111111111111');
      sign.current.saveImage();
    } else {
      navigation.goBack();
      setLoading1(false);
    }
  };

  const resetSign = () => {
    sign.current.resetImage();
    setimag('');
  };

  const _onSaveEvent = result => {
    setimag(`data:image/png;base64,${result.encoded}`);
    let y = [result.encoded];
    setsigcod(y);

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

  const datesetofform = () => {
    let ry = '';
    ry = date;
    additems(fdate, ry, fdatea);
  };

  const valuecheck = vids => {
    let y = '';
    if (question.length > 0) {
      const newQuestion = question.find(quest => quest.question_id === vids);
      const index = question.findIndex(q => q.question_id === vids);
      if (newQuestion) {
        y = newQuestion.answer;
      }
      return y;
    } else {
      return y;
    }
  };

  const Initialsview = ({item, index}) => (
    <View>
      <View style={Styles.initialview1}>
        <View style={{flexDirection: 'row'}}>
          <View style={Styles.bulletview1}>
            <Text style={Styles.bulit}></Text>
          </View>
          <Text> </Text>
          <Text style={Styles.text1}>{item.question}</Text>
        </View>
        <View style={Styles.inputview}>
          <Text style={Styles.textinitials}> Initials: </Text>
          <TextInput
            value={
              valuecheck(item.id) == ''
                ? item.answer == '-1'
                  ? null
                  : item.answer
                : valuecheck(item.id)
            }
            onChangeText={text => {
              additems(item.id, text, item.answer_id);
            }}
            style={Styles.input1}></TextInput>
        </View>
      </View>
    </View>
  );

  const yesornoview = ({item}) => (
    <View style={Styles.radiomainview}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={Styles.doted}></View>
        <Text style={Styles.radiodes}>{item.question}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <RadioButton
              uncheckedColor={colors.brown}
              color={colors.brown}
              status={
                checkuncheck(item.id) == ''
                  ? item.answer == 'yes'
                    ? 'checked'
                    : 'unchecked'
                  : checkuncheck(item.id) == 'yes'
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => additems(item.id, 'yes', item.answer_id)}
            /> */}
          <Icon1
            name={
              checkuncheck(item.id) == ''
                ? item.answer == 'yes'
                  ? 'checkbox-marked'
                  : 'checkbox-blank-outline'
                : checkuncheck(item.id) == 'yes'
                ? 'checkbox-marked'
                : 'checkbox-blank-outline'
            }
            size={20}
            color={'black'}
            onPress={() => additems(item.id, 'yes', item.answer_id)}
          />
          <Text style={Styles.yesno}>Yes</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <RadioButton
              uncheckedColor={colors.brown}
              color={colors.brown}
              status={
                checkuncheck(item.id) == ''
                  ? item.answer == 'no'
                    ? 'checked'
                    : 'unchecked'
                  : checkuncheck(item.id) == 'no'
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => additems(item.id, 'no', item.answer_id)}
            /> */}
          <Icon1
            name={
              checkuncheck(item.id) == ''
                ? item.answer == 'no'
                  ? 'checkbox-marked'
                  : 'checkbox-blank-outline'
                : checkuncheck(item.id) == 'no'
                ? 'checkbox-marked'
                : 'checkbox-blank-outline'
            }
            size={20}
            color={'black'}
            onPress={() => additems(item.id, 'no', item.answer_id)}
          />
          <Text style={Styles.yesno}>No</Text>
        </View>
      </View>
    </View>
  );

  const treatmentcon = ({item}) => (
    <View style={Styles.initialview1}>
      <View style={{flexDirection: 'row'}}>
        <View style={Styles.bulletview}>
          <View style={Styles.doted}></View>
        </View>
        <Text> </Text>
        <Text style={Styles.text1}>{item.question}</Text>
      </View>
      <View style={Styles.inputview}>
        <Text style={Styles.textinitials}> Initials: </Text>
        <TextInput
          value={
            valuecheck(item.id) == ''
              ? item.answer == '-1'
                ? null
                : item.answer
              : valuecheck(item.id)
          }
          onChangeText={text => {
            additems(item.id, text, item.answer_id);
          }}
          style={Styles.input1}></TextInput>
      </View>
    </View>
  );

  const extrques = ({item}) => (
    <View style={Styles.view2}>
      {item.question == 'Have you been pregnant?' ? (
        <View style={{flex: 1}}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <View style={Styles.doted}></View>
            <Text style={Styles.radiodes1}>{item.question}</Text>
          </View>
          <View style={Styles.paranency}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={Styles.circle}></View>
              <Text style={Styles.radiodes1}>C-section</Text>
            </View>
            <Icon1
              name={
                checkuncheck(item.id) == ''
                  ? item.answer == 'csection'
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                  : checkuncheck(item.id) == 'csection'
                  ? 'checkbox-marked'
                  : 'checkbox-blank-outline'
              }
              size={20}
              color={'black'}
              onPress={() => additems(item.id, 'csection', item.answer_id)}
            />
            {/* <Checkbox
                uncheckedColor={colors.brown}
                color={colors.brown}
                status={
                  checkuncheck(item.id) == ''
                    ? item.answer == 'csection'
                      ? 'checked'
                      : 'unchecked'
                    : checkuncheck(item.id) == 'csection'
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => {
                  additems(item.id, 'csection', item.answer_id);
                }}
              /> */}
          </View>
          <View style={Styles.paranency}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={Styles.circle}></View>
              <Text style={Styles.radiodes1}>Vaginal birth</Text>
            </View>
            <Icon1
              name={
                checkuncheck(item.id) == ''
                  ? item.answer == 'Vaginal'
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                  : checkuncheck(item.id) == 'Vaginal'
                  ? 'checkbox-marked'
                  : 'checkbox-blank-outline'
              }
              size={20}
              color={'black'}
              onPress={() => additems(item.id, 'Vaginal', item.answer_id)}
            />
            {/* <Checkbox
                uncheckedColor={colors.brown}
                color={colors.brown}
                status={
                  checkuncheck(item.id) == ''
                    ? item.answer == 'Vaginal'
                      ? 'checked'
                      : 'unchecked'
                    : checkuncheck(item.id) == 'Vaginal'
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => {
                  additems(item.id, 'Vaginal', item.answer_id);
                }}
              /> */}
          </View>
        </View>
      ) : null}
      {item.question != 'Have you been pregnant?' ? (
        <View style={Styles.radiomainview}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={Styles.doted}></View>
            <Text style={Styles.radiodes}>{item.question}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon1
                name={
                  checkuncheck(item.id) == ''
                    ? item.answer == 'yes'
                      ? 'checkbox-marked'
                      : 'checkbox-blank-outline'
                    : checkuncheck(item.id) == 'yes'
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                }
                size={20}
                color={'black'}
                onPress={() => additems(item.id, 'yes', item.answer_id)}
              />
              {/* <RadioButton
                  uncheckedColor={colors.brown}
                  color={colors.brown}
                  status={
                    checkuncheck(item.id) == ''
                      ? item.answer == 'yes'
                        ? 'checked'
                        : 'unchecked'
                      : checkuncheck(item.id) == 'yes'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => additems(item.id, 'yes', item.answer_id)}
                /> */}
              <Text style={Styles.yesno}>Yes</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon1
                name={
                  checkuncheck(item.id) == ''
                    ? item.answer == 'no'
                      ? 'checkbox-marked'
                      : 'checkbox-blank-outline'
                    : checkuncheck(item.id) == 'no'
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                }
                size={20}
                color={'black'}
                onPress={() => additems(item.id, 'no', item.answer_id)}
              />
              {/* <RadioButton
                  uncheckedColor={colors.brown}
                  color={colors.brown}
                  status={
                    checkuncheck(item.id) == ''
                      ? item.answer == 'no'
                        ? 'checked'
                        : 'unchecked'
                      : checkuncheck(item.id) == 'no'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => additems(item.id, 'no', item.answer_id)}
                /> */}
              <Text style={Styles.yesno}>No</Text>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );

  const signature = ({item}) => (
    <View>
      <View>
        {item.question.includes('[DATE]') ? (
          <View>
            {/* {savedate==1?additems(item.id,date):null} */}
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
                borderBottomColor: colors.brown,
              }}>
              <Label
                style={{
                  fontSize: 14,
                  //fontFamily: 'Nunito-Regular',
                  color: '#797979',
                }}>
                Date
              </Label>
              <Input
                value={
                  date == date1
                    ? item.answer != '-1'
                      ? item.answer
                      : null
                    : date
                }
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
        {!item.question.includes('[SIGNATURE]') &&
        !item.question.includes('[DATE]') ? (
          <Item
            floatingLabel
            style={{
              width: '100%',
              marginVertical: 10,
              borderBottomColor: 'black',
            }}>
            <Label
              style={{
                fontSize: 14,
                color: '#797979',
              }}>
              {item.question.split(':')[0]}
            </Label>
            <Input
              value={
                valuecheck(item.id) == ''
                  ? item.answer == '-1'
                    ? null
                    : item.answer
                  : valuecheck(item.id)
              }
              dataDetectorTypes="phoneNumber"
              onChangeText={text => {
                additems(item.id, text, item.answer_id);
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

        {item.question.includes('[SIGNATURE]') ? (
          <View>
            <View style={{width: wp(90), height: hp(30), alignSelf: 'center'}}>
              <Text style={Styles.textinitials1}> Patient’s signature: </Text>
              {chsig != 0 || item.answer == '' - 1 ? (
                <SignatureCapture
                  style={[{flex: 1}, Styles.signature]}
                  ref={sign}
                  // onChangeText={(text)=>{additems(item.id,text)}}
                  onSaveEvent={result => {
                    setimag(`data:image/png;base64,${result.encoded}`);
                    let y = [result.encoded];
                    setsigcod(y);

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
                  backgroundColor="gray"
                  strokeColor="black"
                  minStrokeWidth={4}
                  maxStrokeWidth={4}
                  viewMode={'portrait'}
                />
              ) : (
                <Image
                  style={{width: wp(90), height: hp(26)}}
                  source={{
                    uri: item.answer,
                  }}
                />
              )}
            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableHighlight
                style={[
                  Styles.buttonStyle,
                  {backgroundColor: imag ? 'red' : '#eeeeee'},
                ]}
                onPress={() => {
                  chsig != 0 ? resetSign() : reset();
                }}>
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
      <Header
        top={top}
        navigation={navigation}
        title="EMS +RF  PATIENT CONSENT FORM"
      />
      {formvi.message == 'Question Data' ? (
        <ScrollView style={Styles.container}>
          <View style={{alignSelf: 'center'}}>
            {/* <View style={Styles.headingview}>
                <Text
                  style={[
                    Styles.hitone,
                    {
                      color: colors.brown,
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
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 20,
                      letterSpacing: 3,
                    },
                  ]}>
                  {' '}
                  TONE
                </Text>
              </View>
              <Text
                style={[
                  Styles.hitone,
                  {color: 'black', fontWeight: 'normal', fontSize: 14},
                ]}>
                HEIH INTENSITY Body SCULPTIN
              </Text> */}
            <Text
              style={[
                Styles.hitone,
                {
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 24,
                  textAlign: 'center',
                },
              ]}>
              EMS +RF PATIENT CONSENT FORM
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
                      <Text style={Styles.aqtext}>{item.description}</Text>
                    </View>
                    <FlatList
                      data={item.questions}
                      renderItem={yesornoview}
                      keyExtractor={item => item.id.toString()}
                    />
                  </View>
                ) : null}

                {/* {item.title == 'Yes Specify' ? (
                  <View style={Styles.view2}>
                    <View style={Styles.aqview}>
                      <Text style={Styles.aqtext}>{item.description}</Text>
                    </View>
                    <FlatList
                      data={item.questions}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => (
                        <TextInput
                          value={
                            valuecheck(item.id) == ''
                              ? item.answer == '-1'
                                ? null
                                : item.answer
                              : valuecheck(item.id)
                          }
                          onChangeText={text => {
                            additems(item.id, text, item.answer_id);
                          }}
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
                          {borderBottomWidth: 2, width: wp(58)},
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
                        *For the full range of contraindications, warnings, and
                        cautions, consult your treatment provider.
                      </Text>
                    </View>
                  </View>
                ) : null}
                {item.title == 'Treatment considerations' ? (
                  <View style={Styles.view2}>
                    <View style={Styles.aqview}>
                      <Text style={[Styles.aqtext]}>{item.description}</Text>
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
                      <Text style={Styles.yesno2}>{item.description}</Text>
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

          {/* <View style={{width:wp(90),height:hp(30),backgroundColor:"white",marginBottom:20,borderWidth:1,borderColor:"black"}}>
   {console.log("signature image=====-========",imag)} */}
          {/* {imag?(
    <Image
       resizeMode="contain"
      source={ { uri:imag }}
      style={{width:100,height:100,borderWidth:3,borderColor:"black"}}
    />
  
  ):null} */}

          <RButton title="Submit" onPress={assform} />

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
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            marginBottom: 30,
            padding: wp(4),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.brown} />
          ) : (
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>
              No Customer yet..
            </Text>
          )}
        </View>
      )}
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
                  datesetofform();
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
    </>
  );
};
export default ClientEditViewRFPatient;
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
    color: 'black',
    fontSize: 12,
    width: wp(50),
    paddingLeft: 10,
  },
  radiodes1: {
    color: 'black',
    fontSize: 12,

    paddingLeft: 10,
  },
  yesno: {
    fontWeight: 'normal',
    fontSize: 12,
    color: 'black',
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
    color: 'black',
  },
  doted: {
    backgroundColor: 'black',
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
    backgroundColor: 'white',
    width: 12,
    height: 12,
    borderRadius: 20,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  bulletview1: {
    backgroundColor: 'black',
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
    color: 'black',
    marginTop: 20,
  },
  textinitials1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
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
    color: 'black',
    height: hp(6),
  },
  input: {
    width: wp(95),
    color: 'black',
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  text1: {
    fontSize: 12,
    fontWeight: 'normal',
    color: 'black',
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
