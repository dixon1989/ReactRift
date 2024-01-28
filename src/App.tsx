import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import useCachedResources from './common/hooks/useCachedResources';
import tw from './common/tailwind';
import { TailwindProvider } from './theme/TailwindContext';
import { bodyLarge } from './theme/typography';

export default function App() {
  const { isLoadingComplete, initialTheme } = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <TailwindProvider initialTheme={initialTheme}>
      <View style={tw.style('flex-1 items-center justify-center')}>
        <Text style={tw.style(bodyLarge)}>
          Open up App.tsx to start working on your app!
        </Text>
        <StatusBar style="auto" />
      </View>
    </TailwindProvider>
  );
}
