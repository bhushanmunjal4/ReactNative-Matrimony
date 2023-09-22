import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectDropdown from "react-native-select-dropdown";

const RegisterScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [profession, setProfession] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const genders = ["Male", "Female"];

  const handleNextStep = () => {
    setFormError(""); // Clear any previous error message

    // Validate the current step fields
    if (
      step === 1 &&
      (username.trim() === "" ||
        profession.trim() === "" ||
        gender.trim() === "")
    ) {
      setFormError("Please fill in all the required fields.");
      return;
    }

    // Proceed to the next step
    setStep(step + 1);
  };

  const handleRegister = () => {
    // Perform final validation before registering the user
    if (step === 2 && password.trim() === "") {
      setFormError("Please enter a password");
      return;
    }

    // Construct the user data object
    const userData = {
      username,
      profession,
      gender,
      password,
      profile: "",
      preference: "",
      dateOfBirth,
      city,
      state,
    };

    // Send a POST request to the backend API to register the user
    fetch("http://192.168.29.221:3000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Registration successful:", data);
        onRegistrationSuccess();
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        setFormError("Registration failed. Please try again.");
      });
  };

  const handleImageUpload = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission denied to access media library");
        return;
      }

      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!image.cancelled) {
        setProfileImage(image.uri);
      }
    } catch (error) {
      console.error("Error while uploading image:", error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setDateOfBirth(date);
    hideDatePicker();
  };

  const handleCitySelect = (value) => {
    setCity(value);
    cityRef.current?.close();
  };

  const handleStateSelect = (value) => {
    setState(value);
    stateRef.current?.close();
  };

  const onRegistrationSuccess = () => {
    console.log("Registration Successful");
    // Add navigation logic here to navigate to the main screen or any desired screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Register</Text>

        {step === 1 && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Profession"
              value={profession}
              onChangeText={setProfession}
            />
            <TouchableOpacity
              style={styles.input}
              onPress={() => setGender(gender === "Male" ? "Female" : "Male")}
            >
              <Text style={styles.inputText}>{gender || "Gender"}</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <TouchableOpacity
              style={styles.imageInput}
              onPress={handleImageUpload}
            >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <Text style={styles.imagePlaceholder}>Add Profile Image</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.input} onPress={showDatePicker}>
              <Text style={styles.inputText}>
                {dateOfBirth ? dateOfBirth.toDateString() : "Date of Birth"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
            />
            <SelectDropdown
              ref={cityRef}
              options={["City 1", "City 2", "City 3"]}
              defaultValue="City"
              onSelect={handleCitySelect}
              style={styles.input}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
            <SelectDropdown
              ref={stateRef}
              options={["State 1", "State 2", "State 3"]}
              defaultValue="State"
              onSelect={handleStateSelect}
              style={styles.input}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </>
        )}

        {formError !== "" && <Text style={styles.errorText}>{formError}</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={step === 1 ? handleNextStep : handleRegister}
        >
          <Text style={styles.buttonText}>
            {step === 1 ? "Next" : "Register"}
          </Text>
        </TouchableOpacity>

        {step === 2 && (
          <TouchableOpacity
            style={styles.login}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginText}>Existing User? Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
    backgroundColor: "#F4F4F4",
    justifyContent: "center",
  },
  contentContainer: {
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
  dropdown: {
    marginTop: 8,
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
    padding: 12,
  },
  dropdownIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  imageInput: {
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  imagePlaceholder: {
    fontSize: 14,
    marginBottom: 8,
    color: "#FF5A60",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF5A60",
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  loginText: {
    textAlign: "center",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
});

export default RegisterScreen;
