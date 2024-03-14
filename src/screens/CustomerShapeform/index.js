import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Checkbox, RadioButton} from 'react-native-paper';
import {Customerviewshapesubmitanswer, formsubmit} from '../ApiCountoryBody';
import {Icon, Input, Item, Label} from 'native-base';
import React, {createRef, useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../../components/HeaderWithBack';
import ICON from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import LogoCbShape from '../../components/LogoCbshape';
import colors from '../../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CustomerShapeForm = ({navigation, route}) => {
  const {top, bottom} = useSafeAreaInsets();
  const [formvi, setformvi] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userData} = useSelector(({USER}) => USER);
  const {customerId} = route.params;

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
        console.log('Signup   respone..........', JSON.stringify(res));

        setformvi(res);

        setLoading(false);
      })
      .catch(error => {
        console.log('Error Message', error);
        setLoading(false);
      });
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
    <View>
      {item.answer != '-1' ? (
        <View style={Styles.radiomainview}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={Styles.doted}></View>
            <Text style={Styles.radiodes}>{item.question}</Text>
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
                // onPress={()=>setrd(1)}
              />
              {/* <RadioButton
                status={item.answer == 'yes' ? 'checked' : 'unchecked'}
                uncheckedColor={colors.brown}
                color={colors.brown}
              /> */}
              <Text style={Styles.yesno}>Yes</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <RadioButton
                status={item.answer == 'no' ? 'checked' : 'unchecked'}
                uncheckedColor={colors.brown}
                color={colors.brown}
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
              <Text style={Styles.yesno}>No</Text>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );

  const initials = ({item}) => (
    <View>
      {item.answer != '-1' ? (
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
            <Text style={Styles.input1}>{item.answer}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );

  const sinature = ({item}) => (
    <View>
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
                  color: '#797979',
                }}>
                {item.question}
              </Label>
              <Input
                editable={false}
                value={item.answer}
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
    </View>
  );

  return (
    <>
      <Header top={top} navigation={navigation} title="Cavitation & RF" />
      {formvi.message == 'Question Data' ? (
        <ScrollView style={Styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 40,
            }}>
            <Text></Text>

            <LogoCbShape />

            <View style={{height: 50}} />
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CustomerEditShapeForm', {customerId});
                }}
                activeOpacity={0.8}
                style={{
                  position: 'absolute',
                  backgroundColor: 'white',
                  borderRadius: 20,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 5,
                  marginTop: 10,
                  bottom: 0,
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
            </View>
          </View>
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
                    <View style={{marginBottom: 20}}>
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
    </>
  );
};
export default CustomerShapeForm;
const Styles = StyleSheet.create({
  input1: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: wp(78),
    color: 'black',
    height: hp(3),
    marginTop: 10,
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
  textinitials1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
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
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
});
