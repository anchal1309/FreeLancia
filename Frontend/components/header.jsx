import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Linking, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons'; 
import { Link } from 'expo-router';
import { images } from '../constants';
import { icons } from '../constants';

// Get device width
const { width } = Dimensions.get("window");

const openYouTubeVideo = () => {
  const url = 'https://youtu.be/FjEJ0yahkGw?feature=shared'; 
  Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
};

// Header
export default function Header({ navigation }) {
  return (
    <View className="flex-auto">
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        {/* Menu Icon */}  
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginTop: 15 }}>
          <Ionicons name="menu" size={width * 0.12} color="black" /> 
        </TouchableOpacity>

        {/* Logo */}
        <TouchableOpacity onPress={openYouTubeVideo}>
          <Image
            source={images.freelancia}
            style={{ width: width * 0.45, height: 40, marginTop: 20 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Bookmark Icon */}
        <Link href="/bookmark" asChild>
          <TouchableOpacity style={{ marginTop: 15 }}>
            <Ionicons name="bookmark-outline" size={width * 0.1} color="black" /> 
          </TouchableOpacity>
        </Link>

        {/* Notification Icon */}
        <Link href="/notification" asChild>
          <TouchableOpacity style={{ marginTop: 15 }}>
            <Ionicons name="notifications-outline" size={width * 0.11} color="black" /> 
          </TouchableOpacity>
        </Link>

        {/* Profile Icon */}
        {/* <Link href="/chat" asChild>
          <TouchableOpacity style={{ marginTop: 15 }}>
            <Ionicons name="chatbubbles" size={width * 0.11} color="black" /> 
          </TouchableOpacity>
        </Link> */}
        <Link href="/chat" asChild>
          <TouchableOpacity style={{ marginTop: 15 }}>
            <Image source={require('../assets/icons/chat.png')} style={styles.chaticon} /> 
          </TouchableOpacity>
        </Link>
        {/* <Link href="/chat" asChild>
          <TouchableOpacity style={{ marginTop: 15 }}>
            <Ionicons name="mail-unread" size={width * 0.11} color="black" /> 
          </TouchableOpacity>
        </Link> */}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    backgroundColor: '#425c6c',
    paddingHorizontal: width * 0.02, 
  },
  chaticon: {
    width: width * 0.1,
    height: width * 0.1,
  }
});
