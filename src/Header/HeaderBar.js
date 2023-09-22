import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";

const HeaderBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftIcon}>
        <MaterialIcons name="menu" color="#fff" size={24} />
      </View>
      <View style={styles.logo}>
        <Text style={styles.logoText}>Shaadi.com</Text>
      </View>
      <View style={styles.rightIcon}>
        <MaterialIcons name="search" color="#fff" size={24} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FF5A60",
    paddingHorizontal: 16,
    height: 110,
    paddingTop: 40,
  },
  leftIcon: {
    marginRight: 16,
  },
  logo: {
    flex: 1,
    alignItems: "center",
  },
  logoText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  rightIcon: {
    marginLeft: 16,
  },
});

export default HeaderBar;
