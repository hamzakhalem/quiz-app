// src/screens/CategoryScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { quizzes } from '../data/quizzes';
import Question from '../components/Question';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const CategoryScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const quiz = quizzes.find(q => q.category === category);
  console.log(quiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [answerStatus, setAnswerStatus] = React.useState('');

  const handleAnswer = (answer) => {
    if (answer === quiz.questions[currentQuestionIndex].answer) {
      setScore(score + 1); 
      setAnswerStatus('Correct!');
    }
    else{
      setAnswerStatus('Incorrect!');
    }

    setModalVisible(true);

    setTimeout(() => {
      setModalVisible(false);
      console.log(answerStatus);
      if(answerStatus == 'Correct!'){
      
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        navigation.navigate('Result', { score, total: quiz.questions.length });
      }
    }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('WZR Quiz')}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.category}>{category}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={25} color="#fff" /> 
       </TouchableOpacity>
      <View style={styles.questionContainer}>
        <Question
          question={quiz.questions[currentQuestionIndex].question}
          options={quiz.questions[currentQuestionIndex].options}
          onAnswer={handleAnswer}
        />
      </View>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.answerStatus}>{answerStatus}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
     backgroundColor: '#121212',
     color: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    backgroundColor: '#121212', // Dark background color
  },
  logo: {
    width: 45,
    height: 27,
    marginLeft: 2,
  },
  category: {
    fontSize: 24,
    fontWeight: 'bold',
     color: '#ffffff', // Light text color
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 16,
   
  },
  questionContainer: {
    height: "55%",
    justifyContent: 'center', // Centers the question vertically
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 200,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  answerStatus: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CategoryScreen;
