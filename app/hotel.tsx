import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Hotel } from '@/types/hotel';
import { Colors } from '@/design/colors';
import { useTranslation } from '@/hooks/useTranslation';
import ErrorView from '@/components/ErrorView';
import HorizontalGallery from '@/components/HorizontalGallery';
import {
  HotelMapSection,
  HotelDescriptionSection,
  HotelCheckInOutSection,
  HotelContactSection,
  HotelBookSection,
} from '@/components/Hotel';

const HotelDetailScreen = () => {
  const t = useTranslation();
  const router = useRouter();
  const { hotelData } = useLocalSearchParams<{ hotelData: string }>();

  const hotel: Hotel = hotelData ? JSON.parse(hotelData) : null;

  const handleGoBack = () => {
    router.back();
  };

  if (!hotel)
    return (
      <ErrorView
        error={t('hotelDetails.goBackButton')}
        onRetry={handleGoBack}
      />
    );

  const {
    name,
    stars,
    userRating,
    checkIn,
    checkOut,
    price,
    currency,
    gallery,
    contact: { phoneNumber, email },
    location: { address, city, latitude, longitude },
  } = hotel;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backIcon}>
        <FontAwesome name="arrow-left" size={24} color={Colors.grey1} />
      </TouchableOpacity>
      <HorizontalGallery images={gallery} />
      <View style={styles.infoContainer}>
        <HotelDescriptionSection
          name={name}
          stars={stars}
          userRating={userRating}
          address={address}
          city={city}
        />
        <HotelMapSection
          latitude={latitude}
          longitude={longitude}
          label={name}
        />
        <HotelCheckInOutSection checkIn={checkIn} checkOut={checkOut} />
        <HotelContactSection phoneNumber={phoneNumber} email={email} />
      </View>
      <HotelBookSection price={price} currency={currency} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backIcon: {
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 1,
    backgroundColor: Colors.background,
    borderRadius: '50%',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
});

export default HotelDetailScreen;
