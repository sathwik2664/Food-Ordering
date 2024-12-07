import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Text, Card } from 'react-native-paper'; // React Native Paper for UI components

export default function AddItem() {
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);

    // Request permission to access the image library
    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // Handle the food item submission
    const handleAddFoodItem = async () => {
        if (!name) {
            Alert.alert('Error', 'Please fill name field.');
            return;
        }
        if (!price) {
            Alert.alert('Error', 'Please fill price field.');
            return;
        }
        if (!image) {
            Alert.alert('Error', 'Please select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('image', {
            uri: image,
            type: 'image/jpeg', // MIME type of the image
            name: image.split('/').pop(), // Get the image name from URI
        });

        setLoading(true);

        try {
            const response = await axios.post('http://192.168.0.101:5000/admin/add-food', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Alert.alert('Success', response.data.message);
            setName('');
            setPrice('');
            setImage(null);
        } catch (error) {
            console.error('Error adding food item:', error);
            Alert.alert('Error', 'Failed to add food item');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Text style={styles.header}>Add New Food Item</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Food Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Price"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                />

                <Button title="Select Image" onPress={selectImage} />

                {image && (
                    <Image source={{ uri: image }} style={styles.imagePreview} />
                )}

                <Button
                    title={loading ? 'Adding Food...' : 'Add Food Item'}
                    onPress={handleAddFoodItem}
                    disabled={loading}
                />

                {loading && <ActivityIndicator size="large" color="#0000ff" />}
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    card: {
        width: '100%',
        padding: 16,
        elevation: 5,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        fontSize: 16,
    },
    imagePreview: {
        width: 200,
        height: 200,
        marginVertical: 12,
        alignSelf: 'center',
    },
});
