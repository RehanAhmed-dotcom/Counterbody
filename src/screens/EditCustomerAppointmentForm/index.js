import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Addsignaturesofallforms,
  customerAppointmentviewform,
  submitappointmentanswer,
} from '../ApiCountoryBody';
import {Icon, Input, Item, Label} from 'native-base';
import React, {createRef, useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import DatePicker from 'react-native-date-picker';
import Header from '../../components/HeaderWithBack';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import LogoCb from '../../components/LogoCB';
import RButton from '../../components/RoundedButton';
import {RadioButton} from 'react-native-paper';
import SignatureCapture from 'react-native-signature-capture';
import colors from '../../constants/colors';
import {date2String} from '../../lib/utilts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const EditCustomerAppointmentForm = ({navigation, route}) => {
  const {top, bottom} = useSafeAreaInsets();
  const [sigid, setsigid] = useState('');
  const [sigcod, setsigcod] = useState('');
  const [formvi, setformvi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [date, setDate] = useState(date2String(new Date()));
  const [date1, setDate1] = useState(date2String(new Date()));
  const {darkmd} = useSelector(({DARK}) => DARK);
  const [pickIt, setPickIt] = useState(false);
  const [imag, setimag] = useState('');
  const [fdate, setfdate] = useState('');
  const [fdatea, setfdatea] = useState('');
  const dispatch = useDispatch();
  const {customerId} = route.params;
  const {userData} = useSelector(({USER}) => USER);
  const [chsig, setchsig] = useState('0');
  const sign = createRef();
  const reset = () => {
    setchsig('1');
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
    console.log('registration start');
    const data = new FormData();
    data.append('customer_id', customerId);
    console.log('data,,,,,', data);

    customerAppointmentviewform({Auth: userData.api_token}, data)
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

  const [question, setquestion] = useState([]);

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
    // setimag('');
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

  const assform = () => {
    if (question.length > 0) {
      Submitform();
      saveSign();
    } else {
      saveSign();
    }
  };

  const Signatureadd = (rtar, sid) => {
    if (rtar) {
      console.log(
        '11111-----111111111',
        `data:image/png;base64,${rtar.encoded}`,
      );
      let formname = 'appointment';
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

  const Submitform = () => {
    setLoading1(true);

    if (question.length > 0) {
      console.log('registration start');
      const data = {
        customer_id: customerId,
        questions: question,
      };

      console.log('data,,{{{{{{{{{{}}}}}}}}}},,,', data);

      console.log('Token,,,,,', userData.api_token);

      submitappointmentanswer({token: userData.api_token, data})
        .then(res => {
          console.log('Signup   respone.........ooo.', res);
          // setLoading1(false);
          if ((res.message = 'Customer Data saved successfully')) {
            navigation.goBack();
            setLoading1(false);
          }
        })
        .catch(error => {
          console.log('Error Message', error.response.data.message);
          setLoading1(false);
        });
    } else {
      setLoading1(false);
      navigation.goBack();
    }
  };

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

  const datesetofform = () => {
    let ry = '';
    ry = date;
    additems(fdate, ry, fdatea);
  };

  const pictures = ({item}) => (
    <View style={Style.initialview1}>
      <View style={{flexDirection: 'row'}}>
        <View style={Style.bulletview1}>
          <Text style={Style.bulit}></Text>
        </View>
        <Text> </Text>
        <Text style={Style.text2}>{item.question}</Text>
      </View>
      <View style={Style.inputview}>
        <Text style={Style.textinitials}> Initials: </Text>
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
          style={Style.input1}></TextInput>
      </View>
    </View>
  );

  const Consentform = ({item}) => (
    <View>
      <View style={Style.initialview1}>
        <View style={{flexDirection: 'row'}}>
          <View style={Style.bulletview1}>
            <Text style={Style.bulit}></Text>
          </View>
          <Text> </Text>
          <Text style={Style.text2}>{item.question}</Text>
        </View>
        <View style={Style.inputview}>
          <Text style={Style.textinitials}> Initials: </Text>
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
            style={Style.input1}></TextInput>
        </View>
      </View>
    </View>
  );
  const Yesno = ({item}) => (
    <View>
      <View style={Style.radiomainview}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={Style.doted}></View>
          <Text style={Style.radiodes}>{item.question}</Text>
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
            {/* <RadioButton uncheckedColor={colors.brown} color={colors.brown}  
     status={checkuncheck(item.id)==""?item.answer=="yes"?'checked' : 'unchecked':checkuncheck(item.id)=="yes"?'checked' : 'unchecked'} 
    onPress={()=>additems(item.id,"yes",item.answer_id)}
    /> */}
            <Text style={Style.yesno}>Yes</Text>
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
            {/* <RadioButton  uncheckedColor={colors.brown} color={colors.brown} 
    status={checkuncheck(item.id)==""?item.answer=="no"?'checked' : 'unchecked':checkuncheck(item.id)=="no"?'checked' : 'unchecked'} 
    onPress={()=>additems(item.id,"no",item.answer_id)}
    /> */}
            <Text style={Style.yesno}>No</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const Expects = ({item}) => (
    <View>
      <View style={Style.initialview1}>
        <View style={{flexDirection: 'row'}}>
          <View style={Style.bulletview1}>
            <Text style={Style.bulit}></Text>
          </View>
          <Text> </Text>
          <Text style={Style.text2}>{item.question}</Text>
        </View>
        <View style={Style.inputview}>
          <Text style={Style.textinitials}> Initials: </Text>
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
            style={Style.input1}></TextInput>
        </View>
      </View>
    </View>
  );

  const signature = ({item}) => (
    <View>
      <View>
        {item.question == 'Date' ? (
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
        {item.question != 'Signature' &&
        item.question != 'Patient’s signature' &&
        item.question != 'Date' ? (
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
              {item.question}
            </Label>
            <Input
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
              <Text style={Style.textinitials1}> Patient’s signature: </Text>
              {chsig != 0 || item.answer == '' - 1 ? (
                <SignatureCapture
                  style={[{flex: 1}, Style.signature]}
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
                  Style.buttonStyle,
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
      <Header top={top} navigation={navigation} title="Fat Freezing " />
      {formvi.message == 'Question Data' ? (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: darkmd.payload ? '#111e25' : 'white',
            paddingHorizontal: 15,
          }}>
          {/* <LogoCb /> */}

          <FlatList
            data={formvi.data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View>
                <View style={{marginTop: 20}}></View>
                {item.title == 'First Initial' ? (
                  <View style={{marginTop: 10}}>
                    <Text style={Style.texthed}>TREATMENT CONSENT FORM</Text>

                    <FlatList
                      data={item.questions}
                      renderItem={Consentform}
                      keyExtractor={item => item.id.toString()}
                    />
                  </View>
                ) : null}
                {item.title == 'Initial' ? (
                  <View style={{marginTop: 10}}>
                    <Text style={Style.texthed1}>{item.description}</Text>
                    <FlatList
                      data={item.questions}
                      renderItem={Expects}
                      keyExtractor={item => item.id.toString()}
                    />
                  </View>
                ) : null}
                {item.title == 'YesNo' ? (
                  <View style={{marginTop: 10}}>
                    <Text style={Style.texthed1}>{item.description}</Text>
                    <FlatList
                      data={item.questions}
                      renderItem={Yesno}
                      keyExtractor={item => item.id.toString()}
                    />
                  </View>
                ) : null}
                {item.title == 'Pictures' ? (
                  <View style={{marginTop: 10}}>
                    <Text style={Style.texthed1}>{item.description}</Text>
                    <FlatList
                      data={item.questions}
                      renderItem={pictures}
                      keyExtractor={item => item.id.toString()}
                    />
                  </View>
                ) : null}
                {item.title == 'Signature' ? (
                  <View>
                    <View style={{alignItems: 'center', marginTop: 10}}>
                      <Text style={Style.texthed1}>{item.description}</Text>
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
          <View style={{alignSelf: 'center', marginTop: 10, marginBottom: 20}}>
            <Text style={Style.text2}>
              As with most medical procedures, there are risks and side effects.
              These have been explained to me in detail. I have read the above
              information, and I give my consent to be treated with this
              Cryolipolysis procedure.
            </Text>
          </View>
          <RButton title="Submit" onPress={assform} />
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
              No Form yet Add..
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
export default EditCustomerAppointmentForm;
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
    color: 'black',
    marginBottom: 10,
  },
  yesno: {
    fontWeight: 'normal',
    fontSize: 12,
    color: 'black',
  },
  radiodes: {
    color: 'black',
    fontSize: 12,
    width: wp(50),
    paddingLeft: 10,
  },
  doted: {
    backgroundColor: 'black',
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
    color: '#bd9d9e',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  texthed1: {
    color: '#bd9d9e',
    fontSize: 14,
    fontWeight: 'bold',
  },
  input1: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: wp(78),
    color: 'black',
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
  text2: {
    fontSize: 12,
    fontWeight: 'normal',
    color: 'black',
    width: wp(87),
  },
  bulit: {
    color: 'white',
    fontSize: 8,
  },
  bulletview1: {
    backgroundColor: 'black',
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
