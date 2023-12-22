import Modal from 'react-native-modal';
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import Heading from './Heading';
import LottieView from 'lottie-react-native';
import Button from './Button';
import {
  themeBlue,
  themeDarkBlue,
  themeLightBlue,
  themePurple,
} from '../assets/colors/colors';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from "../store/actions"
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
import { Dropdown } from 'react-native-element-dropdown';

const TraModal = ({
  isModalVisible,
  setIsModalVisible,
  call
}) => {

  return (
    <Modal onBackButtonPress={() => setIsModalVisible(false)} isVisible={isModalVisible}>
      <View style={styles.container}>
        <Button
          title={'Traditional'}
          onBtnPress={() => {
            call(true)
          }}
          isBgColor={false}
          btnStyle={{...styles.btnStyle,backgroundColor:themeLightBlue}}
          btnTextStyle={styles.btnTextStyle}
        />
        <Button
          title={'Non Traditional'}
          onBtnPress={() => {
            call(false)
          }}
          isBgColor={false}
          btnStyle={{...styles.btnStyle,backgroundColor:themeLightBlue}}
          btnTextStyle={styles.btnTextStyle}
        />
        <Button
          title={'Close'}
          onBtnPress={() => {
            setIsModalVisible(false)
          }}
          isBgColor={false}
          btnStyle={styles.btnStyle}
          btnTextStyle={styles.btnTextStyle}
        />
      </View>
    </Modal>
  );
};
const mapStateToProps = ({ userReducer }) => {
  return { userReducer };
};
export default connect(mapStateToProps, actions)(TraModal);

const styles = StyleSheet.create({
  textLAbel: { color: themeLightBlue, fontSize: width * 0.08 },
  rowView: { flexDirection: 'row', alignItems: 'center' },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.015,
    marginBottom: height * 0.025,
    width: width * 0.35,
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: width * 0.06,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  label: {
    color: 'black',
    fontSize: width * 0.04,
  },
  message: {
    color: 'grey',
    fontSize: width * 0.04,
    marginVertical: height * 0.02,
  },
  inputStyle: {
    borderBottomWidth: 1,
    width: width * 0.8,
    fontSize: width * 0.04,
    marginLeft: 0,
    paddingLeft: 0,
    borderRadius: 0,
  },
  btnStyle: {
    backgroundColor: 'red',
    borderRadius: width * 0.025,
    width: '100%',
    margin: 0,
    marginTop:10
  },
  filterContainer: {
    paddingVertical: height * 0.01,
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: themeLightBlue,
    borderRadius: 10,
    width: width * 0.8,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cancelBtnStyle: {
    borderRadius: width * 0.025,
    width: width * 0.35,
    borderWidth: 1,
    borderColor: themeLightBlue,
    margin: 0,
  },
  btnTextStyle: {
    color: 'white',
    fontSize: width * 0.045,
    // fontFamily: 'Poppins-SemiBold',
  },
  cancelBtnTextStyle: {
    color: themeLightBlue,
    // fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.04,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    // width: width * 0.75,
    width: '100%'
    // minWidth: width * 0.75,
  },
  inputField: {
    marginVertical: height * 0.03,
    height: height * 0.23,
    // backgroundColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1.2,
    borderColor: themeLightBlue,
    borderRadius: width * 0.05,
    fontSize: width * 0.04,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.025,
    textAlignVertical: 'top',
    // fontFamily: 'Poppins-Regular',
  },
  requestingView: {
    backgroundColor: themeLightBlue,
    borderRadius: width * 0.025,
    // paddingVertical: height * 0.015,
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: themeLightBlue,
  },
  lottieStyle: {
    height: height * 0.07,
    // position: 'absolute',
    // marginTop: -30,
    // top: height * 0.005,
    // left: width * 0.01,
  },
  requestLabel: {
    color: 'white',
    fontSize: width * 0.05,
    // marginLeft: width * 0.08,
    // fontFamily: 'Poppins-SemiBold',
  },



  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 8
  },
  icon: {
    marginRight: 5,
  },
  label1: {
    fontSize: 22,
    color: themeBlue,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  },
});
