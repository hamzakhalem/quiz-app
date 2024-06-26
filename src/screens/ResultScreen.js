// src/screens/ResultScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { score, total } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.result}>Your Score: {score + 1}/{total}</Text>
      <Button title="Go Home" onPress={() => navigation.navigate('WZR Quiz')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  result: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ResultScreen;
