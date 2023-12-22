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

const ParticipantFilterModal = ({
  isModalVisible,
  setIsModalVisible,
  buttonText,
  onPress,
  showLoader,
  userReducer,
  setFields,
}) => {


  const [selectedGroupsData, setGroupsData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [genderData, setGenderData] = useState([]);

  const [grade, setGrade] = useState({ value: 'All' });
  const [gender, setGender] = useState({ value: 'All' });
  const [group, setGroup] = useState({ value: 'All' });

  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (userReducer?.groups) {
      console.log("groups", userReducer?.groups)
      const sortGroups=[...userReducer?.groups].sort((a,b)=>a.Name?.localeCompare(b.Name))
      setGroupsData(sortGroups)
    }
  }, [userReducer?.groups]);

  const renderLabel = () => {
    if (group || isFocus) {
      return (
        <Text style={[styles.label1]}>
          Group
        </Text>
      );
    }
    return null;
  };

  const renderLabel2 = () => {
    if (grade || isFocus) {
      return (
        <Text style={[styles.label1]}>
          Grade
        </Text>
      );
    }
    return null;
  };

  const renderLabel3 = () => {
    if (gender || isFocus) {
      return (
        <Text style={[styles.label1]}>
          Gender
        </Text>
      );
    }
    return null;
  };

  return (
    <View>
      <StatusBar translucent={false} backgroundColor="black" />
      <Modal onBackButtonPress={() => setIsModalVisible(false)} isVisible={isModalVisible}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.container}>
            {
              (selectedGroupsData?.length > 0) ? (
                <>
                  {renderLabel()}
                  <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    itemTextStyle={{ color: 'black' }}

                    data={[{ Name: 'All', id: 'All' }, ...selectedGroupsData]?.map(it => ({ ...it, label: it.Name, value: it.id }))}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select item' : '...'}
                    searchPlaceholder="Search..."
                    value={group.value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setGroup({ ...item, selected: item.value=="All"?false:true });
                      const myData = selectedGroupsData.filter(it => it.id == item.value)[0]
                      setGenderData(myData?.group_gender)
                      setGradeData(myData?.group_grade)
                      setGrade({value:"All"})
                      setGender({value:"All"})
                      console.log("dddddd", item)
                      setIsFocus(false);
                    }}
                  />
                </>
              ) : (
                <>
                  {renderLabel()}
                  <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    itemTextStyle={{ color: 'black' }}
                    data={[]}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={'Not available'}
                    searchPlaceholder="Search..."
                    value={group.value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setGroup(item);
                      setIsFocus(false);
                    }}
                  />
                </>
              )
            }
            {/* {(gradeData?.length > 0) ? (
              <>
                {renderLabel2()}
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  itemTextStyle={{ color: 'black' }}
                  disable={group.selected ? false : true}
                  iconStyle={styles.iconStyle}
                  data={[{ grade: { Name: 'All', id: 'All' } }, ...gradeData]?.map(it => ({ ...it, label: it.grade.Name, value: it.grade.id }))}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select item' : '...'}
                  searchPlaceholder="Search..."
                  value={grade.value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setGrade({ ...item, selected: true });
                    setIsFocus(false);
                  }}
                />
              </>
            ) : (
              <>
                {renderLabel2()}
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  itemTextStyle={{ color: 'black' }}
                  iconStyle={styles.iconStyle}
                  disable={group.selected ? false : true}
                  data={[]}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={group.selected ? 'Not available' : "First select group"}
                  searchPlaceholder="Search..."
                  value={grade.value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setGrade(item);
                    setIsFocus(false);
                  }}
                />
              </>
            )} */}
            {/* {(genderData?.length > 0) ? (
              <>
                {renderLabel3()}
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  itemTextStyle={{ color: 'black' }}
                  disable={group.selected ? false : true}
                  iconStyle={styles.iconStyle}
                  data={[{ gender: { Gender: 'All', id: 'All' } }, ...genderData]?.map(it => ({ ...it, label: it.gender.Gender, value: it.gender.id }))}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select item' : '...'}
                  searchPlaceholder="Search..."
                  value={gender.value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setGender({ ...item, selected: true });
                    setIsFocus(false);
                  }}
                />
              </>
            ) : (
              <>
                {renderLabel3()}
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  itemTextStyle={{ color: 'black' }}
                  iconStyle={styles.iconStyle}
                  disable={group.selected ? false : true}
                  data={[]}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={group.selected ? 'Not available' : "First select group"}
                  searchPlaceholder="Search..."
                  value={gender.value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setGrade(item);
                    setIsFocus(false);
                  }}
                />
              </>
            )} */}
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
                        setFields({
                          gender:gender.label,
                          group: group.label,
                          grade:grade.label
                        })
                        onPress({
                          gender:gender.value,
                          group: group.value,
                          grade:grade.value,
                          name:group.Name
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
                </>
              )}
            </View>

          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};
const mapStateToProps = ({ userReducer }) => {
  return { userReducer };
};
export default connect(mapStateToProps, actions)(ParticipantFilterModal);

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
    width: '100%',
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
