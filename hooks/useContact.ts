import * as Linking from 'expo-linking';
import { Alert } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';

export const useContact = () => {
  const t = useTranslation();

  const openPhone = (phoneNumber?: string) => {
    if (!phoneNumber) return;
    const url = `tel:${phoneNumber}`;

    Linking.openURL(url).catch((err) => {
      Alert.alert(t('common.phoneError'));
      console.error('Error when opening phone app:', err);
    });
  };

  const openEmail = (email?: string) => {
    if (!email) return;
    const url = `mailto:${email}`;

    Linking.openURL(url).catch((err) => {
      Alert.alert(t('common.emailError'));
      console.error('Error when opening email app:', err);
    });
  };

  return { openPhone, openEmail };
};
