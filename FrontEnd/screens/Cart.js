import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const Cart = ({ route }) => {
  const cart = route.params?.cart || {};  // Get cart data from params
  const cartItems = Object.values(cart);

  // Calculate the total price of all items
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.count), 0);

  if (!cartItems.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const itemTotalPrice = item.price * item.count;  // Calculate the total price for the item

          return (
            <View style={styles.dishContainer}>
              {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={styles.dishImage} />
              ) : (
                <View style={styles.placeholderImage}>
                  <Text style={styles.placeholderText}>No Image</Text>
                </View>
              )}
              <View style={styles.dishDetails}>
                <Text style={styles.dishName}>{item.name}</Text>
                <Text style={styles.dishPrice}>₹{itemTotalPrice}</Text>  
                <Text style={styles.dishQuantity}>Quantity: {item.count}</Text>
              </View>
            </View>
          );
        }}
      />
      
      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Total: ₹{totalPrice}</Text>
        <TouchableOpacity style={styles.proceedButton}>
          <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
  },
  dishContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  dishImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  placeholderText: {
    color: '#888',
  },
  dishDetails: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dishPrice: {
    fontSize: 16,
    color: '#333',
    marginVertical: 4,
  },
  dishQuantity: {
    fontSize: 14,
    color: '#777',
  },
  footer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  proceedButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
  },
  proceedButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Cart;
