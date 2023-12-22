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
import React from 'react'
import { useEffect, useState  } from 'react';


const { width, height } = Dimensions.get('window');
const FAQ = () => {
    const [faqdata,setfaqdata]=useState([]);
    // console.log("setfaqdata",faqdata);
    const FAQDATA = ({ item }) => (
        <View style={{paddingVertical:width*0.03,paddingHorizontal:width*0.045}}>
            <Text style={{fontSize:width*0.049,color:"white",fontStyle:"italic",textDecorationLine:"underline"}}>
              {item.question}
            </Text>
            <Text style={{fontSize:width*0.038,color:"white",marginTop:height*0.01}}>
                {item.answer}
            </Text>
        </View>
      );
    useEffect(() => {
       data()
      }, [])
    
    const data=()=>{
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://webprojectmockup.com/custom/spectrum-8/api/faqs", requestOptions)
            .then(response => response.json())
            .then(result => setfaqdata(result.data))
            .catch(error => console.log('error', error));
    }

    return (
        <ImageBackground
            source={require('../assets/images/bg.jpg')}
            style={styles.container}>
            <ScrollView>
                <View style={{}}>
                    <Text style={styles.text}>
                        FAQ
                    </Text>
                    <FlatList

data={faqdata}
renderItem={FAQDATA}
keyExtractor={item => item.color_sort}
// scrollEnabled={false}
// contentContainerStyle={{
//   flexGrow: 1,
// }}
/>
                </View>
            </ScrollView>

        </ImageBackground>
    )
}

export default FAQ
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
    },
    text: {
        color: "white",
        alignSelf:"center",
        fontSize:width*0.1,
        fontStyle:"italic",
    }
})