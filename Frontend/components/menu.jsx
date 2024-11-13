import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import ContactScreen from '../app/(menu)/contact.jsx';
import FAQScreen from '../app/(menu)/faqs.jsx';
import HelpScreen from '../app/(menu)/help.jsx';
import SettingScreen from '../app/(menu)/settings.jsx';
import AccountScreen from '../app/(menu)/account.jsx'; 

// Drawer Navigator 
const Drawer = createDrawerNavigator();

// Custom Drawer Component with Gradient Background
function CustomDrawerContent(props) {
  return (
    <LinearGradient
      colors={['#00383A', '#227C7D', '#A8D8D8']} // Gradient with provided colors
      start={{ x: 0, y: 0 }} // Starting point of the gradient
      end={{ x: 0.7, y: 1 }}   // Ending point of the gradient
      style={{ flex: 1 }}
    >
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </LinearGradient>
  );
}

export default function HomeNavigator({ currentpage, InitialRoute }) {
  return (
    <Drawer.Navigator
      initialRouteName={InitialRoute}
      drawerContent={(props) => <CustomDrawerContent {...props} />} // Use custom drawer content
      screenOptions={{
        headerShown: false, // Hide header globally if needed
        drawerStyle: styles.drawerstyle, // Custom drawer styling
        drawerLabelStyle: styles.drawerLabel, // Custom text styling
        drawerActiveTintColor: '#ffffff', // Active item text color
        drawerInactiveTintColor: '#000000', // Inactive item text color
        drawerActiveBackgroundColor: '#eb812a', // Active item background color
      }}
    >
      <Drawer.Screen
        name={InitialRoute}
        component={currentpage}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: true,
          headerStyle: styles.headerStyle, // Custom header background color
          headerTintColor: '#fff', // Custom header text/icon color
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          headerShown: true,
          headerStyle: styles.headerStyle, // Custom header background color
          headerTintColor: '#fff', // Custom header text/icon color
        }}
      />
      <Drawer.Screen
        name="FAQs"
        component={FAQScreen}
        options={{
          headerShown: true,
          headerStyle: styles.headerStyle, // Custom header background color
          headerTintColor: '#fff', // Custom header text/icon color
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          headerShown: true,
          headerStyle: styles.headerStyle, // Custom header background color
          headerTintColor: '#fff', // Custom header text/icon color
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerShown: true,
          headerStyle: styles.headerStyle, // Custom header background color
          headerTintColor: '#fff', // Custom header text/icon color
        }}
      />
    </Drawer.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  drawerstyle: {
    width: 220, // Width of the drawer
    backgroundColor: 'transparent', // Make it transparent to let gradient show through
  },
  drawerLabel: {
    fontSize: 16, // Font size of the drawer items
    fontFamily: 'sans-serif', // Custom font
    color: 'white', // Text color for all items
  },
  headerStyle: {
    backgroundColor: '#266867', // Custom header background color (greenish tone)
  },
});


