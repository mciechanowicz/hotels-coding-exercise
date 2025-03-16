import { useTranslation } from '@/hooks/useTranslation';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const t = useTranslation();
  const colorScheme = useColorScheme();

  const statusBarStyle = colorScheme !== 'dark' ? 'light' : 'dark';

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: t('hotelList.title') }} />
        <Stack.Screen
          name="hotel"
          options={{ title: t('hotelDetails.title'), headerShown: false }}
        />
      </Stack>
      <StatusBar style={statusBarStyle} />
    </>
  );
}
