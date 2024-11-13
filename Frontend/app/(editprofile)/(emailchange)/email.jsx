// // App.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// // import ForgotPasswordScreen from './forgot.password';
// import VerificationScreen from './verification';
// import ResetPasswordScreen from './reset.password';

// const Stack = createStackNavigator();

// export default function EmailChangeScreen() {
//   return (
//     <NavigationContainer independent={true}>
//       <Stack.Navigator initialRouteName="ForgotPassword">
//         <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="Verification" component={VerificationScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{ headerShown: false }}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }