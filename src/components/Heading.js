import React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// fonts type
const BOLD = 'Montserrat-Bold';
const MEDIUM = 'Montserrat-Medium';
const BLACK = 'Montserrat-Black';
const ITALIC = 'Montserrat-Italic';
const REGULAR = 'Montserrat-Regular';
const BOLD_ITALIC = 'Montserrat-BoldItalic';
const EXTRA_BOLD_ITALIC = 'Montserrat-ExtraBoldItalic';
const SEMI_BOLD = 'Montserrat-SemiBold';
const EXTRA_BOLD = 'Montserrat-ExtraBold';

const Heading = ({title, passedStyle, fontType}) => {
  return (
    <Text
      style={[
        styles.text,
        passedStyle,
        {
          fontFamily:
            fontType === 'semi-bold'
              ? SEMI_BOLD
              : fontType === 'black'
              ? BLACK
              : fontType === 'medium'
              ? MEDIUM
              : fontType === 'italic'
              ? ITALIC
              : fontType === 'bold'
              ? BOLD
              : fontType === 'extra-bold'
              ? EXTRA_BOLD
              : fontType === 'bold-italic'
              ? BOLD_ITALIC
              : fontType === 'extra-bold-italic'
              ? EXTRA_BOLD_ITALIC
              : REGULAR,
        },
      ]}>
      {title}
    </Text>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: width * 0.11,
    color: 'black',
  },
});

export default Heading;
