// themechangingscreen.jsx
import React, { useContext } from 'react';
import { View, Button, StyleSheet, Text, Switch, TouchableOpacity } from 'react-native';
import { ThemeContext, ThemeProvider } from './ThemeContext';
import { themes } from './themes';
import { useTheme } from '@react-navigation/native';

const ThemeSelectionScreen = () => {
    // const { theme } = useContext(ThemeContext);
  const { theme, changeTheme } = useContext(ThemeContext);
  const {colors} = useTheme();
  const themes = ['light', 'dark', 'monochrome'];
    // Define colors for each theme
    const themeColors = {
      light: '#007BFF', // Gold or another color for light theme
      dark: '#5df7ff55', // DarkSlateGray or another  color for dark theme
      monochrome: '#000000' // Gray for monochrome theme
    };
  console.log(theme)
  

  return (
    <ThemeProvider>
    <View style={[styles.container, { backgroundColor: theme.common.backgroundColor}]}>
      <Text style={[styles.text, { color: theme.common.textColor }]}>Select Theme</Text>
      
            {themes.map((themeType) => (
        <TouchableOpacity
          key={themeType}
          style={styles.radioContainer}
          onPress={() => changeTheme(themeType)}
        >
        
          <View
            style={[
              styles.radioButton,
              // theme === themeType ? styles.selectedRadioButton : null,
              { borderColor: theme.common.buttonColor},
              // { backgroundColor: theme.buttonColor}
            ]}
          >
                  {/* You can add another View here */}
      <View style={[styles.innerCircle, 
        // { backgroundColor: theme.buttonColor},
        {
          backgroundColor: theme.common.buttonColor === themeColors[themeType] ? theme.common.buttonColor : 'transparent', // Fill with color if selected, otherwise transparent
        },
        ]} />
    </View>
          <Text style={[styles.buttonText, { color: theme.common.textColor }]}>
            {`${themeType.charAt(0).toUpperCase() + themeType.slice(1)} Theme`}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: 'column', // Allow stacking elements
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    // borderColor: '#007BFF',
    marginRight: 10,
  },
  selectedRadioButton: {
    backgroundColor: '#007BFF', // Adjust color as needed
  },
  buttonText: {
    fontSize: 16,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  innerCircle: {
    height: 12, // Height of the inner circle
    width: 12, // Width of the inner circle
    borderRadius: 6, // Half of height/width to make it a circle
  },
});

export default ThemeSelectionScreen;
