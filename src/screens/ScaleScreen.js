import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  ScrollView,
  Platform,
  TextInput,
  FlatList,
} from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import Heading from '../components/Heading';
import * as actions from '../store/actions';
import {
  themeDarkBlue,
  themeFerozi,
  themeLightBlue,
} from '../assets/colors/colors';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import { showMessage } from 'react-native-flash-message';
import CheckIcon from "react-native-vector-icons/FontAwesome"
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Modal } from 'react-native';


const { width, height } = Dimensions.get('window');

const ScaleScreen = ({
  navigation,
  route,
  getColors,
  userReducer,
  getAssessmentDetails,
  getGameInfo,
  submitResult,
}) => {
  const accessToken = userReducer?.accessToken;
  const ITEM = route?.params?.item;
  const Event = route.params.event;
  const CHILD_DATA = route.params.childData;
  const GROUP_DATA = route.params.groupData;
  const [Memebers, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [score, setScore] = useState('0');
  const [ranges, setRanges] = useState([]);
  const [ans, setAns] = useState(height * 0.01);
  const [Uservalue, setUservalue] = useState({});
  const [reverse, setReverse] = useState("red")
  const [Resultvalue, setResultvalue] = useState({});
  const [errorModal, setErrorModal] = useState(false)
  console.log("scale screen", Event)

  // const [assessment_id,setassessment_id]=useState([]);
  // const [resultColor, setResultColor] = useState(
  //   colors[7]?.WebColor || 'black',
  // );
  // console.log("scale screen...... child",Memebers)
  // console.log("clikcekkkkkk data")

  // useEffect(() => {
  //   if (ranges.length > 0) {
  //     setRanges([...ranges].reverse())
  //   }
  // }, [reverse])
console.log("event data",Event.id)
  useLayoutEffect(() => {
    setMembers(route.params?.memberData)
  }, [])

  // useEffect(() => {
  //   if (Uservalue.Firstname) {
  //     setIsLoading(true)
  //     axios.post('https://webprojectmockup.com/custom/spectrum-8/api/participantCount', {
  //       assessment_id: ITEM?.id,
  //       participant_id: Uservalue.id,
  //       event_id: Event.id
  //     }).then((res) => {
  //       // alert(JSON.stringify(res.data))
  //       setIsLoading(false)
  //       if (res.data?.data > 2) {
  //         setErrorModal(true)
  //       }
  //     }).catch((err)=>{
  //       setIsLoading(false)
  //       console.log(err)
  //     })
  //   }
  // }, [Uservalue])

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
  // const RESULT = 25;
  // const space1 = height * 0.01;
  // const space2 = height * 0.045;
  // const space3 = height * 0.08;
  // const space4 = height * 0.115;
  // const space5 = height * 0.145;
  // const space6 = height * 0.175;
  // const space7 = height * 0.215;
  // const space8 = height * 0.245;
  const assessment_id = userReducer?.assessmentDetails?.assessment_scoring[0]?.assessment_id;

  const findResult = () => {
    // if (score > parseInt(ranges[0]?.MaxValue)) {
    //   setAns(space1);
    //   setResultColor(colors[7]?.WebColor);
    // } else if (score > parseInt(ranges[1]?.MaxValue)) {
    //   setResultColor(colors[7]?.WebColor);
    //   setAns(space1);
    // } else if (score > parseInt(ranges[2]?.MaxValue)) {
    //   setResultColor(colors[6]?.WebColor);
    //   setAns(space2);
    // } else if (score > parseInt(ranges[3]?.MaxValue)) {
    //   setResultColor(colors[5]?.WebColor);
    //   setAns(space3);
    // } else if (score > parseInt(ranges[4]?.MaxValue)) {
    //   setResultColor(colors[4]?.WebColor);
    //   setAns(space4);
    // } else if (score > parseInt(ranges[5]?.MaxValue)) {
    //   setResultColor(colors[3]?.WebColor);
    //   setAns(space5);
    // } else if (score > parseInt(ranges[6]?.MaxValue)) {
    //   setResultColor(colors[2]?.WebColor);
    //   setAns(space6);
    // } else if (score > parseInt(ranges[7]?.MaxValue)) {
    //   setResultColor(colors[1]?.WebColor);
    //   setAns(space7);
    // } else {
    //   setResultColor(colors[0]?.WebColor);
    //   setAns(space8);
    // }
  };

  // useEffect(() => {
  //   findResult();
  // }, [score]);

  useEffect(() => {
    setUservalue(route.params.childData)
    getAllColors();
  }, []);

  const getAllColors = async () => {
    setIsLoading(true);
    await getGameInfo(accessToken);
    await getColors(accessToken);
    await getAssessmentDetails(ITEM?.id, accessToken);
    setIsLoading(false);
  };

  useEffect(() => {
    setColors(userReducer?.colors);
  }, [userReducer?.colors]);

  useEffect(() => {
    setRanges(userReducer?.assessmentDetails?.assessment_scoring.reverse());
  }, [userReducer?.assessmentDetails]);

  const _onPressSave = async () => {
    if (score > 80) {
      showMessage({
        type: 'danger',
        message: 'Score is exceeding the scale values.',
      });
    } else if (score < 0) {
      showMessage({
        type: 'danger',
        message: 'Score cant be less than zero.',
      });
    } else {
      let color_id = userReducer?.gameInfo[0]?.color_id;
      for (let i = 0; i <= userReducer?.gameInfo?.length; i++) {
        if (
          userReducer?.gameInfo[i]?.MinValue <= score &&
          userReducer?.gameInfo[i]?.MaxValue >= score
        ) {
          color_id = userReducer?.gameInfo[i]?.color_id;
        }
      }
      // const apiData = {
      //   assessment_score_id: Resultvalue ? Resultvalue.id : 0,
      //   participant_id: Uservalue?.id,
      //   Score: Resultvalue ?Resultvalue.MaxValue : 0,
      //   grade_id: CHILD_DATA?.grade_id,
      //   assessment_id: Resultvalue.length !== 0 ? Resultvalue.assessment_id : assessment_id,
      //   group_id: GROUP_DATA?.id,
      //   Distance: null,
      //   event_id:Event.id
      // };
      const apiData = {
        assessment_score_id: Resultvalue.id || 0,
        participant_id: Uservalue?.id,
        Score: Resultvalue.MaxValue || "0",
        grade_id: CHILD_DATA?.grade_id,
        assessment_id: userReducer?.assessmentDetails?.id,
        Distance: null,
        group_id: CHILD_DATA?.group_id,
        event_id: Event.id
      };

      setIsLoading(true);
      // console.log("Resultvalue", JSON.stringify(Resultvalue, null, 2));
      // console.log("API body", JSON.stringify(apiData, null, 2));
      await submitResult(apiData, accessToken, onSuccess);
      setIsLoading(false);
    }
  };

  const onSuccess = () => {
    setResultvalue({})
    if ((Uservalue.index + 1) < Memebers.length) {
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
      setUservalue({ ...Memebers[newIndex], index: newIndex })
    } else {
      navigation.navigate('home');
    }
  };


  const RenderMembersData = ({ item, index }) => (
    <View style={{ flexDirection: 'row', paddingVertical: 3, width: '100%' }}>
      {/* {console.log(Memebers)} */}
      <TouchableOpacity
        disabled={item.disable}
        style={{ flexDirection: "row", alignItems: "center",flex:1,marginRight:10 ,width:'100%' }}
        onPress={() => {
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
            letterSpacing: 1,
            width:'100%'
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
    <TouchableOpacity onPress={() => { setResultvalue(item) }} style={{ width: '25%', flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>

      {Resultvalue.image == item.image && (
        <View style={{ position: 'absolute', zIndex: 1 }}>
          <CheckIcon name='check' color={"black"} size={30} />
        </View>
      )}
      <Image
        style={{ height: height * .095, width: width / 6, resizeMode: "contain" }}

        source={{
          uri:
            item.image === null ? "https://webprojectmockup.com/custom/spectrum-8/public/images/assessment_image/scoring/error.png" : `https://webprojectmockup.com/custom/spectrum-8/public/images/assessment_image/scoring/${item.image}`
        }}
      />
      {/* <Text style={{position:"absolute",color:"white",fontWeight:"500",marginLeft:width*.059,marginTop:height*.057,fontSize:width*.03}}>
      {item.image == null?"":item.MaxValue}
    </Text> */}
    </TouchableOpacity>
  );
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      {/* {console.log("datdtatdatdta",ranges[0].image)} */}
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
                  <Modal
          visible={errorModal}
          transparent={true}
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, flex: 1 }}>
            <View style={{ backgroundColor: 'white', height: height / 3, width: '90%', justifyContent: 'center', alignItems: 'center', borderRadius: 10,padding:10 }}>
              
            <Text style={{ textAlign: 'center',fontSize:20,color:'black',marginBottom:10 }}>
                  {`${Uservalue.Firstname} ${Uservalue.Lastname}`}
                </Text>
                <Text style={{ textAlign: 'center' }}>
                  {`${Uservalue.Firstname} ${Uservalue.Lastname} can not participate more than three times in a month`}
                </Text>
              <TouchableOpacity
              style={{backgroundColor:'black',padding:5,borderRadius:20,paddingHorizontal:40,marginTop:20}}
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
                <Text style={{color:'white'}}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
          {/* <AwesomeAlert
          show={errorModal}
          showProgress={false}
          title={`${Uservalue.Firstname} ${Uservalue.Lastname}`}
          message={`${Uservalue.Firstname} ${Uservalue.Lastname} can not participate more than three times in a month`}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          // showCancelButton={true}
          showConfirmButton={true}
          // cancelText="No, cancel"
          confirmText="Next"
          confirmButtonColor="#DD6B55"
          // onCancelPressed={() => {
          //   setErrorModal(false)
          // }}
          onConfirmPressed={() => {
            setErrorModal(false)

            const newIndex = Uservalue.index + 1

            if (newIndex < Memebers.length) {
              nextCandidate()
            } else {
              navigation.navigate('home');

            }
          }}
        /> */}
       <ScrollView contentContainerStyle={{flexGrow:1}}>
       <View style={styles.headingView}>
          <Heading
            title={ITEM?.Name}
            passedStyle={styles.headingStyles}
            fontType="semi-bold"
          />
        </View>
        {/* </View> */}
        {/* <Image
              resizeMode="contain"
              source={require('../assets/images/new-logo.png')}
              style={styles.bgimage}
            /> */}

        {/* Grade  */}

        <View
          style={{
            height: height * 0.20,
            width: '95%',
            backgroundColor: themeDarkBlue,
            borderRadius: 10,
            paddingLeft: 20,
            alignSelf: "center",
          }}>
          <FlatList
          nestedScrollEnabled={true}
            data={Memebers}
            contentContainerStyle={{width:'100%'}}
            renderItem={RenderMembersData}
            keyExtractor={item => item.color_sort}
          // scrollEnabled={false}
          // contentContainerStyle={{
          //   flexGrow: 1,
          // }}
          />
        </View>
        <View style={styles.headingStyle2View}>
          <Heading
            title={GROUP_DATA.group?"All":`${GROUP_DATA?.Name}`}
            passedStyle={styles.headingStyles2}
            fontType="regular"
          />
        </View>
        {isLoading ? (
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <LottieView
          speed={1}
          style={styles.lottieStyle}
          autoPlay
          loop
          source={require('../assets/lottie/color-loader.json')}
        />
        </View>
        ) : (
          <ScrollView nestedScrollEnabled={true} contentContainerStyle={{flexGrow:1}}>

            {/* Child Name  */}
            {/* <View style={styles.headingStyle2View}>
              <Heading
                title={`${CHILD_DATA?.Firstname} ${CHILD_DATA?.Lastname}`}
                passedStyle={styles.headingStyles2}
                fontType="regular"
              />
            </View> */}

            <View style={styles.triangleContainer}>
              <View
                style={{
                  alignItems: 'center',
                  borderRightWidth: 6,
                  borderRightColor: 'white',
                }}>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    width: width * 0.65,
                    paddingRight: width * 0.05,
                  }}> */}
                {/* <Image
                     source={{
                      uri: 'https://webprojectmockup.com/custom/spectrum-8/public/images/assessment_image/scoring/error.png',
                    }}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.02,
                      // tintColor: colors[7]?.WebColor,
                      height: height * 0.032,
                      width: width * 0.5,
                    }} */}
                {/* /> */}
                {/* <Image
                    source={require('../assets/images/1.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.02,
                      tintColor: colors[7]?.WebColor,
                      height: height * 0.032,
                      width: width * 0.5,
                    }}
                  />

                  <Text
                    style={{
                      color: 'white',
                      fontSize: width * 0.033,
                      // alignSelf:'flex-start',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {ranges[0]?.MaxValue}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    width: width * 0.65,
                    paddingRight: width * 0.05,
                    // backgroundColor:'silver',
                  }}> */}
                {/* <Image
                    source={require('../assets/images/2.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.055,
                      height: height * 0.032,
                      width: width * 0.43,
                      tintColor: colors[6]?.WebColor,
                    }}
                  />
                  <Text
                    style={{
                      alignSelf: 'flex-end',
                      color: 'white',
                      fontSize: width * 0.033,
                      fontFamily: 'Montserrat-SemiBold',
                      marginBottom: height * 0.01,
                    }}>
                    {ranges[1]?.MaxValue}
                  </Text>
                </View> */}

                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: width * 0.65,
                    paddingRight: width * 0.05,
                  }}> */}
                {/* <Image
                    source={require('../assets/images/3.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.082,
                      height: height * 0.032,
                      width: width * 0.37,
                      tintColor: colors[5]?.WebColor,
                    }}
                  />
                  {/* <Text
                    style={{
                      color: 'white',
                      fontSize: width * 0.033,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {ranges[2]?.MaxValue}
                  </Text> */}
                {/* </View>

                <View
                  style={{
                    flexDirection: 'row',

                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: width * 0.65,

                    paddingRight: width * 0.05,
                  }}> */}
                {/* <Image
                    source={require('../assets/images/4.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.11,
                      height: height * 0.032,
                      tintColor: colors[4]?.WebColor,
                      width: width * 0.313,
                    }}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: width * 0.033,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {ranges[3]?.MaxValue}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    // alignItems: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    // backgroundColor: 'red',
                    width: width * 0.65,
                    paddingRight: width * 0.05,
                  }}> */}
                {/* <Image
                    source={require('../assets/images/5.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.135,
                      height: height * 0.032,
                      width: width * 0.26,
                      tintColor: colors[3]?.WebColor,
                    }}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: width * 0.033,
                      fontFamily: 'Montserrat-SemiBold',
                      textAlignVertical:"top"
                    }}>
                    {ranges[4]?.MaxValue}
                  </Text>
                </View>
/
                <View
                  style={{
                    flexDirection: 'row',
                    // alignItems: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    // backgroundColor: 'red',
                    width: width * 0.65,
                    paddingRight: width * 0.05,
                  }}> */}
                {/* <Image
                    source={require('../assets/images/6.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.165,
                      height: height * 0.032,
                      width: width * 0.205,
                      tintColor: colors[2]?.WebColor,
                    }}
                  /> */}
                {/* <Text
                    style={{color: 'white', fontFamily: 'Montserrat-SemiBold'}}>
                    {ranges[5]?.MaxValue}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    // alignItems: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    // backgroundColor: 'red',
                    width: width * 0.65,

                    paddingRight: width * 0.05,
                  }}> */}
                {/* <Image
                    source={require('../assets/images/7.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.19,
                      height: height * 0.032,
                      width: width * 0.15,
                      tintColor: colors[1]?.WebColor,
                    }}
                  />
                  <Text
                    style={{color: 'white', fontFamily: 'Montserrat-SemiBold'}}>
                    {ranges[6]?.MaxValue}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    // alignItems: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    // backgroundColor: 'red',
                    width: width * 0.65,

                    paddingRight: width * 0.05,
                  }}> */}
                {/* <Image
                    source={require('../assets/images/8.png')}
                    resizeMode="stretch"
                    style={{
                      marginLeft: width * 0.22,
                      height: height * 0.05,
                      width: width * 0.09,
                      tintColor: colors[0]?.WebColor,
                    }}
                  />
                  <Text
                    style={{color: 'white', fontFamily: 'Montserrat-SemiBold'}}>
                    {ranges[7]?.MaxValue}
                  </Text> */}
              </View>
            </View>
            {/* <View
              style={{
                width: width * 0.15,
                height: height * 0.006,
                alignSelf: 'flex-end',
                position: 'absolute',
                top: ans || height * 0.01,
                backgroundColor: 'white',
              }}
            /> */}
            {/* 0.01, 0.035, 0.06, 0.085,  0.11, 0.135 0.16 , 0.187*/}
            {/* </View> */}

            <View
              style={{
                marginTop: height * -0.1,
              }}>
              <Heading
                title={score == '0' || score == 0 ? '' : `${score}'`}
                passedStyle={{
                  fontSize: width * 0.07,
                  color: 'white',
                  marginLeft: width * 0.15,
                }}
                fontType="semi-bold"
              />

              {/* <TouchableOpacity
                onPress={() => {
                  if (reverse == "red") {
                    setReverse("white")
                  } else {
                    setReverse("red")
                  }
                }}
                style={[styles.headingStyle2View, { marginTop: 0, marginBottom: 20 }]}>
                <Heading
                  title={reverse == "red" ? 'White to Red ---->' : 'Red to White ---->'}
                  passedStyle={styles.headingStyles2}
                  fontType="regular"
                />
              </TouchableOpacity> */}
              <View style={{ alignItems: "center", justifyContent: "space-evenly" }}>
                <FlatList
                  style={{ marginTop: Platform.OS == "ios" ? 30 : 0 }}
                  data={ranges}
                  renderItem={RenderimageDAta}
                  keyExtractor={item => item.id}
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
                {/* <TextInput
                  value={score}
                  keyboardType="numeric"
                  placeholder={`Enter Score 1-${ranges[0]?.MaxValue}`}
                  placeholderTextColor={'grey'}
                  style={styles.scoreFieldStyle}
                  onChangeText={text => {
                    if (parseInt(text) > ranges[0]?.MaxValue) {
                      showMessage({
                        type: 'danger',
                        message: 'Score is exceeding the scale values.',
                      });
                      return;
                    }
                    setScore(text);
                  }}
                /> */}
         

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
                  {/* <Image
                  source={require('../assets/images/black.png')}
                  style={{
                    height:height*.1, 
                    width:width*.185,
                    marginLeft: width * 0.05,
                    opacity: Resultvalue.length == 0 ? 1 : .5
                  }}
                /> */}
                  <Heading
                    title={'N/A'}
                    passedStyle={styles.startBtnStyle}
                    fontType="bold"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
       </ScrollView>
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({ userReducer }) => {
  return {
    userReducer,
  };
};

export default connect(mapStateToProps, actions)(ScaleScreen);

const styles = StyleSheet.create({
  startBtnStyle: {
    color: 'white',
    fontSize: width * 0.04,
    paddingVertical: height * 0.015,
    textAlign: 'center',
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
    width:'100%',
    backgroundColor: 'blue',
  },
  btnStyle: {
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeLightBlue,
    alignSelf: 'center',
    width: width * 0.41,
  },
  lottieStyle: {
    height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    marginTop: height * 0.038,
    // marginLeft: Platform?.OS === 'ios' ? width * 0.05 : width * 0.07,
  },

  headingStyles: {
    color: 'white',
    backgroundColor: themeFerozi,
    fontSize: width * 0.045,
    // paddingVertical: height * 0.01,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  headingView: {
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
    width: width * 0.07,
    height: height * 0.07,
    alignSelf: 'center',
    paddingHorizontal: 40,
  },
  taskimage: {
    height: height * 0.1,
    width: width * 0.2,
    // paddingVertical:20,
    marginLeft: width * 0.09,
    // marginTop: 10,
  },
  savebtn: {
    width: width * 0.3,
    height: height * 0.05,
    backgroundColor: '#16c4bc',
    marginTop: 10,

    alignSelf: 'flex-start',
    marginLeft: 20,
    borderRadius: 100,
    justifyContent: 'center',
    elevation: 5,
    marginBottom: height * 0.1,
  },
  saveText: {
    textAlign: 'center',
    fontSize: width * 0.038,
    fontWeight: '400',
    color: 'white',
  },
  gradeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
  },
  triangleContainer: {
    alignSelf: 'center',
    marginTop: height * 0.06,
    marginLeft: width * 0.15,
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
});
