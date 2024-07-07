// Example CategoryCard component (Adjust styles as necessary)
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import SvgUri from 'react-native-svg-uri';

const { width } = Dimensions.get('window');
const cardSize = width * 0.4;

const CategoryCard = ({ category, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <SvgUri
      width="50%"
      height="50%"
      source={svgSource}
    />
    <Text style={styles.cardText}>{category}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: cardSize,
    height: cardSize,
    margin: 8,
    backgroundColor: '#1e1e1e', // Slightly lighter dark color for contrast
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff', // Light text color
  },
});





export default CategoryCard;
