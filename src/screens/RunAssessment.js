import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import {
  themeDarkBlue,
  themeFerozi,
  themeLightPurple,
  themePink,
  themeYellow,
} from '../assets/colors/colors';
import ColoredFlatlist from '../components/ColoredFlatlist';
import Heading from '../components/Heading';
import IconComp from '../components/IconComp';
import LONG_JUMP from '../assets/images/long-jump.png';
import SPRINTING from '../assets/images/sprinting.png';
import SHOT_PUT from '../assets/images/shot-put.png';
import HURDLES from '../assets/images/hurdles.png';
import { imageUrl } from '../config';
import Entypo from "react-native-vector-icons/Feather"
import { useState } from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Video from 'react-native-video';
import {connect} from "react-redux"
const { width, height } = Dimensions.get('window');

const RunAssessment = ({ navigation, route ,userReducer}) => {
  const [videoModal, setVideoModal] = useState(false)
  const _onPressRunAssessment = () => { };
  const ITEM = route.params.item;

  let SHOW_IMAGE =
    ITEM?.Name === 'Long Jump'
      ? LONG_JUMP
      : ITEM?.Name === 'Sprinting'
        ? SPRINTING
        : ITEM?.Name === 'Shot Put'
          ? SHOT_PUT
          : HURDLES;


  function renderModal() {
    return (
      <Modal>
        <Video
          controls={true}
          resizeMode="cover"
          onEnd={() => {
            setVideoModal(false)
          }}
          style={{ width: responsiveWidth(100), height: responsiveHeight(100) }}
          source={{ uri: `${imageUrl}/assessment_image/${route.params?.item?.video}` }}
        />
        <TouchableOpacity
          onPress={() => setVideoModal(false)}
          style={{ position: 'absolute', right: 0, top: 0, paddingRight: responsiveWidth(2), paddingTop: responsiveHeight(1) }}
        >
          <Entypo color={"white"} name="x" size={responsiveFontSize(3.5)} />
        </TouchableOpacity>
      </Modal>
    )
  }
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        {videoModal && renderModal()}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.headingView}>
            <Heading
              title={'ASSESSMENTS'}
              passedStyle={styles.headingStyles}
              fontType="semi-bold"
            />
          </View>

          {/* Participants Head View  */}
          {/* <ScrollView>
          
        </ScrollView> */}
          <View
            style={{
              marginVertical: 10,
              // marginLeft: width * 0.05,
            }}>
            <View style={styles.participantsViewStyle}>
              <Heading
                title="Run Assessment"
                passedStyle={styles.participantsLabelStyle}
                fontType="regular"
              />
              <IconComp
                iconName={'chevron-right'}
                type="Feather"
                passedStyle={styles.iconStyle}
              />
              <Heading
                title={ITEM.Name?.length < 18 ? ITEM.Name : (ITEM.Name.slice(0, 18) + " ...")}
                passedStyle={styles.participantsLabelStyle}
                fontType="semi-bold"
              />
            </View>
          </View>

          {/* Colors  */}
          <ColoredFlatlist />

          <View style={styles.assessmentListStyle}>
            <Image
              resizeMode="contain"
              source={{ uri: `${imageUrl}/assessment_image/${ITEM.Image}` }}
              style={{
                width: width * 0.4,
                height: height * 0.13,
                //   marginVertical: height * 0.03,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.buttonContainerStyles}
              onPress={() => navigation.navigate('grades', { item: ITEM,traditional:route?.params?.traditional })}>
              <Heading
                title={'START'}
                passedStyle={[
                  styles.buttonStyles,
                  { backgroundColor: themeFerozi },
                ]}
                fontType="bold"
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.buttonContainerStyles,
              {backgroundColor: themeLightPurple},
            ]}>
            <Heading
              title={'INFORMATION'}
              passedStyle={[
                styles.buttonStyles,
                {backgroundColor: themeLightPurple},
              ]}
              fontType="semi-bold"
            />
           </TouchableOpacity> */}

            {/* <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.buttonContainerStyles,
              {backgroundColor: themeYellow},
            ]}>
            <Heading
              title={'SETUP'}
              passedStyle={[
                styles.buttonStyles,
                {backgroundColor: themeYellow},
              ]}
              fontType="semi-bold"
            />
           </TouchableOpacity> */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('faciliator', { data: ITEM })}
              style={[
                styles.buttonContainerStyles,
                { backgroundColor: themePink },
              ]}>
              <Heading
                title={'FACILITATOR INSTRUCTIONS'}
                passedStyle={[styles.buttonStyles, { backgroundColor: themePink }]}
                fontType="bold"
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('setup', { data: ITEM })}
              style={[
                styles.buttonContainerStyles,
                { backgroundColor: "#F9A603" },
              ]}>
              <Heading
                title={' SETUP'}
                passedStyle={[styles.buttonStyles, { backgroundColor: "#F9A603" }]}
                fontType="bold"
              />
            </TouchableOpacity>
            {userReducer?.userData?.show_video==1 && (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  if (route?.params?.item?.video) {
                    setVideoModal(true)
                  } else {
                    alert("No Video Found")
                  }
                }}
                style={[
                  styles.buttonContainerStyles,
                  { backgroundColor: "#6800b8" },
                ]}>
                <Heading
                  title={'VIDEO'}
                  passedStyle={[styles.buttonStyles, { backgroundColor: "#6800b8" }]}
                  fontType="bold"
                />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};
const mapStateToProps = ({ userReducer }) => {
  return { userReducer };
};

export default connect(mapStateToProps)(RunAssessment);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeDarkBlue,
  },
  headingStyles: {
    color: 'white',
    backgroundColor: themeFerozi,
    fontSize: width * 0.045,
    paddingVertical: height * 0.01,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  headingView: {
    backgroundColor: themeFerozi,
    borderRadius: width * 0.05,
    width: width * 0.55,
    marginBottom: height * 0.1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  buttonStyles: {
    color: 'white',

    fontSize: width * 0.04,

    // paddingVertical: height * 0.02,

    textAlign: 'center',
    // marginTop: height * 0.02,
    // marginBottom: height * 0.1,
  },
  buttonContainerStyles: {
    width: width * 0.9,
    backgroundColor: themeFerozi,
    justifyContent: 'center',
    paddingVertical: height * 0.02,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: width * 0.5,
    marginVertical: height * 0.02,
  },
  assessmentListStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center'
    // marginTop:height*0.05
    // left: width * 0.05,
  },
  participantsViewStyle: {
    marginVertical: 10,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: width * 0.05,
  },
  participantsLabelStyle: {
    fontSize: width * 0.04,
    color: 'white',
  },
  iconStyle: {
    color: 'white',
    fontSize: width * 0.05,
    marginLeft: 5,
  },
});
