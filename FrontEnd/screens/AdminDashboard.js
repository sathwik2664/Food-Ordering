import React, { useState, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { FAB } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native'; // Import the useFocusEffect hook
import axios from 'axios';

export default function AdminDashboard({ navigation }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch items from the server
    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://172.20.10.2:5000/admin/items'); // Replace with your server URL
            setItems(response.data.items); // Assuming API returns { items: [...] }
        } catch (error) {
            console.error('Error fetching items:', error);
            Alert.alert('Error', 'Failed to fetch items');
        } finally {
            setLoading(false);
        }
    };

    // Use useFocusEffect to fetch items when the screen is focused
    useFocusEffect(
        useCallback(() => {
            fetchItems();
        }, [])
    );

    // Delete item
    const deleteItem = async (id) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this item?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await axios.delete(`http://192.168.0.101:5000/admin/delete-food/${id}`);
                            Alert.alert('Success', 'Item deleted successfully');
                            fetchItems(); // Refresh the list
                        } catch (error) {
                            console.error('Error deleting item:', error);
                            Alert.alert('Error', 'Failed to delete item');
                        }
                    },
                },
            ]
        );
    };

    // Navigate to edit screen
    const editItem = (item) => {
        if (!item || !item._id) {
            Alert.alert('Error', 'Item data is missing!');
            return;
        }
        navigation.navigate('EditItem', { item }); // Pass item to EditItem screen
    };

    // Render each item
    const renderItem = ({ item }) => (
        <View style={styles.itemCard}>
            {item.imageUrl ? (
                <Image source={{ uri: `http://192.168.0.101:5000${item.imageUrl}` }} style={styles.itemImage} />
            ) : (
                <View style={styles.placeholderImage}>
                    <Text style={styles.placeholderText}>No Image</Text>
                </View>
            )}
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
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
            <View><Text style={{fontSize:22,marginLeft:12,padding:10}}>All Items</Text></View>
            {loading ? (
                <ActivityIndicator size="large" color="#6200ee" />
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={renderItem}
                />
            )}
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('AddItem')} // Navigate to AddItem screen
            />
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
});