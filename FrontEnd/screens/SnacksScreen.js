import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const SnacksScreen = () => {
  const snacksItems = [
    { id: '1', name: 'Chips', price: '$2' },
    { id: '2', name: 'Cookies', price: '$3' },
    { id: '3', name: 'Nachos', price: '$5' },
    { id: '4', name: 'Smoothie', price: '$4' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Snacks Menu</Text>
      <FlatList
        data={snacksItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  itemText: { fontSize: 18 },
  itemPrice: { fontSize: 18, fontWeight: '600' },
});

export default SnacksScreen;
