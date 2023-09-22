import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "react-native-vector-icons";

import HomeScreen from "../components/screens/HomeScreen.js";
import NotificationsScreen from "../components/screens/NotificationsScreen";
import MessageScreen from "../components/screens/MessageScreen";
import ProfileScreen from "../components/screens/ProfileScreen";
import FavoriteScreen from "../components/screens/FavoriteScreen";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  // Get the navigation object
  const navigation = useNavigation();

  // Function to navigate to the ProfileScreen
  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarLabelStyle: { color: "#fff", fontWeight: 600 },
          tabBarStyle: { backgroundColor: "#FF5A60", paddingTop: 10 },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Favourite"
          component={FavoriteScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="favorite" color="#fff" size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="notifications" color="#fff" size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color="#fff" size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessageScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="message" color="#fff" size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" color="#fff" size={size} />
            ),
            tabBarOnPress: navigateToProfile,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default AppNavigator;
