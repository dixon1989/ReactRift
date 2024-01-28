import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from '../common/tailwind';
import React, { ReactNode } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { RnColorScheme, useAppColorScheme, useDeviceContext } from 'twrnc';

const TailwindContext = React.createContext<{
  colorScheme?: RnColorScheme;
  toggleColorScheme?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setColorScheme?: (colorScheme: RnColorScheme) => void;
}>({
  colorScheme: Appearance.getColorScheme(),
  toggleColorScheme: undefined,
  setColorScheme: undefined,
});

export function TailwindProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme?: RnColorScheme;
}) {
  useDeviceContext(tw, { withDeviceColorScheme: true });

  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(
    tw,
    initialTheme,
  );

  const deviceSetting = useColorScheme();

  React.useEffect(() => {
    const subscription = Appearance.addChangeListener(
      ({ colorScheme: updatedColorScheme }) => {
        setColorScheme(updatedColorScheme);
      },
    );

    return () => {
      subscription.remove();
    };
  }, [setColorScheme, colorScheme]);
  // const setAndSaveColourScheme = (scheme: RnColorScheme) => {
  //   console.log('Saving scheme', scheme);
  //   setAndSaveColourScheme(scheme);
  //   AsyncStorage.setItem('LightDarkModeSetting', scheme ?? 'dark');
  // };

  React.useEffect(() => {
    console.log('Saving scheme', colorScheme);
    Appearance.setColorScheme(colorScheme);
    AsyncStorage.setItem('LightDarkModeSetting', colorScheme ?? 'dark');
  }, [colorScheme]);

  React.useEffect(() => {
    setColorScheme(colorScheme);
    // setColorScheme does not seem to be a stable ref..
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorScheme]);

  console.log({ colorScheme, initialTheme });

  return (
    <TailwindContext.Provider
      value={{
        colorScheme: deviceSetting,
        toggleColorScheme,
        setColorScheme,
      }}
    >
      {children}
    </TailwindContext.Provider>
  );
}

export function useTWScheme() {
  const tw = React.useContext(TailwindContext);
  return tw;
}
