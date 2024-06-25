// src/components/Question.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Question = ({ question, options, onAnswer }) => (
  <View style={styles.container}>
    <Text style={styles.question}>{question}</Text>
    {options.map((option, index) => (
      <TouchableOpacity key={index} style={styles.option} onPress={() => onAnswer(option)}>
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    color: "#fff",
    padding: 25,
    borderBlockColor: "",
    borderWidth: 1, // Adds a border
    borderColor: 'rgba(255, 255, 255, 0.7)', // White border color
    borderRadius: 7, 
  },
  option: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#333',
    borderRadius: 5,
    color: "#fff"
  },
  optionText: {
    fontSize: 18,
    color: "#fff"
  },
});

export default Question;
