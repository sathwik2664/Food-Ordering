import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

const PaymentPage = ({ route, navigation }) => {
  const { cartItems, total, rollNo, address, canteenId } = route.params;
  const [userAddress, setUserAddress] = useState(address || null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  useEffect(() => {
    if (!rollNo) {
      Alert.alert('Error', 'Roll number is missing');
      setIsLoading(false);
      return;
    }

    if (!userAddress) {
      const fetchUserAddress = async () => {
        try {
          const response = await fetch(`http://192.168.165.203:5000/user/users/${rollNo}`);
          if (!response.ok) {
            throw new Error('Failed to fetch address');
          }

          const data = await response.json();
          console.log('Fetched Data:', data);

          if (data && data.address && data.address.blockName) {
            const formattedAddress = `${data.address.blockName}, ${data.address.floor}, Room ${data.address.roomNumber}`;
            setUserAddress(formattedAddress);
          } else {
            Alert.alert('Error', 'Address not found. Please update your profile.');
          }
        } catch (error) {
          console.error('Error fetching address:', error);
          Alert.alert('Error', 'Could not fetch address. Please check your network connection.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserAddress();
    } else {
      setIsLoading(false);
    }
  }, [rollNo, userAddress]);

  const handlePayment = async () => {
    if (!userAddress) {
      Alert.alert('Error', 'User address is missing!');
      return;
    }

    if (!canteenId) {
      Alert.alert('Error', 'Canteen ID is missing!');
      return;
    }

    setIsPaymentProcessing(true);

    const orderData = {
      userAddress: {
        address: userAddress,
        rollno: rollNo,
      },
      cartItems: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        price: item.price,
        quantity: item.count,
      })),
      total: total,
      rollNo: rollNo,
      status: 'Pending',
      canteenId: canteenId,
    };

    console.log('Order Data:', JSON.stringify(orderData, null, 2));

    try {
      const response = await fetch('http://192.168.165.203:5000/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      console.log('Response Data:', JSON.stringify(data, null, 2));

      if (response.ok) {
        Alert.alert('Success', 'Payment successful! Your order has been placed.');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'Failed to place the order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing the order:', error);
      setIsPaymentProcessing(false);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  // Add a fallback for rendering the user address, ensure it's always a string
  const renderAddress = () => {
    if (typeof userAddress === 'string') {
      return userAddress;  // If it's already a string, return it
    }
    // If it's an object, make sure to convert to a string
    if (userAddress && userAddress.blockName) {
      return `${userAddress.blockName}, ${userAddress.floor}, Room ${userAddress.roomNumber}`;
    }
    return 'Address not available';  // Fallback text if no valid address
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading Address...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Payment Page</Text>
      <View style={styles.orderSummary}>
        <Text style={styles.summaryText}>Order Summary:</Text>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
              ) : (
                <View style={styles.placeholderImage}>
                  <Text style={styles.placeholderText}>No Image</Text>
                </View>
              )}
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.count}</Text>
                <Text style={styles.itemPrice}>₹{item.price * item.count}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text>No items in the cart</Text>
        )}
        <Text style={styles.totalPrice}>Total: ₹{total}</Text>
      </View>

      <View style={styles.addressContainer}>
        <Text style={styles.addressLabel}>Delivery Address:</Text>
        <Text style={styles.addressText}>{renderAddress()}</Text>
      </View>

      {isPaymentProcessing ? (
        <Text style={styles.loadingText}>Processing Payment...</Text>
      ) : (
        <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
          <Text style={styles.paymentButtonText}>Make Payment</Text>
        </TouchableOpacity>
      )}
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
  orderSummary: {
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  placeholderText: {
    color: '#888',
  },
  itemDetails: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#777',
  },
  itemPrice: {
    fontSize: 14,
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  addressContainer: {
    marginVertical: 20,
  },
  addressLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 16,
    marginTop: 5,
    color: '#555',
  },
});

export default PaymentPage;
