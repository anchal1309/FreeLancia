// chat.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeNavigator from '../../components/menu'; // Import your menu component
import Chat from '../(navigations)/chatapp';
import ChatBox from '../../components/chatbox';

const Stack = createStackNavigator();

export default function Navi() {
  return (
    <SafeAreaProvider>
      <NavigationContainer independent={true}> 
        <Stack.Navigator initialRouteName="HomeNavigator">
          {/* HomeNavigator as the first screen */}
          <Stack.Screen
            name="HomeNavigator"
            options={{ headerShown: false }} 
          >
            {(props) => <HomeNavigator {...props} currentpage={Chat} InitialRoute={"Chat"} />}
          </Stack.Screen>

          {/* Chat and ChatBox screens */}
          <Stack.Screen 
            name="Chat" 
            component={Chat} 
            options={{ title: 'Messages' }} 
          />
          <Stack.Screen 
            name="ChatBox" 
            component={ChatBox} 
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
