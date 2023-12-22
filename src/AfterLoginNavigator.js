import React, {Component, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ParticipantsScreen from './screens/ParticipantsScreen';
import ViewParticipants from './screens/ViewParticipants';
import PushNotification from 'react-native-push-notification';

import messaging from '@react-native-firebase/messaging';
import Button from './components/Button';
import IconComp from './components/IconComp';
import {themeDarkBlue} from './assets/colors/colors';
import Assessments from './screens/Assessments';
import RunAssessment from './screens/RunAssessment';
import GroupsScreen from './screens/GroupsScreen';
import GradesScreen from './screens/GradesScreen';
import TimeAssessment from './screens/TimeAssessment';
import GradingSystem from './screens/GradingSystem';
import GroupFilter from './components/GroupFilter';
import ScaleScreen from './screens/ScaleScreen';
import FaciliatorInstructionsScreen from './screens/FaciliatorInstructionsScreen';
import {connect} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {io} from 'socket.io-client';
import * as actions from './store/actions/index';
import FAQ from './screens/FAQ';
import setup from './screens/setup';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Setting from './screens/Setting';

const {width, height} = Dimensions.get('window');

const AfterLoginStack = createStackNavigator();

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('FCM Authorization:', authStatus);
  }
};
const forFade = ({ current, closing }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
const AfterLoginNavigator = ({navigation, userReducer, saveSocketRef,logo}) => {
  const socket = useRef();
  useEffect(() => {
    socket.current = io('http://webprojectmockup.com:9444');
    // saveSocketRef(socket.current);
    requestUserPermission();
    messaging()
      .subscribeToTopic('spectrum' + userReducer?.userData?.id?.toString())
      .then(() => {
        // console.log('NOTIFICATIONS SUBSCRIBED');
      });

    try {
      // messaging()
      //   .getToken()
      //   .then(token => {
      //     console.log('TOKEN: : : : :  :', token);
      //     // setFCMToken(token);
      //   });
      messaging().onNotificationOpenedApp(remoteMessage => {
        // console.log(
        //   'Notification caused app to open from background state:',
        //   remoteMessage.notification,
        // );
      });
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            // console.log(
            //   'Notification caused app to open from quit state:',
            //   remoteMessage.notification,
            // );
          }
        });

      const unsubscribe = messaging().onMessage(async remoteMessage => {
        // console.log(remoteMessage, 'notification');

        // Call api to get notifications data
        // if (remoteMessage?.data?.type == 'likePost') {
        //   getNotifications(USER_ID);
        //   await showNotificationsBadge();
        // }

        if (remoteMessage.notification) {
          PushNotification.localNotification({
            channelId: 'channel-id',
            channelName: 'My channel',
            message: remoteMessage.notification.body,
            playSound: true,
            title: remoteMessage.notification.title,
            priority: 'high',
            soundName: 'default',
          });
        }
      });
      return unsubscribe;
    } catch (e) {
      // console.log(e);
    }
  }, []);
  return (
    <AfterLoginStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="home">
      <AfterLoginStack.Screen
        name="home"
        options={{headerShown: false,cardStyleInterpolator:forFade,}}
        
        component={HomeScreen}
      />

      <AfterLoginStack.Screen
        name="participants"
        options={({route, navigation}) => ({
          headerShown: true,
          cardStyleInterpolator:forFade,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10,paddingRight:responsiveFontSize(3)}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={{uri:logo}}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={ParticipantsScreen}
      />

      <AfterLoginStack.Screen
        name="viewParticipants"
        options={({route, navigation}) => ({
          headerShown: true,
          cardStyleInterpolator:forFade,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={{uri:logo}}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        >
          {(props)=><ViewParticipants {...props} socket={socket.current}/>}
        </AfterLoginStack.Screen>
        <AfterLoginStack.Screen
        name="setting"
        options={({route, navigation}) => ({
          headerShown: true,
          cardStyleInterpolator:forFade,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={{uri:logo}}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        >
          {(props)=><Setting {...props} socket={socket.current}/>}
        </AfterLoginStack.Screen>
      <AfterLoginStack.Screen
        name="assessments"
        options={({route, navigation}) => ({
          headerShown: true,
          cardStyleInterpolator:forFade,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10,paddingRight:responsiveFontSize(3)}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={{uri:logo}}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={Assessments}
      />

      <AfterLoginStack.Screen
        name="runAssessment"
        options={({route, navigation}) => ({
          headerShown: true,
          cardStyleInterpolator:forFade,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10,paddingRight:responsiveFontSize(3)}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={{uri:logo}}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={RunAssessment}
      />

      <AfterLoginStack.Screen
        name="groups"
        options={({route, navigation}) => ({
          headerShown: true,
          cardStyleInterpolator:forFade,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={{uri:logo}}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={GroupsScreen}
      />

      <AfterLoginStack.Screen
        name="grades"
        options={({route, navigation}) => ({
          headerShown: true,
          cardStyleInterpolator:forFade,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10,paddingRight:responsiveFontSize(3)}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={{uri:logo}}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={GradesScreen}
      />

      <AfterLoginStack.Screen
        name="timeAssessment"
        options={({route, navigation}) => ({
          headerShown: true,
          cardStyleInterpolator:forFade,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                if (!userReducer?.hasStartedGame) {
                  navigation.navigate('home');
                } else {
                  showMessage({
                    type: 'danger',
                    message: 'Stop game to navigate.',
                  });
                }
                // console.log(userReducer?.hasStartedGame);
              }}
              style={{padding: 10,paddingRight:responsiveFontSize(3)}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={{uri:logo}}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                if (!userReducer?.hasStartedGame) {
                  navigation.goBack();
                } else {
                  showMessage({
                    type: 'danger',
                    message: 'Stop game to navigate.',
                  });
                }
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={TimeAssessment}
      />

      <AfterLoginStack.Screen
        name="gradingScreen"
        options={({route, navigation}) => ({
          headerShown: true,
          cardStyleInterpolator:forFade,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',

          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10,paddingRight:responsiveFontSize(3)}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={{uri:logo}}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={GradingSystem}
      />

      <AfterLoginStack.Screen
        name="scaleScreen"
        options={({route, navigation}) => ({
          headerShown: true,
          cardStyleInterpolator:forFade,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',

          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10,paddingRight:responsiveFontSize(3)}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={{uri:logo}}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={ScaleScreen}
      />
        <AfterLoginStack.Screen
        name="FAQ"
        options={({route, navigation}) => ({
          headerShown: true,
          cardStyleInterpolator:forFade,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',

          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={{uri:logo}}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={FAQ}
      />

      <AfterLoginStack.Screen
        name="faciliator"
        options={({route, navigation}) => ({
          headerShown: true,
          cardStyleInterpolator:forFade,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={{uri:logo}}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10,paddingRight:responsiveFontSize(3)}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={FaciliatorInstructionsScreen}
      />
         <AfterLoginStack.Screen
        name="setup"
        options={({route, navigation}) => ({
          headerShown: true,
          cardStyleInterpolator:forFade,
          headerStyle: {
            height: Platform.OS === 'ios' ? height * 0.14 : height * 0.09,
            borderColor: themeDarkBlue,
            backgroundColor: themeDarkBlue,
          },
          title: '',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{padding: 10}}
              activeOpacity={0.9}>
              <Image
                resizeMode="contain"
                style={{height: height * 0.06, width: width * 0.12}}
                source={{uri:logo}}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{padding: 10,paddingRight:responsiveFontSize(3)}}
              activeOpacity={0.9}>
              <IconComp
                iconName={'chevron-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.06}}
              />
            </TouchableOpacity>
          ),
        })}
        component={setup}
      />
      
      
    </AfterLoginStack.Navigator>
  );
};

const mapStateToProps = ({userReducer,logo}) => {
  return {
    userReducer,
    logo
  };
};
export default connect(mapStateToProps, actions)(AfterLoginNavigator);
