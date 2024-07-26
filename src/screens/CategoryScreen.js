import React, {useState, useEffect}  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { quizzes } from '../data/quizzes';
import { getDBConnection, createTables, insertProgress, getProgress } from '../data/database';
import Question from '../components/Question';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const correctImages = [
  require('../../assets/correct/1.png'),
  require('../../assets/correct/2.png')
];

const incorrectImages = [
  require('../../assets/incorrect/1.jpeg'),
  require('../../assets/incorrect/2.jpeg')
];

const CategoryScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const quiz = quizzes.find(q => q.category === category);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [answerStatus, setAnswerStatus] = React.useState(0);
  const [resultImage, setResultImage] = React.useState(null);
  let progress = 0;
  let db = null;
  useEffect(() => {
    const initDB = async () => {
        db = await getDBConnection();
        progress = await getProgress(db, 1, category);
        setCurrentQuestionIndex(progress);
        // setUserProgress(progress);
    };
    initDB();
}, []);


const handleAnswer = (answer) => {
    const randomIndex = Math.floor(Math.random() * 2); // Randomly select between 0 and 1
    if (answer === quiz.questions[currentQuestionIndex].answer) {
      setScore(score + 1);
      setAnswerStatus(1);
      setResultImage(correctImages[randomIndex]);
     
     
    } else {
      setAnswerStatus(2);
      setResultImage(incorrectImages[randomIndex]);
    }

    setModalVisible(true);

    setTimeout(async () => {
      setModalVisible(false);
      if (answer === quiz.questions[currentQuestionIndex].answer){
        if (currentQuestionIndex < quiz.questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          db = await getDBConnection();
          insertProgress(db, 1, category, currentQuestionIndex +1);
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
        <Text style={styles.number}>{currentQuestionIndex + 1}</Text>
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
            <Text style={styles.answerStatus}>
              {answerStatus === 1 ? 'Correct!' : 'Incorrect!'}
            </Text>
            <Image
              source={resultImage}
              style={styles.resultImage}
            />
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // Light text color
    textAlign: 'center',
    marginLeft: 10,
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    borderRadius: 15,
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
  resultImage: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
});

export default CategoryScreen;
