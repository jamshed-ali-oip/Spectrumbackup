import React, {Component, useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, Text, Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ParticipantsScreen from './screens/ParticipantsScreen';
import ViewParticipants from './screens/ViewParticipants';

import Button from './components/Button';
import IconComp from './components/IconComp';
import {themeDarkBlue} from './assets/colors/colors';
import Assessments from './screens/Assessments';
import RunAssessment from './screens/RunAssessment';
import GroupsScreen from './screens/GroupsScreen';
import GradesScreen from './screens/GradesScreen';
import ForgetPassword from './screens/ForgetPassword';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import OtpScreen from './screens/OtpScreen';
const {width, height} = Dimensions.get('window');

const BeforeLoginStack = createStackNavigator();

const BeforeLoginNavigator = ({navigation}) => {
  return (
    <BeforeLoginStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="login">
      <BeforeLoginStack.Screen
        name="login"
        options={{headerShown: false}}
        component={LoginScreen}
      />

      <BeforeLoginStack.Screen
        name="forgetPassword"
        options={{headerShown: false}}
        component={ForgetPassword}
      />

      <BeforeLoginStack.Screen
        name="resetPassword"
        options={{headerShown: false}}
        component={ResetPasswordScreen}
      />

      <BeforeLoginStack.Screen
        name="otp"
        options={{headerShown: false}}
        component={OtpScreen}
      />
    </BeforeLoginStack.Navigator>
  );
};

export default BeforeLoginNavigator;
