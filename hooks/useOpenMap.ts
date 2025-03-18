import { useTranslation } from '@/hooks/useTranslation';
import { Platform, Linking, Alert } from 'react-native';

type OpenMapParams = {
  latitude: number;
  longitude: number;
  label?: string;
};

export const useOpenMap = ({ latitude, longitude, label }: OpenMapParams) => {
  const t = useTranslation();
  return () => {
    const scheme =
      Platform.select({
        ios: 'maps://0,0?q=',
        android: 'geo:0,0?q=',
      }) ?? 'geo:0,0?q=';

    const location = `${latitude},${longitude}`;

    const labelPart = label
      ? Platform.select({
          ios: `${label}@${location}`,
          android: `${location}(${label})`,
        })
      : location;

    const url = scheme + labelPart;

    Linking.openURL(url).catch((err) => {
      Alert.alert(t('common.mapError'));
      console.error('Error when opening map:', err);
    });
  };
};
