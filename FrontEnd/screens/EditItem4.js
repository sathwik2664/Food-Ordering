import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function EditItem4({ route, navigation }) {
    const { item } = route.params;

    const [name, setName] = useState(item.name || '');
    const [price, setPrice] = useState(item.price.toString() || '');
    const [stock, setStock] = useState(item.stock.toString() || '');

    const updateItem = async () => {
        try {
            const response = await axios.put(`http://192.168.165.203:5000/admin/4/update-food/${item._id}`, {
                name,
                price: parseFloat(price),
                stock: parseFloat(stock),
            });

            Alert.alert('Success', 'Item updated successfully');
            navigation.goBack(); // Navigate back to AdminDashboard
        } catch (error) {
            console.error('Error updating item:', error);
            Alert.alert('Error', 'Failed to update item');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Edit Food Item</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                keyboardType="numeric"
                onChangeText={setPrice}
            />
            <TextInput
                style={styles.input}
                placeholder="Stock"
                value={stock}
                keyboardType="numeric"
                onChangeText={setStock}
            />
            <Button title="Update Item" onPress={updateItem} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 4,
        marginBottom: 16,
    },
});
