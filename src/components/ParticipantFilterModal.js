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
  ScrollView,
} from 'react-native';
import Heading from './Heading';
import Inputbox from './Inputbox';
import LottieView from 'lottie-react-native';
import Button from './Button';
import {
  themeBlue,
  themeDarkBlue,
  themeLightBlue,
  themePurple,
} from '../assets/colors/colors';
import IconComp from './IconComp';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../config';
const { width, height } = Dimensions.get('window');

const ParticipantFilterModal = ({
  isModalVisible,
  setIsModalVisible,
  buttonText,
  onPress,
  showLoader,
  userReducer,
  setSelectedGender1,
  setGrade1,
  setGroup1
}) => {
  const [age, setAge] = useState(0);
  const [grade, setGrade] = useState(0);
  const [gradeCounter, setGradeCounter] = useState([]); // array od grades
  const [selectedGrade, setSelectedGrade] = useState(); // selected grade
  const [counter, setCounter] = useState(0);
  const [Grades, setGrades] = useState([]);
  const [selectedGroupsData, setGroupsData] = useState([]);
  const [selectedboth, setSelectedboth] = useState(false);
  const [selectedgirl, setSelectedgirl] = useState(false);
  const [selectedboy, setSelectedboy] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Both");
  // console.log("userReducer.groups", userReducer.groups);
  // console.log("Grades", Grades);
  // console.log("selectedGroupsData", selectedGroupsData);
  // console.log("counter selectedGroupsData", selectedGroupsData[counter]);
  console.log("selectedGrade", selectedGrade);
  // console.log("counter", counter);

  useEffect(() => {
    if (userReducer?.groups && selectedGrade && selectedGrade.id) {
      setGroupsData(
        userReducer?.groups?.filter(group => group.grade_id.includes(`${selectedGrade.id}`)) || [],
      )
      setGroup1((userReducer?.groups?.filter(group => group.grade_id.includes(`${selectedGrade.id}`)) || [])[counter]?.Name)
    }
  }, [selectedGrade]);

  useEffect(() => {
    if (selectedGroupsData[counter] && selectedGroupsData[counter].group_type) {
      setSelectedGender(selectedGroupsData[counter].group_type || "Not Possible")
      setGroup1(selectedGroupsData[counter].Name)
    }
  }, [counter,age])

  useEffect(() => {
    fetchCall();
    if (userReducer?.groups?.length > 0) {
      setGrade(userReducer?.groups[counter]);
    }
  }, [userReducer?.groups]);

  // console.log(age, counter, selectedGroupsData, userReducer?.groups);

  const fetchCall = async () => {
    const URL = `${baseUrl}/api/grade`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 22|lNXltijPdHHOyVPYSxlmgiym5OLPjenZOFZcRYhO`,
      },
    };
    const response = await axios.get(URL, headers);
    setGrades(response.data.data);
    setSelectedGrade(response.data.data.find(o => o.id === age + 1));
    setGrade1(response.data.data.find(o => o.id === age + 1)?.Name)
  };

  const gradeHandlerGrade = param => {
    if (param == 'decrease') {
      setAge((age) => age - 1);
      // setSelectedGrade(Grades.find(o => o.id === age - 1));
      setCounter(0)
    } else {
      setAge((age) => age + 1);
      // setSelectedGrade(Grades.find(o => o.id === age + 1));
      setCounter(0)
    }
  };

  useEffect(() => {
    // setSelectedGrade(Grades.find(o => o.id === age - 1));
    setSelectedGrade(Grades[age]);
    setGrade1(Grades[age]?.Name)
  }, [age])


  function renderGenders(group) {
    if (group?.group_type == "Both") {
      return (
        <>
          {/* All */}
          <TouchableOpacity
            activeOpacity={0.9}
            // onPress={() => onPressGender({id: 3, gender: 'Both'})}
            onPress={() => {
              setSelectedGender("Both")
            }}
            style={styles.checkBoxContainer}>
            <IconComp
              type={'MaterialIcons'}
              iconName={
                // selectedGroupsData.filter(f=>(f.group_type =="Both"))
                selectedGender == "Both"
                  ? 'check-circle'
                  : 'radio-button-unchecked'
              }
              passedStyle={styles.textLAbel}
            />
            <Heading
              passedStyle={styles.label}
              title={'All'}
              fontType="medium"
            />
          </TouchableOpacity>

          {/* Male */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.checkBoxContainer}
            onPress={() => {
              setSelectedGender("Male")
            }}>
            <IconComp
              type={'MaterialIcons'}
              iconName={
                // selectedGenders[0]?.id === 1 || selectedGenders[1]?.id === 1
                selectedGender == "Male"
                  ? 'check-circle'
                  : 'radio-button-unchecked'
              }
              passedStyle={styles.textLAbel}
            />
            <Heading
              passedStyle={styles.label}
              title={'Male'}
              fontType="medium"
            />
          </TouchableOpacity>


          {/* Female */}
          <TouchableOpacity
            activeOpacity={0.9}
            // onPress={() => onPressGender({id: 2, gender: 'Girls'})}
            onPress={() => {
              setSelectedGender("Female")
            }}
            style={styles.checkBoxContainer}>
            <IconComp
              type={'MaterialIcons'}
              iconName={
                // selectedGenders[0]?.id === 2 || selectedGenders[1]?.id === 2
                selectedGender == "Female"
                  ? 'check-circle'
                  : 'radio-button-unchecked'
              }
              passedStyle={styles.textLAbel}
            />
            <Heading
              passedStyle={styles.label}
              title={'Female'}
              fontType="medium"
            />
          </TouchableOpacity>
        </>
      )
    }
    else {
      // setSelectedGender("Hello")
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          // onPress={() => onPressGender({id: 3, gender: 'Both'})}
          onPress={() => {
            // setSelectedboy(false)
            // setSelectedboth(true)
            // setSelectedgirl(false)
          }}
          disabled={true}
          style={styles.checkBoxContainer}>
          <IconComp
            type={'MaterialIcons'}
            iconName={
              // selectedGroupsData.filter(f=>(f.group_type =="Both"))
              true
                ? 'check-circle'
                : 'radio-button-unchecked'
            }
            passedStyle={styles.textLAbel}
          />
          <Heading
            passedStyle={styles.label}
            title={group?.group_type}
            fontType="medium"
          />
        </TouchableOpacity>
      )
    }
  }

  return (
    <View>
      <StatusBar translucent={false} backgroundColor="black" />
      <Modal
      onBackButtonPress={()=>setIsModalVisible(false)}
      isVisible={isModalVisible}>
       <View style={styles.container}>
          <ScrollView>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* Age  */}
            <View style={styles.filterContainer}>
              <Heading
                passedStyle={styles.label}
                title={'Grade'}
                fontType="medium"
              />
              <View style={styles.rowView}>
                <TouchableOpacity
                  disabled={age == 0}
                  onPress={() => {
                    gradeHandlerGrade('decrease');
                  }}>
                  <IconComp
                    type={'Feather'}
                    iconName={'minus-circle'}
                    passedStyle={styles.textLAbel}
                  />
                </TouchableOpacity>
                <Heading
                  passedStyle={[styles.label, { marginHorizontal: width * 0.03 }]}
                  title={selectedGrade?.Name || "UnKnow"}
                  fontType="medium"
                />
                <TouchableOpacity
                  disabled={age == (Grades.length - 1)}
                  onPress={() => {
                    gradeHandlerGrade('incress');
                  }}>
                  <IconComp
                    type={'Feather'}
                    iconName={'plus-circle'}
                    passedStyle={styles.textLAbel}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Grade  */}
            <View style={styles.filterContainer}>
              <Heading
                passedStyle={styles.label}
                title={'Group'}
                fontType="medium"
              />

              <View style={styles.rowView}>
                <TouchableOpacity
                  disabled={counter <= 0}
                  onPress={() => {
                    setCounter((counter) => counter - 1);
                    // if (counter > 0) {
                    // }
                  }}>
                  <IconComp
                    type={'Feather'}
                    iconName={'minus-circle'}
                    passedStyle={styles.textLAbel}
                  />
                </TouchableOpacity>
                <Heading
                  passedStyle={[styles.label, { marginHorizontal: width * 0.03 }]}
                  title={selectedGroupsData[counter]?.Name || "Unknow"}
                  fontType="medium"
                />

                <TouchableOpacity
                  disabled={counter >= (selectedGroupsData.length - 1)}
                  onPress={() => {
                    setCounter((counter) => counter + 1);
                  }}>
                  <IconComp
                    type={'Feather'}
                    iconName={'plus-circle'}
                    passedStyle={styles.textLAbel}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* <Heading
            passedStyle={[styles.label, {marginLeft: width * 0.03}]}
            title={'Gender'}
            fontType="medium"
          /> */}
          {/* {selectedGroupsData.filter(group => group.group_type == 'Both') ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginLeft: width * 0.05,
              }}>
              {selectedGroupsData.length>1&&(
                <>
                {renderGenders(selectedGroupsData[counter])}
                </>
              )}
            </View>
          ) : (
            <Text>nill</Text>
          )} */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginLeft: width * 0.05,
            }}>
            {
              selectedGroupsData.length ? (
                <>
                  {renderGenders(selectedGroupsData[counter])}
                </>
              ) : null
              // ) : <Text>Something went wrong!</Text>

            }
          </View>
          {/* Buttons Container  */}
          <View style={styles.flexRow}>
            {showLoader ? (
              <View style={styles.requestingView}>
                <LottieView
                  speed={1}
                  style={styles.lottieStyle}
                  autoPlay
                  loop
                  source={require('../assets/lottie/color-loader.json')}
                />
                <Heading
                  title="Please Wait..."
                  passedStyle={styles.requestLabel}
                  fontType="medium"
                />
              </View>
            ) : (
              <>
                <Button
                  title={buttonText || 'OK'}
                  onBtnPress={() => {
                    if (onPress) {
                      setSelectedGender1(selectedGender=="Both"?"Males-Females":selectedGender)
                      onPress({
                        grade_id: selectedGrade?.id,
                        gender: selectedGender || selectedGroupsData[counter]?.group_type || "Both",
                        group_id: selectedGroupsData[counter]?.id,
                        GROUP_DATA: selectedGroupsData[counter]
                      });
                      setIsModalVisible(false);
                    } else {
                      setIsModalVisible(false);
                    }
                  }}
                  isBgColor={false}
                  btnStyle={styles.btnStyle}
                  btnTextStyle={styles.btnTextStyle}
                />
                {/* <Button
                  title="CANCEL"
                  onBtnPress={() => {
                    setIsModalVisible(false);
                  }}
                  isBgColor={false}
                  btnStyle={styles.cancelBtnStyle}
                  btnTextStyle={styles.cancelBtnTextStyle}
                /> */}
              </>
            )}
          </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
const mapStateToProps = ({ userReducer }) => {
  return { userReducer };
};
export default connect(mapStateToProps, null)(ParticipantFilterModal);

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
    backgroundColor: themeLightBlue,
    borderRadius: width * 0.025,
    width: width * 0.7,
    margin: 0,
  },
  filterContainer: {
    paddingVertical: height * 0.01,
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: themeLightBlue,
    borderRadius: 10,
    width: width * 0.8,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    minWidth: width * 0.75,
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
    width: width * 0.75,
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
});
