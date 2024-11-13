import React from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import i18n from './i18n';
import LanguageSelector from './language'; // Your language selection component

const LanguageSelectionScreen = () => {
  const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageSelector />
    </I18nextProvider>
  );
};

export default LanguageSelectionScreen;
