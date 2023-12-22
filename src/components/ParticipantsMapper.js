import { StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import React from 'react';
import Heading from './Heading';
import moment from 'moment';
import { imageUrl } from '../config';
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window');

const colors=[
  {
    id:1,
    color:"red"
  },
  {
    id:2,
    color:"blue"
  },
  {
    id:3,
    color:"green"
  },
  {
    id:4,
    color:"orange"
  },
  {
    id:5,
    color:"violet"
  },
  {
    id:6,
    color:"yellow"
  },
  {
    id:7,
    color:"pink"
  },
  {
    id:8,
    color:"white"
  },
]

const ParticipantsMapper = ({ item, index, userReducer, pastAssessment }) => {
  // const colors_reversed = colors.reverse();

  // userReducer?.colors.map(ele => console.log(ele.id,"-"));
  // const colors_arr =
  //   userReducer?.colors[0]?.id == 1
  //     ? userReducer?.colors
  //     : userReducer?.colors.reverse();

  // console.log("assessment_scoring", item?.id, item?.assessment_id, item?.assessments[0]?.assessment_scoring);
  // console.log("tt",pastAssessment)

  function getGames(id, forDate) {
    const withColor = [...pastAssessment].map(it=>{
      return {
        ...it,
        color:colors.filter(itSub=>itSub.id==it.ColorID)[0].color
      }
    })
    if (forDate) {
      return withColor
    }
    if (withColor.length == 2) {
      return ["gray", ...withColor]
    }
    else if (withColor.length == 1) {
      return ["gray", "gray", ...withColor]
    } else if (withColor.length == 0) {
      return ["gray", "gray", "gray", ...withColor]
    }
    return withColor.slice(0, 3)

  }

  // console.log("itttttttt",item)
  function getColor(id) {
    const filterColor = userReducer?.colors.filter(it => it.id == id)[0]
    return filterColor?.WebColor
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: width * 0.5,
        }}>

        <Image
          source={{
            uri: `${imageUrl}/assessment_image/${item?.Image}`,
          }}
          resizeMode="contain"
          style={styles.imageStyles}
        />
        <Heading
          title={`${item?.Name?.length > 0 && item?.Name?.substring(0, 20)}...`}
          // title={item?.assessments?.length > 0 && item?.assessments[0]?.Name}
          passedStyle={styles.nameStyle}
          fontType="regular"
        />
        <Heading
          title={pastAssessment[0]?.DTRecorded}
          passedStyle={styles.dateStyle}
          fontType="regular"
        />
      </View>
      <View style={styles.colorsViewStyle}>
        {getGames(item.id).map((it, i) => {
          return (
            <View
              key={i}
              style={{
                backgroundColor: it == "gray" ? "gray" : (it.color? it.color : "black"),
                borderRadius: 9,
                padding: width * 0.02,
                marginLeft: 3,

              }}>

            </View>
          )
        })}
      </View>

      {/* <View style={styles.colorsViewStyle}>
        {item?.assessments?.length > 0 &&
          item?.assessments[0]?.assessment_scoring?.map((ele, index) => {
            let color_id = ele?.color_id;
            let minValue = ele?.MinValue;
            let maxValue = ele?.MaxValue;
            let colorObj = userReducer?.colors.find((color) => color.id == color_id)

            // console.log(color_id, minValue, maxValue);
            return (
              <>
              <View
                key={index}
                style={{
                
                  backgroundColor:
                    parseInt(item?.Score) >= parseInt(minValue) &&
                    (parseInt(item?.Score) >= parseInt(maxValue) ||
                      parseInt(item?.Score) <= parseInt(maxValue))
                      ? colorObj?.WebColor
                      : 'gray',
                  
                  borderRadius: 9,
                  padding: width * 0.02,
                  marginLeft: 3,
            
                }}>
               
              </View>
            
              </>
              
              
            );
          })}
      </View> */}
      {/* <View style={{
                backgroundColor:"black",
                borderRadius: 9,
                  padding: width * 0.02,
                  marginLeft: 3,
            
                }}></View> */}

    </View>
  );
};

const mapStateToProps = ({ userReducer }) => {
  return { userReducer };
};
export default connect(mapStateToProps, null)(ParticipantsMapper);

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    zIndex: 999,
    borderBottomColor: 'silver',
    borderBottomWidth: 1,
    height: height * 0.09,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: width * .06
  },
  imageStyles: {
    width: width * 0.072,
    // backgroundColor: 'green',
    height: height * 0.032,
  },
  nameStyle: {
    color: 'white',
    fontSize: width * 0.033,
    marginHorizontal: width * 0.01,
    width: width * 0.25,
    // backgroundColor: 'purple',
  },
  dateStyle: {
    color: 'white',
    fontSize: width * 0.033,
    marginHorizontal: width * 0.01,
    width: width * 0.3,
    // backgroundColor: 'red',
  },
  colorsViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },
});
