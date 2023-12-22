import { StyleSheet, Text, View, SafeAreaView, Platform, Dimensions, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BeforeLoginNavigator from './BeforeLoginNavigator';
import AfterLoginNavigator from './AfterLoginNavigator';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import * as actions from "./store/actions/index"
import TourVideo from './screens/TourVideo';
import DeviceInfo from 'react-native-device-info';
const { width, height } = Dimensions.get('window');


const MainNavigator = ({ userReducer, getLoginImg,videoRed,videoWatched }) => {
  const IS_LOGIN = userReducer?.isLogin;
  const ACCESS_TOKEN = userReducer?.accessToken;
  const [loading, setLoading] = useState(true)
  const [watch,setWatch]=useState(false)
  useEffect(() => {
    setLoading(true)
    getLoginImg(DeviceInfo.getDeviceId()).then(() => setLoading(false)).catch(() => setLoading(false))
  }, [])

  useEffect(()=>{
    // console.log("vid",videoRed)
    if(videoRed.is_watch==0){
      setWatch(false)
    }else{
      setWatch(true)
    }
  },[videoRed])
  function done(){
    videoWatched(DeviceInfo.getDeviceId())
    .then((res)=>{
      // console.log("Ress",res.data)
      setWatch(true)
    })
    .catch(err=>console.log(err))
  }
  if (loading) {
    return (
      <ImageBackground
      source={require('./assets/images/bg.jpg')}
      style={styles.container}
      >
        <LottieView
          speed={1}
          style={styles.lottieStyle}
          autoPlay
          loop
          source={require('./assets/lottie/color-loader.json')}
        />
      </ImageBackground>
    )
  }
  
  // if(watch){
    return (
      <NavigationContainer theme={{ colors: "black" }}>
        
        {/* <AfterLoginNavigator/> */}
        {ACCESS_TOKEN ? <AfterLoginNavigator /> : <BeforeLoginNavigator />}
      </NavigationContainer>
    )
  // }else{
  //   return <TourVideo done={done} uri={videoRed?.videoUrl}/>
  // }
};

const mapStateToProps = ({ userReducer,videoRed }) => {
  return {
    userReducer,
    videoRed
  };
};
const styles = StyleSheet.create({

  lottieStyle: {
    height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    marginTop: height * 0.098,
    marginLeft: Platform?.OS === 'ios' ? width * 0.05 : width * 0.07,
  },
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
})

export default connect(mapStateToProps, actions)(MainNavigator);
