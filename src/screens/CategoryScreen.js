// src/screens/CategoryScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { quizzes } from '../data/quizzes';
import Question from '../components/Question';

const CategoryScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const quiz = quizzes.find(q => q.category === category);
  console.log(quiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);

  const handleAnswer = (answer) => {
    if (answer === quiz.questions[currentQuestionIndex].answer) {
      setScore(score + 1); 
    }
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('Result', { score, total: quiz.questions.length });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.category}>{category}</Text>
      <Question
        question={quiz.questions[currentQuestionIndex].question}
        options={quiz.questions[currentQuestionIndex].options}
        onAnswer={handleAnswer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  category: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CategoryScreen;
