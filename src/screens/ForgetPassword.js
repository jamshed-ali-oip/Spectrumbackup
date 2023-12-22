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
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Heading from '../components/Heading';
import {themeBlue, themeDarkBlue} from '../assets/colors/colors';
import * as actions from '../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import {showMessage} from 'react-native-flash-message';
import {useEffect} from 'react';

const {width, height} = Dimensions.get('window');

const ForgetPassword = ({navigation, userReducer, forgetPassword}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  const _onPressButton = async () => {
    if (email.length == 0) {
      showMessage({
        message: 'Email Required!',
        type: 'danger',
      });
    } else {
      setIsLoading(true);
      await forgetPassword({email}, onFailed, onSuccess);
    }
  };

  const onFailed = () => {
    setIsLoading(false);
  };

  const onSuccess = async () => {
    await setIsLoading(false);
    navigation.navigate('otp', {data: email,resendOTP:(off)=>forgetPassword({email}, off, off)});
  };

  useEffect(() => {
    // console.log(wordCount);
  }, [wordCount]);

  useEffect(() => {
    if (email?.length == 0) {
      setWordCount(0);
    }
    // console.log(email);
  }, [email]);
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />

      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{paddingBottom: height * 0.3}}>
              {/* <Image
                source={require('../assets/images/new-logo.png')}
                style={{
                  marginTop: height * 0.15,
                  marginBottom: height * 0.05,
                  width: width * 0.4,
                  height: height * 0.2,
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              /> */}
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#565B66"
                style={[
                  styles.inputfield,
                  {marginBottom: width * 0.04, marginTop: height * 0.1,color:'black'},
                ]}
                onChangeText={e => {
                  // console.log(e[e.length-1],"---")
                  setEmail(e);
                  // if (e[e.length - 1] == ' ') {
                    setWordCount(wordCount + 1);
                    // return;
                  // }
                }}
                value={email}
              />

              {isLoading ? (
                <View style={styles.loginBtnStyle}>
                  <LottieView
                    speed={1}
                    style={styles.lottieStyle}
                    autoPlay
                    loop
                    source={require('../assets/lottie/color-loader.json')}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => _onPressButton()}
                  style={styles.loginBtnStyle}>
                  <Heading
                    title="Request Password Reset"
                    passedStyle={styles.loginTextStyle}
                    fontType="semi-bold"
                  />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (!isLoading) {
                    navigation.navigate('login');
                  }
                }}
                style={{marginTop: height * 0.03}}>
                <Heading
                  title="Sign In Now"
                  passedStyle={{
                    color: 'white',
                    fontSize: width * 0.037,
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({userReducer}) => {
  return {userReducer};
};
export default connect(mapStateToProps, actions)(ForgetPassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: height,
  },
  inputfield: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: width * 0.9,
    borderRadius: width * 0.5,
    paddingLeft: 20,
    height: Platform.OS == 'ios' ? height * 0.065 : height * 0.07,
    fontFamily: 'Montserrat-Medium',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputfieldPassword: {
    alignSelf: 'center',
    width: width * 0.8,
    borderBottomLeftRadius: width * 0.5,
    borderTopLeftRadius: width * 0.5,
    paddingLeft: 20,
    height: Platform.OS == 'ios' ? height * 0.065 : height * 0.07,
    fontFamily: 'Montserrat-Medium',
  },
  loginBtnStyle: {
    backgroundColor: themeBlue,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.9,
    height: Platform.OS == 'ios' ? height * 0.065 : height * 0.07,
    marginTop: height * 0.02,
  },
  passwordViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: width * 0.9,
    borderRadius: width * 0.5,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: width * 0.04,
    elevation: 5,
  },
  loginTextStyle: {
    color: 'white',
    fontSize: width * 0.04,
    alignSelf: 'center',
  },
  lottieStyle: {
    height: height * 0.1,
    // marginTop: height * 0.098,
    // marginLeft: width * 0.07,
  },
});
