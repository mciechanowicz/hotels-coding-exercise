import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { Colors } from '@/design/colors';

type Props = {
  price: number;
  currency: string;
};

const HotelBookSection = ({ price, currency }: Props) => {
  const [isBooked, setIsBooked] = useState(false);
  const t = useTranslation();

  const handleBook = () => {
    setIsBooked(true);
  };

  return (
    <View style={styles.priceContainer}>
      <View>
        <Text style={styles.priceLabel}>{t('hotelDetails.pricePerNight')}</Text>
        <Text style={styles.priceValue}>
          {price} {currency}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.bookButton, isBooked && styles.bookedButton]}
        onPress={handleBook}
        disabled={isBooked}>
        <Text style={styles.bookButtonText}>
          {isBooked ? t('hotelDetails.booked') : t('hotelDetails.bookNow')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  bookedButton: {
    backgroundColor: Colors.grey4,
  },
});

export default HotelBookSection;
