import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <SafeAreaView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ flex: 1, backgroundColor: 'transparent' }}
        edges={['left', 'right', 'bottom']}
      >
      <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      </SafeAreaView>

    </SafeAreaProvider>
  );
}

export default App;
