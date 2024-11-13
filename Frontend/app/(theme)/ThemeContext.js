// themecontext.js
// import React, { createContext, useState, useContext } from 'react';
// import { Appearance } from 'react-native';

// const ThemeContext = createContext();

// export const useTheme = () => useContext(ThemeContext);

// export const ThemeProvider = ({ children }) => {
//   const systemTheme = Appearance.getColorScheme();
//   const [theme, setTheme] = useState(systemTheme || 'light'); // Default to system theme or light

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };


// ///////////////////////////////////////////////////////////////////////////////////////////////////


// import React, { createContext, useState } from 'react';
// import { themes } from './themes';

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(themes.light); // Default theme is light

//   const changeTheme = (themeType) => {
//     switch (themeType) {
//       case 'light':
//         setTheme(themes.light);
//         break;
//       case 'dark':
//         setTheme(themes.dark);
//         break;
//       case 'monochrome':
//         setTheme(themes.monochrome);
//         break;
//       default:
//         setTheme(themes.light);
//     }
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, changeTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };


// ////////////////////////////////////////////////////////////////////////////////////////

// themecontext.js
import React, { createContext, useState, useEffect  } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { themes } from './themes'; // Import your theme definitions
import { themes } from './themes';


export const ThemeContext = createContext(
  {
    theme: themes.dark,
    changeTheme: () => {},
  }
); // Create the context

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light); // Default theme

  useEffect(() => {
    // Load the saved theme from AsyncStorage on mount
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('selectedTheme');
        if (savedTheme) {
          setTheme(themes[savedTheme] || themes.light); // Set saved theme, fallback to light theme
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  // const changeTheme = (themeType) => {
  //   console.log('Changing theme to:', themeType); // Confirm theme update
  //   switch (themeType) {
  //     case 'light':
  //       setTheme(themes.light);
  //       break;
  //     case 'dark':
  //       setTheme(themes.dark);
  //       break;
  //     case 'monochrome':
  //       setTheme(themes.monochrome);
  //       break;
  //     default:
  //       setTheme(themes.light);
  //   }
  // };

  const changeTheme = async (themeType) => {
    try {
      const selectedTheme = themes[themeType] || themes.light;
      setTheme(selectedTheme);  // Update theme in state
      await AsyncStorage.setItem('selectedTheme', themeType); // Save theme type in AsyncStorage
      console.log('Theme changed to:', themeType);
    } catch (error) {
      console.error('Error changing theme:', error);
    }
  };

  // const changeTheme = (themeType) => {
  //   console.log('Attempting to change theme to:', themeType); // Log theme type
  //   const selectedTheme = themes[themeType] || themes.dark;
  //   setTheme(selectedTheme);  // Update state with the selected theme
  //   console.log('Theme successfully changed to:', selectedTheme);
  // };
  // console.log('Current Theme:', theme); // Log the current theme

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
