import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Import icons
import { Dimensions } from 'react-native';

// Get device width
const { width } = Dimensions.get("window");

const ContactUsScreen = () => {
  const handleEmailPress = () => {
    const email = 'architgoel10007@gmail.com'; // Replace with your email
    const subject = 'Inquiry'; // Subject of the email
    const body = 'Hello, I would like to ask about...';
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(mailto).catch((err) => console.error('Error opening email app', err));
  };

  const handlePhonePress = () => {
    const phoneNumber = 'tel:+918595851541';
    Linking.openURL(phoneNumber).catch((err) => console.error('Error opening phone dialer', err));
  };

  const handleInstagramPress = () => {
    const instagramUrl = 'https://www.instagram.com/archit5235?igsh=MXdsY3V0OXIwZHRucA=='; // Replace with your Instagram URL
    Linking.openURL(instagramUrl).catch((err) => console.error('Error opening Instagram', err));
  };

  const handleTelegramPress = () => {
    const telegramUrl = 'https://t.me/+918595851541'; // Replace with your Telegram URL
    Linking.openURL(telegramUrl).catch((err) => console.error('Error opening Telegram', err));
  };

  const handleTwitterPress = () => {
    const twitterUrl = 'https://x.com/architg83181472'; // Replace with your Twitter URL
    Linking.openURL(twitterUrl).catch((err) => console.error('Error opening Twitter', err));
  };

  const handleWhatsAppPress = () => {
    const phoneNumber = '+918595851541'; // Your phone number
    const message = 'Hello! I would like to connect with you.';
    const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappURL).catch((err) => console.error('Error opening WhatsApp', err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.subtitle}>
        Don’t hesitate to contact us whether you have a suggestion on our improvement, a complaint to discuss or an issue to solve.
      </Text>

      {/* Call us and Email us buttons */}
      <View style={styles.contactOptions}>
        <TouchableOpacity style={[styles.contactButton, { width: width * 0.4 }]} onPress={handlePhonePress}>
          <MaterialIcons name="phone" size={50} color="#000" />
          <Text style={[styles.contactText, { width: width * 0.35 }]}>Call us</Text>
          <Text style={[styles.contactDescription, { width: width * 0.35 }]}>Our team is online</Text>
          <Text style={[styles.contactTiming, { width: width * 0.35 }]}>Mon-Fri • 9-17</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.contactButton, { width: width * 0.4 }]} onPress={handleEmailPress}>
          <MaterialIcons name="email" size={50} color="#000" />
          <Text style={[styles.contactText, { width: width * 0.35 }]}>Email us</Text>
          <Text style={[styles.contactDescription, { width: width * 0.35 }]}>Our team is online</Text>
          <Text style={[styles.contactTiming, { width: width * 0.35 }]}>Mon-Fri • 9-17</Text>
        </TouchableOpacity>
      </View>

      {/* Social Media Section */}
      <Text style={styles.socialMediaHeading}>Contact us on Social Media</Text>

      {/* Instagram */}
      <View style={styles.socialMediaContainer}>
        <View style={styles.socialMediaButton}>
          <FontAwesome name="instagram" size={40} color="#000" />
          <View style={styles.socialMediaInfo}>
            <Text style={styles.socialMediaText}>Instagram</Text>
            <Text style={styles.socialMediaDetails}>4,6K Followers • 118 Posts</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={handleInstagramPress}>
          <MaterialIcons name="share" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Telegram */}
      <View style={styles.socialMediaContainer}>
        <View style={styles.socialMediaButton}>
          <FontAwesome name="telegram" size={40} color="#000" />
          <View style={styles.socialMediaInfo}>
            <Text style={styles.socialMediaText}>Telegram</Text>
            <Text style={styles.socialMediaDetails}>1,3K Followers • 85 Posts</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={handleTelegramPress}>
          <MaterialIcons name="share" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Twitter */}
      <View style={styles.socialMediaContainer}>
        <View style={styles.socialMediaButton}>
          <FontAwesome name="twitter" size={40} color="#000" />
          <View style={styles.socialMediaInfo}>
            <Text style={styles.socialMediaText}>Twitter</Text>
            <Text style={styles.socialMediaDetails}>3,8K Followers • 136 Posts</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={handleTwitterPress}>
          <MaterialIcons name="share" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* WhatsApp */}
      <View style={styles.socialMediaContainer}>
        <View style={styles.socialMediaButton}>
          <FontAwesome name="whatsapp" size={40} color="#000" />
          <View style={styles.socialMediaInfo}>
            <Text style={styles.socialMediaText}>WhatsApp</Text>
            <Text style={styles.socialMediaDetails}>Available Mon-Fri • 9-17</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={handleWhatsAppPress}>
          <MaterialIcons name="share" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#1d6b6b', // Light green background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    marginBottom: 30,
  },
  contactOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  contactButton: {
    backgroundColor: '#ff7e14',
    padding: 20,
    borderRadius: 20,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // To create a subtle shadow effect
  },
  contactText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
    textAlign: 'center',
  },
  contactDescription: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
  contactTiming: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
  socialMediaHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  socialMediaContainer: {
    backgroundColor: '#5df7ff55',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 15,
    borderColor: "#080808",
    borderWidth: 2,
  },
  socialMediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialMediaInfo: {
    marginLeft: 15,
  },
  socialMediaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  socialMediaDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  shareButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 5, // Shadow for the share button
  },
});

export default ContactUsScreen;
