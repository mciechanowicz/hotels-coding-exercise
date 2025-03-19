import { useTranslation } from '@/hooks/useTranslation';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const t = useTranslation();

  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" options={{ title: t('hotelList.title') }} />
        <Stack.Screen
          name="hotel"
          options={{ title: t('hotelDetails.title'), headerShown: false }}
        />
      </Stack>
    </>
  );
}
