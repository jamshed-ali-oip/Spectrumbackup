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

const {width, height} = Dimensions.get('window');

const ResetPasswordScreen = ({
  navigation,
  userReducer,
  route,
  resetPassword,
  logo
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState('');
  const [cnfrmPassword, setCnfrmPassword] = useState('');

  const _onPressLoginButton = async () => {
    const data = {
      password: password,
      password_confirmation: cnfrmPassword,
      email: route?.params.data,
    };
    if (password.length == 0 || cnfrmPassword.length == 0) {
      showMessage({
        message: 'Both New Password and Confirm Password are required!',
        type: 'danger',
      });
    }  else if (password !== cnfrmPassword) {
      showMessage({
        message: 'Both New Password and Confirm Password should be the same',
        type: 'danger',
      });
    }
    
    else {
      setIsLoading(true);
      await resetPassword(data, onFailed,onSuccess);
    }
  };

  const onFailed = () => {
    setIsLoading(false);
  };

  const onSuccess = () => {
    navigation.navigate('login');
  };
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />

      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{paddingBottom: height * 0.3}}>
              {
                logo &&(
                  <Image
                source={{uri:logo}}
                style={styles.logoStyle}
                resizeMode="contain"
              />
                )
              }

              {/* New Password  */}
              <View style={styles.passwordViewContainer}>
                <TextInput
                  placeholder="New Password"
                  placeholderTextColor="#565B66"
                  style={[
                    styles.inputfieldPassword,
                    {fontSize: showPassword ? width * 0.04 : width * 0.04,color:'black'},
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

              {/* Confirm Password  */}
              <View style={styles.passwordViewContainer}>
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="#565B66"
                  style={[
                    styles.inputfieldPassword,
                    {fontSize: showPassword ? width * 0.04 : width * 0.04,color:'black'},
                  ]}
                  value={setCnfrmPassword}
                  onChangeText={e => {
                    if (e == ' ' || isLoading) {
                      return;
                    }
                    setCnfrmPassword(e);
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
                  activeOpacity={0.9}
                  onPress={() => _onPressLoginButton()}
                  style={styles.loginBtnStyle}>
                  <Heading
                    title="Reset Password Now"
                    passedStyle={styles.loginTextStyle}
                    fontType="semi-bold"
                  />
                </TouchableOpacity>
              )}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({userReducer,logo}) => {
  return {userReducer,logo};
};
export default connect(mapStateToProps, actions)(ResetPasswordScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  logoStyle: {
    marginTop: height * 0.15,
    marginBottom: height * 0.05,
    width: width * 0.4,
    height: height * 0.2,
    alignSelf: 'center',
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
