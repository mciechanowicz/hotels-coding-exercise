import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Hotel } from '../types/hotel';
import { useRouter } from 'expo-router';
import { Colors } from '@/design/colors';
import { PATHS } from '@/constants/paths';
import { useTranslation } from '@/hooks/useTranslation';
import { Image } from 'expo-image';

type Props = {
  hotel: Hotel;
};

const HotelCard = ({ hotel }: Props) => {
  const t = useTranslation();
  const router = useRouter();

  const handleNavigate = () => {
    router.push({
      pathname: PATHS.HOTEL_DETAILS,
      params: { hotelData: JSON.stringify(hotel) },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleNavigate}>
      <Image
        source={{ uri: hotel.gallery[0] }}
        style={styles.image}
        contentFit="cover"
        placeholderContentFit="cover"
        placeholder={require('../assets/images/hotel-placeholder.png')}
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {hotel.name}
        </Text>
        <View style={styles.ratingContainer}>
          <View style={styles.userRating}>
            <Text style={styles.score}>{hotel.userRating}</Text>
          </View>
        </View>
        <Text style={styles.location} numberOfLines={1}>
          {hotel.location.city}, {hotel.location.address}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>
            {hotel.price} {hotel.currency}
          </Text>
          <Text style={styles.perNightText}>{t('hotelDetails.perNight')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: Dimensions.get('window').width - 32,
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    marginBottom: 8,
  },
  userRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    backgroundColor: Colors.green,
    color: Colors.white,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: Colors.grey1,
  },
  location: {
    fontSize: 14,
    color: Colors.grey1,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.red,
    marginRight: 4,
  },
  perNightText: {
    fontSize: 12,
    color: Colors.grey1,
  },
});

export default HotelCard;
