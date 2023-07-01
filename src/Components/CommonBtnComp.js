//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import { moderateScale, moderateScaleVertical, textScale, width } from '../styles/responsiveSize';

// create a component
const CommonBtnComp = ({ title = "hello", btnViewStyle = {}, onBtnPress=()=>{} }) => {
    return (
        <TouchableOpacity onPress={onBtnPress} style={{ ...styles.btnViewStyle, ...btnViewStyle }}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    btnViewStyle: {
        width:moderateScale(width/3.57),
        paddingVertical:moderateScaleVertical(13),
        borderRadius:moderateScale(25),
        alignItems: 'center',
        backgroundColor:"#5D606F"
    },
    title:{
        textTransform:'capitalize',
        fontSize:textScale(16),
        fontWeight:"600",
        color:colors.white
    }
});

//make this component available to the app
export default CommonBtnComp;
