import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/design/colors';
import { useTranslation } from '@/hooks/useTranslation';

const HotelEmptyList = () => {
  const t = useTranslation();
  return (
    <View style={styles.emptyContainer}>
      <FontAwesome name="search" size={50} color={Colors.grey3} />
      <Text style={styles.emptyText}>{t('hotelList.emptyListText')}</Text>
      <Text style={styles.emptySubtext}>
        {t('hotelList.changeSearchFilters')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.grey1,
  },
  emptySubtext: {
    marginTop: 5,
    fontSize: 14,
    color: Colors.grey2,
    textAlign: 'center',
  },
});

export default HotelEmptyList;
