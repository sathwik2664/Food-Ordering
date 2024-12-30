import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { FAB } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminDashboard3({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://192.168.0.107:5000/admin/3/items');
      setItems(response.data.items);
    } catch (error) {
      console.error('Error fetching items:', error);
      Alert.alert('Error', 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('role'); // Clear stored role
      Alert.alert('Logout Successful', 'You have been logged out.');
      navigation.replace('LoginScreen'); // Navigate to LoginScreen
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  const deleteItem = async (id) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`http://192.168.0.107:5000/admin/3/delete-food/${id}`);
            Alert.alert('Success', 'Item deleted successfully');
            fetchItems();
          } catch (error) {
            console.error('Error deleting item:', error);
            Alert.alert('Error', 'Failed to delete item');
          }
        },
      },
    ]);
  };

  const editItem = (item) => {
    if (!item || !item._id) {
      Alert.alert('Error', 'Item data is missing!');
      return;
    }
    navigation.navigate('EditItem', { item });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      {item.imageUrl ? (
        <Image source={{ uri: `http://192.168.0.107:5000${item.imageUrl}` }} style={styles.itemImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
        <Text >Qty: {item.stock}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.editButton} onPress={() => editItem(item)}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item._id)}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => handleLogout()}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <FlatList data={items} keyExtractor={(item) => item._id.toString()} renderItem={renderItem} />
      )}
      <FAB style={styles.fab} icon="plus" onPress={() => navigation.navigate('AddItem3')} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f',
        marginTop:40,
    },
    itemCard: {
        flexDirection: 'row',
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    placeholderImage: {
        width: 80,
        height: 80,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#888',
        fontSize: 12,
    },
    itemDetails: {
        marginLeft: 12,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: '#555',
    },
    actions: {
        flexDirection: 'row',
        marginTop: 8,
    },
    editButton: {
        backgroundColor: '#4caf50',
        padding: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    deleteButton: {
        backgroundColor: '#f44336',
        padding: 8,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: 'lightblue',
    },

      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      },
      title: {
        fontSize: 22,
        fontWeight: 'bold',
      },
      logoutButton: {
        padding: 8,
        backgroundColor: '#f44336',
        borderRadius: 4,
      },
      logoutText: {
        color: '#fff',
        fontWeight: 'bold',
      },

});