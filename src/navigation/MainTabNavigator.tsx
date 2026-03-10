/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../features/home/HomeScreen';
import ProfileScreen from '../features/profile/ProfileScreen';
import SettingsScreen from '../features/settings/SettingsScreen';
import { moderateScale } from '../theme/metrics';
import LinearGradient from 'react-native-linear-gradient';

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
          <View key={index} style={isFocused ? styles.iconWrapperActive : styles.iconWrapper}>
          {isFocused ? (
            <LinearGradient
              colors={["#D6C7FF", "#AB8BFF"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientContainer}
            >
              <Ionicons
                name={iconName}
                size={moderateScale(18)}
                color="#151312"
                onPress={onPress}
              />
              <Text style={styles.tabActiveText}>{route.name}</Text>
            </LinearGradient>
          ) : (
            <Ionicons
              name={iconName}
              size={moderateScale(18)}
              color="#A8B5DB"
              onPress={onPress}
            />
          )}
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
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: Platform.select({ ios: moderateScale(25), android: moderateScale(20) }),
    width: '91%',
    maxWidth: 480,
    alignSelf: 'center',
    marginHorizontal: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0F0D23',
    borderRadius: moderateScale(70),
  },
  tabActiveText: {
    fontWeight: 600,
    fontSize: moderateScale(14),
  },
  gradientContainer: {
    alignItems: 'center',
    flexDirection:'row',
    gap:moderateScale(5),
    justifyContent: 'center',
    borderRadius: moderateScale(50),
    paddingVertical: moderateScale(15),
    width:'100%',
  },
  iconWrapper: {
    width:'33.33%',
    flexDirection:'row',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    width:'33.33%',
    flexDirection:'row',
    justifyContent: 'center',
  },
});
