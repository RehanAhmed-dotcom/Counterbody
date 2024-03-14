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
import {Checkbox, RadioButton} from 'react-native-paper';
import {Icon, Input, Item, Label} from 'native-base';
import React, {createRef, useEffect, useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {customerviewform, formsubmit} from '../ApiCountoryBody/index';
import {date2String, devLogger, emailToUniqueString} from '../../lib/utilts';
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CustomerForm = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {userData} = useSelector(({USER}) => USER);
  const {darkmd} = useSelector(({DARK}) => DARK);

  const {top, bottom} = useSafeAreaInsets();
  const {customerId} = route.params;

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
    console.log('registration start');
    const data = new FormData();
    data.append('customer_id', customerId);
    console.log('data,,,,,', data);

    customerviewform({Auth: userData.api_token}, data)
      .then(res => {
        console.log('Signup   respone..........', res);

        setformvi(res);

        setLoading(false);
      })
      .catch(error => {
        console.log('Error Message', error);
        setLoading(false);
      });
  };

  const saveSign = () => {
    sign.current.saveImage();
  };

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
    <View>
      {item.answer != '-1' ? (
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
            <View
              style={{
                borderColor: 'black',
                borderBottomWidth: 1,
                paddingTop: 10,
              }}>
              <Text
                style={[
                  Styles.input1,
                  {color: darkmd.payload ? 'white' : 'black'},
                ]}>
                {item.answer}
              </Text>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );

  const yesornoview = ({item}) => (
    <View>
      {item.answer != '-1' ? (
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
                uncheckedColor={colors.brown}
                color={colors.brown}
                status={item.answer == 'yes' ? 'checked' : 'unchecked'}
              /> */}
              <Icon1
                name={
                  item.answer == 'yes'
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                }
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
                uncheckedColor={colors.brown}
                color={colors.brown}
                status={item.answer == 'no' ? 'checked' : 'unchecked'}
              /> */}
              <Icon1
                name={
                  item.answer == 'no'
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                }
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
      ) : null}
    </View>
  );

  const treatmentcon = ({item}) => (
    <View>
      {item.answer != '-1' ? (
        <View style={Styles.initialview1}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                Styles.bulletview,
                {backgroundColor: darkmd.payload ? 'white' : 'black'},
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
            <View
              style={{
                borderColor: 'black',
                borderBottomWidth: 1,
                paddingTop: 10,
              }}>
              <Text
                style={[
                  Styles.input1,
                  {color: darkmd.payload ? 'white' : 'black'},
                ]}>
                {item.answer}
              </Text>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );

  const extrques = ({item}) => (
    <View style={Styles.view2}>
      {item.answer != '-1' ? (
        item.question == 'Have you been pregnant?' ? (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <View style={Styles.doted}></View>
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
                    {backgroundColor: darkmd.payload ? 'white' : 'black'},
                  ]}></View>
                <Text
                  style={[
                    Styles.radiodes1,
                    {color: darkmd.payload ? 'white' : 'black'},
                  ]}>
                  C-section
                </Text>
              </View>
              {/* <Checkbox
                status={item.answer == 'csection' ? 'checked' : 'unchecked'}
                uncheckedColor={colors.brown}
                color={colors.brown}
              /> */}
              <Icon1
                name={
                  item.answer == 'csection'
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                }
                size={20}
                color={'black'}
                // onPress={()=>setrd(1)}
              />
            </View>
            <View style={Styles.paranency}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={[
                    Styles.circle,
                    {backgroundColor: darkmd.payload ? 'white' : 'black'},
                  ]}></View>
                <Text
                  style={[
                    Styles.radiodes1,
                    {color: darkmd.payload ? 'white' : 'black'},
                  ]}>
                  Vaginal birth
                </Text>
              </View>
              {/* <Checkbox
                status={item.answer != 'csection' ? 'checked' : 'unchecked'}
                uncheckedColor={colors.brown}
                color={colors.brown}
              /> */}
              <Icon1
                name={
                  item.answer != 'csection'
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                }
                size={20}
                color={'black'}
                // onPress={()=>setrd(1)}
              />
            </View>
          </View>
        ) : null
      ) : null}
      {item.answer != '-1' ? (
        item.question != 'Have you been pregnant?' ? (
          <View>
            <View>
              <View style={Styles.radiomainview}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={[
                      Styles.doted,
                      {backgroundColor: darkmd.payload ? 'white' : 'black'},
                    ]}></View>
                  <Text
                    style={
                      (Styles.radiodes,
                      {color: darkmd.payload ? 'white' : 'black'})
                    }>
                    {item.question}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <RadioButton
                      uncheckedColor={colors.brown}
                      color={colors.brown}
                      status={item.answer == 'yes' ? 'checked' : 'unchecked'}
                    /> */}
                    <Icon1
                      name={
                        item.answer == 'yes'
                          ? 'checkbox-marked'
                          : 'checkbox-blank-outline'
                      }
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
                      uncheckedColor={colors.brown}
                      color={colors.brown}
                      status={item.answer == 'no' ? 'checked' : 'unchecked'}
                    /> */}
                    <Icon1
                      name={
                        item.answer == 'no'
                          ? 'checkbox-marked'
                          : 'checkbox-blank-outline'
                      }
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
          </View>
        ) : null
      ) : null}
    </View>
  );

  const signature = ({item}) => (
    <View>
      {item.answer != '-1' ? (
        item.question != 'Signature' ? (
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
                color: darkmd.payload ? 'white' : '#797979',
              }}>
              {item.question}
            </Label>
            <Input
              value={item.answer}
              editable={false}
              selectionColor={colors.brown}
              style={{
                fontSize: 16,
                color: darkmd.payload ? 'white' : 'black',
              }}
              returnKeyType={'done'}
            />
          </Item>
        ) : null
      ) : null}
      {item.question == 'Signature' ? (
        <View>
          <View style={{width: wp(90), height: hp(30), alignSelf: 'center'}}>
            <Text style={Styles.textinitials1}> Patient’s signature: </Text>

            {item.answer == '-1' ? (
              <View
                style={{
                  width: wp(90),
                  backgroundColor: 'gray',
                  height: hp(26),
                }}></View>
            ) : (
              <Image
                style={{width: wp(90), height: hp(26)}}
                source={{
                  uri: item.answer,
                }}
              />
            )}
          </View>
        </View>
      ) : null}
    </View>
  );

  return (
    <>
      <Header top={top} navigation={navigation} title="EMS" />

      {formvi.message == 'Question Data' ? (
        <ScrollView
          style={[
            Styles.container,
            {backgroundColor: darkmd ? '#111e25' : 'white'},
          ]}>
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
                {color: 'black', fontWeight: 'bold', fontSize: 24},
              ]}>
              EMS TREATMENT
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditCustomerForm', {customerId});
            }}
            activeOpacity={0.8}
            style={{
              position: 'absolute',
              top: 2,
              right: wp(5),
              zIndex: 5,
              backgroundColor: 'white',
              borderRadius: 20,
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
              <ICON size={30} color={colors.brown} name="md-pencil-sharp" />
            </View>
          </TouchableOpacity>
          <View style={{height: 30}} />
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
                      <Text style={Styles.aqtext}>{item.description}</Text>
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
                      <Text style={Styles.aqtext}>{item.description}</Text>
                    </View>
                    <View
                      style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                      }}>
                      <FlatList
                        data={item.questions}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) =>
                          item.answer != '-1' ? (
                            <Text style={Styles.input}>{item.answer}</Text>
                          ) : null
                        }
                      />
                    </View>
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
                ) : null}
                {item.title == 'Signature' ? (
                  <View>
                    <View style={{alignItems: 'center', marginTop: 10}}>
                      <Text style={Styles.yesno2}>{item.description}</Text>
                    </View>

                    <FlatList
                      data={item.questions}
                      renderItem={signature}
                      keyExtractor={item => item.id.toString()}
                    />
                    <View style={{alignItems: 'center', marginTop: 10}}>
                      <Text style={Styles.yesno1}>
                        *For the full range of possible adverse effects and
                        expected device-related treatment sequelae,consult your
                        treatment provider.
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
          {/* 
<RButton title="Submit" onPress={Submitform} /> */}
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
    </>
  );
};
export default CustomerForm;
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
    borderBottomColor: 'black',
    width: wp(78),
    color: 'black',
    height: hp(3),
  },
  input: {
    width: wp(95),
    color: 'black',
    fontSize: 14,
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
  },
  hitone: {
    alignSelf: 'center',
    marginTop: 5,
  },
});
