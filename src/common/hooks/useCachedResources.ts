import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

import { RnColorScheme } from 'twrnc';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [initialTheme, setInitialTheme] = useState<RnColorScheme>('dark');

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          'Rubik-Regular': require('../../../assets/fonts/Rubik-Regular.otf'),
          'Rubik-Medium': require('../../../assets/fonts/Rubik-Medium.otf'),
          'Rubik-SemiBold': require('../../../assets/fonts/Rubik-SemiBold.otf'),
          'Rubik-Bold': require('../../../assets/fonts/Rubik-Bold.otf'),
        });

        const theme = ((await AsyncStorage.getItem('LightDarkModeSetting')) ||
          'dark') as RnColorScheme;

        setInitialTheme(theme);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return { isLoadingComplete, initialTheme };
}
