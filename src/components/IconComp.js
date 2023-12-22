import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { themePurple } from '../assets/colors/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const IconComp = ({iconName, iconSize, type, passedStyle}) => {
  switch (type) {
    case 'MaterialIcons':
      return (
        <MaterialIcons
          name={iconName}
          size={iconSize || 20}
          color={themePurple}
          style={passedStyle}
        />
      );
    case 'Entypo':
      return (
        <Entypo
          name={iconName}
          size={iconSize || 20}
          color={'white'}
          style={passedStyle}
        />
      );

    case 'Ionicons':
      return (
        <Ionicons
          name={iconName}
          size={iconSize || 20}
          color={'white'}
          style={passedStyle}
        />
      );

    case 'MaterialCommunityIcons':
      return (
        <MaterialCommunityIcons
          name={iconName}
          size={iconSize || 20}
          color={'white'}
          style={passedStyle}
        />
      );

    case 'Feather':
      return (
        <Feather
          name={iconName}
          size={iconSize || 20}
          color={'white'}
          style={passedStyle}
        />
      );

    case 'FontAwesome5':
      // console.log(
      //   {iconName, iconSize, type, passedStyle},
      //   '5-------------------------------',
      // );
      return (
        <FontAwesome5
          name={iconName}
          size={iconSize || 20}
          color={'white'}
          style={passedStyle}
        />
      );

    case 'FontAwesome':
      return (
        <FontAwesome
          name={iconName}
          size={iconSize || 20}
          color={'white'}
          style={passedStyle}
        />
      );

    case 'Fontisto':
      return (
        <Fontisto
          name={iconName}
          size={iconSize || 20}
          color={'white'}
          style={passedStyle}
        />
      );

    default:
      return null;
      break;
  }
};

const styles = StyleSheet.create({});
export default IconComp;
