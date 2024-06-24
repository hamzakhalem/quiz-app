// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CategoryCard from '../components/CategoryCard';
import { quizzes } from '../data/quizzes';

const HomeScreen = ({ navigation }) => {
  
const categories = [...new Set(quizzes.map(quiz => quiz.category))];

return (
  <View style={styles.container}>
    <Text style={styles.title}>Quiz Categories</Text>
    <FlatList
      data={categories}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <CategoryCard
          category={item}
          onPress={() => navigation.navigate('Category', { category: item })}
        />
      )}
      numColumns={2}
      columnWrapperStyle={styles.row}
    />
  </View>
);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212', // Dark background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // Light text color
    marginBottom: 16,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default HomeScreen;
