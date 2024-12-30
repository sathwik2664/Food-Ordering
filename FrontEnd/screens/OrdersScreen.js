import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderScreen = ({ route }) => {
  const { cartItems = [], total, status } = route.params || {};  // Default to empty array if cartItems is undefined

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Order Details</Text>

      {/* Display Order Status */}
      <Text style={styles.statusText}>{status}</Text>

      {/* Display Order Items and Total */}
      <View style={styles.orderSummary}>
        <Text style={styles.summaryText}>Order Summary:</Text>
        
        {/* Check if cartItems is available and has items */}
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Text key={item.id} style={styles.itemDetails}>
              {item.name} - ₹{item.price}
            </Text>
          ))
        ) : (
          <Text style={styles.itemDetails}>No items in your order</Text>
        )}

        <Text style={styles.totalText}>Total: ₹{total}</Text>
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
    textAlign: 'center',
    color: '#333',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4CAF50',  // Green color for status
  },
  orderSummary: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDetails: {
    fontSize: 16,
    color: '#555',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',  // Green for total price
    marginTop: 10,
  },
});

export default OrderScreen;
