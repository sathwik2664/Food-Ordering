import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const BlocksContent = ({ navigation }) => {
  const blocks = [
    {
      title: 'Canteen 1',
      description: 'Indulge in a variety of fast food items.',
      navigateTo: 'Canteen1',
      image: require('../Images/Noodles.jpg'), // Add your image paths
    },
    {
      title: 'Canteen 2',
      description: 'Refreshing milkshakes in various flavors.',
      navigateTo: 'Canteen2',
      image: require('../Images/IMG-20241222-WA0025.jpg'),
    },
    {
      title: 'Canteen 3',
      description: 'Satisfy your cravings with chat and panipuri.',
      navigateTo: 'Canteen3',
      image: require('../Images/PaniPuri.jpg'),
    },
    {
      title: 'Canteen 4',
      description: 'Quick snacks like fries and sandwiches.',
      navigateTo: 'Canteen4',
      image: require('../Images/IMG-20241222-WA0021.jpg'),
    },
  ];

  return (
    <View style={styles.blocksContainer}>
      {blocks.map((block, index) => (
        <TouchableOpacity
          key={index}
          style={styles.block}
          onPress={() => navigation.navigate(block.navigateTo)} // Navigate to the corresponding canteen
        >
          <Image source={block.image} style={styles.blockImage} />
          <Text style={styles.title}>{block.title}</Text>
          <Text style={styles.description}>{block.description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const LunchScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <BlocksContent navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LunchScreen;

const styles = StyleSheet.create({
  blocksContainer: {
    marginTop: 20,
  },
  block: {
    width: '93%',
    alignSelf: 'center',
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: 'white', // Plain white background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6, // For Android shadow effect
    alignItems: 'center', // Center content within the block
  },
  blockImage: {
    width: '100%',
    height: 140, // Adjust image height
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover', // Ensure the image covers its container
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
