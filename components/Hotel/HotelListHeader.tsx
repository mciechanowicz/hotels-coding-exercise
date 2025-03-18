import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/design/colors';
import { useTranslation } from '@/hooks/useTranslation';
import { Hotels } from '@/types/hotel';

type Props = {
  hotels: Hotels;
  onOpen: () => void;
};

const HotelListHeader = ({ onOpen, hotels = [] }: Props) => {
  const t = useTranslation();
  return (
    <View style={styles.header}>
      <Text style={styles.resultsText}>
        {t('hotelList.hotelsFound', { count: hotels.length })}
      </Text>
      <TouchableOpacity style={styles.filterButton} onPress={onOpen}>
        <FontAwesome name="filter" size={16} color={Colors.white} />
        <Text style={styles.filterButtonText}>{t('hotelList.filters')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  resultsText: {
    fontSize: 14,
    color: Colors.grey1,
    fontWeight: '600',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: Colors.grey1,
    borderRadius: 8,
  },
  filterButtonText: {
    marginLeft: 4,
    color: Colors.white,
    fontWeight: '500',
  },
});

export default HotelListHeader;
