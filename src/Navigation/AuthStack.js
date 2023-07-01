//import liraries
import React from 'react';
import {CountrySelect, Home, Main, ToDo, WeatherForecast} from '../Screens';
import NavigationStrings from './NavigationStrings';

// create a component
const AuthStack = Stack => {
  return (
    <>
      <Stack.Screen name={NavigationStrings.HOME} component={Home} />
      <Stack.Screen name={NavigationStrings.TO_DO} component={ToDo} />
      <Stack.Screen
        name={NavigationStrings.WEATHER_FORECAST}
        component={WeatherForecast}
      />
    </>
  );
};

//make this component available to the app
export default AuthStack;
