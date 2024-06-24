// App.js
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/CategoryScreen';
// import QuizScreen from './src/screens/QuizScreen';
import ResultScreen from './src/screens/ResultScreen';

const Stack = createNativeStackNavigator();

 function App() {
  return (
    <NavigationContainer
      screenOptions={{
        headerStyle: { backgroundColor: '#121212' }, // Dark background color for the header
        headerTintColor: '#ffffff', // Light text color for the header
        headerTitleStyle: { fontWeight: 'bold' }, // Optional: to make the header title bold
      }}
    >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        {/* <Stack.Screen name="Quiz" component={QuizScreen} /> */}
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
export default App;