import {
  ActivityIndicator,
  FlatList,
  Modal,
  ProgressViewIOSComponent,
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
  formShapesubmit,
  formshapequestion,
} from '../ApiCountoryBody';
import {Checkbox, RadioButton} from 'react-native-paper';
import {Icon, Input, Item, Label} from 'native-base';
import React, {createRef, useEffect, useState} from 'react';
import {date2String, devLogger, emailToUniqueString} from '../../lib/utilts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import DatePicker from 'react-native-date-picker';
import Header from '../../components/HeaderWithBack';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import LogoCbShape from '../../components/LogoCbshape';
import RButton from '../../components/RoundedButton';
import SignatureCapture from 'react-native-signature-capture';
import colors from '../../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ShapeForm = ({navigation, route}) => {
  const {top, bottom} = useSafeAreaInsets();
  const [formvi, setformvi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [savedate, setsavedate] = useState();
  const [loading1, setLoading1] = useState(false);
  const {userData} = useSelector(({USER}) => USER);
  const [question, setquestion] = useState([]);
  const [question1, setquestion1] = useState([]);
  const {customerId} = route.params;
  const [date, setDate] = useState(date2String(new Date()));
  const [pickIt, setPickIt] = useState(false);
  const [fdate, setfdate] = useState('');
  const [sigid, setsigid] = useState('');
  const [sigcod, setsigcod] = useState('');
  const sign = createRef();
  const [imag, setimag] = useState('');

  const Submitform = () => {
    setLoading2(true);
    console.log(question);
    if (question.length > 0) {
      console.log('registration start');
      const data = {
        customer_id: customerId,
        questions: question,
      };

      console.log('data,,{{{{{{{{{{}}}}}}}}}},,,', data);

      console.log('Token,,,,,', userData.api_token);

      formShapesubmit({token: userData.api_token, data})
        .then(res => {
          setLoading2(false);
          navigation.goBack();
          console.log('Signup   respone.........ooo.', res);
        })
        .catch(error => {
          console.log('Error Message----------------', error);
          setLoading2(false);
        });
      // return true;
    } else {
      setLoading1(false);
      navigation.goBack();
    }

    // setLoading2(false);
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
      console.log('111111111111177777777777777777777111');
    }
  };

  const resetSign = () => {
    sign.current.resetImage();
  };

  const _onSaveEvent = result => {
    setimag(`data:image/png;base64,${result.encoded}`);
    console.log(result);
    console.log(result.pathName);
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

  const Signatureadd = (rtar, sid) => {
    if (rtar) {
      console.log(
        '11111-----111111111',
        `data:image/png;base64,${rtar.encoded}`,
      );
      let formname = 'cbshape';
      let imagecod = rtar.encoded;
      const data = new FormData();
      data.append('customer_id', customerId);
      data.append('signature_id', sid);
      data.append('form_name', formname);
      data.append('image', imagecod);

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
      setLoading1(false);
      console.log('---------no imageaddd---------');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // console.log('456789dfghjk');
      viewquestion();
    });

    return unsubscribe;
  }, [navigation]);

  if (question) {
    console.log('dfhjk', question);
  }

  const viewquestion = () => {
    setLoading(true);
    formshapequestion({Auth: userData.api_token})
      .then(res => {
        console.log('Form Question', res);
        if (res.message == 'Question Data') {
          setLoading(false);
          setformvi(res);

          let sgid = '';
          let dtid = '';
          let aray1 = [];
          let y = res.data;
          y.forEach(item => {
            let u = item.questions;

            u.forEach(item => {
              let y = '-1';
              let t = item.id;
              if (true) {
                let yt = [...aray1, {question_id: t, answer: y}];
                aray1 = yt;

                console.log('sdfhjkertyuicvbnj', aray1);
              }
              if (item.question == 'Signature') {
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

          console.log('===========', aray1);
        } else {
          setLoading(false);
        }
      })
      .catch(e => {
        setLoading(false);
        console.log('error message ', e);
      });
  };

  const additems = (id, ans) => {
    setsavedate();
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
  const [mt, setmt] = useState('0');
  const datesetofform = () => {
    console.log(fdate);
    console.log(date);
    let ry = '';
    ry = date;
    additems(fdate, ry);
    setmt('1');
  };

  const Questionans = ({item}) => (
    <View>
      <Text style={Styles.ques}>{item.question}</Text>
      <Text style={Styles.quesdes}>{item.answer}</Text>
    </View>
  );

  const yesno = ({item}) => (
    <View style={Styles.radiomainview}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={Styles.doted}></View>
        <Text style={Styles.radiodes}>{item.question}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <RadioButton  uncheckedColor={colors.brown} color={colors.brown}  status={checkuncheck(item.id)=="yes"?'checked' : 'unchecked'} onPress={()=>additems(item.id,"yes")}/> */}
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

          <Text style={Styles.yesno}>Yes</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <RadioButton
            uncheckedColor={colors.brown}
            color={colors.brown}
            status={checkuncheck(item.id) == 'no' ? 'checked' : 'unchecked'}
            onPress={() => additems(item.id, 'no')}
          /> */}
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
          <Text style={Styles.yesno}>No</Text>
        </View>
      </View>
    </View>
  );

  const initials = ({item}) => (
    <View style={Styles.initialview1}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={Styles.bulletview1}>
          <View style={Styles.doted}></View>
        </View>
        <Text> </Text>
        <Text style={Styles.text1}>{item.question}</Text>
      </View>
      <View style={Styles.inputview}>
        <Text style={Styles.textinitials}> Initialss: </Text>
        <TextInput
          onChangeText={text => {
            additems(item.id, text);
          }}
          style={Styles.input1}></TextInput>
      </View>
    </View>
  );

  const sinature = ({item}) => (
    <View>
      {item.question == 'Date' ? (
        <View>
          {/* {savedate==1?additems(item.id,date):null} */}

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setPickIt(true);
              datesetofform();
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
      <View>
        {item.question != 'Signature' && item.question != 'Date' ? (
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
              <Text style={Styles.textinitials1}> Patient’s signature: </Text>
              <SignatureCapture
                style={[{flex: 1}, Styles.signature]}
                ref={sign}
                // onChangeText={(text)=>{additems(item.id,text)}}
                onSaveEvent={result => {
                  setimag(`data:image/png;base64,${result.encoded}`);
                  console.log(result);
                  console.log(result.pathName);
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
            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>
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
      <Header top={top} navigation={navigation} title="Cavitation & RF" />
      {formvi.message == 'Question Data' ? (
        <>
          <ScrollView style={{flex: 1}}>
            <View style={Styles.container}>
              <LogoCbShape />
              <Text style={Styles.cbmaintxt}>
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
                          renderItem={Questionans}
                          keyExtractor={item => item.id.toString()}
                        />
                      </View>
                    ) : null}
                    {item.title == 'YesNo' ? (
                      <View>
                        <Text style={Styles.yesnohead}>{item.description}</Text>
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
            </View>
          </ScrollView>
          <View style={{backgroundColor: 'white'}}>
            <RButton title="Submit" onPress={assform} />
          </View>
        </>
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
              No Form yet Added..
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
                  setsavedate(1);
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
export default ShapeForm;
const Styles = StyleSheet.create({
  signature: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 1,
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
  text1: {
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
    backgroundColor: 'white',
    width: 12,
    height: 12,
    borderRadius: 20,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,

    margin: 10,
  },
  initialview1: {
    marginTop: 20,
    paddingLeft: 5,
  },
  yesnohead: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
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
  quesdes: {
    fontSize: 10,
    color: 'black',
  },
  ques: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
  },
  cbmaintxt: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  cbmaintxt1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  textinitials1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
});
