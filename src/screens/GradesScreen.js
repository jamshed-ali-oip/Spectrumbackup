import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  FlatList,
  ScrollView,
  Platform,
  RefreshControl,
  Text,
} from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import Heading from '../components/Heading';
import LottieView from 'lottie-react-native';
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
import * as actions from '../store/actions';
import ParticipantFilterModal from '../components/GradeModal';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import RNPickerSelect from 'react-native-picker-select';

const { width, height } = Dimensions.get('window');

const GradesScreen = ({
  navigation,
  route,
  getGroupMembers,
  userReducer,
  getColors,
  getParticipants,
  getGroups,
  getFilteredParticipants,
}) => {
  const ITEM = route.params.item;
  // const GROUP_DATA = route.params.groupData;

  const accessToken = userReducer.accessToken;
  const [groupMembers, setGroupMembers] = useState([]);
  const [GROUP_DATA, SET_GROUP_DATA] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [gender, setGender] = useState("all")
  const [selectedGender, setSelectedGender] = useState('Boys');
  const [participants, setParticipants] = useState([])
  const [Eventdetails, setEventdetails] = useState([]);
  const [fields, setFields] = useState({ group: "All", gender: "All", grade: "All" })
  const [sort, setSort] = useState("asc")
  // console.log("GROUP_DATA",GROUP_DATA)
  // console.log("participants", participants)
  const apiData = {
    group_id: GROUP_DATA?.id,
  };


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
    // setShowFilterModal(true);
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

  console.log('par', userReducer.participants)

  const filterParticipants = async data => {
    // console.log("selected", data);
    // console.log("selected Gender", data.gender);
    // console.log("selected Grade Id", data.grade_id);
    // console.log("selected Group Id", data.group_id);
    setIsLoading(true);
    SET_GROUP_DATA({ ...data.GROUP_DATA, group: data.allGroud, Name: data.name })
    // console.log("eevent datacon screen/////",)
    setEventdetails(data.event)
    // alert(JSON.stringify({
    //   gender:data.gender.GenderID
    // }))
    if (data.group == "All") {
      setIsLoading(true);
      await getParticipants(accessToken);
      setIsLoading(false);
    }
    else {
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
      //   return participant?.group_organization?.find(it => it.GroupID == data?.group)
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
  };

  // alert(participants.length)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1500).then(() => {
      setRefreshing(false);
      getAllParticipants();
      // getAllGroupsMembers();
    });
  }, []);

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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
                    title={ITEM.Name}
                    passedStyle={styles.headingStyles}
                    fontType="semi-bold"
                  />
                </View>
                {/* <TouchableOpacity
                  style={{backgroundColor: 'red'}}
                  onPress={() => {
                    setShowFilterModal(true)
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 20,
                      
                    }}>
                    <Heading
                      title="Filter Gender"
                      passedStyle={styles.filterLabelStyles}
                      fontType="regular"
                    />
                    <IconComp
                      iconName={'chevron-right'}
                      type="Feather"
                      passedStyle={styles.rightIconStyle}
                    />
                  </View>
                </TouchableOpacity> */}
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
                      useNativeAndroidPickerStyle={true}
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
                      title="Run Assessment"
                      passedStyle={styles.filterLabelStyle}
                      fontType="regular"
                    />
                    <IconComp
                      iconName={'chevron-right'}
                      type="Feather"
                      passedStyle={styles.rightIconStyle}
                    />
                    <Heading
                      title={ITEM?.Name}
                      passedStyle={styles.filterLabelStyle}
                      fontType="regular"
                    />
                    <IconComp
                      iconName={'chevron-right'}
                      type="Feather"
                      passedStyle={styles.rightIconStyle}
                    />

                    {/* <Heading
                      title="Event - "
                      passedStyle={styles.selectFilterTextStyle}
                      fontType="semi-bold"
                    /> */}
                    {/* <Heading
                      title={fields.event}
                      passedStyle={styles.selectFilterTextStyle}
                      fontType="semi-bold"
                    /> */}

                    <IconComp
                      iconName={'chevron-right'}
                      type="Feather"
                      passedStyle={styles.rightIconStyle}
                    />

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
                    {/* <Heading
                      title={`${GROUP_DATA?.Name} - ${selectedGender}`}
                      passedStyle={styles.selectFilterTextStyle}
                      fontType="semi-bold"
                    /> */}
                  </View>
                </ScrollView>
                {/* Colors  */}
                <ColoredFlatlist />
              </>
            }
            data={participants.filter(it => it.Status == 1).sort((a, b) => {
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
            keyExtractor={({ item, index }) => item?.id?.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (ITEM?.assessment_type?.Timed == 1) {
                      navigation?.navigate('timeAssessment', {
                        item: ITEM,
                        childData: { ...item, index },
                        groupData: GROUP_DATA,
                        traditional: route?.params?.traditional,
                        memberData: participants.filter(it => it.Status == 1).sort((a, b) => {
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
                        }),
                        event: Eventdetails
                      });
                    }
                    else {
                      navigation?.navigate('gradingScreen', {
                        item: ITEM,
                        childData: { ...item, index },
                        groupData: GROUP_DATA,
                        memberData: participants.filter(it => it.Status == 1).sort((a, b) => {
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
                        }),
                        event: Eventdetails
                      });
                    }
                  }}
                  style={[
                    index !== participants?.length - 1 && {
                      borderBottomColor: 'silver',
                      borderBottomWidth: 1,
                    },
                    {
                      width: '100%',
                      paddingHorizontal: responsiveFontSize(1.5),
                      alignSelf: 'center',
                      zIndex: 999,
                      height: height * 0.07,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  ]}>
                  <Heading
                    title={`${item?.Firstname} ${item?.Lastname}`}
                    passedStyle={{
                      color: 'white',
                      fontSize: width * 0.04,
                      textTransform: 'capitalize',
                    }}
                    fontType="regular"
                  />
                </TouchableOpacity>
              );
            }}
          />
        )}
        <ParticipantFilterModal
          isModalVisible={showFilterModal}
          setIsModalVisible={setShowFilterModal}
          onPress={filterParticipants}
          showLoader={isLoading}
          setFields={setFields}
          setGender={setGender}
        />
      </ImageBackground>
    </>
  );
};

const mapStateToProps = ({ userReducer }) => {
  return { userReducer };
};
export default connect(mapStateToProps, actions)(GradesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  lottieStyle: {
    // height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    // marginTop: height * 0.098,
    // marginLeft: Platform?.OS === 'ios' ? width * 0.05 : width * 0.07,
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
    textTransform: 'capitalize',
  },
  rightIconStyle: {
    color: 'white',
    fontSize: width * 0.05,
    marginLeft: 5,
  },
  filterLabelViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: width * 0.05,
    marginVertical: 10,
  },
  filterLabelStyle: {
    fontSize: width * 0.04,
    color: 'white',
  },

  filterLabelStyles: {
    fontSize: width * 0.04,
    color: 'white',
    // fontWeight:"700"
  },
  headingStyles: {
    color: 'white',
    backgroundColor: themeFerozi,
    fontSize: width * 0.045,

    textTransform: 'uppercase',
    textAlign: 'center',
  },
  headingView: {
    backgroundColor: themeFerozi,
    borderRadius: width * 0.1,
    paddingHorizontal: width * 0.05,
    maxWidth: width * 0.95,
    // width: width * 0.55,
    paddingVertical: 8,
    marginBottom: height * 0.1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
});