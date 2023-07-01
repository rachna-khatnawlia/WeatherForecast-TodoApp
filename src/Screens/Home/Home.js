//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import NavigationStrings from '../../Navigation/NavigationStrings';

// create a component
const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button
        title="To Do App"
        onPress={() => navigation.navigate(NavigationStrings.TO_DO)}
      />
      <Button
        title="Weather Forecast App"
        onPress={() => navigation.navigate(NavigationStrings.WEATHER_FORECAST)}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Home;
