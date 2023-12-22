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
  ScrollView
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import {
  themeBlue,
  themeDarkBlue,
  themeFerozi,
  themeLightBlue,
  themePurple,
} from '../assets/colors/colors';
import { template } from '@babel/core';
import IconComp from '../components/IconComp';
import ColoredFlatlist from '../components/ColoredFlatlist';
import { connect } from 'react-redux';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import * as actions from '../store/actions';
import LottieView from 'lottie-react-native';
import ParticipantFilterModal from '../components/GradeModal';
import RNPickerSelect from 'react-native-picker-select';


const { width, height } = Dimensions.get('window');

const ParticipantsScreen = ({
  navigation,
  userReducer,
  getParticipants,
  getGroups,
  getFilteredParticipants,
}) => {
  const accessToken = userReducer.accessToken;
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Males-Females");
  const [group, setGroup] = useState("All");
  const [grade, setGrade] = useState("All");
  const [participants, setParticipants] = useState([]);
  const [gender, setGender] = useState("all")
  const [sort, setSort] = useState("asc")
  const [fields, setFields] = useState({ group: "All", gender: "All", grade: "All" })




  // console.log('====================================');
  // console.log(userReducer);
  // console.log('====================================');

  useEffect(() => {
    getAllParticipants();
    return () => {
      setParticipants([])
    }
  }, [])

  useEffect(() => {
    setParticipants(userReducer.participants);
  }, [userReducer.participants])

  const getAllParticipants = async () => {
    setIsLoading(true);
    await getParticipants(accessToken);
    await getGroups(accessToken);
    setIsLoading(false);
  };

  const getAllGroupsMembers = async () => {
    setIsLoading(true);
    await getGroupMembers(apiData, accessToken);
    await getColors(accessToken);
    setIsLoading(false);
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setSelectedGender("Males-Females")
    setGrade("All")
    setGroup("All")
    wait(1500).then(() => {
      setRefreshing(false);
      getAllParticipants();
      getAllGroupsMembers();
    });
  }, []);

  const filterParticipants = async data => {
    // console.log("selected", data);
    // console.log("selected Gender", data.gender);
    // console.log("selected Grade Id", data.grade_id);
    // console.log("selected Group Id", data.group_id);
    setIsLoading(true);

    if (data.group == "All") {
      setIsLoading(true);
      await getParticipants(accessToken);
      setIsLoading(false);
    } else {
      // if (data.gender != "All" && data.grade == "All") {
      //   const filtered = userReducer.participants.filter((participant) => {
      //     return (participant?.group == data?.group_organization?.GroupID) && participant.GenderID==data?.gender
      //   });
      //   setParticipants(filtered)
      // }
      // else if (data.gender == "All" && data.grade != "All") {
      //   const filtered = userReducer.participants.filter((participant) => {
      //     return (participant?.group == data?.group_organization?.GroupID) && participant.GradeID==data?.grade
      //   });
      //   setParticipants(filtered)
      // }
      // else if(data.gender != "All" && data.grade != "All"){
      //   const filtered = userReducer.participants.filter((participant) => {
      //     return (participant?.group == data?.group_organization?.GroupID) && participant.GradeID==data?.grade && participant.GenderID==data?.gender
      //   });
      //   setParticipants(filtered)
      // }
      // else{
        // const filtered = userReducer.participants.filter((participant) => {
        //   // console.log("find",participant?.group_organization?.find(it=>it.GroupID==data?.group))
        //   return participant?.group_organization?.find(it=>it.GroupID==data?.group)
        //   // return (participant?.group_organization?.GroupID == data?.group)
        // });
        // setParticipants(filtered)
        setIsLoading(true);
        await getParticipants(accessToken,data.group);
        setIsLoading(false);
      // }
    }

    setIsLoading(false);
  };

  const onSuccess = () => {
    setShowFilterModal(false);
    setIsLoading(false);
  };
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        {/* Participants FlatList  */}
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
            contentContainerStyle={{ paddingBottom: height * 0.1 }}
            ListFooterComponent={() => {
              return (
                participants?.length === 0 && (
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
                    title={'PARTICIPANTS'}
                    passedStyle={styles.headingStyles}
                    fontType="semi-bold"
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: responsiveFontSize(2.5) }}>
                  <TouchableOpacity
                    style={styles.selectFilterStyle}
                    onPress={() => setShowFilterModal(true)}
                  >
                    <Heading
                      title="Select Filter"
                      passedStyle={styles.selectFilterTextStyle}
                      fontType="semi-bold"
                    />
                    <IconComp
                      iconName={'chevron-right'}
                      type="Feather"
                      passedStyle={styles.rightIconStyle}
                    />
                  </TouchableOpacity>
                  <View style={{ backgroundColor: 'white', width: 120, borderRadius: responsiveFontSize(1) }}>
                    <RNPickerSelect
                      value={sort}
                      style={{ viewContainer: { marginVertical: 0 } }}
                      pickerProps={{ style: { color: 'black' } }}
                      onValueChange={(value) => setSort(value)}
                      items={[
                        { label: 'Asc', value: 'asc' },
                        { label: 'Des', value: 'des' },
                      ]}
                    />
                  </View>
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <View style={styles.filterLabelViewStyle}>
                  <Heading
                      title="Groups - "
                      passedStyle={styles.selectFilterTextStyle}
                      fontType="semi-bold"
                    />
                    <Heading
                      title={fields.group}
                      passedStyle={styles.selectFilterTextStyle}
                      fontType="semi-bold"
                    />

                    <IconComp
                      iconName={'chevron-right'}
                      type="Feather"
                      passedStyle={styles.rightIconStyle}
                    />

                    <Heading
                      title="Grade - "
                      passedStyle={styles.selectFilterTextStyle}
                      fontType="semi-bold"
                    />
                    <Heading
                      title={fields.grade}
                      passedStyle={styles.selectFilterTextStyle}
                      fontType="semi-bold"
                    />
                                        <IconComp
                      iconName={'chevron-right'}
                      type="Feather"
                      passedStyle={styles.rightIconStyle}
                    />

                    <Heading
                      title="Gender - "
                      passedStyle={styles.selectFilterTextStyle}
                      fontType="semi-bold"
                    />
                    <Heading
                      title={fields.gender}
                      passedStyle={styles.selectFilterTextStyle}
                      fontType="semi-bold"
                    />
                  </View>
                </ScrollView>

                {/* Colors  */}
                <ColoredFlatlist />
              </>
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={participants.sort((a, b) => {
              const nameA = a.Firstname.toUpperCase(); // ignore upper and lowercase
              const nameB = b.Firstname.toUpperCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return sort == "asc" ? -1 : 1;
              }
              if (nameA > nameB) {
                return sort == "asc" ? 1 : -1;
              }

              // names must be equal
              return 0;
            })}
            // data={participants}
            keyExtractor={({ item, index }) => item?.id?.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation?.push('viewParticipants', { data: item })
                  }
                  style={{
                    width: '95%',
                    alignSelf: 'center',
                    zIndex: 999,
                    borderBottomColor: 'silver',
                    borderBottomWidth: 1,
                    height: height * 0.07,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Heading
                    title={`${item?.Firstname} ${item?.Lastname}`}
                    passedStyle={{ color: 'white', fontSize: width * 0.04 }}
                    fontType="regular"
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation?.navigate('viewParticipants', { data: item })
                      }
                      activeOpacity={0.9}>
                      <Image
                        source={require('../assets/images/cut-eye.png')}
                        style={{
                          width: width * 0.065,
                          height: height * 0.035,
                          marginRight: width * 0.02,
                        }}
                      />
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => {}} activeOpacity={0.9}>
                      <Image
                        source={require('../assets/images/cut-pencil.png')}
                        style={{
                          width: width * 0.06,
                          height: height * 0.032,
                          marginRight: width * 0.02,
                        }}
                      />
                    </TouchableOpacity> */}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}

        {
          showFilterModal && (
            <ParticipantFilterModal
              isModalVisible={showFilterModal}
              setIsModalVisible={setShowFilterModal}
              onPress={filterParticipants}
              showLoader={isLoading}
              setFields={setFields}
              setGender={setGender}
            />
          )
        }

        <ParticipantFilterModal
          isModalVisible={showFilterModal}
          setIsModalVisible={setShowFilterModal}
          onPress={filterParticipants}
          showLoader={isLoading}
          setSelectedGender1={setSelectedGender}
          setGrade1={setGrade}
          setGroup1={setGroup}
          setFields={setFields}
        />
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({ userReducer }) => {
  return { userReducer };
};
export default connect(mapStateToProps, actions)(ParticipantsScreen);
const styles = StyleSheet.create({
  lottieStyle: {
    // height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    // marginTop: height * 0.098,
    // marginLeft: Platform?.OS === 'ios' ? width * 0.05 : width * 0.07,
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
    backgroundColor: themeLightBlue,
    fontSize: width * 0.045,
    paddingVertical: height * 0.01,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  headingView: {
    backgroundColor: themeLightBlue,
    borderRadius: width * 0.05,
    width: width * 0.55,
    marginBottom: height * 0.1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
});
