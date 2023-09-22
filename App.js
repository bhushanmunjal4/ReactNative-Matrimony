import React, { useState, useEffect } from "react";
import HeaderBar from "./src/Header/HeaderBar";
import AppNavigator from "./src/Navigation/AppNavigator";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import RegisterScreen from "./src/Register/RegisterScreen.js";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/Login/LoginScreen";
import MainComponent from "./src/MainComponent/MainComponent";

const Stack = createStackNavigator();

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
  };

  // const handleLoginSuccess = () => {
  //   setIsLoggedIn(true);
  // };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainComponent}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
