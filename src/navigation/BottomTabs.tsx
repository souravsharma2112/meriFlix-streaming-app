/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screen/home/HomeScreen';
// import ProfileScreen from '../screen/profile/ProfileScreen';
// import SettingsScreen from '../screen/settings/SettingsScreen';

// ✅ Define route names and their params (if any)
export type MainTabParamList = {
    Home: undefined;
    Profile: undefined;
    Settings: undefined;
};

// ✅ Create the tab navigator with the defined types
const Tab = createBottomTabNavigator<MainTabParamList>();

// ✅ Define prop types for the icon render function
type TabBarIconProps = {
    focused: boolean;
    color: string;
    size: number;
};

// ✅ Component
const MainTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({
                route,
            }: {
                route: RouteProp<MainTabParamList, keyof MainTabParamList>;
            }): BottomTabNavigationOptions => ({
                tabBarIcon: ({ color, size }: TabBarIconProps) => {
                    let iconName = '';

                    switch (route.name) {
                        case 'Home':
                            iconName = 'home-outline';
                            break;
                        case 'Profile':
                            iconName = 'person-outline';
                            break;
                        case 'Settings':
                            iconName = 'settings-outline';
                            break;
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
            {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
