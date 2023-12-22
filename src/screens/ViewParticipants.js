import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  FlatList,
  RefreshControl,
  Platform,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import Heading from '../components/Heading';
import Echo from 'laravel-echo';
import * as Ably from 'ably';
// import Pusher from 'pusher-js';
import LottieView from 'lottie-react-native';
import {
  themeBlue,
  themeDarkBlue,
  themeFerozi,
  themeLightBlue,
  themePurple,
} from '../assets/colors/colors';
import * as actions from '../store/actions';
import IconComp from '../components/IconComp';
import ColoredFlatlist from '../components/ColoredFlatlist';
import ParticipantsMapper from '../components/ParticipantsMapper';
import { connect } from 'react-redux';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const { width, height } = Dimensions.get('window');
// sd
const ViewParticipants = ({
  navigation,
  route,
  getPastAssessment,
  userReducer,
  getColors,
  getAssessments,
  socket,
  changeStatus,
  getParticipants
}) => {
  const accessToken = userReducer.accessToken;
  const [pastAssessments, setPastAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [DATA,SETDATA]=useState(route.params.data)
  const [status, setStatus] = useState(undefined)
  const [record, setRecord] = useState(null);
  const apiData = {
    id: DATA?.id,
  };
  const socketRef = socket;
  useEffect(() => {
    // socketRef.emit('addUser', userId);

    // socketRef.on('getMessage', data => {
    //   console.log(data, 'Text Recieved========');
    // });
    // alert(JSON.stringify(DATA.Status))
    getDetail();
  }, []);
  // console.log(DATA)
  useEffect(() => {
    setPastAssessments(userReducer?.pastAssessment);
  }, [userReducer?.pastAssessment]);

  useEffect(()=>{
    // alert('cccc')
    console.log("5555",userReducer)
    const updatedData=[...userReducer.participants].filter(it=>it.id==DATA.id)[0]
    SETDATA(updatedData)
    setStatus(updatedData.Status)

  },[userReducer.participants])

  const getDetail = async () => {
    // alert("call")
    // getParticipants(accessToken)
    setIsLoading(true);
    await getPastAssessment(apiData, accessToken);
    // await getAssessments(accessToken)
    // await getColors(accessToken);
    setIsLoading(false);
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1500).then(() => {
      setRefreshing(false);
      getDetail();
    });
  }, []);

  // useEffect(() => {
  //   // 2
  //   // Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
  //   // 3
  //   const echo = new Echo({
  //     broadcaster: 'ably',
  //     key: 'Wcbs9w.CsxYNQ:uHtRcafdNc-nEHWjbTjN791dfR0FBm9ls10J2aQBxk4',
  //     wsHost: 'realtime-pusher.ably.io',
  //     wsPort: 443,
  //     disableStats: true,
  //     enÇcrypted: true,
  //   });
  //   // 4
  //   echo
  //     .channel('public.room')
  //     .subscribed(() => {
  //       console.log('You are subscribed');
  //     })
  //     // 5
  //     // .listen('.message.new', data => {
  //     //   console.log(data,"...///")
  //     // });
  // }, []);
  console.log("result screen")
  useEffect(() => {
    var ably = new Ably.Realtime(
      'GB15rw.5ontmA:MBH5BOzcml0w-JEGUwQN39_3YQSD1S9hs4qYu4qOtBY',
    );
    ably.connection.on('connected', function () {
      // alert('Connected, that was easy');
    });
    var channel = ably.channels.get('test');
    // console.log(channel,)
    channel.subscribe(function (message) {
      let NewRecord = JSON.parse(message.data);
      setRecord(NewRecord);
    });
  }, []);

  const appendRecordToArray = data => {
    // if (DATA?.id == data?.participant_id) {
    const DATAA = JSON.parse(data);
    // console.log(DATAA,'DATAAA')
    const created_at = JSON.parse(DATAA?.created_at);
    const assessments = [...JSON.parse(DATAA?.assessments)];
    const assessCopy = [
      ...JSON.parse({
        created_at: created_at,
        // assessments: assessments?.map(ele => {
        //   let id = JSON.parse(ele?.id);
        //   let Name = JSON.parse(ele?.Name);
        //   let Abbr = JSON.parse(ele?.Abbr);
        //   let Image = JSON.parse(ele?.Image);
        //   return {
        //     id: id,
        //     Name: Name,
        //     Abbr: Abbr,
        //     Image: Image,
        //     assessment_scoring: [...JSON.parse(ele?.assessment_scoring)]?.map(
        //       el => {
        //         return {
        //           id: JSON.parse(el?.id),
        //           assessment_id: JSON.parse(el?.assessment_id),
        //           color_id: JSON.parse(el?.color_id),
        //           MinValue: JSON.parse(el?.MinValue),
        //           MaxValue: JSON.parse(el?.MaxValue),
        //         };
        //       },
        //     ),
        //   };
        // }),
      }),
      ...pastAssessments,
    ];
    // console.log(pastAssessments, '======');
    // setPastAssessments(assessCopy);
    // }
  };

  useEffect(() => {
    if (record !== null) {
      const assessCopy = [record, ...pastAssessments];
      // console.log(userReducer?.pastAssessment);
      // console.log(JSON.stringify(assessCopy?.length, null, 2), ' length');
      setPastAssessmenkts(assessCopy);
      setRecord(null);
    }
  }, [record]);


  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        {isLoading ? (
          <LottieView
            speed={1}
            style={styles.lottieStyle}
            autoPlay
            loop
            source={require('../assets/lottie/color-loader.json')}
          />
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={
              <>
                <View style={styles.headingView}>
                  <Heading
                    title={'VIEW PARTICIPANTS'}
                    passedStyle={styles.headingStyles}
                    fontType="semi-bold"
                  />
                </View>

                {/* Participants Head View  */}
                <View style={styles.participantsViewStyle}>
                  <Heading
                    title="Participants"
                    passedStyle={styles.participantsLabelStyle}
                    fontType="regular"
                  />
                  <IconComp
                    iconName={'chevron-right'}
                    type="Feather"
                    passedStyle={styles.iconStyle}
                  />
                  <Heading
                    title={`${DATA?.Firstname} ${DATA?.Lastname}`}
                    passedStyle={styles.participantsLabelStyle}
                    fontType="semi-bold"
                  />
                </View>

                {/* Colors  */}
                <ColoredFlatlist />

                {/* Age  */}
                <View
                  style={{
                    backgroundColor: themeDarkBlue,
                    borderRadius: 25,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: width * 0.9,
                    height: height * 0.07,
                    marginTop: height * 0.02,
                  }}>
                  <Heading
                    title="Age"
                    passedStyle={{
                      color: 'white',
                      fontSize: width * 0.045,
                      marginLeft: width * 0.06,
                    }}
                    fontType="semi-bold"
                  />
                  <Heading
                    title={DATA?.Age}
                    passedStyle={{
                      color: 'white',
                      marginLeft: width * 0.18,
                      fontSize: width * 0.045,
                    }}
                    fontType="regular"
                  />
                </View>

                {/* Grade  */}
                <View
                  style={{
                    backgroundColor: themeDarkBlue,
                    borderRadius: 25,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: width * 0.9,
                    height: height * 0.07,
                    marginTop: height * 0.02,
                  }}>
                  <Heading
                    title="Grade"
                    passedStyle={{
                      color: 'white',
                      fontSize: width * 0.045,
                      marginLeft: width * 0.06,
                    }}
                    fontType="semi-bold"
                  />
                  <Heading
                    title={DATA?.grade_name}
                    passedStyle={{
                      color: 'white',
                      marginLeft: width * 0.14,
                      fontSize: width * 0.045,
                    }}
                    fontType="regular"
                  />
                </View>

                {/* Gender  */}
                <View
                  style={{
                    backgroundColor: themeDarkBlue,
                    borderRadius: 25,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: width * 0.9,
                    height: height * 0.07,
                    marginTop: height * 0.02,
                  }}>
                  <Heading
                    title="Gender"
                    passedStyle={{
                      color: 'white',
                      fontSize: width * 0.045,
                      marginLeft: width * 0.06,
                    }}
                    fontType="semi-bold"
                  />
                  <Heading
                    title={DATA?.Gender}
                    passedStyle={{
                      color: 'white',
                      marginLeft: width * 0.1,
                      fontSize: width * 0.045,
                    }}
                    fontType="regular"
                  />
                </View>


                <View
                  style={{
                    backgroundColor: themeDarkBlue,
                    borderRadius: 25,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: width * 0.9,
                    height: height * 0.07,
                    marginTop: height * 0.02,
                  }}>
                  <Heading
                    title="Status"
                    passedStyle={{
                      color: 'white',
                      fontSize: width * 0.045,
                      marginLeft: width * 0.06,
                    }}
                    fontType="semi-bold"
                  />
                  <Heading
                    title={status == 1 ?"Activated": "Deactivated" }
                    passedStyle={{
                      color: 'white',
                      marginLeft: width * 0.1,
                      fontSize: width * 0.045,
                    }}
                    fontType="regular"
                  />
                  <TouchableOpacity
                    style={{
                      backgroundColor: status == 1 ?"red":"green",
                      borderRadius: 25,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: responsiveWidth(20),
                      height: height * 0.035,
                      marginLeft: responsiveWidth(4)
                    }}
                    onPress={() => {
                      changeStatus(DATA.id,accessToken)
                        .then(res => {
                          getParticipants(accessToken)
                        })
                        .catch(err => console.log(err))
                      setStatus(status ? 0 : 1)
                    }}
                  >
                    <Text style={{ color: 'white' }}>{status == 1 ?"Deactivate":"Activate"}</Text>
                  </TouchableOpacity>
                </View>

                {/* <Heading
                title={'PAST ASSESSMENTS'}
                passedStyle={styles.pastAssessmentHeadingStyles}
                fontType="semi-bold"
              /> */}

                <View
                  style={[
                    styles.headingView,
                    {
                      backgroundColor: themeFerozi,
                      marginTop: height * 0.05,
                      marginBottom: 20,
                    },
                  ]}>
                  <Heading
                    title={'PAST ASSESSMENTS'}
                    passedStyle={[
                      styles.headingStyles,
                      // {backgroundColor: themeFerozi},
                    ]}
                    fontType="semi-bold"
                  />
                </View>
              </>
            }
            // ListFooterComponent={() => {
            //   return (
            //     pastAssessments?.length === 0 && (
            //       <View
            //         style={{
            //           backgroundColor: 'rgba(0,0,0,0.2)',
            //           borderRadius: width * 0.02,
            //           height: height * 0.1,
            //           width: width * 0.5,
            //           justifyContent: 'center',
            //           alignItems: 'center',
            //           // marginTop:height * 0.2,
            //           alignSelf: 'center',
            //         }}>
            //         <Heading
            //           title="No Record, Swipe Down To Refresh"
            //           passedStyle={{fontSize: width * 0.045, color: 'white'}}
            //           fontType="semi-bold"
            //         />
            //       </View>
            //     )
            //   );
            // }}
            data={pastAssessments}
            keyExtractor={({ item, index }) => item?.id?.toString()}
            contentContainerStyle={{ paddingBottom: height * 0.1 }}
            renderItem={({ item, index }) => (
              <ParticipantsMapper item={item} index={index} pastAssessment={item.participant_results} />

            )}
          />
        )}
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({ userReducer }) => {
  return { userReducer };
};
export default connect(mapStateToProps, actions)(ViewParticipants);

const styles = StyleSheet.create({
  lottieStyle: {
    // width:'100%',
    // alignItems:'center',
    // height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
  },
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  headingStyles: {
    color: 'white',
    // backgroundColor: themeLightBlue,
    fontSize: width * 0.045,
    paddingVertical: height * 0.01,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  headingView: {
    backgroundColor: themeLightBlue,
    borderRadius: width * 0.05,
    width: width * 0.57,
    marginBottom: height * 0.02,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  pastAssessmentHeadingStyles: {
    width: width * 0.55,
    color: 'white',
    backgroundColor: themeFerozi,
    fontSize: width * 0.04,
    borderRadius: 25,
    paddingVertical: height * 0.01,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: height * 0.05,
    marginBottom: height * 0.01,
  },
  participantsViewStyle: {
    marginVertical: 10,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * 0.05,
  },
  participantsLabelStyle: {
    fontSize: width * 0.04,
    color: 'white',
    textTransform: 'capitalize',
  },
  iconStyle: {
    color: 'white',
    fontSize: width * 0.05,
    marginLeft: 5,
  },
});

const colors = [
  {
    id: 1,
    color: '#E5306D',
  },

  {
    id: 2,
    color: '#EF4A37',
  },
  {
    id: 3,
    color: '#F17A29',
  },
  {
    id: 4,
    color: '#E4C546',
  },
  {
    id: 5,
    color: '#40C0C9',
  },
  {
    id: 6,
    color: '#6592CD',
  },
  {
    id: 7,
    color: '#704FA0',
  },
];

const list = [
  {
    id: 1,
    name: 'Long Jump',
    image: require('../assets/images/long-jump.png'),
    colors: [
      {
        id: 1,
        color: '#E5306D',
      },

      {
        id: 2,
        color: '#EF4A37',
      },
      {
        id: 3,
        color: '#F17A29',
      },
      {
        id: 4,
        color: '#E4C546',
      },
      {
        id: 5,
        color: '#40C0C9',
      },
      {
        id: 6,
        color: '#6592CD',
      },
      {
        id: 7,
        color: '#704FA0',
      },
    ],
  },
  {
    id: 2,
    name: 'Sprinting',
    image: require('../assets/images/sprinting.png'),
    colors: [
      {
        id: 1,
        color: '#E5306D',
      },

      {
        id: 2,
        color: '#EF4A37',
      },
      {
        id: 3,
        color: '#F17A29',
      },
      {
        id: 4,
        color: '#E4C546',
      },
      {
        id: 5,
        color: '#40C0C9',
      },
      {
        id: 6,
        color: '#6592CD',
      },
      {
        id: 7,
        color: '#704FA0',
      },
    ],
  },
  {
    id: 3,
    name: 'Shot Put',
    image: require('../assets/images/shot-put.png'),
    colors: [
      {
        id: 1,
        color: '#E5306D',
      },

      {
        id: 2,
        color: '#EF4A37',
      },
      {
        id: 3,
        color: '#F17A29',
      },
      {
        id: 4,
        color: '#E4C546',
      },
      {
        id: 5,
        color: '#40C0C9',
      },
      {
        id: 6,
        color: '#6592CD',
      },
      {
        id: 7,
        color: '#704FA0',
      },
    ],
  },
  {
    id: 4,
    name: 'Hurdles',
    image: require('../assets/images/hurdles.png'),
    colors: [
      {
        id: 1,
        color: '#E5306D',
      },

      {
        id: 2,
        color: '#EF4A37',
      },
      {
        id: 3,
        color: '#F17A29',
      },
      {
        id: 4,
        color: '#E4C546',
      },
      {
        id: 5,
        color: '#40C0C9',
      },
      {
        id: 6,
        color: '#6592CD',
      },
      {
        id: 7,
        color: '#704FA0',
      },
    ],
  },
];
