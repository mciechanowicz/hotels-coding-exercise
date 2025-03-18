import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import StarRating from '@/components/StarRating';
import { Colors } from '@/design/colors';

type Props = {
  name: string;
  stars: number;
  userRating: number;
  address: string;
  city: string;
};

const HotelDescriptionSection = ({
  name,
  stars,
  userRating,
  address,
  city,
}: Props) => {
  return (
    <>
      <Text style={styles.hotelName}>{name}</Text>
      <View style={styles.ratingContainer}>
        <StarRating rating={stars} size={20} />
        <View style={styles.userRating}>
          <Text style={styles.score}>{userRating}</Text>
        </View>
      </View>

      <View style={styles.addressContainer}>
        <FontAwesome
          name="map-marker"
          size={16}
          color={Colors.grey1}
          style={styles.icon}
        />
        <Text style={styles.addressText}>{`${city}, ${address}`}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default HotelDescriptionSection;
