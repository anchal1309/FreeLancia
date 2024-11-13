import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure to install this package
import { icons } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios'; // For API calls
import { NavigationContainer } from '@react-navigation/native';
import { ThemeContext, ThemeProvider } from '../(theme)/ThemeContext';
// import EmailChangeScreen from './(emailchange)/email';
import UsernameChangeScreen from './(username)/username';


const Stack = createStackNavigator();

// Main component where the stack is set up
const App = () => {
  return (
    <ThemeProvider>
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="EditProfileScreen">
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UsernameChangeScreen" component={UsernameChangeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;

const EditProfileScreen = () => {
  const { theme } = useContext(ThemeContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [problemDescription, setProblemDescription] = useState('');

  const navigation = useNavigation(); // Hook to get navigation

//   // Function to navigate to Login screen
//   const handleLoginClick = () => {
//     navigation.navigate('Login');
//   };

//   const handleThemeClick = () => {
//     navigation.navigate('ThemeScreen')
//   };

//   // Function to handle form submission
//   const handleSubmit = () => {
//     if (username && email && problemDescription) {
//       Alert.alert('Complaint Sent', 'Your complaint has been sent to customer care successfully.');

//       // Clear the text fields
//       setUsername('');
//       setEmail('');
//       setProblemDescription('');
//     } else {
//       Alert.alert('Missing Information', 'Please fill out all fields before submitting.');
//     }
//   };

  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: theme.common.backgroundColor}]}>
      {/* <Text style={styles.title}>Help</Text> */}
      
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.common.buttonColor}]} onPress={() => navigation.navigate('UsernameChangeScreen')}>
        
      <Image
        source={icons.theme}
        className=" w-10 h-10 mx-3"
        resizeMode='cover'
      />
        <Text style={styles.buttonText}>Edit Username</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} >
      <Image
        source={icons.language}
        style={styles.icon}
        resizeMode='cover'
      />
        <Text style={styles.buttonText}>Edit Email</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    height: 650,
    backgroundColor: '#1d6b6b',
  },
  icon:{
    width: 40,
    height: 40,
    marginHorizontal:12,
  },
  button: {
    backgroundColor: '#5df7ff55',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%', // Full width button
    alignItems: 'center',
    display: "flex",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#b4d4e7c4',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: 'black',
  },
  textArea: {
    height: 100,
  },
  submitButton: {
    backgroundColor: '#eb812a', // Blue color for submit
    paddingVertical: 17,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 70,
  },
  submitButtonText: {
    fontSize: 20,
    color: '#fff',
  },
});