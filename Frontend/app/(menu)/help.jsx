import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image, Modal, Animated, PanResponder } from 'react-native';
import { icons } from '../../constants'; // assuming this holds the chat icon
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const HelpScreen = () => {
  const [userData, setUserData] = useState(null); // State to store user data
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [chatVisible, setChatVisible] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatResponses, setChatResponses] = useState([]);
  const pan = useRef(new Animated.ValueXY()).current;

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


  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        // Retain the button's final position by setting it as the new offset
        pan.flattenOffset();
      },
      onPanResponderGrant: () => {
        // Set current position as the starting offset before any move
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 }); // Reset pan value to avoid accumulation
      },
    })
  ).current;

// Function to handle chatbot response
const sendChatMessage = async () => {
  if (!chatInput.trim()) return;

  // Display the user message
  setChatResponses((prev) => [...prev, { fromUser: true, message: chatInput }]);

  // Clear the chat input after sending
  setChatInput('');

  // Show "thinking..." response from chatbot
  setChatResponses((prev) => [...prev, { fromUser: false, message: "Thinking..." }]);

  try {
    // Wait for 2 seconds before making the API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // API request to your local chat API endpoint
    const response = await axios.post(`http://192.168.80.134:8080/api/v1/chat/chat`, {
      message: chatInput,
    });
 
    // Assuming response.data.message contains the chatbot's reply
    const botResponse = response.data.response;

    // Remove "thinking..." and replace it with the actual response
    setChatResponses((prev) => [
      ...prev.slice(0, -1), // Remove "thinking..." message
      { fromUser: false, message: botResponse }
    ]);
  } catch (error) {
    console.error("Error fetching chat response", error);
    setChatResponses((prev) => [
      ...prev.slice(0, -1), // Remove "thinking..." message
      { fromUser: false, message: "Error fetching response." }
    ]);
  }
};



    // Function to handle form submission
    const handleSubmit = async () => {
      if (userData && userData.username && userData.email && problemDescription.trim()) {
        try {
          const response = await axios.post('http://192.168.80.134:8080/api/v1/help/complaint', {
            username: userData.username,
            email: userData.email,
            complaint: problemDescription
          });
  
          if (response.status === 200 || response.status === 201) {
            Alert.alert('Complaint Sent', 'Your complaint has been sent to customer care successfully.');
            setProblemDescription('');
          } else {
            Alert.alert('Error', 'Failed to send your complaint. Please try again.');
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to send your complaint. Please try again.');
          console.error("Submission Error:", error);
        }
      } else {
        Alert.alert('Missing Information', 'Please fill out all fields before submitting.');
      }
    };

  const closeChat = () => {
    setChatVisible(false);
    setChatResponses([]); // Clear chat when modal closes
  };

  return (
    // <ScrollView>
      <View style={styles.container}>
        <View className="w-350 h-20  justify-center align-middle flex-row ">
          <Text style={styles.title}>How can we help you?</Text>
        </View> 

        <View className="w-300 h-28 mb-10 mt-5 justify-center align-middle flex-row ">
          <Image
            source={icons.support}
            className="w-24 h-24 my-4 px-4 justify-center"
            resizeMode='cover'
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="white"
          value={userData ? userData.username : ''}
          editable={false} // Make it non-editable
        />

        <TextInput
          style={styles.input}
          placeholder="Email ID"
          placeholderTextColor="white"
          value={userData ? userData.email : ''}
          editable={false} // Make it non-editable
          keyboardType="email-address"
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description of your problem"
          placeholderTextColor="white"
          value={problemDescription}
          onChangeText={setProblemDescription}
          multiline
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        {/* Floating chatbot button */}
        <Animated.View
          style={[styles.floatingButton, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
          {...panResponder.panHandlers}
        >
          <TouchableOpacity onPress={() => setChatVisible(true)}>
            <Image source={icons.chatbot} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
        </Animated.View>

        {/* Chat Modal */}
        <Modal visible={chatVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.chatContainer}>
              <ScrollView contentContainerStyle={styles.chatContentContainer}>
                {chatResponses.map((response, index) => (
                  <View key={index} style={[styles.chatBubble, response.fromUser ? styles.userMessage : styles.botMessage]}>
                    <Text style={styles.chatText}>{response.message}</Text>
                  </View>
                ))}
              </ScrollView>

              {/* Chat input */}
              <View style={styles.chatInputContainer}>
                <TextInput
                  style={styles.chatInput}
                  placeholder="Type a message..."
                  value={chatInput}
                  onChangeText={setChatInput}
                />
                <TouchableOpacity onPress={sendChatMessage} style={styles.sendIconContainer}>
                  <MaterialIcons name="send" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            
            {/* chat close button */}
            </View>
              <TouchableOpacity style={styles.closeButton} onPress={closeChat}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
        </Modal>

      </View>
    // {/* </ScrollView> */}
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 650,
    padding: 20,
    backgroundColor: '#1d6b6b',
  },
  title: {
    color: 'white',
    fontSize: 28,
    marginTop: 15,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#b4d4e7c4',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    color: 'black',
  },
  textArea: {
    height: 60,
  },
  submitButton: {
    backgroundColor: '#eb812a',
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
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  chatContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width:340,
    alignSelf:"center",
    borderRadius: 15,
    maxHeight: '80%',
    minHeight: '50%',
  },
  chatContentContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  chatBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth:260,
  },
  userMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    color: 'white',
  },
  botMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  chatText: {
    fontSize: 16,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#f2f2f2',
  },
  chatInput: {
    // height: 50,
    // borderColor: '#ccc',
    // borderWidth: 1,
    // borderRadius: 25,
    // paddingHorizontal: 20,
    // marginTop: 10,
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingLeft: 10,
  },
  sendIconContainer: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 8,
    marginLeft: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#ff5e5e',
    padding: 15,
    width:340,
    alignSelf:"center",
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HelpScreen;


