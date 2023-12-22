import { StyleSheet, Text, View } from 'react-native'
import Video from 'react-native-video'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

export default function TourVideo({uri,done}) {
    console.log("****************",uri)
  return (
    <View style={{flex:1,backgroundColor:'green'}}>
      <Video
      resizeMode="cover"
      controls={false}
      onEnd={done}
      style={{width:responsiveWidth(100),height:responsiveHeight(100)}}
    //   controls={true}
      source={{uri:uri}}
      />
    </View>
  )
}

const styles = StyleSheet.create({})