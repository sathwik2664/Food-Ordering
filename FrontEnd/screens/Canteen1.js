import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import * as Icon from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Canteen1 = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemCounts, setItemCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [addedItems, setAddedItems] = useState({}); // Track added items to change buttons
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://192.168.37.203:5000/food/items');
        // console.log(response.data);
        if (response.status === 200 && Array.isArray(response.data.data)) {
          const dishes = response.data.data;
          setDishes(dishes);

          const initialCounts = dishes.reduce((acc, dish) => {
            acc[dish._id] = 0;
            return acc;
          }, {});

          try {
            const savedCart = await AsyncStorage.getItem('cart');
            if (savedCart) {
              const cartData = JSON.parse(savedCart);
              setItemCounts({ ...initialCounts, ...cartData });
            } else {
              setItemCounts(initialCounts);
            }
          } catch (error) {
            console.error('Error reading cart from AsyncStorage:', error);
            setItemCounts(initialCounts);
          }
        } else {
          console.error('Invalid API response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching dishes:', error);
        console.log(error);
        alert('Error fetching dishes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(itemCounts));
      } catch (error) {
        console.error('Error saving cart to AsyncStorage:', error);
      }
    };

    if (Object.keys(itemCounts).length > 0) {
      saveCart();
    }
  }, [itemCounts]);

  const increaseCount = (id) => {
    setItemCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      newCounts[id] = (newCounts[id] || 0) + 1;
      return newCounts;
    });
  
    setAddedItems((prevAddedItems) => ({
      ...prevAddedItems,
      [id]: true, // Keep item as added
    }));
  };
  
  const decreaseCount = (id) => {
    setItemCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      const updatedCount = Math.max((newCounts[id] || 0) - 1, 0);
      newCounts[id] = updatedCount;
  
      // If count reaches zero, remove item from addedItems
      if (updatedCount === 0) {
        setAddedItems((prevAddedItems) => {
          const updatedAddedItems = { ...prevAddedItems };
          delete updatedAddedItems[id]; // Remove item from addedItems
          return updatedAddedItems;
        });
      }
  
      return newCounts;
    });
  };
  

  const handleAddClick = (id) => {
    increaseCount(id); // Increase count when Add is clicked
  };

  const viewCart = () => {
    const cart = dishes.reduce((acc, dish) => {
      if (itemCounts[dish._id] > 0) {
        acc[dish._id] = {
          id: dish._id,
          name: dish.name,
          imageUrl: `http://192.168.37.203:5000${dish.imageUrl}`,
          price: dish.price,
          count: itemCounts[dish._id],
        };
      }
      return acc;
    }, {});

    navigation.navigate('Cart', { cart });
  };

  const totalItemsInCart = Object.values(itemCounts).reduce((acc, count) => acc + count, 0);

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (!dishes || dishes.length === 0) {
    return <Text style={styles.loadingText}>No dishes available.</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon.Search height="25" width="25" stroke="gray" />
        <TextInput
          placeholder="Search Dishes"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <FlatList
        data={filteredDishes}
        renderItem={({ item }) => (
          <View style={styles.dishContainer}>
            {item.imageUrl ? (
              <Image
                source={{ uri: `http://192.168.37.203:5000${item.imageUrl}` }}
                style={styles.dishImage}
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>No Image</Text>
              </View>
            )}
            <View style={styles.dishDetails}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.dishPrice}>₹{item.price}</Text>
              <View style={styles.buttonWrapper}>
                {/* Add button or count buttons */}
                {itemCounts[item._id] > 0 ? (
                  <>
                    <TouchableOpacity
                      onPress={() => decreaseCount(item._id)}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.countText}>{itemCounts[item._id]}</Text>
                    <TouchableOpacity
                      onPress={() => increaseCount(item._id)}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    onPress={() => handleAddClick(item._id)}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Add</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />

      {totalItemsInCart > 0 && (
        <TouchableOpacity style={styles.cartButton} onPress={viewCart}>
          <View style={styles.cartButtonContent}>
            <View style={styles.cartItemSummary}>
              <Text style={styles.cartItemText}>
                item{totalItemsInCart > 1 ? 's' : ''} added: {totalItemsInCart}
              </Text>
            </View>
            <Text style={styles.cartButtonText}>View Cart</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  dishContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dishImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  placeholderImage: {
    width: 80,
    height: 80,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  placeholderText: {
    color: '#888',
    fontSize: 12,
  },
  dishDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  dishPrice: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  countText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  cartButton: {
    backgroundColor: '#4CAF50',
    height: 70,
    padding: 15,
    borderRadius: 8,
    position: 'absolute',
    bottom: 5,
    left: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartItemSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemText: {
    color: '#fff',
    fontSize: 18,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#E0E0E0',
    margin: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#E0E0E0',
    paddingLeft: 8,
  },
  locationText: {
    color: 'gray',
    fontSize: 14,
  },
});

export default Canteen1;
