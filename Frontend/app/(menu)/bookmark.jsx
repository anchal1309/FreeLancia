import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const BookmarkPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>My Bookmarks</Text>
      
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No bookmarks found</Text>
        </View>
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1d6b6b',
  },
  pageTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 60,
    textAlign: 'center',
    color: 'white',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'white',
  },
});

export default BookmarkPage;

