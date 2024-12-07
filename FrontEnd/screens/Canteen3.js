import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Canteen3 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Canteen 2 - Milkshakes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Canteen3;
