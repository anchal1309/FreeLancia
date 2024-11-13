import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeNavigator from '../../components/menu';
import Freelancer from '../(navigations)/freelancerapp';

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <SafeAreaProvider>
          <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="HomeNavigator"> 

        <Stack.Screen
        name="HomeNavigator"
        options={{ headerShown: false }} 
        >
        {(props) => <HomeNavigator {...props} currentpage={Freelancer} InitialRoute={"Freelancer"} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}