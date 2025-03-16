import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import StarRating from '../components/StarRating';
import { Hotel } from '@/types/hotel';
import { Colors } from '@/design/colors';
import { useTranslation } from '@/hooks/useTranslation';

const { width } = Dimensions.get('window');

export default function HotelDetailScreen() {
  const t = useTranslation();
  const router = useRouter();
  const { hotelData } = useLocalSearchParams<{ hotelData: string }>();

  const hotel: Hotel = hotelData ? JSON.parse(hotelData) : null;

  const handleGoBack = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backIcon}>
          <FontAwesome name="arrow-left" size={24} color={Colors.grey1} />
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {hotel.gallery.map((image, index) => (
            <Image
              key={image + index}
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      </View>

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
            <TouchableOpacity style={styles.contactButton} onPress={() => {}}>
              <FontAwesome name="phone" size={16} color="white" />
              <Text style={styles.contactButtonText}>
                {t('hotelDetails.phone')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton} onPress={() => {}}>
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
    top: 40,
    zIndex: 1,
    backgroundColor: Colors.background,
    borderRadius: '50%',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: 250,
    width: width,
  },
  image: {
    width: width,
    height: 250,
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
});
