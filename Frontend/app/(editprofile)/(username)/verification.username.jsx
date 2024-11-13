
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
// import { images } from '../../constants';
import { images } from '../../../constants';

const VerificationUsernameScreen = ({ route, navigation }) => {
  const [enteredOtp, setEnteredOtp] = useState('');
  const { otp, username } = route.params; // Get OTP and username from ForgotPasswordScreen

  const handleVerification = () => {
    if (enteredOtp === otp) {
      Alert.alert('Success', 'OTP Verified Successfully');
      navigation.navigate('ChangeUsernameScreen', { username });
    } else {
      Alert.alert('Error', 'Invalid OTP, please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <View className="justify-center items-center">
        <Image source={images.otp} 
        className="w-80 h-72 mb-5 mt-0"
        resizeMode="contain" 
        />
      </View>
      <Text style={styles.text}>Please enter the OTP sent to your email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={enteredOtp}
        onChangeText={setEnteredOtp}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerification}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: '#1d6b6b' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  icon: { alignItems: 'center', marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 10, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 12, marginBottom: 20, textAlign: 'center' },
  button: { backgroundColor: '#f8b133', paddingVertical: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default VerificationUsernameScreen;

