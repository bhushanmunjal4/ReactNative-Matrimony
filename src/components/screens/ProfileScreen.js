import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.scrollContainer}>
        <Image
          source={require("../../../assets/sample_image1.jpg")}
          style={styles.profileImage}
        />
        <View style={styles.separator} />
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>UserName</Text>
          <Text style={styles.value}>John</Text>

          <Text style={styles.label}>Date of Birth</Text>
          <Text style={styles.value}>January 1, 1990</Text>

          <Text style={styles.label}>Profession</Text>
          <Text style={styles.value}>Engineer</Text>

          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>Male</Text>

          <Text style={styles.label}>Height</Text>
          <Text style={styles.value}>5'10"</Text>

          <Text style={styles.label}>Contact Number</Text>
          <Text style={styles.value}>123-456-7890</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4F4F4",
  },
  scrollContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 32,
  },
  separator: {
    height: 1,
    backgroundColor: "#AFAFAF",
    width: "100%",
    marginTop: 16,
    marginBottom: 16,
  },
  detailsContainer: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#FF5A60",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    marginTop: 16,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileScreen;
