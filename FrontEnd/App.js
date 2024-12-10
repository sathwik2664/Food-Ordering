import React, { useState, useEffect } from 'react';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Icon from 'react-native-feather';

// Screen Imports
import HomeScreen from './screens/HomeScreen';
import OrdersScreen from './screens/OrdersScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminDashboard from './screens/AdminDashboard';
import AddItem from './screens/AddItem';
import Canteen1 from './screens/Canteen1';
import Canteen2 from './screens/Canteen2';
import Canteen3 from './screens/Canteen3';
import Canteen4 from './screens/Canteen4';
import Cart from './screens/Cart';
import EditItem from './screens/EditItem';
import LoginScreen from './screens/LoginScreen';

// Navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Admin Stack
const AdminStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
    <Stack.Screen name="AddItem" component={AddItem} />
    <Stack.Screen name="EditItem" component={EditItem} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
  </Stack.Navigator>
);

// Canteen Stack
const CanteenStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Canteen1" component={Canteen1} />
    <Stack.Screen name="Canteen2" component={Canteen2} />
    <Stack.Screen name="Canteen3" component={Canteen3} />
    <Stack.Screen name="Canteen4" component={Canteen4} />
    <Stack.Screen name="Cart" component={Cart} />
    <Stack.Screen name="EditItem" component={EditItem} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
  </Stack.Navigator>
);

// Admin Tab Navigator
const AdminTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: { height: 60, backgroundColor: '#fff' },
      tabBarLabelStyle: { fontSize: 14, paddingBottom: 4 },
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Items"
      component={AdminStack}
      options={{
        tabBarIcon: ({ color, size }) => <Icon.List height={size} width={size} stroke={color} />,
      }}
    />
    <Tab.Screen
      name="Orders"
      component={OrdersScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Icon.Box height={size} width={size} stroke={color} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Icon.User height={size} width={size} stroke={color} />,
      }}
    />
  </Tab.Navigator>
);

// User Tab Navigator
const UserTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarStyle: { backgroundColor: '#fff', height: 60 },
      tabBarLabelStyle: { fontSize: 14, paddingBottom: 4 },
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={CanteenStack}
      options={{
        tabBarIcon: ({ color, size }) => <Icon.Home height={size} width={size} stroke={color} />,
      }}
    />
    <Tab.Screen
      name="Orders"
      component={OrdersScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Icon.Box height={size} width={size} stroke={color} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Icon.User height={size} width={size} stroke={color} />,
      }}
    />
  </Tab.Navigator>
);

// Main App Component
export default function App() {
  const [isAdmin, setIsAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const role = await AsyncStorage.getItem('role');
        console.log(role);
        if (role === 'admin') {
          setIsAdmin('admin');
        } else if (role === 'user') {
          setIsAdmin('user');
        } else {
          setIsAdmin(null); // User is not logged in
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setIsAdmin(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRole();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      {isAdmin === 'admin' ? (
        <AdminTabNavigator />
      ) : isAdmin === 'user' ? (
        <UserTabNavigator />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
