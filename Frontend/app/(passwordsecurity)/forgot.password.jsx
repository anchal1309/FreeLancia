import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { images } from '../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPasswordScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null); // State to store user data
  
  const [email, setEmail] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);

  // // Fetch user profile on component load
  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('authToken');
  //       if (!token) {
  //         Alert.alert('Error', 'User is not logged in!');
  //         navigation.replace('/auth'); // Redirect to login if not logged in
  //         return;
  //       }

  //       const response = await axios.get('http://192.168.241.178:8080/api/v1/users/profile', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const data = response.data;
  //       if (data) {
  //         setUsername(data.username);
  //         setEmail(data.email);
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch profile:', error);
  //       Alert.alert('Error', 'Failed to load profile');
  //     }
  //   };

  //   fetchUserProfile();
  // }, []);
    // Fetch user data from AsyncStorage
    useEffect(() => {
      const loadUserData = async () => {
        try {
          const userProfile = await AsyncStorage.getItem('userProfile');
          if (userProfile) {
            const parsedUserProfile = JSON.parse(userProfile);
            setUserData(parsedUserProfile);
            setUsername(parsedUserProfile.username); // Set username only if userData is available
          }
        } catch (error) {
          console.error("Failed to load user data:", error);
        }
      };
      loadUserData();
    }, []);

  const handleNext = async () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);

    const requestBody = {
      email: userData.email,
      use: "Password reset",
      text: `Hello ${username},\n\nYour OTP for password reset is: ${otp}\n\nThank you,\nCityforge Team`
    };

    try {
      const response = await axios.post('http://192.168.80.134:8080/api/v1/email/send-otp', requestBody);

      if (response.status === 200) {
        console.log(`OTP sent to ${userData.email}: ${otp}`);
        navigation.navigate('Verification', { otp, username });
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while sending OTP.');
    }
  }; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <View className="justify-center items-center">
        <Image source={images.forgot} 
        className="w-80 h-72 mb-5 mt-0"
        resizeMode="contain" 
        />
      </View>
      <Text style={styles.text}>Please enter your registered email ID:</Text>
      <TextInput
        style={styles.input}
        value={userData ? userData.email : ''}
        editable={false}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: '#1d6b6b' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  icon: { alignItems: 'center', justifyContent: 'center'},
  text: { fontSize: 16, marginBottom: 10, textAlign: 'center' },
  input: { backgroundColor: '#b4d4e7c4', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 8, marginBottom: 15, fontSize: 16, color: 'black' },
  button: { backgroundColor: '#f8b133', paddingVertical: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default ForgotPasswordScreen;
