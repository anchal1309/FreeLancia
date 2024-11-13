
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import ForgotPasswordScreen from './forgot.password';
// import VerificationScreen from './verification';
// import ResetPasswordScreen from './reset.password';
import PrevUsernameScreen from './prevUsername';
import ChangeUsernameScreen from './newUsername';
import VerificationUsernameScreen from './verification.username';

const Stack = createStackNavigator();

export default function UsernameChangeScreen() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="PrevUsernameScreen">
        <Stack.Screen name="PrevUsernameScreen" component={PrevUsernameScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="VerificationUsernameScreen" component={VerificationUsernameScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ChangeUsernameScreen" component={ChangeUsernameScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}