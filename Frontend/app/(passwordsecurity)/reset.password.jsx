import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { images } from '../../constants';
import Icon from "react-native-vector-icons/Feather";

const ResetPasswordScreen = ({ route, navigation }) => {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { username } = route.params; // Get username from VerificationScreen

      // Function to handle input changes and validation
      const handleInputChange = (field, value) => {
        if (field === 'newPassword') setNewPassword(value);
        if (field === 'confirmPassword') setConfirmPassword(value);
        validateField(field, value);
      };

            // Validation for new password and confirm password fields
  const validateField = (field, value) => {
    let error = '';

    if (field === 'newPassword' || field === 'confirmPassword') {
      error = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(value)
        ? "Password must be at least 6 characters long, include 1 uppercase, 1 lowercase, 1 digit, and 1 special character."
        : "";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const handleChangePassword = async () => {

    // Clear existing errors
    setErrors({});

    // Check for validation errors
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (Object.values(errors).some(error => error !== "") || !newPassword || !confirmPassword) {
      Alert.alert("Form Error", "Please correct the errors in the form.");
      return;
    }

    const requestBody = { username, newPassword };

    try {
      const response = await axios.put('http://192.168.80.134:8080/api/v1/users/update-password', requestBody);
      if (response.status === 200) {
        Alert.alert('Success', 'Password changed successfully');
        navigation.popToTop(); // Navigate back to the top of the stack
      } else {
        Alert.alert('Error', 'Failed to update the password. Please try again.'); 
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while updating the password.');
    }
  };

  // const handleChangePassword = async () => {
  //   if (newPassword === confirmPassword) {
  //     const requestBody = { username, newPassword };

  //     try {
  //       const response = await axios.put('http://192.168.210.178:8080/api/v1/users/update-password', requestBody);
  //       if (response.status === 200) {
  //         Alert.alert('Success', 'Password changed successfully');
  //         navigation.popToTop(); // Navigate back to the top of the stack
  //       } else {
  //         Alert.alert('Error', 'Failed to update the password. Please try again.');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       Alert.alert('Error', 'An error occurred while updating the password.');
  //     }
  //   } else {
  //     Alert.alert('Error', 'Passwords do not match');
  //   }
  // };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>
        <View className="justify-center items-center">
        <Image source={images.reset} 
        className="w-80 h-72 mb-4 mt-0"
        resizeMode="contain" 
        />
      </View>
        <Text style={styles.text}>Please enter a new password:</Text>
                {/* New Password Input */}
                <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#021C2C"
            secureTextEntry={!showPassword}
            value={newPassword}
            onChangeText={(value) => handleInputChange('newPassword', value)}
          />
          <TouchableOpacity
            style={styles.iconEye}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#021C2C"
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
          />
          <TouchableOpacity
            style={styles.iconEye}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
        <TouchableOpacity style={styles.buttonSubmit} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: '#1d6b6b', height: 750 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  icon: { alignItems: 'center', marginBottom: 10 },
  inputContainer: { position: 'relative', marginBottom: 20 },
  input: { 
    backgroundColor: '#1d6b6b', 
    padding: 15, 
    borderRadius: 8, 
    borderWidth: 1,
    fontSize: 16, 
    color: '#021C2C' 
  },
  text: { fontSize: 16, marginBottom: 10, textAlign: 'center' },
  iconEye: { position: 'absolute', right: 15, top: 15 },
  errorText: { color: '#fc4f49', marginBottom: 10 },
  // input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 12, marginBottom: 20 },
  button: { backgroundColor: '#f8b133', paddingVertical: 15, borderRadius: 8, alignItems: 'center' },
  buttonSubmit: { backgroundColor: '#f8b133', paddingVertical: 15, borderRadius: 8, alignItems: 'center'},
  buttonText: { color: '#fff', fontSize: 16 },
});

export default ResetPasswordScreen;
