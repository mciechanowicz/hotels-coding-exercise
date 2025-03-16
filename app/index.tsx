import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import HotelCard from '../components/HotelCard';
import { useGetHotels } from '@/hooks/useGetHotels';
import { useTranslation } from '@/hooks/useTranslation';
import { Colors } from '@/design/colors';

export default function HotelListScreen() {
  const t = useTranslation();
  const { hotels, isLoading, error } = useGetHotels();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.blue} />
        <Text style={styles.loadingText}>{t('hotelList.loadingHotels')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <FontAwesome name="exclamation-circle" size={50} color={Colors.error} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => {}}>
          <Text style={styles.retryButtonText}>
            {t('hotelList.retryButtonText')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={hotels}
        renderItem={({ item }) => <HotelCard hotel={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome name="search" size={50} color={Colors.grey3} />
            <Text style={styles.emptyText}>{t('hotelList.emptyListText')}</Text>
            <Text style={styles.emptySubtext}>
              {t('hotelList.changeSearchFilters')}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.grey1,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.grey1,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.blue,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContent: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
