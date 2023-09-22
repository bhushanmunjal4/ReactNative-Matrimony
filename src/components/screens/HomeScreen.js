import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";
// import { maleProfileListings, femaleProfileListings } from "../../Data/data.js";
import axios from "axios";

const HomeScreen = () => {
  const [profileListings, setProfileListings] = useState([]);
  const userGender = "male";

  useEffect(() => {
    const fetchProfileListings = async () => {
      try {
        const response = await axios.get(
          `http://192.168.29.221:3000/users/profiles`,
          {
            params: { preference: userGender },
          }
        );
        setProfileListings(response.data.profiles);
        console.log(response.data.profiles);
      } catch (error) {
        console.error("Error fetching user profiles:", error);
      }
    };

    fetchProfileListings();
  }, []);

  return (
    <View>
      <ScrollView style={styles.container}>
        {profileListings.map((profile) => (
          <View key={profile.id} style={styles.card}>
            <View style={styles.topRow}>
              <Image source={profile.image} style={styles.profileImage} />
              <View style={styles.profileTextContainer}>
                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.profession}>{profile.profession}</Text>
                <Text>
                  Age: {profile.age} | Height: {profile.height}
                </Text>
                <Text>
                  {profile.city}, {profile.state}
                </Text>
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.bottomContainer}>
              <View style={styles.iconContainer}>
                <MaterialIcons
                  name="favorite-outline"
                  color="#FF5A60"
                  size={24}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Send Request</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingVertical: 7,
    backgroundColor: "#F4F4F4",
  },
  card: {
    display: "flex",
    backgroundColor: "#FFF",
    marginBottom: 10,
    padding: 16,
    borderRadius: 8,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 40,
  },
  profileTextContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profession: {
    fontSize: 16,
    color: "#888",
  },
  iconContainer: {
    marginRight: 180,
  },
  separator: {
    height: 0.5,
    backgroundColor: "#AFAFAF",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "#FF5A60",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 30,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default HomeScreen;
