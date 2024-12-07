import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Icon from 'react-native-feather';

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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Admin Stack: Used for administrative tasks
const AdminStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="AddItem" component={AddItem} />
      <Stack.Screen name="EditItem" component={EditItem} /> 
    </Stack.Navigator>
  );
};


// Canteen Stack: Contains all canteen-related screens
const CanteenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Canteen1" component={Canteen1} />
      <Stack.Screen name="Canteen2" component={Canteen2} />
      <Stack.Screen name="Canteen3" component={Canteen3} />
      <Stack.Screen name="Canteen4" component={Canteen4} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="EditItem" component={EditItem} />
    </Stack.Navigator>
  );
};

// Admin Tab Navigator: Used when user is an admin
const AdminTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 60, backgroundColor: '#fff' },
        tabBarLabelStyle: { fontSize: 14, paddingBottom: 4 },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Items"
        component={AdminStack} // Use AdminStack instead of AdminDashboard directly
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
};

// User Tab Navigator: Used when user is not an admin
const UserTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { backgroundColor: '#fff', height: 60 },
        tabBarLabelStyle: { fontSize: 14, paddingBottom: 4 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={CanteenStack} // Use CanteenStack here
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
};

export default function App() {
  const [isAdmin, setIsAdmin] = useState(true); // Set to true for admin view

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      {isAdmin ? (
        // Admin Tab Navigator should show up when isAdmin is true
        <AdminTabNavigator />
      ) : (
        // User Tab Navigator should show up when isAdmin is false
        <UserTabNavigator />
      )}
    </NavigationContainer>
  );
}
