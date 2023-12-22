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
    Platform,
    RefreshControl,
    ScrollView,
  } from 'react-native';
  import React, {useState, useEffect, useCallback} from 'react';
  import Heading from '../components/Heading';
  import Button from '../components/Button';
  import {
    themeBlue,
    themeDarkBlue,
    themeFerozi,
    themeLightBlue,
    themePurple,
  } from '../assets/colors/colors';
  import {template} from '@babel/core';
  import IconComp from '../components/IconComp';
  import ColoredFlatlist from '../components/ColoredFlatlist';
  import {connect} from 'react-redux';
  import * as actions from '../store/actions';
  import LottieView from 'lottie-react-native';
  import ParticipantFilterModal from '../components/ParticipantFilterModal';
  import {imageUrl} from '../config';
  
  const {width, height} = Dimensions.get('window');
  
  const setup = ({
    route,
    navigation,
    userReducer,
    getFaciliatorInstructions,
  }) => {
    // const accessToken = userReducer.accessToken;
    const DATA = route.params?.data;
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
 
  
    const wait = timeout => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    };
  
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      wait(1500).then(() => {
        setRefreshing(false);
        // getInstructions();
      });
    }, []);
  

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
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <View style={styles.headingView}>
                <Heading
                  title={DATA?.Name}
                  passedStyle={styles.headingStyles}
                  fontType="semi-bold"
                />
              </View>
  
              <Image
                resizeMode="contain"
                source={{uri: `${imageUrl}/assessment_image/${DATA?.Image}`}}
                style={{
                  width: width * 0.4,
                  height: height * 0.13,
                  alignSelf: 'center',
                  marginBottom: height * 0.05,
                }}
              />
  {/* {console.log("my setup",DATA.Setup)} */}
              <Heading
                title={DATA?.Setup}
                fontType="medium"
                passedStyle={{
                  fontSize: width * 0.04,
                  color: 'white',
                  marginHorizontal: width * 0.05,
                  paddingBottom: height * 0.04,
                }}
              />
            </ScrollView>
          )}
        </ImageBackground>
      </>
    );
  };
  
  const mapStateToProps = ({userReducer}) => {
    return {userReducer};
  };
  
  export default connect(mapStateToProps, actions)(setup);
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
    btnStyle: {
      height: height * 0.06,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeLightBlue,
      alignSelf: 'center',
      width: width * 0.41,
    },
    btnTextStyle: {
      color: 'white',
      fontSize: width * 0.04,
      fontFamily: 'Montserrat-SemiBold',
    },
    selectFilterStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: width * 0.05,
    },
    selectFilterTextStyle: {
      fontSize: width * 0.04,
      color: 'white',
    },
    rightIconStyle: {
      color: 'white',
      fontSize: width * 0.05,
      marginLeft: 5,
    },
    filterLabelViewStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: width * 0.05,
      marginVertical: 10,
    },
    filterLabelStyle: {
      fontSize: width * 0.04,
      color: 'white',
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
      width: width * 0.55,
      marginBottom: height * 0.05,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: height * 0.02,
    },
  });
  