import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const MealTypeScreen = ({ navigation }) => {
  const mealTypes = [
    { 
      title: 'Breakfast', 
      navigateTo: 'Breakfast', 
      image: require('../Images/Breakfast.jpg'), // Correct relative path
      description: 'Start your day with a healthy breakfast.' 
    },
    { 
      title: 'Lunch', 
      navigateTo: 'Lunch', 
      image: require('../Images/Canteen2.jpg'), // Correcting URL image reference
      description: 'Fuel up with a hearty lunch.'
    },
    { 
      title: 'Snacks', 
      navigateTo: 'Snacks', 
      image: require('../Images/Snacks.jpg'), // Correct relative path
      description: 'Enjoy some light snacks in between meals.' 
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.brandContainer}>
        <Text style={styles.brandText}>FoodieGo</Text>
      </View>
      
      <ScrollView
        contentContainerStyle={styles.mealTypeContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Select Meal Type</Text>
        {mealTypes.map((meal, index) => (
          <TouchableOpacity
            key={index}
            style={styles.mealTypeButton}
            onPress={() => navigation.navigate(meal.navigateTo)}
          >
            <Image source={meal.image} style={styles.mealImage} />
            <Text style={styles.mealTypeText}>{meal.title}</Text>
            <Text style={styles.mealDescription}>{meal.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MealTypeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  brandContainer: {
    backgroundColor: '#fff', // White background for brand area
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Light gray border at the bottom
  },
  brandText: {
    fontSize: 28, // Larger font for the brand
    fontWeight: 'bold',
    color: '#ff6347', // Tomato color for the brand
    textAlign: 'left', // Align left for brand text
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
    textAlign: 'center',
  },
  mealTypeContainer: {
    paddingBottom: 50,
    alignItems: 'center', // Center align the content
  },
  mealTypeButton: {
    width: '90%', // Ensure consistent width
    padding: 16,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  mealImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  mealTypeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  mealDescription: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
