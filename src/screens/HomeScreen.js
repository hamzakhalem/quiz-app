// src/screens/HomeScreen.js
import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import CategoryCard from '../components/CategoryCard';
import { quizzes } from '../data/quizzes';
import { getDBConnection, createTables, insertProgress, getProgress } from '../data/database';

const HomeScreen = ({ navigation }) => {
  
  const categories = [...new Set(quizzes.map(quiz => quiz.category))];
  const [userProgress, setUserProgress] = useState([]);

  useEffect(() => {
      const initDB = async () => {
          const db = await getDBConnection();
          await createTables(db);
          // // Example insert progress
          // const progress = await getProgress(db, 1);
          // setUserProgress(progress);
      };
      initDB();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Quiz Categories</Text>
      </View>
      <Text style={styles.hi}>اهلا يا مغفل</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const categoryQuiz = quizzes.find(quiz => quiz.category === item);
          return (
            <CategoryCard
              category={item}
              onPress={() => navigation.navigate('Category', { category: item })}
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
  hi: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // Light text color
    flex: 1,
    textAlign: 'right',
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
