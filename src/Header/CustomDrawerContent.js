import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomDrawerContent = () => {
  return (
    <View style={styles.drawerContent}>
      <Text style={styles.drawerItem}>Logout</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  drawerItem: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomDrawerContent;
