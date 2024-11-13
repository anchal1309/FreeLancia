// chatapp.jsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header';

const conversations = [
  { id: '1', name: 'Arnav Kushwaha', message: 'Hi Julian! See you after work?', time: 'Now' },
  { id: '2', name: 'Raunak Gola', message: 'I must tell you my interview this... I hope I do well!', time: '3 min ago' },
  { id: '3', name: 'Pri', message: 'Yes I can do this for you in the week, just let me know!', time: '1 hour ago' },
  { id: '4', name: 'Vaishali', message: 'Hi Julian! See you after work?', time: 'Now' },
  { id: '5', name: 'Siya', message: 'I must tell you my interview this... I hope I do well!', time: '3 min ago' },
  { id: '6', name: 'Hariansh', message: 'Yes I can do this for you in the week, just let me know!', time: '1 hour ago' },
  { id: '7', name: 'Sachin', message: 'Hi Julian! See you after work?', time: 'Now' },
  { id: '8', name: 'Vaibhav', message: 'I must tell you my interview this... I hope I do well!', time: '3 min ago' },
  { id: '9', name: 'Anchal', message: 'Yes I can do this for you in the week, just let me know!', time: '1 hour ago' },
  { id: '10', name: 'Nikita', message: 'Hi Julian! See you after work?', time: 'Now' },
];

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function Chat({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.conversationItem} 
      onPress={() => navigation.navigate('ChatBox', { userName: item.name, message: item.message })}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>{getInitials(item.name)}</Text>
      </View>
      <View style={styles.conversationText}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>
          {item.message.length > 34 ? `${item.message.substring(0, 34)}...` : item.message}
        </Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#353e57' style='dark' />
      {/* <View className="mt-0">
        <Header navigation={navigation} />
      </View> */}
      <Text style={styles.header}>Messages</Text>
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#425c6c',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    color: 'white',
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'black', // Customize the color as needed
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  initials: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  conversationText: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  message: {
    color: 'white',
  },
  time: {
    color: 'white',
  },
});

export default Chat;
