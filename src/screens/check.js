import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import RNSpeedometer from 'react-native-speedometer';
import Heading from '../components/Heading';
// import {Timer, Countdown} from 'react-native-element-timer';
import {
  themeBlue,
  themeDarkBlue,
  themeFerozi,
  themeGreen,
  themeLightBlue,
  themeLightPurple,
  themePurple,
  themeRed,
  themeYellow,
} from '../assets/colors/colors';
// import WheelOfFortune from 'react-native-wheel-of-fortune';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import LottieView from 'lottie-react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { showMessage } from 'react-native-flash-message';
const { width, height } = Dimensions.get('window');

const TimeAssessment = ({
  navigation,
  route,
  userReducer,
  getColors,
  submitResult,
  getGameInfo,
  checkGame,
  logo
}) => {
  const ITEM = route.params.item;
  const CHILD_DATA = route.params.childData;
  const GROUP_DATA = route.params.groupData;
  const [hasTimerStarted, setHasTimerStarted] = useState(false);
  const [child, setChild] = useState(null);
  const accessToken = userReducer?.accessToken;
  const [meterValue, setMeterValue] = useState(50);
  const [colors, setColors] = useState([]);
  const [score, setScore] = useState(0);
  const [assessmentScoreid, setAssessmentScoreId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showTextField, setShowTextField] = useState(false);
  const [wheelState, setWheelState] = useState({
    winnerValue: null,
    winnerIndex: null,
    started: false,
  });

  // console.log(JSON.stringify(CHILD_DATA,null,2))
  const timerRef = useRef(null);
  const countdownRef = useRef(null);
  const participants = ['', '', '', '', '', '', '', '', ''];
  const [secs, setSecs] = useState(0);
  const apiData = {
    assessment_score_id: assessmentScoreid,
    participant_id: CHILD_DATA?.id,
    Score: score,
    grade_id: CHILD_DATA?.id,
    group_id: GROUP_DATA?.id,
    assessment_id: ITEM?.id,
    Duration: secs,
  };
  const [timer, setTimer] = useState({
    timerStart: false,
    stopwatchStart: false,
    totalDuration: 90000,
    timerReset: false,
    stopwatchReset: false,
  });

  const wheelOptions = {
    rewards: participants,
    knobSize: 30,
    borderWidth: 5,
    borderColor: themeDarkBlue,
    innerRadius: 10,
    width: 50,
    colors: userReducer?.colors?.map(ele => ele?.WebColor),
    // colors: [
    //   ,
    //   themeDarkBlue,
    //   themeLightBlue,
    //   themeBlue,
    //   themeFerozi,
    //   themeLightPurple,
    //   themePurple,
    //   themeGreen,
    //   themeRed,
    //   themeYellow,
    // ],
    height: 50,
    duration: 1000,
    backgroundColor: 'transparent',
    textAngle: 'horizontal',
    knobSource: require('../assets/images/knob.png'),
    getWinner: (value, index) => {
      setWheelState(prev => {
        return { ...prev, winnerValue: value, winnerIndex: index };
      });
    },
    onRef: ref => setChild(ref),
  };

  // console.log(JSON.stringify(CHILD_DATA,null,2), '----');
  const _onButtonPress = () => {
    // if (!wheelState?.started) {
    //   setWheelState(() => {
    //     return {winnerIndex: null};
    //   });
    //   child._tryAgain();
    // } else {
    //   setWheelState(prev => {
    //     return {...prev, started: true};
    //   });
    //   child._onPress();
    // }
  };
  // console.log(
  //   'colors',
  //   colors[0]
  //   // userReducer?.gameInfo?.filter(game => game.assessment_id == 8),
  // );
  useEffect(() => {
    // console.log('Miliseconds: ', secs * 1000, '----', 'Seconds: ', secs);
  }, [secs]);

  const findScoreNow = () => {
    // console.log("color id",color_id)
    const thisGameScorePeers = userReducer?.gameInfo?.filter(
      game => game.assessment_id == 8,
    );
    let color_id = thisGameScorePeers[0]?.color_id;
    for (const thisGame of thisGameScorePeers) {
      // console.log('YYYYYYY', thisGame, color_id);
      if (thisGame?.MinValue <= secs && thisGame?.MaxValue >= secs) {
        color_id = thisGame?.color_id;
        setAssessmentScoreId(thisGame?.id);
      }
    }
    for (let i = 8; i <= userReducer?.gameInfo?.length; i++) {
      if (
        userReducer?.gameInfo[i]?.MinValue <= secs &&
        userReducer?.gameInfo[i]?.MaxValue >= secs
      ) {
        color_id = userReducer?.gameInfo[i]?.color_id;
        setAssessmentScoreId(userReducer?.gameInfo[i]?.id);
      }
    }
    // if (color_id === 1) {
    //   setMeterValue(5);
    // } else if (color_id === 2) {
    //   setMeterValue(15);
    // } else if (color_id === 3) {
    //   setMeterValue(25);
    // } else if (color_id === 4) {
    //   setMeterValue(35);
    // } else if (color_id === 5) {
    //   setMeterValue(45);
    // } else if (color_id === 6) {
    //   setMeterValue(55);
    // } else if (color_id === 7) {
    //   setMeterValue(65);
    // } else if (color_id === 8) {
    //   setMeterValue(75);
    // } else if (color_id === 9) {
    //   setMeterValue(85);
    // } else {
    //   setMeterValue(95);
    // }
  };

  useEffect(() => {
    getAllColors();
    setMeterValue(0);
    setShowTextField(false);
    return () => {
      setScore('');
      setMeterValue('');
    };
  }, []);

  useEffect(() => {
    setColors(userReducer?.colors);
  }, [userReducer?.colors]);

  const getAllColors = async () => {
    setIsLoading(true);
    await getColors(accessToken);
    await getGameInfo(accessToken);
    setIsLoading(false);
  };

  const _onPressSave = async () => {
    setIsLoading(true);
    // console.log(JSON.stringify(apiData?.grade_id, null, 2), '-----');
    await submitResult(apiData, accessToken, onSuccess);
    setIsLoading(false);
  };

  const onSuccess = () => {
    navigation.navigate('home');
  };

  // const toggleTimer = () => {
  //   setTimer(prev => {
  //     return {
  //       ...prev,
  //       timerStart: !timer.timerStart,
  //       timerReset: false,
  //     };
  //   });
  // };

  // const resetTimer = () => {
  //   setTimer(prev => {
  //     return {...prev, timerStart: false, timerReset: true};
  //   });
  // };

  const toggleStopwatch = () => {
    setTimer(prev => {
      return {
        ...prev,
        stopwatchStart: !timer.stopwatchStart,
        stopwatchReset: false,
      };
    });
  };

  const resetStopwatch = () => {
    setTimer(prev => {
      return {
        ...prev,
        stopwatchStart: false,
        stopwatchReset: true,
      };
    });
  };

  const handleTimerComplete = () => alert('custom completion function');

  const getFormattedTime = time => {
    currentTime = time;
    // console.log(currentTime.substring(6, 8));
    setSecs(currentTime.substring(6, 8));
  };
  // console.log(GROUP_DATA?.Name);
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        {isLoading || colors?.length === 0 ? (
          <LottieView
            speed={1}
            style={styles.lottieStyle}
            autoPlay
            loop
            source={require('../assets/lottie/color-loader.json')}
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Heading  */}
            <View style={styles.headingView}>
              <Heading
                title={ITEM?.Name}
                passedStyle={styles.headingStyles}
                fontType="semi-bold"
              />
            </View>

            {/* Image Logo  */}
            {logo && (
              <Image
                resizeMode="contain"
                source={{uri:logo}}
                style={styles.logoStyles}
              />
            )}

            {/* Grade  */}
            <View style={styles.headingStyle2View}>
              <Heading
                title={`${GROUP_DATA?.Name} - ${GROUP_DATA?.Abbr}`}
                passedStyle={styles.headingStyles2}
                fontType="regular"
              />
            </View>

            {/* Child Name  */}
            <View style={styles.headingStyle2View}>
              <Heading
                title={`${CHILD_DATA?.Firstname} ${CHILD_DATA?.Lastname}`}
                passedStyle={styles.headingStyles2}
                fontType="regular"
              />
            </View>

            {/* Meter and Button View Container  */}
            <View style={styles.configurations}>
              {/* Buttons and Timers View  */}
              <View style={styles.innerLeftConfigView}>
                {/* Start Button  */}
                {!hasTimerStarted ? (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        if (!hasTimerStarted) {
                          // timerRef.current.start();
                          checkGame(true);
                          toggleStopwatch();
                          setHasTimerStarted(true);
                          setSecs(0);
                          setMeterValue(0);
                          setShowTextField(false);
                        }
                      }}
                      style={styles.startBtnContainer}>
                      <Heading
                        title={'START'}
                        passedStyle={styles.startBtnStyle}
                        fontType="semi-bold"
                      />
                    </TouchableOpacity>

                    {secs > 0 && (
                      <TouchableOpacity
                        onPress={() => {
                          resetStopwatch();
                          checkGame(false);
                          setSecs(0);
                          setScore('0');
                          setShowTextField(false);
                        }}
                        style={styles.resetBtnContainer}>
                        <Heading
                          title={'RESET'}
                          passedStyle={styles.startBtnStyle}
                          fontType="semi-bold"
                        />
                      </TouchableOpacity>
                    )}
                  </>
                ) : (
                  // Stop Button
                  <TouchableOpacity
                    onPress={() => {
                      // timerRef.current.pause();
                      checkGame(false);
                      toggleStopwatch();
                      setHasTimerStarted(false);
                      findScoreNow();
                      setShowTextField(true);
                    }}
                    style={styles.stopBtnStyle}>
                    <Heading
                      title={'STOP'}
                      passedStyle={styles.startBtnStyle}
                      fontType="semi-bold"
                    />
                  </TouchableOpacity>
                )}

                {/* <Timer
                  totalDuration={timer.totalDuration}
                  msecs
                  start={timer.timerStart}
                  reset={timer.timerReset}
                  options={{
                    container: {
                      backgroundColor: '#000',
                      padding: 5,
                      borderRadius: 5,
                      width: 220,
                    },
                    text: {
                      fontSize: 30,
                      color: '#FFF',
                      marginLeft: 7,
                    },
                  }}
                  handleFinish={handleTimerComplete}
                  getTime={(time) => getFormattedTime(timer)}
                /> */}
                {/* <Timer
                  initialSeconds={0}
                  ref={timerRef}
                  style={{
                    marginLeft: width * 0.13,
                  }}
                  textStyle={{
                    fontSize: width * 0.08,
                    color: 'white',
                    fontFamily: 'Montserrat-Bold',
                  }}
                  onTimes={e => {
                    setSecs(e);
                  }}
                  formatTime={'hh:mm:ss:ssss'}
                  onEnd={e => {}}
                /> */}
              </View>

              {/* Game Meter  */}
              <RNSpeedometer
                wrapperStyle={{ marginRight: width * 0.05 }}
                value={parseInt(meterValue)}
                minValue
                size={200}
                labelStyle={{ color: 'transparent' }}
                labelNoteStyle={{ color: 'transparent' }}
                labels={

                  colors?.length > 0
                    ? [
                      {
                        name: 'Too Slow',
                        labelColor: colors[0]?.WebColor || 'red',
                        activeBarColor: colors[0]?.WebColor || 'red',
                      },
                      {
                        name: 'Very Slow',
                        labelColor: colors[1]?.WebColor || 'orange',
                        activeBarColor: colors[1]?.WebColor || 'orange',
                      },
                      {
                        name: 'Slow',
                        labelColor: colors[2]?.WebColor || 'yellow',
                        activeBarColor: colors[2]?.WebColor || 'yellow',
                      },
                      {
                        name: 'Normal',
                        labelColor: colors[3]?.WebColor || 'lightgreen',
                        activeBarColor: colors[3]?.WebColor || 'lightgreen',
                      },
                      {
                        name: 'Fast',
                        labelColor: colors[4]?.WebColor || 'darkgreen',
                        activeBarColor: colors[4]?.WebColor || 'darkgreen',
                      },
                      {
                        name: 'Unbelievably Fast',
                        labelColor: colors[5]?.WebColor || 'blue',
                        activeBarColor: colors[5]?.WebColor || 'blue',
                      },
                      {
                        name: 'Unsastifactory',
                        labelColor: colors[6]?.WebColor || 'darkblue',
                        activeBarColor: colors[6]?.WebColor || 'darkblue',
                      },
                      {
                        name: 'None',
                        labelColor: colors[7]?.WebColor || 'purple',
                        activeBarColor: colors[7]?.WebColor || 'purple',
                      },
                    ]
                    : [
                      {
                        name: 'Too Slow',
                        labelColor: 'green',
                        activeBarColor: 'green',
                      },
                      {
                        name: 'Very Slow',
                        labelColor: 'orange',
                        activeBarColor: 'orange',
                      },
                      {
                        name: 'Slow',
                        labelColor: 'yellow',
                        activeBarColor: 'yellow',
                      },
                      {
                        name: 'Normal',
                        labelColor: 'lightgreen',
                        activeBarColor: 'lightgreen',
                      },
                      {
                        name: 'Fast',
                        labelColor: 'darkgreen',
                        activeBarColor: 'darkgreen',
                      },
                      {
                        name: 'Unbelievably Fast',
                        labelColor: 'blue',
                        activeBarColor: 'blue',
                      },
                      {
                        name: 'Unsastifactory',
                        labelColor: 'darkblue',
                        activeBarColor: 'darkblue',
                      },
                      {
                        name: 'None',
                        labelColor: 'purple',
                        activeBarColor: 'purple',
                      },
                    ]
                }
              />
            </View>

            <View
              style={{
                alignSelf: 'center',
                marginTop: height * 0.03,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* Timer  */}
              <Heading
                title="Timer"
                passedStyle={{
                  color: 'white',
                  fontSize: width * 0.07,
                }}
                fontType="bold"
              />

              <Stopwatch
                laps
                msecs
                start={timer.stopwatchStart}
                reset={timer.stopwatchReset}
                options={{
                  container: {},
                  text: {
                    fontSize: 30,
                    color: '#FFF',
                    marginLeft: 7,
                    fontFamily: 'Montserrat-SemiBold',
                  },
                }}
                getTime={time => getFormattedTime(time)}
              />
            </View>

            {showTextField && (
              <TextInput
                value={score}
                // value={parseInt(score)}
                keyboardType="numeric"
                textContentType="numeric"
                placeholder={'Enter Score 0-100'}
                placeholderTextColor={'grey'}
                style={styles.scoreFieldStyle}
                onChangeText={text => {
                  // if (parseInt(text) <= 100) {
                  setScore(text);
                  setMeterValue(text);
                  // }

                  if (parseInt(text) > userReducer?.gameInfo[8]?.MaxValue) {
                    showMessage({
                      type: 'danger',
                      message: 'Score is exceeding the meter values.',
                    });
                    return;
                  }
                  setScore(text);
                }}
              />
            )}

            {showTextField && (
              <TouchableOpacity
                onPress={_onPressSave}
                style={styles.saveBtnStyle}>
                <Heading
                  title={'SAVE'}
                  passedStyle={styles.startBtnStyle}
                  fontType="semi-bold"
                />
              </TouchableOpacity>
            )}
            <View style={{ paddingBottom: 150 }} />
          </ScrollView>
        )}
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({ userReducer,logo }) => {
  return { userReducer,logo };
};
export default connect(mapStateToProps, actions)(TimeAssessment);

const styles = StyleSheet.create({
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
  logoStyles: {
    marginBottom: height * 0.04,
    width: width * 0.4,
    height: height * 0.2,
    alignSelf: 'center',
  },
  innerLeftConfigView: {
    flexDirection: 'column',
  },
  configurations: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: height * 0.05,
    justifyContent: 'space-between',
  },
  stopBtnStyle: {
    marginTop: height * 0.05,
    marginLeft: width * 0.05,
    backgroundColor: themeRed,
    borderRadius: width * 0.5,
    width: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  startBtnStyle: {
    color: 'white',
    fontSize: width * 0.04,
    paddingVertical: height * 0.02,
    textAlign: 'center',
  },
  timer: {
    marginVertical: 10,
  },
  lottieStyle: {
    height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    marginTop: height * 0.098,
    marginLeft: Platform?.OS === 'ios' ? width * 0.05 : width * 0.07,
  },
  saveBtnStyle: {
    marginLeft: width * 0.05,
    backgroundColor: themeFerozi,
    borderRadius: width * 0.5,
    marginTop: width * 0.03,
    width: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetBtnContainer: {
    // marginTop: height * 0.1,
    marginLeft: width * 0.05,
    backgroundColor: themePurple,
    borderRadius: width * 0.5,
    width: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  startBtnContainer: {
    marginTop: height * 0.05,
    marginLeft: width * 0.05,
    backgroundColor: themeGreen,
    borderRadius: width * 0.5,
    width: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  timerText: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'blue',
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
    backgroundColor: themeFerozi,
    borderRadius: width * 0.05,
    // width: width * 0.55,
    maxWidth: width * 0.95,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01,
    marginBottom: height * 0.1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
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
  startButton: {
    backgroundColor: 'rgba(0,0,0,.5)',
    marginTop: 50,
    padding: 5,
  },
  startButtonText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  winnerView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  winnerText: {
    fontSize: 30,
  },
  tryAgainButton: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  tryAgainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});