// App.js
import 'react-native-gesture-handler';
import React  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import ResultScreen from './src/screens/ResultScreen';
 

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer
      screenOptions={{
        headerStyle: { backgroundColor: '#121212' }, // Dark background color for the header
        headerTintColor: '#ffffff', // Light text color for the header
        headerTitleStyle: { fontWeight: 'bold' }, // Optional: to make the header title bold
      }}
    >
      <Stack.Navigator  screenOptions={{
          headerShown: false, // This removes the header (app bar)
        }}>
        <Stack.Screen name="WZR Quiz" component={HomeScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        {/* <Stack.Screen name="Quiz" component={QuizScreen} /> */}
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

