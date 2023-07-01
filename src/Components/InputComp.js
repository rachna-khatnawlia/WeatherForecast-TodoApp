//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import colors from '../styles/colors';
import {moderateScale, textScale} from '../styles/responsiveSize';

// create a component
const InputComp = ({
  label,
  placeholder = '',
  value = '',
  onChangeText = () => {},
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={{...styles.inputStyle}}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  label: {
    fontSize: textScale(15),
    color: colors.grayprice,
  },
  inputStyle: {
    padding: moderateScale(20),
    borderWidth: 1,
    borderRadius: moderateScale(30),
    marginTop: moderateScale(10),
    borderColor: colors.grayprice,
    marginBottom: moderateScale(20),
  },
});

//make this component available to the app
export default InputComp;
