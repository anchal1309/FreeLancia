import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from '../../components/menu.jsx';
import Header from '../../components/header.jsx';



function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#353e57' style='dark' />

      <View>
        <Header navigation={navigation} />
      </View>

        <Text style={styles.title}>Home Tab</Text>

    </SafeAreaView>
  );
}

// Main App
export default function App() {
  return (
    <NavigationContainer independent={true}>
      <DrawerNavigator currentpage={Home} InitialRoute={"Home"} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#425c6c',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
});
