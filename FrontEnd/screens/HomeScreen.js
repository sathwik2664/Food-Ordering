import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const BlocksContent = ({ navigation }) => {
  const blocks = [
    {
      title: 'Canteen 1',
      description: 'Indulge in a variety of fast food items.',
      backgroundColor: '#FFDDC1',
      borderColor: '#FF6F61',
      navigateTo: 'Canteen1',
    },
    {
      title: 'Canteen 2',
      description: 'Refreshing milkshakes in various flavors.',
      backgroundColor: '#FFDDC1',
      borderColor: '#4CAF50',
      navigateTo: 'Canteen2',
    },
    {
      title: 'Canteen 3',
      description: 'Satisfy your cravings with chat and panipuri.',
      backgroundColor: '#FFDDC1',
      borderColor: '#FF9800',
      navigateTo: 'Canteen3',
    },
    {
      title: 'Canteen 4',
      description: 'Quick snacks like fries and sandwiches.',
      backgroundColor: '#FFDDC1',
      borderColor: '#E91E63',
      navigateTo: 'Canteen4',
    },
  ];

  return (
    <View style={styles.blocksContainer}>
      {blocks.map((block, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.block, { backgroundColor: block.backgroundColor, borderColor: block.borderColor }]}
          onPress={() => navigation.navigate(block.navigateTo)} // Navigate to the corresponding canteen
        >
          <Text style={styles.title}>{block.title}</Text>
          <Text style={styles.description}>{block.description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <BlocksContent navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  blocksContainer: {
    marginTop: 20,
  },
  block: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6, // For Android
    height:140
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
