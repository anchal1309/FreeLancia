// chatbot.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function ChatBox({ navigation, route }) {
  const { userName } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: newMessage, sender: 'You' }]);
      setNewMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/icons/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{getInitials(userName)}</Text>
        </View>
        <Text style={styles.headerText}>{userName}</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === 'You' ? styles.senderMessage : styles.receiverMessage]}>
            <Text style={styles.messageText}>{item.sender}: {item.text}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }} // Adjusts for the input area
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 10,
    backgroundColor: '#eb812a',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  backIcon: {
    width: 30,
    height: 30,
    marginLeft: -1,
    marginRight: -5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  initials: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#eb812a',
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: '#fff',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '75%', // Prevents messages from taking the whole width
  },
  senderMessage: {
    backgroundColor: 'black',
    alignSelf: 'flex-end', // Align to the right for sent messages
    marginRight: 5,
    marginTop: 5,
  },
  receiverMessage: {
    backgroundColor: '#d1c4e9',
    alignSelf: 'flex-start', // Align to the left for received messages
    marginLeft: 5,
    marginTop: 5,
  },
  messageText: {
    color: 'white',
  },
});

export default ChatBox;
