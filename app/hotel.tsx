import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import StarRating from '../components/StarRating';
import { Hotel } from '@/types/hotel';
import { Colors } from '@/design/colors';
import { useTranslation } from '@/hooks/useTranslation';
import { useOpenMap } from '@/hooks/useOpenMap';
import ErrorView from '@/components/ErrorView';
import { useContact } from '@/hooks/useContact';
import HorizontalGallery from '@/components/HorizontalGallery';

export default function HotelDetailScreen() {
  const t = useTranslation();
  const router = useRouter();
  const { openPhone, openEmail } = useContact();
  const { hotelData } = useLocalSearchParams<{ hotelData: string }>();

  const hotel: Hotel = hotelData ? JSON.parse(hotelData) : null;

  const openMap = useOpenMap({
    latitude: hotel.location.latitude,
    longitude: hotel.location.longitude,
    label: hotel.name,
  });

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backIcon}>
        <FontAwesome name="arrow-left" size={24} color={Colors.grey1} />
      </TouchableOpacity>
      <HorizontalGallery images={hotel.gallery} />

      <View style={styles.infoContainer}>
        <Text style={styles.hotelName}>{hotel.name}</Text>
        <View style={styles.ratingContainer}>
          <StarRating rating={hotel.stars} size={20} />
          <View style={styles.userRating}>
            <Text style={styles.score}>{hotel.userRating}</Text>
          </View>
        </View>

        <View style={styles.addressContainer}>
          <FontAwesome
            name="map-marker"
            size={16}
            color={Colors.grey1}
            style={styles.icon}
          />
          <Text style={styles.addressText}>
            {hotel.location.address}, {hotel.location.city}
          </Text>
        </View>

        {hotel.location.latitude && hotel.location.longitude && (
          <TouchableOpacity style={styles.mapContainer} onPress={openMap}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: hotel.location.latitude,
                longitude: hotel.location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}>
              <Marker
                coordinate={{
                  latitude: hotel.location.latitude,
                  longitude: hotel.location.longitude,
                }}
              />
            </MapView>
            <View style={styles.mapOverlay}>
              <Text style={styles.mapText}>{t('hotelDetails.openMap')}</Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('hotelDetails.hours')}</Text>
          <View style={styles.timeContainer}>
            <View style={styles.timeItem}>
              <FontAwesome
                name="sign-in"
                size={16}
                color={Colors.blue}
                style={styles.icon}
              />
              <View>
                <Text style={styles.timeLabel}>
                  {t('hotelDetails.checkIn')}
                </Text>
                <Text style={styles.timeValue}>
                  {hotel.checkIn.from} - {hotel.checkIn.to}
                </Text>
              </View>
            </View>
            <View style={styles.timeItem}>
              <FontAwesome
                name="sign-out"
                size={16}
                color={Colors.blue}
                style={styles.icon}
              />
              <View>
                <Text style={styles.timeLabel}>
                  {t('hotelDetails.checkOut')}
                </Text>
                <Text style={styles.timeValue}>
                  {hotel.checkOut.from} - {hotel.checkOut.to}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}> {t('hotelDetails.contact')}</Text>
          <View style={styles.contactContainer}>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => openPhone(hotel.contact.phoneNumber)}>
              <FontAwesome name="phone" size={16} color="white" />
              <Text style={styles.contactButtonText}>
                {t('hotelDetails.phone')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => openEmail(hotel.contact.email)}>
              <FontAwesome name="envelope" size={16} color="white" />
              <Text style={styles.contactButtonText}>
                {t('hotelDetails.email')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.priceLabel}>
              {t('hotelDetails.pricePerNight')}
            </Text>
            <Text style={styles.priceValue}>
              {hotel.price} {hotel.currency}
            </Text>
          </View>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>
              {t('hotelDetails.bookNow')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

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
  hotelName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.grey4,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.blue,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  addressText: {
    fontSize: 14,
    color: Colors.grey1,
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.grey4,
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
  },
  timeLabel: {
    fontSize: 12,
    color: Colors.grey1,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.grey4,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 14,
    color: Colors.grey1,
  },
  priceValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.grey4,
  },
  bookButton: {
    backgroundColor: Colors.green,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
  mapContainer: {
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: Colors.transparentBlack,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
