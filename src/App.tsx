
import tw from './common/tailwind';
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { bodyLarge } from "./theme/typography";
import useCachedResources from './common/hooks/useCachedResources';
import { TailwindProvider } from './theme/TailwindContext';

export default function App() {

  const { isLoadingComplete, initialTheme } = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <TailwindProvider initialTheme={initialTheme}>
    <View style={tw.style('items-center justify-center flex-1')}>
      <Text style={tw.style(bodyLarge)}>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
    </TailwindProvider>
  );
}
