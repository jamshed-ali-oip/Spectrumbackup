// import Modal from 'react-native-modal';
// import React, {useState} from 'react';
// import {
//   Dimensions,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   StatusBar,
// } from 'react-native';
// import Heading from './Heading';
// import Inputbox from './Inputbox';
// import LottieView from 'lottie-react-native';
// import Button from './Button';
// import {
//   themeBlue,
//   themeDarkBlue,
//   themeLightBlue,
//   themePurple,
// } from '../assets/colors/colors';
// import IconComp from './IconComp';
// import {useEffect} from 'react';
// import {connect} from 'react-redux';
// import axios from 'axios';
// import {baseUrl} from '../config';
// const {width, height} = Dimensions.get('window');

// const GroupFilter = ({
//   isModalVisible,
//   setIsModalVisible,
//   buttonText,
//   onPress,
//   showLoader,
//   userReducer,
// }) => {
//   const [age, setAge] = useState(1);
//   const [grade, setGrade] = useState(0);
//   const [gradeCounter, setGradeCounter] = useState([]); // array od grades
//   const [gradeData, setGradeData] = useState(); // selected grade
//   const [counter, setCounter] = useState(0);
//   const [Data, setData] = useState([]);
//   const [GroupsData, setGroupsData] = useState([]);
//   const [selectedboth, setSelectedboth] = useState(false);
//   const [selectedgirl, setSelectedgirl] = useState(false);
//   const [selectedboy, setSelectedboy] = useState(false);
//   const [selectedGenders, setSelectedGenders] = useState([
//   ]);
//   console.log("age",age)
//   console.log("grade",counter)
//   const [mine,setmine]=useState("");
//   // const GroupsData = userReducer.groups || []
//   // console.log("gradeCounter", gradeCounter);
//   // console.log("gradeData", gradeData);
//   useEffect(() => {
//     if (userReducer?.groups && gradeData && gradeData.id) {
//       setGroupsData(
//         userReducer?.groups?.filter(group =>
//           group.grade_id.includes(`${gradeData.id}`),
//         ) || [],
//       )}
//   }, [gradeData]);
//   useEffect(()=>{
//     GroupsData.map((item)=>{
// // console.log("data dikahdo",item.grade_id)
//     })
//   },[])
//   // console.log("data given frou",GroupsData)
//   // console.log(grade);
//   // console.log(userReducer.groups);
//   // console.log("first,,,/,/,/", GroupsData)
//   // grade_id
//   // GroupsData.map((item) => {
//   //   return (
//   //     console.log("dtadtdatdatdatdtadtad", item.grade_id.grade_id('2'))
//   //   )
//   // })
//   // console.log("dtadtdatdatdatdtadtad",GroupsData.grade_id)
//   const onPressGender = obj => {
//     var i;
//     let hasFound = false;
//     let index;
//     for (i = 0; i < selectedGenders.length; i++) {
//       if (selectedGenders[i].id === obj.id) {
//         hasFound = true;
//         index = i;
//         // return;
//       }
//     }

//     let copyArr = [...selectedGenders];

//     if (hasFound) {
//       copyArr.splice(index, 1);
//     } else {
//       copyArr.push(obj);
//     }
//     setSelectedGenders(copyArr);
//   };
//   // console.log("first gender",selectedGenders)
//   useEffect(() => {
//     fetchCall();
//     // console.log(userReducer?.groups[counter])
//     if (userReducer?.groups?.length > 0) {
//       // alert("call")
//       setGrade(userReducer?.groups[counter]);
//       // console.log("first,",userReducer?.groups[counter])
//     }
//   }, [counter,userReducer?.groups]);
//   const fetchCall = async () => {
//     const URL = `${baseUrl}/api/grade`;
//     const headers = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer 22|lNXltijPdHHOyVPYSxlmgiym5OLPjenZOFZcRYhO`,
//       },
//     };

//     const response = await axios.get(URL, headers);
//     // console.log(response)
//     setData(response.data.data);
//     // setCounter(0)
//     // setAge(1);
//     setGradeData(response.data.data.find(o => o.id === age + 1));
//   };

//   const gradeHandler = param => {
//     if (param == 'decrease')
//       if (age > 1) {
//         setAge(age - 1);
//         // console.log(gradeCounter.find(o => o.id === age - 1));
//         setGradeData(Data.find(o => o.id === age - 1));
//         // console.log('grade-', gradeCounter);
//       }
//     // else if(param == "increase") {
//     //   console.log("increse")
//     //   if(age < 8){
//     //     setAge(age + 1);
//     //     console.log(age)
//     //     console.log(grade.find(o => o.id === age));
//     //   }
//     // }
//   };

//   function renderGenders(group){
//     if(group?.group_type=="Both"){
//       return(
//         <>
//               <TouchableOpacity
//                 activeOpacity={0.9}
//                 style={styles.checkBoxContainer}
//                 // onPress={() =>
//                 // onPressGender({id: 1, gender: 'Boys'})
//                 // }
//                 onPress={() => {
//                   setSelectedGenders([0])
//                   setSelectedboy(true),
//                     setSelectedboth(false),
//                     setSelectedgirl(false);
//                 }}>
//                 <IconComp
//                   type={'MaterialIcons'}
//                   iconName={
//                     // selectedGenders[0]?.id === 1 || selectedGenders[1]?.id === 1
//                     selectedboy == true
//                       ? 'check-circle'
//                       : 'radio-button-unchecked'
//                   }
//                   passedStyle={styles.textLAbel}
//                 />
//                 <Heading
//                   passedStyle={styles.label}
//                   title={'Boys'}
//                   fontType="medium"
//                 />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 activeOpacity={0.9}
//                 // onPress={() => onPressGender({id: 3, gender: 'Both'})}
//                 onPress={() => {
//                   setSelectedGenders([0,1])
//                   setSelectedboy(false),
//                     setSelectedboth(true),
//                     setSelectedgirl(false);
//                 }}
//                 style={styles.checkBoxContainer}>
//                 <IconComp
//                   type={'MaterialIcons'}
//                   iconName={
//                     // GroupsData.filter(f=>(f.group_type =="Both"))
//                     selectedboth == true
//                       ? 'check-circle'
//                       : 'radio-button-unchecked'
//                   }
//                   passedStyle={styles.textLAbel}
//                 />
//                 <Heading
//                   passedStyle={styles.label}
//                   title={'Both'}
//                   fontType="medium"
//                 />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 activeOpacity={0.9}
//                 // onPress={() => onPressGender({id: 2, gender: 'Girls'})}
//                 onPress={() => {
//                   setSelectedGenders([1])
//                   setSelectedboy(false),
//                     setSelectedboth(false),
//                     setSelectedgirl(true);
//                 }}
//                 style={styles.checkBoxContainer}>
//                 <IconComp
//                   type={'MaterialIcons'}
//                   iconName={
//                     // selectedGenders[0]?.id === 2 || selectedGenders[1]?.id === 2
//                     selectedgirl == true
//                       ? 'check-circle'
//                       : 'radio-button-unchecked'
//                   }
//                   passedStyle={styles.textLAbel}
//                 />
//                 <Heading
//                   passedStyle={styles.label}
//                   title={'Girls'}
//                   fontType="medium"
//                 />
//               </TouchableOpacity>
//         </>
//       )
//     }
//     else{
//       return(
//         <TouchableOpacity
//         activeOpacity={0.9}
//         // onPress={() => onPressGender({id: 3, gender: 'Both'})}
//         onPress={() => {
//           setSelectedboy(false),
//             setSelectedboth(true),
//             setSelectedgirl(false);
//         }}
//         disabled={true}
//         style={styles.checkBoxContainer}>
//         <IconComp
//           type={'MaterialIcons'}
//           iconName={
//             // GroupsData.filter(f=>(f.group_type =="Both"))
//             true
//               ? 'check-circle'
//               : 'radio-button-unchecked'
//           }
//           passedStyle={styles.textLAbel}
//         />
//         <Heading
//           passedStyle={styles.label}
//           title={group?.group_type}
//           fontType="medium"
//         />
//       </TouchableOpacity>
//       )
//     }
//   }
//   return (
//     <View>
//       <StatusBar translucent={false} backgroundColor="black" />
//       <Modal isVisible={isModalVisible}>
//         <View style={styles.container}>
//           <View
//             style={{
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             {/* Age  */}
//             <View style={styles.filterContainer}>
//               <Heading
//                 passedStyle={styles.label}
//                 title={'Grade'}
//                 fontType="medium"
//               />
//               <View style={styles.rowView}>
//                 <TouchableOpacity
//                   onPress={() => {
//                     gradeHandler('decrease');
//                     setCounter(0)
//                   }}>
//                   <IconComp
//                     type={'Feather'}
//                     iconName={'minus-circle'}
//                     passedStyle={styles.textLAbel}
//                   />
//                 </TouchableOpacity>
//                 <Heading
//                   passedStyle={[styles.label, {marginHorizontal: width * 0.03}]}
//                   title={age}
//                   fontType="medium"
//                 />
//                 <TouchableOpacity
//                   onPress={() => {
//                     if (age < Data.length) {
//                       setAge(age + 1);
//                       setGradeData(Data.find(o => o.id === age + 1));
//                       setCounter(0)
//                       // console.log('grade', gradeCounter);
//                     }
//                   }}>
//                   <IconComp
//                     type={'Feather'}
//                     iconName={'plus-circle'}
//                     passedStyle={styles.textLAbel}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Grade  */}
//             <View style={styles.filterContainer}>
//               <Heading
//                 passedStyle={styles.label}
//                 title={'Group'}
//                 fontType="medium"
//               />

//               <View style={styles.rowView}>
//                 <TouchableOpacity
//                   onPress={() => {
//                     if (counter > 0) {
//                       setCounter(counter - 1);
//                     }
//                   }}>
//                   <IconComp
//                     type={'Feather'}
//                     iconName={'minus-circle'}
//                     passedStyle={styles.textLAbel}
//                   />
//                 </TouchableOpacity>
//                 <Heading
//                   passedStyle={[styles.label, {marginHorizontal: width * 0.03}]}
//                   title={grade?.Name}
//                   fontType="medium"
//                 />

//                 <TouchableOpacity
//                   onPress={() => {
//                     if (counter < GroupsData.length - 1) {
//                       setCounter(counter + 1);
//                     }
//                   }}>
//                   <IconComp
//                     type={'Feather'}
//                     iconName={'plus-circle'}
//                     passedStyle={styles.textLAbel}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//           {/* <Heading
//             passedStyle={[styles.label, {marginLeft: width * 0.03}]}
//             title={'Gender'}
//             fontType="medium"
//           /> */}
//           {GroupsData.filter(group => group.group_type == 'Both') ? (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-around',
//                 marginLeft: width * 0.05,
//               }}>
//               {GroupsData.length>1&&(
//                 <>
//                 {renderGenders(GroupsData[counter])}
//                 </>
//               )}
//             </View>
//           ) : (
//             <Text>nill</Text>
//           )}
//           {/* Buttons Container  */}
//           <View style={styles.flexRow}>
//             {showLoader ? (
//               <View style={styles.requestingView}>
//                 <LottieView
//                   speed={1}
//                   style={styles.lottieStyle}
//                   autoPlay
//                   loop
//                   source={require('../assets/lottie/color-loader.json')}
//                 />
//                 <Heading
//                   title="Please Wait..."
//                   passedStyle={styles.requestLabel}
//                   fontType="medium"
//                 />
//               </View>
//             ) : (
//               <>
//                 <Button
//                   title={buttonText || 'OK'}
//                   onBtnPress={() => {
//                     if (onPress) {
//                       // alert(JSON.stringify({
//                       //   grade: gradeData?.Name,
//                       //   gender: selectedGenders,
//                       //   group_id: grade?.id,
//                       // }))
//                       // alert(JSON.stringify(gradeData))
//                         onPress({
//                           grade_id: gradeData?.id,
//                           gender: selectedGenders.length>0?selectedGenders:(
//                             GroupsData[counter].group_type=="Female"?[1]:[0]
//                           ),
//                           group_id: grade?.id,
//                         });
//                     } else {
//                       setIsModalVisible(false);
//                     }
//                   }}
//                   isBgColor={false}
//                   btnStyle={styles.btnStyle}
//                   btnTextStyle={styles.btnTextStyle}
//                 />
//                 <Button
//                   title="CANCEL"
//                   onBtnPress={() => {
//                     setIsModalVisible(false);
//                   }}
//                   isBgColor={false}
//                   btnStyle={styles.cancelBtnStyle}
//                   btnTextStyle={styles.cancelBtnTextStyle}
//                 />
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };
// const mapStateToProps = ({userReducer}) => {
//   return {userReducer};
// };
// export default connect(mapStateToProps, null)(ParticipantFilterModal);

// const styles = StyleSheet.create({
//   textLAbel: {color: themeLightBlue, fontSize: width * 0.08},
//   rowView: {flexDirection: 'row', alignItems: 'center'},
//   checkBoxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: height * 0.015,
//     marginBottom: height * 0.025,
//     width: width * 0.35,
//   },
//   container: {
//     backgroundColor: 'white',
//     width: width * 0.9,
//     borderRadius: width * 0.06,
//     paddingVertical: height * 0.05,
//     paddingHorizontal: width * 0.05,
//   },
//   label: {
//     color: 'black',
//     fontSize: width * 0.05,
//   },
//   message: {
//     color: 'grey',
//     fontSize: width * 0.04,
//     marginVertical: height * 0.02,
//   },
//   inputStyle: {
//     borderBottomWidth: 1,
//     width: width * 0.8,
//     fontSize: width * 0.04,
//     marginLeft: 0,
//     paddingLeft: 0,
//     borderRadius: 0,
//   },
//   btnStyle: {
//     backgroundColor: themeLightBlue,
//     borderRadius: width * 0.025,
//     width: width * 0.35,
//     margin: 0,
//   },
//   filterContainer: {
//     paddingVertical: height * 0.01,
//     marginBottom: height * 0.02,
//     borderWidth: 1,
//     borderColor: themeLightBlue,
//     borderRadius: 10,
//     width: width * 0.8,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   cancelBtnStyle: {
//     borderRadius: width * 0.025,
//     width: width * 0.35,
//     borderWidth: 1,
//     borderColor: themeLightBlue,
//     margin: 0,
//   },
//   btnTextStyle: {
//     color: 'white',
//     fontSize: width * 0.045,
//     // fontFamily: 'Poppins-SemiBold',
//   },
//   cancelBtnTextStyle: {
//     color: themeLightBlue,
//     // fontFamily: 'Poppins-SemiBold',
//     fontSize: width * 0.04,
//   },
//   flexRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     alignSelf: 'center',
//     // width: width * 0.75,
//     minWidth: width * 0.75,
//   },
//   inputField: {
//     marginVertical: height * 0.03,
//     height: height * 0.23,
//     // backgroundColor: 'rgba(0,0,0,0.05)',
//     borderWidth: 1.2,
//     borderColor: themeLightBlue,
//     borderRadius: width * 0.05,
//     fontSize: width * 0.04,
//     paddingHorizontal: width * 0.04,
//     paddingVertical: height * 0.025,
//     textAlignVertical: 'top',
//     // fontFamily: 'Poppins-Regular',
//   },
//   requestingView: {
//     backgroundColor: themeLightBlue,
//     borderRadius: width * 0.025,
//     // paddingVertical: height * 0.015,
//     width: width * 0.75,
//     flexDirection: 'row',
//     borderWidth: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: themeLightBlue,
//   },
//   lottieStyle: {
//     height: height * 0.07,
//     // position: 'absolute',
//     // marginTop: -30,
//     // top: height * 0.005,
//     // left: width * 0.01,
//   },
//   requestLabel: {
//     color: 'white',
//     fontSize: width * 0.05,
//     // marginLeft: width * 0.08,
//     // fontFamily: 'Poppins-SemiBold',
//   },
// });
