import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Heading from '../components/Heading';
import * as actions from '../store/actions';
import background_img from '../assets/images/bg.jpg';
import LottieView from 'lottie-react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import {themeBlue, themeDarkBlue} from '../assets/colors/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Otp = ({
  route,
  verifyOtp,
  UserReducer,
  setErrorModal,
  requestNewOtp,
  navigation,
}) => {
  const [otpCode, setOtpCode] = useState('');
  // const isFocused = useIsFocused();
  const [showVerificationFailedModal, setShowVerificationFailedModal] =
    useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const isFocused = useIsFocused();

  // Confirm Code
  const _onConfirmOtp = async () => {
    setIsVerifying(true);
    await verifyOtp(
      {
        email: route?.params?.data,
        otp: otpCode,
      },

      _onFailure,
      _onSuccess,
    );
  };

  // Request New Code
  const _onPressRequestNewCode = async () => {
    setIsRequesting(true);
    const data = {
      ...route.params,
      service_type: route.params?.service_type?.name,
    };
    await requestNewOtp(data);
    setShowVerificationFailedModal(false);
    setOtpCode('');
    setIsRequesting(false);
  };

  // On Verification Success
  const _onSuccess = () => {
    navigation.navigate('resetPassword', {
      ...route.params,
    });
  };

  // On Verification Failure
  const _onFailure = () => {
    setIsVerifying(false);
    setOtpCode('');
  };

 
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: themeDarkBlue}}>
      {/* <AppStatusBar
        backgroundColor={colors.themePurple1}
        barStyle="light-content"
      /> */}
      <ImageBackground source={background_img} style={styles.image}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          {isVerifying ? (
            <View style={styles.verifyingView}>
              <Heading
                title="Verifying OTP Code"
                passedStyle={styles.verifyingOtpCode}
                fontType="semi-bold"
              />
              <LottieView
                speed={1}
                style={styles.lottieStyles}
                autoPlay
                loop
                source={require('../assets/lottie/color-loader.json')}
              />
            </View>
          ) : (
            <View style={styles.inputBoxes}>
              <Heading
                title="Enter OTP Code"
                passedStyle={styles.heading}
                fontType="semi-bold"
              />
              <OTPInputView
                // ref={inputRef}
                style={{width: '80%', height: 100}}
                pinCount={4}
                code={otpCode} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged={code => {
                  setOtpCode(code);
                }}
                autoFocusOnLoad={true}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                // onCodeFilled={code => {
                //   _onConfirmOtp(code);
                // }}
              />
              <TouchableOpacity
                onPress={() => _onConfirmOtp()}
                style={{
                    marginTop:height * 0.07,
                  width: width * 0.5,
                  height: height * 0.07,
                  borderRadius: width * 0.1,
                  backgroundColor: themeBlue, justifyContent:'center',alignItems:'center'
                }}>
                <Heading
                  title="Verify"
                  fontType={'semi-bold'}
                  passedStyle={{color: 'white', fontSize: width * 0.04}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsVerifying(true)
                  route.params.resendOTP(()=>setIsVerifying(false))
                }}
                style={{
                  marginTop:height * 0.07,
                  width: width * 0.5,
                  height: height * 0.07,
                  borderRadius: width * 0.1,
                  backgroundColor: themeBlue, justifyContent:'center',alignItems:'center'
                }}>
                <Heading
                  title="Resend OTP"
                  fontType={'semi-bold'}
                  passedStyle={{color: 'white', fontSize: width * 0.04}}
                />
              </TouchableOpacity>
            </View>
          )}

          {/* {showVerificationFailedModal && (
            <AlertModal
              buttonText={'Request New Code'}
              title="Verification Failed :("
              onPress={_onPressRequestNewCode}
              showLoader={isRequesting}
              isModalVisible={showVerificationFailedModal}
              setIsModalVisible={setShowVerificationFailedModal}
              message="Something went wrong in verification."
            />
          )}
          {
            showErrorAlert && isFocused && (
              <AlertModal
                title="Oh Snaps:("
                isModalVisible={showErrorAlert}
                setIsModalVisible={setShowErrorAlert}
                onPress={() => {
                  setShowErrorAlert(false);
                  setErrorModal();
                  setShowVerificationFailedModal(true);
                }}
                message={UserReducer?.errorModal?.msg}
              />
            )
          } */}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  verifyingView: {
    alignItems: 'center',
    position: 'relative',
    height: height * 0.3,
    justifyContent: 'center',
  },
  verifyingOtpCode: {
    color: 'white',
    fontSize: width * 0.085,
    // position: 'absolute',
    marginBottom: height * 0.2,
  },

  lottieStyles: {
    marginTop: 20,
    height: height * 0.3,
    position: 'absolute',
    // bottom: height * 0.001,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLinePosition: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: width * 0.5,
  },
  image: {
    width: width,
    height: height,
    alignSelf: 'center',
    flex: 1,
  },

  inputBoxes: {
    marginHorizontal: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: width * 0.11,
  },

  // OTP Styles
  underlineStyleBase: {
    width: width * 0.15,
    height: height * 0.08,
    fontSize: width * 0.07,
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: width * 0.02,
    color: themeBlue,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(Otp);
