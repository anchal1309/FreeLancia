import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Image, Alert, BackHandler, TextInput, ActivityIndicator  } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // For icons
import { Link, useRouter } from 'expo-router'; // For navigation
import AsyncStorage from '@react-native-async-storage/async-storage'; // For persistent storage
import { icons } from '../../constants';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null); // State to store user data
  const [modalVisible, setModalVisible] = useState(false); // For modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // Store selected profile picture
  const router = useRouter(); // Navigation hook for redirecting
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  // const [userPosition, setUserPosition] = useState('Officer');
  // let userPosition = userData.role;

  // Hardcoded preset images for profile selection
  const presetImages = [
    require('../../assets/images/boy.png'), 
    require('../../assets/images/boy1.png'),
    require('../../assets/images/boy2.png'), 
    require('../../assets/images/boy3.png'),
    require('../../assets/images/girl.png'),
    require('../../assets/images/girl1.png'),
    require('../../assets/images/girl2.png'),
  ];

  useEffect(() => {
    // Load the saved profile picture and password when the component mounts
    const loadProfileData = async () => {
      try {
        const savedImageUri = await AsyncStorage.getItem('profilePictureUri');
        const savedPassword = await AsyncStorage.getItem('userPassword');
        
        if (savedImageUri) {
          setSelectedImage({ uri: savedImageUri });
        }
        if (savedPassword) {
          setCurrentPassword(savedPassword); // Load the saved password
        }
      } catch (error) {
        console.log('Error loading data:', error);
      }
    };
    loadProfileData();
  }, []);

  // Function to handle avatar selection and persist it
  const handleImageSelect = async (image) => {
    setSelectedImage(image);
    setModalVisible(false); // Close modal after selection

    try {
      // Save the selected image's URI to AsyncStorage
      await AsyncStorage.setItem('profilePictureUri', Image.resolveAssetSource(image).uri);
      Alert.alert('Avatar Updated!', 'Your Avatar has been successfully updated.');
    } catch (error) {
      console.log('Error saving avatar:', error);
    }
  };

    // Fetch user data from AsyncStorage
    useEffect(() => {
      const loadUserData = async () => {
        try {
          const userProfile = await AsyncStorage.getItem('userProfile');
          if (userProfile) {
            setUserData(JSON.parse(userProfile));
          }
        } catch (error) {
          console.error("Failed to load user data:", error);
        }
      };
      loadUserData();
    }, []);


  // Function to handle logout with confirmation
const handleLogout = () => {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          // Clear auth token and user profile from AsyncStorage
          await AsyncStorage.removeItem('authToken');
          await AsyncStorage.removeItem('userProfile');

          // Provide feedback and navigate to login screen
          Alert.alert("Logged Out", "You have been logged out successfully.");
          setIsLoggedOut(true);

          // Navigate to the login screen upon confirming logout
          router.push('../screens/auth');
        },
      },
    ],
    { cancelable: false }
  );
};


  useEffect(() => {
    const backAction = () => {
      // Prevent back action if logged out
      Alert.alert("You logged out ", "You have to login again in your account");
      return true; // Returning true prevents the default back action
    };
    // Set up the listener only if logged out
    if (isLoggedOut) {
      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);    
      return () => backHandler.remove(); // Clean up the listener on component unmount
    }
  }, [isLoggedOut]); // Depend on isLoggedOut state


  if (!userData) {
    return (
      <View style={styles.container}>
        {<ActivityIndicator size="large" color="#ffffff" />}
        <Text style={styles.loadingText}>Loading Profile...</Text>
      </View>
    );
  }


  return (
    <ScrollView style={styles.container}>
      {/* Profile Header Section */}
      <View style={styles.header}>
        <Text style={styles.profileName}>Raunak gola</Text>
        <TouchableOpacity 
          style={styles.profilePictureContainer} 
          onPress={() => setModalVisible(true)} // Open modal on press
        >
          {selectedImage ? (
            <Image source={selectedImage} style={styles.profilePicture} />
          ) : (
            <FontAwesome name="user" size={80} color="#fff" />
          )}
        </TouchableOpacity>
      </View>

      {/* Profile Information Section */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <FontAwesome name="user" size={24} color="#eb812a" />
          <Text style={styles.infoText}>Raunak09</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={24} color="#eb812a" />
          <Text style={styles.infoText}>raunakgola9082@gmail.com</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="phone" size={24} color="#eb812a" />
          <Text style={styles.infoText}>8585963425</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome name="briefcase" size={24} color="#eb812a" />
          <Text style={styles.infoText}>Software Developer</Text>
        </View>

        <View style={styles.infoRow}>
          {/* Conditionally render the icon and text based on the hardcoded userPosition */}
          {userData.role === 'Head' ? (
            <>
              <Image source={require('../../assets/icons/manager.png')} style={[styles.Icon, { tintColor: '#eb812a' }]}/>
              <Text style={styles.infoText}>Employer</Text>
            </>
          ) : userData.role === 'Officer' ? (
            <>
              <Image source={require('../../assets/icons/employee.png')} style={[styles.Icon, { tintColor: '#eb812a' }]}/>
              <Text style={styles.infoText}>Freelancer</Text>
            </>
          ) : null}
        </View>

      </View> 

      {/* Logout */}
      <TouchableOpacity style={styles.editLogout} onPress={handleLogout}>
        <Text style={styles.editLogoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Modal for selecting profile picture */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose an Avatar</Text>
            <ScrollView horizontal>
              <View style={styles.imageOptions}>
                {presetImages.map((image, index) => (
                  <TouchableOpacity key={index} onPress={() => handleImageSelect(image)}>
                    <Image source={image} style={styles.presetImage} />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d6b6b',
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
  },
  profileName: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 40,
  },
  profilePictureContainer: {
    backgroundColor: '#eb812a',
    width: 130,
    height: 130,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 40,
  },
  infoSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  infoText: {
    fontSize: 16,
    marginLeft: 15,
    color: 'white',
    flex: 1,
  },
  editIcon: {
    marginLeft: 10,
  },
  editIconStyle: {
    width: 20, // or any size you want
    height: 20,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    color: 'white',
    width: '100%',
  },
  changePasswordButton: {
    backgroundColor: '#1df4ff42',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    marginTop: 20,
  },
  newPasswordContainer: {
    position: 'relative', // For positioning the eye icon within the input box
    marginVertical: 10,
    width: '100%',
    marginBottom: 0,
  },
  changePasswordText: {
    color: 'white',
    fontSize: 16,
  },
  editLogout: {
    backgroundColor: '#1df4ff42',
    margin: 20,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 40,
  },
  editLogoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  imageOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  presetImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#eb812a',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  Icon: {
    width: 24,
    height: 24,
  },
});

export default ProfileScreen;
