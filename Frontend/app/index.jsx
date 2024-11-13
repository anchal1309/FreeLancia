import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from './screens/auth';
import { ThemeProvider } from './(theme)/ThemeContext';

const AuthStack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <AuthStack.Navigator initialRouteName="auth" screenOptions={{headerShown: false}}>
        <AuthStack.Screen name="auth" component={Auth}/>
      </AuthStack.Navigator>
    </ThemeProvider>
  );
}