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
  ScrollView,
  Platform,
  Modal,
  Animated
} from 'react-native';

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Heading from '../components/Heading';
import {
  themeDarkBlue,
  themeFerozi,
  themeLightBlue,
} from '../assets/colors/colors';
import * as actions from '../store/actions';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';
import CheckIcon from "react-native-vector-icons/FontAwesome"
import { showMessage } from 'react-native-flash-message';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import moment from 'moment';

const r = [
  {
    "id": 24,
    "assessment_id": 3,
    "color_id": 1,
    "MinValue": "71",
    "MaxValue": "80",
    "Duration": "00:00:00",
    "Beep": null,
    "Distance": null,
    "Score_target": "Duration",
    "created_at": "2022-06-21T02:12:57.000000Z",
    "updated_at": "2022-08-12T01:25:03.000000Z",
    "image": "red_1660267503.png",
    "minTime": "0.36",
    "maxTime": "0.40"
  },
  {
    "id": 23,
    "assessment_id": 3,
    "color_id": 2,
    "MinValue": "61",
    "MaxValue": "70",
    "Duration": "00:00:00",
    "Beep": null,
    "Distance": null,
    "Score_target": "Duration",
    "created_at": "2022-06-21T02:12:57.000000Z",
    "updated_at": "2022-08-09T18:53:30.000000Z",
    "image": "blue_1660071210.png",
    "minTime": "0.31",
    "maxTime": "0.35"
  },
  {
    "id": 22,
    "assessment_id": 3,
    "color_id": 3,
    "MinValue": "51",
    "MaxValue": "60",
    "Duration": "00:00:00",
    "Beep": null,
    "Distance": null,
    "Score_target": "Duration",
    "created_at": "2022-06-21T02:12:57.000000Z",
    "updated_at": "2022-08-12T01:24:43.000000Z",
    "image": "green_1660267483.png",
    "minTime": "0.26",
    "maxTime": "0.30"
  },
  {
    "id": 21,
    "assessment_id": 3,
    "color_id": 4,
    "MinValue": "41",
    "MaxValue": "50",
    "Duration": "00:00:00",
    "Beep": null,
    "Distance": null,
    "Score_target": "Duration",
    "created_at": "2022-06-21T02:12:57.000000Z",
    "updated_at": "2022-08-12T01:24:21.000000Z",
    "image": "orange_1660267461.png",
    "minTime": "0.21",
    "maxTime": "0.25"
  },
  {
    "id": 20,
    "assessment_id": 3,
    "color_id": 5,
    "MinValue": "31",
    "MaxValue": "40",
    "Duration": "00:00:00",
    "Beep": null,
    "Distance": null,
    "Score_target": "Duration",
    "created_at": "2022-06-21T02:12:57.000000Z",
    "updated_at": "2022-08-12T01:24:04.000000Z",
    "image": "purple_1660267444.png",
    "minTime": "0.16",
    "maxTime": "0.20"
  },
  {
    "id": 19,
    "assessment_id": 3,
    "color_id": 6,
    "MinValue": "21",
    "MaxValue": "30",
    "Duration": "00:00:00",
    "Beep": null,
    "Distance": null,
    "Score_target": "Duration",
    "created_at": "2022-06-21T02:12:57.000000Z",
    "updated_at": "2022-08-09T18:54:29.000000Z",
    "image": "yellow_1660071269.png",
    "minTime": "0.11",
    "maxTime": "0.15"
  },
  {
    "id": 18,
    "assessment_id": 3,
    "color_id": 7,
    "MinValue": "11",
    "MaxValue": "20",
    "Duration": "00:00:00",
    "Beep": null,
    "Distance": null,
    "Score_target": "Duration",
    "created_at": "2022-06-21T02:12:57.000000Z",
    "updated_at": "2022-08-12T01:23:39.000000Z",
    "image": "pink_1660267419.png",
    "minTime": "0.06",
    "maxTime": "0.10"
  },
  {
    "id": 17,
    "assessment_id": 3,
    "color_id": 8,
    "MinValue": "1",
    "MaxValue": "10",
    "Duration": "00:00:00",
    "Beep": null,
    "Distance": null,
    "Score_target": "Duration",
    "created_at": "2022-06-21T02:12:57.000000Z",
    "updated_at": "2022-08-12T01:23:18.000000Z",
    "image": "white_1660267398.png",
    "minTime": "0.01",
    "maxTime": "0.05"
  }
].reverse()
const { width, height } = Dimensions.get('window');

const GradingSystem = ({
  navigation,
  route,
  getColors,
  userReducer,
  getAssessmentDetails,
  getGameInfo,
  submitResult,
  nintyFive
}) => {
  const accessToken = userReducer?.accessToken;
  const ITEM = route?.params?.item;
  const Event = route.params.event;
  const GROUP_DATA = route.params.groupData;
  const CHILD_DATA = route.params.childData;
  const [Memebers, setMembers] = useState([]);
  console.log('hkhklahksdhakhdskl;ahkld', Memebers);
  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [score, setScore] = useState('');
  const [ranges, setRanges] = useState(r);
  const [Resultvalue, setResultvalue] = useState({});
  const [assessment_id, setassessment_id] = useState([]);
  const [reverse, setReverse] = useState("red")
  const [Uservalue, setUservalue] = useState({});
  const [errorModal, setErrorModal] = useState(false)
  const partScrollRef = useRef(null)

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const animationRef = useRef()
  const [currentNintyFive, setCurrentNintyFive] = useState({})

  useEffect(() => {
    if (Object.keys(Uservalue).length > 0) {
      const seletedNintyFive = nintyFive.find(it => it.AssessmentID == ITEM.id && it.GradeID == Uservalue.GradeID && it.GenderID == Uservalue.GenderID)
      setCurrentNintyFive(seletedNintyFive)
    }
  }, [Uservalue])

  useLayoutEffect(() => {
    setMembers(route.params?.memberData)
  }, [])

  useEffect(() => {
    setUservalue(route.params.childData)
    getAllColors();
  }, []);

  const getAllColors = async () => {
    setIsLoading(true);
    // await getGameInfo(accessToken);
    // await getColors(accessToken);
    await getAssessmentDetails(ITEM?.id, accessToken);
    setIsLoading(false);
  };

  useEffect(() => {
    setColors(userReducer?.colors);
  }, [userReducer?.colors]);

  useEffect(() => {
    // setRanges(userReducer?.assessmentDetails?.assessment_scoring.reverse());
  }, [userReducer?.assessmentDetails]);


  function nextCandidate() {
    const newIndex = Uservalue.index + 1
    const updatedMembers = [...Memebers].map((it) => {
      if (it.id == Uservalue.id) {
        return {
          ...it,
          disable: true
        }
      } else {
        return it
      }
    })
    setMembers(updatedMembers)
    setUservalue({
      ...Memebers[newIndex],
      index: newIndex,
    });
  }

  const _onPressSave = async () => {
    // let color_id = userReducer?.gameInfo[0]?.color_id;
    // for (let i = 0; i <= userReducer?.gameInfo?.length; i++) {
    //   if (
    //     userReducer?.gameInfo[i]?.MinValue <= score &&
    //     userReducer?.gameInfo[i]?.MaxValue >= score
    //   ) {
    //     color_id = userReducer?.gameInfo[i]?.color_id;
    //   }
    // }
    if (Resultvalue.color_id) {
      const cDate = new Date().toLocaleDateString().split('/')

      const apiData = {
        event_id: CHILD_DATA.event ? (CHILD_DATA?.event[0]?.id) : 1,
        participant_id: Uservalue?.id,
        assessment_id: ITEM?.id,
        grade_id: CHILD_DATA?.GradeID,
        gender_id: CHILD_DATA.GenderID,
        color_id: Resultvalue.color_id,
        results: Resultvalue.MaxValue,

        // dt_recorded:moment().format('YYYY-MM-DD') ,
        dt_recorded: moment().format('YYYY-MM-DD hh:mm:ss'),
        attempt: 1,
        percent: 5
      };
      if (Memebers?.length > 2 && Memebers.length != Uservalue.index + 1) {
        partScrollRef?.current?.scrollToIndex({ index: Uservalue.index + 1, animated: true })
      }
      setIsLoading(true);
      await submitResult(apiData, accessToken, onSuccess);
      setIsLoading(false);
    } else {
      showMessage({
        message: 'please select octagone color',
        type: 'danger'
      })
    }
  };

  const onSuccess = () => {
    setResultvalue({})
    // if ((Uservalue.index + 1) < Memebers.length){
    //   const updatedMembers = [...Memebers].map((it) => {
    //     if (it.id == Uservalue.id) {
    //       return {
    //         ...it,
    //         disable: true
    //       }
    //     } else {
    //       return it
    //     }
    //   })
    //   setMembers(updatedMembers) 
    //   const newIndex = Memebers[Uservalue.index + 1].disable ? (Uservalue.index + 2) : Uservalue.index + 1
    //   setUservalue({ ...Memebers[newIndex], index: newIndex })
    // }else{
    //   navigation.navigate('home');
    // }

    if (Uservalue.index + 1 < Memebers.length) {
      const updatedMembers = [...Memebers].map((it) => {
        if (it.id == Uservalue.id) {
          return {
            ...it,
            disable: true
          }
        } else {
          return it
        }
      })
      setMembers(updatedMembers)
        const newIndex = Memebers[Uservalue.index + 1].disable ? (Uservalue.index + 2) : Uservalue.index + 1
        if(Memebers[newIndex]){
          setUservalue({
            ...Memebers[newIndex],
            index: newIndex,
          });
        }else{
          navigation.navigate('home')
        }
    } else {
      const check = Memebers.slice(0, Memebers.length - 1).find(it => !it.disable)
      if (check) {
        const updatedMembers = [...Memebers].map((it) => {
          if (it.id == Uservalue.id) {
            return {
              ...it,
              disable: true
            }
          } else {
            return it
          }
        })
        setMembers(updatedMembers)
        const index=Memebers.findIndex(it=>it.id=check.id)
        setUservalue({...check,index})
      } else {
        navigation.navigate('home');
      }
      // }
    }
  };

  useEffect(() => {
    if (Resultvalue) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 10,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ]).start()
      if (animationRef?.current) {
        animationRef?.current.reset()
      }
      animationRef.current = Animated.sequence([
        Animated.timing(fadeAnim2, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim2, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        })
      ]).start()
    }
  }, [Resultvalue])

  const RenderMembersData = ({ item, index }) => (
    <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
      {/* {console.log(Memebers)} */}
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", flex: 1, marginRight: 10 }}
        disabled={item.disable}
        onPress={() => {
          partScrollRef?.current?.scrollToIndex({ index, animated: true })
          setResultvalue({})
          setUservalue({ ...item, index });
        }}>
        <Text
          style={{
            fontSize: 20,
            alignSelf: 'center',
            color: item.disable ? 'gray' : (Uservalue.id == item.id ? 'green' : 'white'),
            // textAlign: 'center',
            // textAlignVertical: 'center',
            letterSpacing: 1
          }}>
          {`${item.Firstname} ${item.Lastname}`}
        </Text>

        {
          Uservalue.id == item.id ?
            <Text
              style={{
                fontSize: 20,
                alignSelf: 'center',
                color: item.disable ? 'gray' : (Uservalue.id == item.id ? 'green' : 'white'),
                letterSpacing: 1,
                marginLeft: width * 0.05

              }}>
              ✓
            </Text> :
            <Text></Text>
        }

      </TouchableOpacity>
    </View>
  );

  const RenderimageDAta = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setResultvalue(item);
      }}
      style={{ width: "25%", flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}
    >
      {Resultvalue.image == item.image && (
        <View style={{ position: 'absolute', zIndex: 1 }}>
          <CheckIcon name='check' color={"black"} size={30} />
        </View>
      )}
      <Animated.View
        style={{
          height: height * .095, width: width / 6,
          transform: [{ scale: Resultvalue.image == item.image ? fadeAnim : 1 }],
          opacity: Resultvalue.image == item.image ? fadeAnim : 1
        }}
      >
        <Image
          style={[{ width: '100%', height: '100%', resizeMode: "contain" }]}
          source={{
            uri:
              item.image === null
                ? 'https://webprojectmockup.com/custom/spectrum-8/public/images/assessment_image/scoring/error.png'
                : `https://webprojectmockup.com/custom/spectrum-8/public/images/assessment_image/scoring/${item.image}`,
          }}
        />
      </Animated.View>
      {/* <Text style={{position:"absolute",color:"white",fontWeight:"500",marginLeft:22,marginTop:25}}>
       {item.image == null?"":item.MaxValue}
     </Text> */}
    </TouchableOpacity>
  );
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        {
          ranges.map(it => {
            return <Animated.View
              style={{
                height: responsiveHeight(100),
                width: responsiveWidth(100),
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{ scale: it.image == Resultvalue.image ? fadeAnim2 : 0 }],
                opacity: it.image == Resultvalue.image ? fadeAnim2 : 0
              }}>
              <Image
                style={{ height: responsiveHeight(50), width: responsiveWidth(100), resizeMode: "contain", opacity: 0.75 }}

                source={{
                  uri:
                    Resultvalue.image === null ? "https://webprojectmockup.com/custom/spectrum-8/public/images/assessment_image/scoring/error.png" : `https://webprojectmockup.com/custom/spectrum-8/public/images/assessment_image/scoring/${Resultvalue.image}`
                }}
              />
            </Animated.View>
          })
        }
        <Modal
          visible={errorModal}
          transparent={true}
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, flex: 1 }}>
            <View style={{ backgroundColor: 'white', height: height / 3, width: '90%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, padding: 10 }}>

              <Text style={{ textAlign: 'center', fontSize: 20, color: 'black', marginBottom: 10 }}>
                {`${Uservalue.Firstname} ${Uservalue.Lastname}`}
              </Text>
              <Text style={{ textAlign: 'center' }}>
                {`${Uservalue.Firstname} ${Uservalue.Lastname} can not participate more than three times in a month`}
              </Text>
              <TouchableOpacity
                style={{ backgroundColor: 'black', padding: 5, borderRadius: 20, paddingHorizontal: 40, marginTop: 20 }}
                onPress={() => {
                  setErrorModal(false)

                  const newIndex = Uservalue.index + 1

                  if (newIndex < Memebers.length) {
                    nextCandidate()
                  } else {
                    navigation.navigate('home');

                  }
                }}
              >
                <Text style={{ color: 'white' }}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <ScrollView style={{ flexGrow: 1 }}>
          <View>
            <Heading
              title={ITEM?.Name}
              passedStyle={styles.headingStyles}
              fontType="semi-bold"
            />
          </View>
          <View
            style={{
              height: height * 0.20,
              width: '95%',
              backgroundColor: themeDarkBlue,
              borderRadius: 10,
              paddingLeft: 20,
              alignSelf: "center"
            }}>
            <FlatList
              nestedScrollEnabled={true}
              data={Memebers}
              ref={partScrollRef}
              renderItem={RenderMembersData}
              keyExtractor={item => item.id}
            />
          </View>
          {isLoading ? (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <LottieView
                speed={1}
                style={styles.lottieStyle}
                autoPlay
                loop
                source={require('../assets/lottie/color-loader.json')}
              />
            </View>
          ) : (
            <View showsVerticalScrollIndicator={false}>
              <ScrollView>
                <View style={[styles.headingStyle2View, { marginBottom: 20 }]}>
                  <Heading
                    title={(GROUP_DATA?.Name) ? (GROUP_DATA.Name == "All" ? "All Groups" : GROUP_DATA?.Name) : "All Groups"}
                    // title={GROUP_DATA.group ? "All" : `${GROUP_DATA?.Name} - ${GROUP_DATA?.Abbr}`}
                    passedStyle={styles.headingStyles2}
                    fontType="regular"
                  />
                </View>
                <View style={{ alignItems: "center", justifyContent: "space-evenly" }}>
                  <FlatList
                    style={{ marginTop: Platform.OS == "ios" ? 30 : 0 }}
                    data={ranges}
                    renderItem={RenderimageDAta}
                    keyExtractor={item => item.color_sort}
                    numColumns={4}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    paddingHorizontal: 10
                  }}>

                  {
                    <TouchableOpacity
                      onPress={_onPressSave}
                      style={styles.saveBtnStyle}>
                      <Heading
                        title={'SAVE'}
                        passedStyle={styles.startBtnStyle}
                        fontType="bold"
                      />
                    </TouchableOpacity>
                  }
                  <TouchableOpacity
                    onPress={() => { setResultvalue({}) }}
                    style={{ ...styles.saveBtnStyle, backgroundColor: 'black' }}
                  >
                    <Heading
                      title={'N/A'}
                      passedStyle={styles.startBtnStyle}
                      fontType="bold"
                    />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          )}
        </ScrollView>
        {
          currentNintyFive?.UseSegment == 1 && (
            <View style={{ position: 'absolute', bottom: 20, left: 20 }}>
              {ITEM.id == 7 ? (
                <Text style={{ color: 'white' }}>Shuttle distance: {currentNintyFive?.ColorSegment}m</Text>
              ) : (
                <Text style={{ color: 'white' }}>Distance to Red: {currentNintyFive?.DistanceToRed}m</Text>
              )}
            </View>
          )
        }
        {
          (currentNintyFive?.UseSegment == 1 && ITEM.id != 7) && (
            <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
              <Text style={{ color: "white" }}>Color length: {currentNintyFive?.ColorSegment}m</Text>
            </View>)
        }
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({ userReducer, nintyFive }) => {
  return {
    userReducer,
    nintyFive
  };
};

export default connect(mapStateToProps, actions)(GradingSystem);
const styles = StyleSheet.create({
  startBtnStyle: {
    color: 'white',
    fontSize: width * 0.04,
    paddingVertical: height * 0.02,
    textAlign: 'center',
  },
  saveBtnStyle: {
    backgroundColor: themeFerozi,
    borderRadius: width * 0.5,
    width: width * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  scoreFieldStyle: {
    backgroundColor: 'white',
    width: width * 0.5,
    height: height * 0.06,
    paddingHorizontal: width * 0.03,
    marginLeft: width * 0.05,
    // paddingBottom: height * 0.007,
    marginVertical: height * 0.02,
    fontFamily: 'Montserrat-Medium',
    borderRadius: width * 0.1,
    fontSize: width * 0.047,
    // textAlign:"center"
  },
  btnStyle: {
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeLightBlue,
    alignSelf: 'center',
    width: width * 0.41,
  },
  headingStyles: {
    maxWidth: width * 0.9,
    color: 'white',
    backgroundColor: themeFerozi,
    fontSize: width * 0.045,
    borderRadius: width * .1,
    paddingVertical: height * 0.01,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.03,
    paddingHorizontal: width * 0.05,
  },

  headingStyles2: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: width * 0.045,
    paddingVertical: height * 0.02,
  },
  headingStyle2View: {
    width: width * 0.9,
    borderRadius: 25,
    marginTop: height * 0.02,
    backgroundColor: themeDarkBlue,
    alignSelf: 'center',
  },
  btnTextStyle: {
    color: 'white',
    fontSize: width * 0.04,
    fontFamily: 'Montserrat-SemiBold',
  },
  jumpbtn: {
    width: width * 0.5,
    height: height * 0.05,
    backgroundColor: '#16c4bc',
    alignSelf: 'center',
    margin: 20,
    borderRadius: 100,
    justifyContent: 'center',
  },
  jumpText: {
    textAlign: 'center',
    fontSize: width * 0.042,
    fontWeight: '900',
    color: 'white',
  },
  bgimage: {
    marginBottom: height * 0.02,
    width: width * 0.4,
    height: height * 0.2,
    alignSelf: 'center',
  },
  Button: {
    width: width * 0.85,
    height: height * 0.06,
    backgroundColor: '#000b2d',
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 100,
    justifyContent: 'center',
  },
  Text: {
    textAlign: 'center',
    fontSize: width * 0.042,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 3,
  },
  gradeimage: {
    marginBottom: height * 0.02,
    // width: width * 0.07,
    // height: height * 0.07,
    // alignSelf: 'center',
    paddingHorizontal: 5,
    // borderWidth: 1,
    // borderColor: 'white',
  },
  taskimage: {
    height: height * 0.12,
    width: width * 0.2,
    marginLeft: width * 0.09,
    marginTop: 20,
  },
  savebtn: {
    width: width * 0.3,
    height: height * 0.05,
    backgroundColor: '#16c4bc',
    alignSelf: 'flex-start',
    marginLeft: 20,
    borderRadius: 100,
    justifyContent: 'center',
    elevation: 5,
    marginBottom: 50,
  },
  saveText: {
    textAlign: 'center',
    fontSize: width * 0.038,
    fontWeight: '400',
    color: 'white',
    // paddingBottom:50,
  },
  gradeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
  },
  lottieStyle: {
    height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    marginTop: height * 0.038,
    // marginLeft: Platform?.OS === 'ios' ? width * 0.05 : width * 0.07,
  },
});
