// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import CategoryCard from '../components/CategoryCard';
import { quizzes } from '../data/quizzes';

const HomeScreen = ({ navigation }) => {
  
  const categories = [...new Set(quizzes.map(quiz => quiz.category))];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Quiz Categories</Text>
      </View>
      
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const categoryQuiz = quizzes.find(quiz => quiz.category === item);
          return (
            <CategoryCard
              category={item}
              onPress={() => navigation.navigate('Category', { category: item })}
              svgSource={categoryQuiz.icon } // default icon if icon not found
            />
          );
        }}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // Light text color
    flex: 1,
    textAlign: 'center',
  },
  logo: {
    width: 45,
    height: 27,
    marginLeft: 2,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default HomeScreen;
