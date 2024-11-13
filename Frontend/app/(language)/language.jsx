// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // If needed for persistent storage
// import { useTranslation } from 'react-i18next';
// import i18n from './i18n';


// const languages = [
//   { id: '1', name: 'English' },
//   { id: '2', name: 'Afrikaans' },
//   { id: '3', name: 'Bahasa Indonesia' },
//   { id: '4', name: 'Bahasa Melayu' },
//   { id: '5', name: 'Dansk' },
//   { id: '6', name: 'Deutsch' },
//   { id: '7', name: 'English (UK)' },
//   { id: '8', name: 'Español (Latin America)' },
//   { id: '9', name: 'Español (España)' },
//   { id: '10', name: 'Filipino' },
//   { id: '11', name: 'Français (Canada)' },
//   // Add more languages as needed
// ];

// const LanguageSelector = () => {
//   const [selectedLanguage, setSelectedLanguage] = useState('English (UK)');

// //   const handleLanguageSelect = (language) => {
// //     setSelectedLanguage(language);
// //     // Add the code to update the app language here
// //   };
// const handleLanguageSelect = async (lang) => {
//     i18n.changeLanguage(lang);
//     setSelectedLanguage(lang);
//     await AsyncStorage.setItem('language', lang); // Persist language choice (optional)
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>App language</Text>
//       <FlatList
//         data={languages}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => handleLanguageSelect(item.name)}>
//             <View style={styles.languageItem}>
//               <Text style={styles.languageText}>{item.name}</Text>
//               {item.name === selectedLanguage && <Text style={styles.checkMark}>✔</Text>}
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#000', // Match the dark background from the screenshot
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 20,
//   },
//   languageItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#444', // For item separation
//   },
//   languageText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   checkMark: {
//     color: '#1E90FF', // Blue checkmark
//   },
// });

// export default LanguageSelector;


// // const handleLanguageSelect = (language) => {
// //     setSelectedLanguage(language);
    
// //     // Map the language name to its code
// //     const languageCodeMap = {
// //       'English': 'en',
// //       'Español (Latin America)': 'es',
// //       // Add more mappings here
// //     };
  
// //     // Change the app language
// //     i18n.changeLanguage(languageCodeMap[language] || 'en'); // Default to English if language code not found
// //   };


// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// language.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Persistent storage
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import { icons } from '../../constants';

const languages = [
  { id: '1', name: 'English', code: 'en' },
  { id: '2', name: 'Afrikaans', code: 'af' },
  { id: '3', name: 'Bahasa Indonesia', code: 'id' },
  { id: '4', name: 'Bahasa Melayu', code: 'ms' },
  { id: '5', name: 'Dansk', code: 'da' },
  { id: '6', name: 'Deutsch', code: 'de' },
  { id: '7', name: 'English (UK)', code: 'en-GB' },
  { id: '8', name: 'Español (Latin America)', code: 'es' },
  { id: '9', name: 'Español (España)', code: 'es-ES' },
  { id: '10', name: 'Filipino', code: 'fil' },
  { id: '11', name: 'Français (Canada)', code: 'fr-CA' },
  // Add more languages as needed
];

const LanguageSelector = () => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Load the saved language on component mount and apply it
  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      const defaultLanguage = savedLanguage || 'English'; // Default to English
      const languageObject = languages.find(lang => lang.name === defaultLanguage);
      if (languageObject) {
        setSelectedLanguage(languageObject.name);
        i18n.changeLanguage(languageObject.code);
      }
    };
    loadLanguage();
  }, []);

  // Handle language selection and persist it
  const handleLanguageSelect = async (language) => {
    setSelectedLanguage(language.name);
    i18n.changeLanguage(language.code); // Update app language
    await AsyncStorage.setItem('language', language.name); // Persist language name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('app_language')}</Text>
      <FlatList
        data={languages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleLanguageSelect(item)}>
            <View style={styles.languageItem}>
              <Text style={styles.languageText}>{item.name}</Text>
              {/* {item.name === selectedLanguage && <Text style={styles.checkMark}>✔</Text>} */}
              {item.name === selectedLanguage && <Image source={icons.check} style={styles.icon} resizeMode='cover'/>}
              {/* <Image
        source={icons.language}
        style={styles.icon}
        resizeMode='cover'
      /> */}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1d6b6b', // Match the dark background from the screenshot
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 23,
    borderBottomWidth: 1,
    borderBottomColor: '#444', // For item separation
  },
  languageText: {
    color: '#fff',
    fontSize: 16,
  },
  checkMark: {
    fontSize: 18,
    fontWeight: "200",
    color: '#1E90FF', // Blue checkmark
  },
  icon:{
    width: 22,
    height: 22,
    marginHorizontal:12,
    // 22
    tintColor:'#1E90FF',
  },
});

export default LanguageSelector;
