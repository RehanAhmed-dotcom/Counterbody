import {
  ActivityIndicator,
  FlatList,
  Image,
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
import {
  LLLtviewsubmitanswer,
  customerAppointmentviewform,
  submitappointmentanswer,
} from '../ApiCountoryBody';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../../components/HeaderWithBack';
import ICON from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import LogoCb from '../../components/LogoCB';
import RButton from '../../components/RoundedButton';
import colors from '../../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ClientViewLLLT = ({navigation, route}) => {
  const {top, bottom} = useSafeAreaInsets();
  const [formvi, setformvi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const dispatch = useDispatch();
  const {customerId} = route.params;
  const {userData} = useSelector(({USER}) => USER);
  const {darkmd} = useSelector(({DARK}) => DARK);
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

    LLLtviewsubmitanswer({Auth: userData.api_token}, data)
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

  const [question, setquestion] = useState([]);

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

  const Submitform = () => {
    setLoading2(true);
    if (question.length > 0) {
      // saveSign()

      //   console.log("image base64",sigcod)
      //   let r=sigid;
      //   console.log("000000000000000000",r)
      //   setquestion([...question, {question_id:sigid,answer:sigcod}])
      // console.log("form data------=",question)
      // let sig="";

      //   sigcod.forEach(item => {
      //     item.path
      //       && data.append('image[]', {
      //           uri: item.path,
      //           type: 'image/jpeg',
      //           name: `image${Math.random()}.jpg`,
      //         })
      //       })

      setLoading2(true);
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
          if ((res.message = 'Customer Data saved successfully')) {
            navigation.goBack();
            setLoading1(false);
          }
        })
        .catch(error => {
          console.log('Error Message', error.response.data.message);
          setLoading2(false);
        });
    }

    setLoading1(false);
  };

  const pictures = ({item}) => (
    <View>
      {item.answer != '-1' ? (
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
            <Text style={Style.input1}>{item.answer}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );

  const Consentform = ({item}) => (
    <View>
      {item.answer != '-1' ? (
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
            <Text style={Style.input1}>{item.answer}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
  const procedure1 = ({item}) => (
    <View style={Style.initialview1}>
      <View style={{flexDirection: 'row'}}>
        {/* <View
          style={[
            Style.bulletview1,
            {backgroundColor: darkmd.payload ? 'white' : 'black'},
          ]}>
          <Text style={Style.bulit}></Text>
        </View> */}
        <Text> </Text>
        <Text
          style={[Style.text2, {color: darkmd.payload ? 'white' : 'black'}]}>
          {item.question}
        </Text>
      </View>
    </View>
  );

  const procedure = ({item}) => (
    <View style={Style.initialview1}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            Style.bulletview1,
            {bordercolor: darkmd.payload ? 'white' : 'black'},
          ]}>
          <Text style={Style.bulit}></Text>
        </View>
        <Text> </Text>
        <Text
          style={[Style.text2, {color: darkmd.payload ? 'white' : 'black'}]}>
          {item.question}
        </Text>
      </View>
    </View>
  );
  const Yesnocheck = ({item}) => (
    <View>
      {item.answer != '-1' ? (
        <View style={Style.radiomainview}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={Style.doted}></View>
            <Text style={Style.radiodes}>{item.question}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon1
                name={
                  item.answer == 'yes'
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                }
                size={20}
                color={'black'}
                onPress={() => additems(item.id, 'yes')}
              />
              {/* <RadioButton
                  uncheckedColor={colors.brown}
                  color={colors.brown}
                  status={item.answer == 'yes' ? 'checked' : 'unchecked'}
                  onPress={() => additems(item.id, 'yes')}
                /> */}
              {/* <Text style={Style.yesno}>Yes</Text> */}
            </View>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon1
                name={
                  item.answer == 'no'
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                }
                size={20}
                color={'black'}
                onPress={() => additems(item.id, 'no')}
              />
              <Text style={Style.yesno}>No</Text>
            </View> */}
          </View>
        </View>
      ) : null}
    </View>
  );

  const Yesno = ({item}) => (
    <View>
      {item.answer != '-1' ? (
        <View style={Style.radiomainview}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={Style.doted}></View>
            <Text style={Style.radiodes}>{item.question}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon1
                name={
                  item.answer == 'yes'
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                }
                size={20}
                color={'black'}
                onPress={() => additems(item.id, 'yes')}
              />
              {/* <RadioButton
                  uncheckedColor={colors.brown}
                  color={colors.brown}
                  status={item.answer == 'yes' ? 'checked' : 'unchecked'}
                  onPress={() => additems(item.id, 'yes')}
                /> */}
              <Text style={Style.yesno}>Yes</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon1
                name={
                  item.answer == 'no'
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                }
                size={20}
                color={'black'}
                onPress={() => additems(item.id, 'no')}
              />
              <Text style={Style.yesno}>No</Text>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );

  const Expects = ({item}) => (
    <View>
      {item.answer != '-1' ? (
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
            <Text style={Style.input1}>{item.answer}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );

  const signature = ({item}) => (
    <View>
      <View>
        {item.answer != '-1' ? (
          !item.question.includes('[SIGNATURE]') &&
          !item.question.includes('[DATE]') ? (
            <>
              <Text style={Style.text2}>{item.question}</Text>
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
                  {/* {item.question} */}
                </Label>
                <Input
                  editable={false}
                  value={item.answer}
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
            </>
          ) : null
        ) : null}

        {item.question.includes('[SIGNATURE]') ? (
          <View>
            <View style={{width: wp(90), height: hp(30), alignSelf: 'center'}}>
              <Text style={Style.textinitials1}>
                {item.question.split(':')[0]}
              </Text>

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
    </View>
  );

  return (
    <>
      <Header top={top} navigation={navigation} title="LLLT Fat Reduction" />
      {formvi.message == 'Question Data' ? (
        <ScrollView
          style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 15}}>
          {/* <LogoCb /> */}
          <View style={{height: 35}} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ClientEditViewLLLT', {customerId});
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
              <ICON size={30} color={colors.black} name="md-pencil-sharp" />
            </View>
          </TouchableOpacity>
          <View style={{marginTop: 10}}>
            <Text style={[Style.texthed, {color: 'black'}]}>
              LLLT Fat Reduction
            </Text>

            {/* <FlatList
                      data={item.questions}
                      renderItem={Consentform}
                      keyExtractor={item => item.id.toString()}
                    /> */}
          </View>
          <FlatList
            data={formvi.data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View>
                <View style={{marginTop: 20}}></View>

                {/* {item.title == 'Initial' ? (
                  <View style={{marginTop: 10}}>
                    <Text style={Style.texthed1}>{item.description}</Text>
                    <FlatList
                      data={item.questions}
                      renderItem={Expects}
                      keyExtractor={item => item.id.toString()}
                    />
                  </View>
                ) : null} */}
                {item.html_type == 'checkbox' ? (
                  <View style={{marginTop: 10}}>
                    <Text style={Style.texthed1}>
                      {item.description}
                      {/* MEDICAL HISTORY */}
                    </Text>
                    <FlatList
                      data={item.questions}
                      renderItem={Yesnocheck}
                      keyExtractor={item => item.id.toString()}
                    />
                  </View>
                ) : null}
                {item.html_type == 'radio' ? (
                  <View style={{marginTop: 10}}>
                    <Text style={Style.texthed1}>
                      {item.description}
                      {/* MEDICAL HISTORY (continued) */}
                    </Text>
                    <FlatList
                      data={item.questions}
                      renderItem={Yesno}
                      keyExtractor={item => item.id.toString()}
                    />
                  </View>
                ) : null}

                {/* {item.title == 'Pictures' ? (
                  <View style={{marginTop: 10}}>
                    <Text style={Style.texthed1}>{item.description}</Text>
                    <FlatList
                      data={item.questions}
                      renderItem={pictures}
                      keyExtractor={item => item.id.toString()}
                    />
                  </View>
                ) : null} */}
                {item.html_type == 'input' ? (
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
                {item.html_type == 'noinput' ? (
                  <View style={{marginTop: 10}}>
                    <Text style={[Style.texthed1, {color: 'black'}]}>
                      {item.description}
                    </Text>
                    <FlatList
                      data={item.questions}
                      renderItem={procedure}
                      keyExtractor={item => item.id.toString()}
                    />
                  </View>
                ) : null}

                {item.html_type == 'text' ? (
                  <>
                    <Text style={[Style.texthed, {color: 'black'}]}>
                      INFORMED CONSENT FOR LLLT
                    </Text>
                    <View
                      style={{
                        alignSelf: 'center',
                        marginTop: 10,
                        marginBottom: 20,
                      }}>
                      <FlatList
                        data={item.questions}
                        renderItem={procedure1}
                        keyExtractor={item => item.id.toString()}
                      />
                    </View>
                    {/* <Text style={[Style.texthed, {color: 'black'}]}>
                      INFORMED CONSENT FOR LLLT
                    </Text> */}
                  </>
                ) : null}
              </View>
            )}
          />

          {/* <RButton title="Submit" onPress={Submitform} /> */}
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
    </>
  );
};
export default ClientViewLLLT;
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
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  input1: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: wp(78),
    color: 'black',
    height: hp(3.5),
    marginTop: 6,
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
