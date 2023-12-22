import {View, Dimensions, FlatList} from 'react-native';
import React from 'react';
import { responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
const {width, height} = Dimensions.get('window');

const ColoredFlatlist = () => {
  return (
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      {colors.map((item,index)=>{
        return(
          <View
          key={index}
          style={{
            marginVertical: height * 0.01,
            width: '14.285%',
            height: height * 0.005,
            backgroundColor: item?.color,
          }}
        />
        )
      })}
    </View>
    // <FlatList
    //   data={colors} showsHorizontalScrollIndicator={false}
    //   horizontal={true}
    //   contentContainerStyle={{width:'100%',padding:0 }}
    //   keyExtractor={({item, index}) => item?.id?.toString()}
    //   renderItem={({item, index}) => {
    //     return (
    //       <View
    //         style={{
    //           marginVertical: height * 0.01,
    //           width: '14.285%',
    //           height: height * 0.005,
    //           backgroundColor: item?.color,
    //         }}
    //       />
    //     );
    //   }}
    // />
  );
};

export default ColoredFlatlist;

const colors = [
  {
    id: 1,
    color: '#E5306D',
  },

  {
    id: 2,
    color: '#EF4A37',
  },
  {
    id: 3,
    color: '#F17A29',
  },
  {
    id: 4,
    color: '#E4C546',
  },
  {
    id: 5,
    color: '#40C0C9',
  },
  {
    id: 6,
    color: '#6592CD',
  },
  {
    id: 7,
    color: '#704FA0',
  },
];
