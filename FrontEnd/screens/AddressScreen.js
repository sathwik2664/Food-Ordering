import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddressPage = ({ route, navigation }) => {
  // Defaulting canteenId to 2 if not passed in route.params
  const { cartItems, total, canteenId = 2 } = route.params;

  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [blockName, setBlockName] = useState('');
  const [floor, setFloor] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const blockFloors = {
    A: ['1st Floor', '2nd Floor'],
    B: ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor'],
    C: ['1st Floor', '2nd Floor'],
    D: ['Ground Floor', '1st Floor', '2nd Floor'],
    E: ['1st Floor', '3rd Floor'],
    F: ['Ground Floor', '1st Floor'],
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Start loading

    // Validate input fields
    if (!name || !rollNo || !blockName || !floor || !roomNumber || !phone) {
      Alert.alert('Error', 'Please fill in all the details!');
      setIsLoading(false); // Stop loading
      return;
    }

    const formData = {
      name,
      rollno: rollNo,
      address: {
        blockName,
        floor,
        roomNumber,
      },
      phoneNumber: phone,
    };

    console.log('Form Data:', formData);

    try {
      const response = await fetch('http://192.168.165.203:5000/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Backend Response:', data);

      if (data.message === 'User created successfully') {
        // Log canteenId for debugging
        console.log('Canteen ID being passed:', canteenId);

        // Navigate to PaymentPage with all necessary data
        navigation.navigate('PaymentPage', {
          cartItems,
          total,
          canteenId,  // Passing canteenId here (default is 2)
          rollNo,     // Passing rollNo
          address: {   // Passing the address details
            blockName,
            floor,
            roomNumber,
            phone,
          },
        });
        
      } else {
        Alert.alert('Error', 'Failed to submit address. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting address:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Enter Your Delivery Details</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Roll Number"
        value={rollNo}
        onChangeText={setRollNo}
      />
      
      {/* Block Selection */}
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={blockName}
          onValueChange={(value) => {
            setBlockName(value);
            setFloor('');  // Reset floor when block changes
          }}
          style={styles.picker}
        >
          <Picker.Item label="Select Block" value="" />
          {Object.keys(blockFloors).map((block) => (
            <Picker.Item key={block} label={`Block ${block}`} value={block} />
          ))}
        </Picker>
      </View>

      {/* Floor Selection */}
      {blockName && (
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={floor}
            onValueChange={setFloor}
            style={styles.picker}
          >
            <Picker.Item label="Select Floor" value="" />
            {blockFloors[blockName].map((floorOption, index) => (
              <Picker.Item key={index} label={floorOption} value={floorOption} />
            ))}
          </Picker>
        </View>
      )}

      {/* Room Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Room Number"
        value={roomNumber}
        onChangeText={setRoomNumber}
      />
      
      {/* Phone Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      
      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        {isLoading ? (
          <Text style={styles.submitButtonText}>Submitting...</Text> // Loading state text
        ) : (
          <Text style={styles.submitButtonText}>Proceed to Payment</Text>
        )}
      </TouchableOpacity>
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
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
  inputContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddressPage;
