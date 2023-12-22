import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  StatusBar,
  FlatList,
  RefreshControl,
  Platform,
  Text,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import LottieView from 'lottie-react-native';
import { themeDarkBlue, themeFerozi } from '../assets/colors/colors';
import AssessmentMapper from '../components/AssessmentMapper';
import ColoredFlatlist from '../components/ColoredFlatlist';
import Heading from '../components/Heading';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import TraModal from "../components/TraModal"
import DeviceInfo from 'react-native-device-info';


const { width, height } = Dimensions.get('window');

const Assessments = ({ navigation, userReducer, getAssessments }) => {
  const accessToken = userReducer.accessToken;
  const [assessments, setAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal] = useState(false)
  const [current, setCurrent] = useState({})

  // console.log("firstjolj",userReducer)
  const _onPressRunAssessment = traditional => {
    setModal(false)
    navigation.navigate('runAssessment', { item: current, traditional });
    // console.log("ljdkahsilh",item)
  };

  useEffect(() => {
    getAllAssessments();
  }, []);

  useEffect(() => {
    setAssessments(userReducer?.assessments);
  }, [userReducer?.assessments]);

  const getAllAssessments = async () => {
    setIsLoading(true);
    await getAssessments(accessToken);
    setIsLoading(false)
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1500).then(() => {
      setRefreshing(false);
      getAllAssessments();
    });
  }, []);
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        {/* Assessments List */}
        {isLoading ? (
          <LottieView
            speed={1}
            style={styles.lottieStyle}
            autoPlay
            loop
            source={require('../assets/lottie/color-loader.json')}
          />
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => {
              return (
                assessments?.length === 0 && (
                  <View
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      borderRadius: width * 0.02,
                      height: height * 0.1,
                      width: width * 0.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: height * 0.2,
                      alignSelf: 'center',
                    }}>
                    <Heading
                      title="No Record, Swipe Down To Refresh"
                      passedStyle={{ fontSize: width * 0.045, color: 'white' }}
                      fontType="semi-bold"
                    />
                  </View>
                )
              );
            }}
            ListHeaderComponent={
              <>
                <View style={styles.headingView}>
                  <Heading
                    title={'ASSESSMENTS'}
                    passedStyle={styles.headingStyles}
                    fontType="semi-bold"
                  />
                </View>
                {/* Colors  */}
                <ColoredFlatlist />
              </>
            }
            data={assessments}
            keyExtractor={({ item, index }) => item?.id?.toString() || index?.toString()}
            renderItem={({ item, index }) => (
              <AssessmentMapper
                item={item}
                assessments={assessments}
                index={index}
                onPress={(item) => {
                  if (item?.assessment_type?.Timed == 1) {
                    setCurrent(item)
                    setModal(true)
                  } else {
                    setModal(false)
                    navigation.navigate('runAssessment', { item: item, traditional: false });
                  }
                }}
              />
            )}
          />
        )}
        <TraModal
          isModalVisible={modal}
          setIsModalVisible={setModal}
          call={_onPressRunAssessment}
        />
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({ userReducer }) => {
  return { userReducer };
};
export default connect(mapStateToProps, actions)(Assessments);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeDarkBlue,
  },
  lottieStyle: {
    // height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    // marginTop: height * 0.098,
    // marginLeft: Platform?.OS === 'ios' ? width * 0.05 : width * 0.07,
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
  // assessmentListStyle: {
  //   position: 'absolute',
  //   bottom: height * 0.25,
  //   left: width * 0.05,
  // },
});
