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
import React, { useState } from 'react';
import Heading from '../components/Heading';
import { themeBlue, themeDarkBlue } from '../assets/colors/colors';
import * as actions from '../store/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import { showMessage } from 'react-native-flash-message';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import DeviceInfo from 'react-native-device-info';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation, userReducer, loginRequest, logo }) => {
  // const [email, setEmail] = useState('talhakhan105@yahoo.com');
  // const [password, setPassword] = useState('123456789');
  // const [email, setEmail] = useState('veneyi4348@moneyzon.com');
  // const [password, setPassword] = useState('123456789');
  // const [email, setEmail] = useState('bavok99845@ukbob.com');
  // const [password, setPassword] = useState('123456789');
  // const [email, setEmail] = useState('hohad63693@mitigado.com');
  // const [password, setPassword] = useState('123456789');
  // const [email, setEmail] = useState('xipan93410@brandoza.com');
  // const [password, setPassword] = useState('123456789');
  //   const [email, setEmail] = useState('garem83903@ekcsoft.com');
  // const [password, setPassword] = useState('123456789');
  //     const [email, setEmail] = useState('tefik14708@vingood.com');
  // const [password, setPassword] = useState('123456789');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  const _onPressLoginButton = async () => {
    if (email.length == 0 || password.length == 0) {
      showMessage({
        message: 'Credentials Required!',
        type: 'danger',
      });
    } else {
      if (password.length < 8) {
        showMessage({
          message: 'password must be a minimum of 8 characters',
          type: 'danger',
        });
      } else {
        setIsLoading(true);
        DeviceInfo.getDeviceName()
        .then(async(res)=>{
        await loginRequest({ email, password }, onLoginFailed,DeviceInfo.getDeviceId(),res);    
        })
      }
    }
  };

  const onLoginFailed = () => {
    setIsLoading(false);
  };
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />

      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
              {logo && (
                <Image
                  source={{ uri: logo }}
                  style={{
                    marginTop: responsiveFontSize(10),
                    width: width * 0.4,
                    height: height * 0.2,
                    alignSelf: 'center',
                  }}
                  resizeMode="contain"
                />
              )}
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#565B66"
                style={[
                  styles.inputfield,
                  { marginBottom: width * 0.04, marginTop: responsiveFontSize(10), color: 'black' },
                ]}
                onChangeText={e => {
                  if (e == ' ' || isLoading) {
                    return;
                  }
                  setEmail(e);
                }}
                value={email}
              />

              <View style={styles.passwordViewContainer}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#565B66"
                  style={[
                    styles.inputfieldPassword,
                    { fontSize: showPassword ? width * 0.04 : width * 0.04, color: 'black' },
                  ]}
                  value={password}
                  onChangeText={e => {
                    if (e == ' ' || isLoading) {
                      return;
                    }
                    setPassword(e);
                  }}
                  secureTextEntry={showPassword}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}>
                  <Icon
                    name={showPassword ? 'eye-slash' : 'eye'}
                    color="grey"
                    style={{
                      fontSize: width * 0.045,
                      marginRight: width * 0.03,
                    }}
                  />
                </TouchableOpacity>
              </View>

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
                  onPress={() => _onPressLoginButton()}
                  style={styles.loginBtnStyle}>
                  <Heading
                    title="LOG IN"
                    passedStyle={styles.loginTextStyle}
                    fontType="semi-bold"
                  />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('forgetPassword');
                }}
                style={{ marginVertical: height * 0.03 }}>
                <Heading
                  title="Forgot Password"
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

const mapStateToProps = ({ userReducer, logo }) => {
  return { userReducer, logo };
};
export default connect(mapStateToProps, actions)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    // height: height,
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
