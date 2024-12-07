import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as Icon from 'react-native-feather';

const BlocksContent = ({ navigation, updateCart }) => {
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
      description: 'Refreshing milkshakes in various flavors, from chocolate to vanilla and more!',
      backgroundColor: '#FFDDC1',
      borderColor: '#4CAF50',
      navigateTo: 'Canteen2',
    },
    {
      title: 'Canteen 3',
      description: 'Satisfy your cravings with chat, panipuri, and other delicious street food.',
      backgroundColor: '#FFDDC1',
      borderColor: '#FF9800',
      navigateTo: 'Canteen3',
    },
    {
      title: 'Canteen 4',
      description: 'Quick snacks like french fries, sandwiches, and Panner rolls for when you’re in a hurry.',
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
          style={[
            styles.block,
            {
              backgroundColor: block.backgroundColor,
              borderColor: block.borderColor,
            },
          ]}
          onPress={() => navigation.navigate(block.navigateTo)} // Navigate to the corresponding canteen
        >
          <View style={styles.tooltip}>
            <Text style={styles.title}>{block.title}</Text>
          </View>
          <View style={styles.paperHero}>
            <Text style={styles.description}>{block.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  // State to manage the cart
  const [cart, setCart] = useState({});

  const addItemToCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[item.id]) {
        updatedCart[item.id].count += 1;
      } else {
        updatedCart[item.id] = { ...item, count: 1 };
      }
      return updatedCart;
    });
  };

  // Calculate cart item count based on the cart object
  const cartItemCount = Object.keys(cart).length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 8 }}>
        {/* Search and Location Bar */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            paddingHorizontal: 12,
            paddingVertical: 10,
            borderWidth: 1,
            borderRadius: 25,
            borderColor: '#E0E0E0',
            marginTop: 25,
          }}
        >
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput placeholder="Search Dishes" style={{ flex: 1, marginLeft: 8, fontSize: 16, color: 'black' }} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 8,
              borderLeftWidth: 1,
              borderLeftColor: '#E0E0E0',
              paddingLeft: 8,
            }}
          >
            <Icon.MapPin height="20" width="20" stroke="gray" />
            <Text style={{ color: 'gray', fontSize: 14 }}>KMIT Canteen</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <BlocksContent navigation={navigation} updateCart={addItemToCart} />
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
  },
  tooltip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  paperHero: {
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#E91E63',
    borderRadius: 30,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  cartItemCount: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: '#FF5722',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  cartItemCountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
