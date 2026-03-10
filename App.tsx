import React, { useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import QueryProvider from './src/providers/OueryProvider';
import AuthProvider from './src/providers/AuthProvider';
import SplashScreen from './src/features/splash/SplashScreen';
import { COLORS } from './src/theme/colors';
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ flex: 1, backgroundColor: COLORS.primary }}
        edges={['left', 'right', 'bottom']}
      >
        {isSplashVisible ? (
          <SplashScreen onFinish={() => setIsSplashVisible(false)} />
        ) : (
          <>
            <StatusBar
              translucent={true}
              backgroundColor={'transparent'}
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <AuthProvider>
              <QueryProvider>
                <NavigationContainer>
                  <StackNavigator />
                </NavigationContainer>
              </QueryProvider>
            </AuthProvider>
          </>
        )}
      </SafeAreaView>

    </SafeAreaProvider>
  );
}

export default App;
