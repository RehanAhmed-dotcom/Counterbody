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
  Customerviewshapesubmitanswer,
  formShapesubmit,
} from '../ApiCountoryBody';
import {Icon, Input, Item, Label} from 'native-base';
import React, {createRef, useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import DatePicker from 'react-native-date-picker';
import Header from '../../components/HeaderWithBack';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import LogoCbShape from '../../components/LogoCbshape';
import RButton from '../../components/RoundedButton';
import {RadioButton} from 'react-native-paper';
import SignatureCapture from 'react-native-signature-capture';
import colors from '../../constants/colors';
import {date2String} from '../../lib/utilts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

const CustomerEditShapeForm = ({navigation, route}) => {
  const sign = createRef();
  const [sigid, setsigid] = useState('');
  const {top, bottom} = useSafeAreaInsets();
  const [formvi, setformvi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const {userData} = useSelector(({USER}) => USER);
  const {customerId} = route.params;
  const [question, setquestion] = useState([]);
  const [date, setDate] = useState(date2String(new Date()));
  const [date1, setDate1] = useState(date2String(new Date()));
  const [pickIt, setPickIt] = useState(false);
  const [fdate, setfdate] = useState('');
  const [fdatea, setfdatea] = useState('');
  const [imag, setimag] = useState('');
  const [chsig, setchsig] = useState('0');
  const reset = () => {
    setchsig('1');
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
    console.log('registration start');
    const data = new FormData();
    data.append('customer_id', customerId);
    console.log('data,,,,,', data);

    Customerviewshapesubmitanswer({Auth: userData.api_token}, data)
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
    // setsigcod(y)

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
    // console.log("iddddddd",sigid)
    // saveSign()
    //   if(sigcod=="")
    //   {
    // console.log("image base64",sigcod)
    // let r=sigid;
    // console.log("000000000000000000",r)
    // setquestion([...question, {question_id:sigid,answer:sigcod}])

    setLoading1(true);
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
          console.log('Signup   respone.........ooo.', res);
          // if(res.message="Customer Data saved successfully")
          // {

          //   setLoading1(false);
          // }

          // setLoading1(false)
        })
        .catch(error => {
          console.log('Error Message', error);
          setLoading1(false);
        });
    } else {
      setLoading1(false);
      navigation.goBack();
    }
  };

  const datesetofform = () => {
    let ry = '';
    ry = date;
    additems(fdate, ry, fdatea);
  };

  const renderItem = ({item}) => (
    <View>
      <Text style={Styles.ques}>What is ultrasonic cavitation? </Text>
      <Text style={Styles.quesdes}>
        The ultrasonic cavitation procedure is a non-invasive body contouring
        treatment which uses low-frequency ultrasound waves to flush fat from
        the body. The procedure is suitable for the reduction of cellulite and
        stubborn fat. It is not a weight-loss solution.
      </Text>
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
        <Text style={Styles.textinitials}> Initials: </Text>
        <TextInput
          value={
            valuecheck(item.id) == ''
              ? item.answer != '-1'
                ? item.answer
                : null
              : valuecheck(item.id)
          }
          onChangeText={text => {
            additems(item.id, text, item.answer_id);
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
              {item.question}
            </Label>
            <Input
              value={date ? date : item.answer == '-1' ? null : item.answer}
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
              {chsig != 0 || item.answer == '' - 1 ? (
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
      <Header top={top} navigation={navigation} title="Cavitation & RF" />
      {formvi.message == 'Question Data' ? (
        <ScrollView style={Styles.container}>
          <LogoCbShape />
          <Text style={Styles.cbmaintxt}>
            Cavitation and RF is a combination of Ultrasonic Cavitation and
            Radio Frequency Skin Tightening
          </Text>

          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={formvi.data}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <View>
                  {/* <View>
            <FlatList
        data={[1,2,3,4]}
        renderItem={renderItem}
        // keyExtractor={item => item.id}
        />
        </View> */}
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

      <View style={{backgroundColor: 'white'}}>
        <RButton title="Submit" onPress={assform} />
      </View>
    </>
  );
};
export default CustomerEditShapeForm;
const Styles = StyleSheet.create({
  textinitials1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
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
  container: {
    height: hp(100),
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
});
