//import liraries
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import AuthStack from "./AuthStack";

const Stack = createStackNavigator();

// create a component
const Routes = () => {
  // const {record} = useSelector((state) => state?.record);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {AuthStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//make this component available to the app
export default Routes;
