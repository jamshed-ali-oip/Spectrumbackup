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
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import Sound from 'react-native-sound';
import {
  themeDarkBlue,
  themeFerozi,
  themeLightBlue,
  themePurple,
} from '../assets/colors/colors';
import * as actions from '../store/actions';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window');
import messaging from '@react-native-firebase/messaging';
import { ScrollView } from 'react-native-gesture-handler';
import IonicIcons from "react-native-vector-icons/Ionicons"
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import DeviceInfo from 'react-native-device-info';
import LottieView from 'lottie-react-native';


const HomeScreen = ({ navigation, logoutRequest, userReducer, sendFCMToken, logo, checkLicense }) => {
  const accessToken = userReducer?.accessToken;
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(true)

  const [license, setLicense] = useState({})

  // console.log("parti",userReducer?.accessToken)
  useEffect(() => {
    setLoading2(true)
    checkLicense(accessToken).then(res => {
      console.log(res.data.data)
      setLicense(res.data?.data)
      setLoading2(false);
    })
  }, []);
  const sound = new Sound('beep.mp3');
  const playSound = () => {
    sound.play()
  }

  const sendFCM = () => {
    messaging()
      .getToken()
      .then(fcmtoken => {
        console.log('TOKEN: : : : :  :', fcmtoken);
        const data = {
          id: userReducer?.userData?.id,
          token: fcmtoken,
        };
        sendFCMToken(data, accessToken);
      });
  };
  if(loading2){
    return(
      <ImageBackground
      source={require('../assets/images/bg.jpg')}
      style={styles.container}>
      <LottieView
      speed={1}
      style={styles.lottieStyle}
      autoPlay
      loop
      source={require('../assets/lottie/color-loader.json')}
    />
    </ImageBackground>
    )
  }
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        <View style={{ position: 'absolute', top: responsiveHeight(Platform.OS == "ios" ? 5 : 2), right: responsiveWidth(5), zIndex: 1 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('setting')}
          >
            <IonicIcons name='ios-settings-outline' color={"white"} size={responsiveFontSize(3)} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {
            logo && (
              <Image
                resizeMode="contain"
                source={{ uri: logo }}
                style={styles.logoStyle}
              />
            )
          }

          <Button
            title={'ASSESSMENTS'}
            btnStyle={styles.asssessmentStyle}
            onBtnPress={() => {
              console.log(license?.license?.is_expire)
              if (!(license?.license?.is_expire == "false")) {
                alert("Your License expired")
                logoutRequest(accessToken, DeviceInfo.getDeviceId())
              } else {

                if(license?.facilitator_count>=license?.license_type?.Facilitators){
                  alert("Facilitator count exceeded - assessments unavailable")
                }
                else if(license?.participant_count>=license?.license_type?.Participants){
                  alert("Participate count exceeded - assessments unavailable")
                }
                else if(license?.number_of_devices>=license?.license_type?.number_of_devices_login){
                  alert(`Device count exceeded - you are entitled to ${number_of_devices} devices`)
                }
                else{
                  navigation.navigate('assessments')
                }
              }
            }}
            btnTextStyle={styles.textBtnStyle}
            isBgColor={false}
          />

          <Button
            title={'PARTICIPANTS'}
            btnStyle={styles.participantStyle}
            onBtnPress={() => navigation.navigate('participants')}
            btnTextStyle={styles.textBtnStyle}
            isBgColor={false}
          />
          <Button
            title={loading ? '...Loading' : 'LOG OUT'}
            btnStyle={{ ...styles.logout, backgroundColor: 'black' }}
            onBtnPress={() => {
              setLoading(true)
              logoutRequest(accessToken, DeviceInfo.getDeviceId())
                .then((res) => {
                  setLoading(false)
                  console.log(res.data)
                })
                .catch((err) => {
                  console.log(err)
                  console.log(err?.response?.data)
                  setLoading(false)
                })
            }}
            btnTextStyle={styles.textBtnStyle}
            isBgColor={false}
          />
          <TouchableOpacity onPress={() => navigation.navigate("FAQ")} style={{ alignItems: "center", marginBottom: responsiveFontSize(2) }}>
            <Text style={{ fontSize: width * 0.045, fontWeight: "600", color: "white", fontStyle: "italic" }}>
              FAQ
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: responsiveFontSize(2.5) }}>
              App Version: 2.25
              {/* {deviceInfo.getVersion()} */}
            </Text>
            {/* <Text style={{textAlign:'center',color:'white',fontSize:responsiveFontSize(2),marginTop:responsiveHeight(1)}}>
            Build Number: 2
            </Text> */}
          </View>
          {/* <Button
          title={'RUN AN ASSESSMENT'}
          btnStyle={styles.runAssessmentStyle}
          onBtnPress={() => {
            playSound()
            // navigation.navigate('runAssessment');

          }}
          btnTextStyle={styles.textBtnStyle}
          isBgColor={false}
        /> */}

          {/* <TouchableOpacity
          activeOpacity={0.8}
          onPress={logoutRequest}
          style={styles.logOutBtnStyle}>
          <Heading
            title={'Log Out'}
            passedStyle={{color: 'white', fontSize: width * 0.045}}
            fontType="semi-bold"
          />
        </TouchableOpacity> */}
        </ScrollView>
      </ImageBackground>
    </>
  );
};
const mapStateToProps = ({ userReducer, logo }) => {
  return { userReducer, logo };
};
export default connect(mapStateToProps, actions)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeDarkBlue,
  },
  logoStyle: {
    marginTop: responsiveFontSize(10),
    marginBottom: height * 0.05,
    width: width * 0.4,
    height: height * 0.2,
    alignSelf: 'center',
  },
  asssessmentStyle: {
    backgroundColor: themeFerozi,
    height: height * 0.1,
    alignSelf: 'center',
    marginVertical: height * 0.03,
  },
  participantStyle: {
    backgroundColor: themeLightBlue,
    height: height * 0.1,
    alignSelf: 'center',
    marginVertical: height * 0.03,
  },
  logout: {
    backgroundColor: themeLightBlue,
    alignSelf: 'center',
    marginVertical: height * 0.01,
    width: width / 2.5
  },
  runAssessmentStyle: {
    backgroundColor: themePurple,
    height: height * 0.1,
    alignSelf: 'center',
    marginVertical: height * 0.03,
  },
  textBtnStyle: {
    color: 'white',
    fontSize: width * 0.045,
  },
  logOutBtnStyle: {
    backgroundColor: themeDarkBlue,
    paddingHorizontal: width * 0.01,
    width: width * 0.3,
    paddingVertical: height * 0.008,
    borderRadius: width * 0.34,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: width * 0.05,
  },
  lottieStyle: {
    // height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    // marginTop: height * 0.098,
    // marginLeft: Platform?.OS === 'ios' ? width * 0.05 : width * 0.07,
  },
});
