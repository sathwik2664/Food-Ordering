import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const requestOtp = async () => {
    if (mobileNumber.length !== 10) {
      Alert.alert("Invalid Number", "Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      await axios.post("http://172.20.10.2:5000/otp/generate", { mobileNumber });
      Alert.alert("OTP Sent", "Check your mobile for the OTP.");
      setIsOtpSent(true);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to send OTP. Try again.");
    }
  };

  const login = async () => {
    if (!otp) {
      Alert.alert("Invalid OTP", "Please enter the OTP.");
      return;
    }

    try {
      const response = await axios.post('http://172.20.10.2:5000/otp/validate', {
        mobileNumber,
        otp,
      });

      const { role } = response.data; // Assume API returns { role: 'user' | 'admin' }
      await AsyncStorage.setItem('role', role); // Store role locally

      // Navigate based on role
      if (role === 'admin') {
        navigation.replace('AdminTabNavigator'); // Use replace to prevent going back to login screen
      } else {
        navigation.replace('UserTabNavigator'); // Use replace to prevent going back to login screen
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Invalid OTP or mobile number.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile Number"
        keyboardType="numeric"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />
      {isOtpSent && (
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="numeric"
          value={otp}
          onChangeText={setOtp}
        />
      )}
      {!isOtpSent ? (
        <Button title="Request OTP" onPress={requestOtp} />
      ) : (
        <Button title="Login" onPress={login} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default LoginScreen;
