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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
