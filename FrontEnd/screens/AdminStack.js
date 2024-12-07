import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminDashboard from './screens/AdminDashboard';
import OrdersScreen from './screens/OrdersScreen'; // Placeholder for now
import ProfileScreen from './screens/ProfileScreen'; // Placeholder for now
import * as Icon from 'react-native-feather';

const Tab = createBottomTabNavigator();

export default function AdminStack() {
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
                component={AdminDashboard}
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
}
