import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../features/home/HomeScreen';
import { moderateScale } from '../theme/metrics';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, navigation }: any) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route: any, index: number) => {
        // const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        let iconName = '';
        if (route.name === 'Home') iconName = isFocused ? 'home' : 'home-outline';
        if (route.name === 'Profile') iconName = isFocused ? 'person' : 'person-outline';
        if (route.name === 'Settings') iconName = isFocused ? 'settings' : 'settings-outline';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key={index} style={styles.iconWrapper}>
            <Ionicons
              name={iconName}
              size={moderateScale(24)}
              color={isFocused ? '#007AFF' : '#8e8e93'}
              onPress={onPress}
            />
            {isFocused && <View style={styles.activeIndicator} />}
          </View>
        );
      })}
    </View>
  );
};

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: Platform.select({ ios: moderateScale(25), android: moderateScale(20) }),
    left: '5%',
    right: '5%',
    height: moderateScale(65),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: moderateScale(30),
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#007AFF',
  },
});
