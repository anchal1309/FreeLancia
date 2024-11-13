import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function ChatBox({ route }) {
  const { userName } = route.params; // Get the passed parameter from the route

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{userName}'s Chat</Text>
      </View>
      <View style={styles.chatContent}>
        <Text style={styles.chatMessage}>Welcome to the chat with {userName}!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    backgroundColor: '#353e57',
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatMessage: {
    fontSize: 16,
  },
});

export default ChatBox;
