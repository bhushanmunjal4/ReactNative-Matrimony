import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [formError, setFormError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const validateForm = () => {
    let isValid = true;

    if (username.trim() === "") {
      setUsernameError("Please enter a username");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (password.trim() === "") {
      setPasswordError("Please enter a password");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = () => {
    const isValid = validateForm();

    const userData = {
      username,
      password,
    };

    fetch("http://192.168.29.221:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          onLoginSuccess();
        } else {
          setFormError("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setFormError("Login failed. Please try again.");
      });
  };

  const onLoginSuccess = () => {
    console.log("Login successful");
    navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Brandtitle}>Shaadi.Com</Text>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />
      {usernameError !== "" && (
        <Text style={styles.errorText}>{usernameError}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {passwordError !== "" && (
        <Text style={styles.errorText}>{passwordError}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.login}
        onPress={() => navigation.navigate("Register")}
      >
        {formError !== "" && <Text style={styles.errorMain}>{formError}</Text>}
        <Text style={styles.loginText}>if new user? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#F4F4F4",
  },
  Brandtitle: {
    color: "#FF5A60",
    fontSize: 50,
    fontWeight: "900",
    marginBottom: 50,
    textAlign: "center",
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
  button: {
    backgroundColor: "#FF5A60",
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  login: {
    marginTop: 40,
  },
  loginText: {
    textAlign: "center",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  errorMain: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default LoginScreen;
