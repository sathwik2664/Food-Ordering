// import React, { useState, useEffect } from 'react';
// import { StatusBar, ActivityIndicator, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Icon from 'react-native-feather';

// // Screen Imports
// import HomeScreen from './screens/HomeScreen';
// import OrdersScreen from './screens/OrdersScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import AdminDashboard from './screens/AdminDashboard';
// import AddItem from './screens/AddItem';
// import Canteen1 from './screens/Canteen1';
// import Canteen2 from './screens/Canteen2';
// import Canteen3 from './screens/Canteen3';
// import Canteen4 from './screens/Canteen4';
// import Cart from './screens/Cart';
// import EditItem from './screens/EditItem';
// import LoginScreen from './screens/LoginScreen'; // Use the correct name here

// // Navigators
// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// // Common Stack Navigator
// const CommonStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Login" component={LoginScreen} />
//   </Stack.Navigator>
// );

// // Admin Stack Navigator
// const AdminStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
//     <Stack.Screen name="AddItem" component={AddItem} />
//     <Stack.Screen name="EditItem" component={EditItem} />
//   </Stack.Navigator>
// );

// // User Stack Navigator
// const CanteenStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Home" component={HomeScreen} />
//     <Stack.Screen name="Canteen1" component={Canteen1} />
//     <Stack.Screen name="Canteen2" component={Canteen2} />
//     <Stack.Screen name="Canteen3" component={Canteen3} />
//     <Stack.Screen name="Canteen4" component={Canteen4} />
//     <Stack.Screen name="Cart" component={Cart} />
//   </Stack.Navigator>
// );

// // Tab Navigators
// const AdminTabNavigator = () => (
//   <Tab.Navigator
//     screenOptions={{
//       tabBarStyle: { height: 60, backgroundColor: '#fff' },
//       tabBarLabelStyle: { fontSize: 14, paddingBottom: 4 },
//       headerShown: false,
//     }}
//   >
//     <Tab.Screen
//       name="Items"
//       component={AdminStack}
//       options={{
//         tabBarIcon: ({ color, size }) => <Icon.List height={size} width={size} stroke={color} />,
//       }}
//     />
//     <Tab.Screen
//       name="Orders"
//       component={OrdersScreen}
//       options={{
//         tabBarIcon: ({ color, size }) => <Icon.Box height={size} width={size} stroke={color} />,
//       }}
//     />
//     <Tab.Screen
//       name="Profile"
//       component={ProfileScreen}
//       options={{
//         tabBarIcon: ({ color, size }) => <Icon.User height={size} width={size} stroke={color} />,
//       }}
//     />
//   </Tab.Navigator>
// );

// const UserTabNavigator = () => (
//   <Tab.Navigator
//     initialRouteName="Home"
//     screenOptions={{
//       tabBarStyle: { backgroundColor: '#fff', height: 60 },
//       tabBarLabelStyle: { fontSize: 14, paddingBottom: 4 },
//       headerShown: false,
//     }}
//   >
//     <Tab.Screen
//       name="Home"
//       component={CanteenStack}
//       options={{
//         tabBarIcon: ({ color, size }) => <Icon.Home height={size} width={size} stroke={color} />,
//       }}
//     />
//     <Tab.Screen
//       name="Orders"
//       component={OrdersScreen}
//       options={{
//         tabBarIcon: ({ color, size }) => <Icon.Box height={size} width={size} stroke={color} />,
//       }}
//     />
//     <Tab.Screen
//       name="Profile"
//       component={ProfileScreen}
//       options={{
//         tabBarIcon: ({ color, size }) => <Icon.User height={size} width={size} stroke={color} />,
//       }}
//     />
//   </Tab.Navigator>
// );

// // Main App Component
// export default function App() {
//   const [role, setRole] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchRole = async () => {
//       try {
//         const storedRole = await AsyncStorage.getItem('role');
//         setRole(storedRole);
//       } catch (error) {
//         console.error('Error fetching user role:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchRole();
//   }, []);

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <StatusBar barStyle="dark-content" />
//       {role === 'admin' ? (
//         <AdminTabNavigator />
//       ) : role === 'user' ? (
//         <UserTabNavigator />
//       ) : (
//         <CommonStack />
//       )}
//     </NavigationContainer>
//   );
// }
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Icon from 'react-native-feather';

// Screen Imports
import OrdersScreen from './screens/OrdersScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminDashboard1 from './screens/AdminDashboard1';
import AdminDashboard2 from './screens/AdminDashboard2';
import AdminDashboard3 from './screens/AdminDashboard3';
import AdminDashboard4 from './screens/AdminDashboard4';
import AddItem1 from './screens/AddItem1';
import AddItem2 from './screens/AddItem2';
import AddItem3 from './screens/AddItem3';
import AddItem4 from './screens/AddItem4';
import Canteen1 from './screens/Canteen1';
import Canteen2 from './screens/Canteen2';
import Canteen3 from './screens/Canteen3';
import Canteen4 from './screens/Canteen4';
import Cart from './screens/Cart';
import MealTypeScreen from './screens/MealTypeScreen';
import BreakfastScreen from './screens/BreakfastScreen';
import LunchScreen from './screens/LunchScreen';
import SnacksScreen from './screens/SnacksScreen';
import EditItem1 from './screens/EditItem1';
import EditItem2 from './screens/EditItem2';
import EditItem3 from './screens/EditItem3';
import EditItem4 from './screens/EditItem4';
import AdminDashboard5 from './screens/AdminDashboard5';
import AddItem5 from './screens/AddItem5';
import EditItem5 from './screens/EditItem5';
import AddressPage from './screens/AddressScreen';
import PaymentPage from './screens/PaymentScreen';
import PaymentPagePickup from './screens/PaymentScreenPickupAtCanteen';

// Navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Admin Stack Navigator
const AdminStack = ({ adminId }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {adminId === 1 && <Stack.Screen name="AdminDashboard1" component={AdminDashboard1} />}
    {adminId === 2 && <Stack.Screen name="AdminDashboard2" component={AdminDashboard2} />}
    {adminId === 3 && <Stack.Screen name="AdminDashboard3" component={AdminDashboard3} />}
    {adminId === 4 && <Stack.Screen name="AdminDashboard4" component={AdminDashboard4} />}
    {adminId === 5 && <Stack.Screen name="AdminDashboard5" component={AdminDashboard5} />}
    {adminId && <Stack.Screen name="AddItem1" component={AddItem1} />}
    {adminId && <Stack.Screen name="AddItem2" component={AddItem2} />}
    {adminId && <Stack.Screen name="AddItem3" component={AddItem3} />}
    {adminId && <Stack.Screen name="AddItem4" component={AddItem4} />}
    {adminId && <Stack.Screen name="AddItem5" component={AddItem5} />}
    {adminId && <Stack.Screen name="EditItem1" component={EditItem1} />}
    {adminId && <Stack.Screen name="EditIte2" component={EditItem2} />}
    {adminId && <Stack.Screen name="EditItem3" component={EditItem3} />}
    {adminId && <Stack.Screen name="EditItem4" component={EditItem4} />}
    {adminId && <Stack.Screen name="EditItem5" component={EditItem5} />}
  </Stack.Navigator>
);

// User Stack Navigator
const UserStack = () => (
  <Stack.Navigator initialRouteName="MealType" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MealType" component={MealTypeScreen} />
    <Stack.Screen name="Breakfast" component={BreakfastScreen} />
    <Stack.Screen name="Lunch" component={LunchScreen} />
    <Stack.Screen name="Snacks" component={SnacksScreen} />
    <Stack.Screen name="Canteen1" component={Canteen1} />
    <Stack.Screen name="Canteen2" component={Canteen2} />
    <Stack.Screen name="Canteen3" component={Canteen3} />
    <Stack.Screen name="Canteen4" component={Canteen4} />
    <Stack.Screen name="Cart" component={Cart} />
    <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
    <Stack.Screen name="AddressPage" component={AddressPage} />
      <Stack.Screen name="PaymentPage" component={PaymentPage} />
      <Stack.Screen name="PaymentPagePickup" component={PaymentPagePickup} />
  </Stack.Navigator>
);

// Admin Tab Navigator
const AdminTabNavigator = ({ adminId }) => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: { height: 60, backgroundColor: '#fff' },
      tabBarLabelStyle: { fontSize: 14, paddingBottom: 4 },
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Items"
      component={() => <AdminStack adminId={adminId} />}
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
      component={UserStack}
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
  const [isUser, setIsUser] = useState(false); // `true` for User, `false` for Admin
  const [adminId, setAdminId] = useState(2); // Admin ID: 1, 2, 3, 4 or 5

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      {isUser ? <UserTabNavigator /> : <AdminTabNavigator adminId={adminId} />}
    </NavigationContainer>
  );
}
