import React from "react";
import HeaderBar from "../Header/HeaderBar";
import AppNavigator from "../Navigation/AppNavigator";
import { View, StyleSheet } from "react-native";

const MainComponent = () => {
  return (
    <>
      <HeaderBar />
      <AppNavigator />
    </>
  );
};

export default MainComponent;
