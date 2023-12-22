import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import React from 'react';
import Heading from './Heading';
import { themeLightPurple } from '../assets/colors/colors';
const { width, height } = Dimensions.get('window');

import LONG_JUMP from '../assets/images/long-jump.png';
import SPRINTING from '../assets/images/sprinting.png';
import SHOT_PUT from '../assets/images/shot-put.png';
import HURDLES from '../assets/images/hurdles.png';
import { imageUrl } from '../config';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const AssessmentMapper = ({ item, index, onPress, assessments }) => {
  let SHOW_IMAGE =
    item?.Name === 'Long Jump'
      ? LONG_JUMP
      : item?.Name === 'Sprinting'
        ? SPRINTING
        : item?.Name === 'Shot Put'
          ? SHOT_PUT
          : HURDLES;
  // console.log("image data",`${imageUrl}/assessment_image/${item?.Image}`)
  // console.log("dddddd", item)
  return (
    <View
      style={[
        styles.container,

        index !== assessments?.length - 1 && {
          borderBottomColor: 'silver',
          borderBottomWidth: 1,
        },
      ]}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: `${imageUrl}/assessment_image/${item?.Image}` }}
          resizeMode="contain"
          style={styles.imageStyles}
        />
        <Heading
          title={item?.Name}
          passedStyle={styles.nameStyle}
          fontType="regular"
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => {
            onPress(item);
          }}>
          <Heading
            title="Run Assessment"
            passedStyle={styles.textBtnStyle}
            fontType="semi-bold"
          />
        </TouchableOpacity>
        {/* <View style={{marginTop:responsiveHeight(0.5)}}>
          <Text style={{color:'white',fontSize:responsiveFontSize(1.25)}}>DT recorded: {item.dt_recorded?.DTRecorded}</Text>
        </View> */}
      </View>
    </View>
  );
};

export default AssessmentMapper;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: responsiveFontSize(1.5),
    alignSelf: 'center',
    zIndex: 999,
    //   marginTop:-100,
    // borderBottomColor: 'silver',
    // borderBottomWidth: 1,
    height: height * 0.09,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnStyle: {
    height: height * 0.046,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeLightPurple,
    alignSelf: 'center',
    width: width * 0.43,
    borderRadius: 25,
  },
  nameStyle: {
    color: 'white',
    fontSize: width * 0.035,
    width: width * 0.3,
    alignSelf: 'center',
    marginHorizontal: width * 0.02,
  },
  textBtnStyle: {
    color: 'white',
    fontSize: width * 0.04,
  },
  imageStyles: {
    width: width * 0.072,
    height: height * 0.045,
  },
});
