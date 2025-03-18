import { useMemo, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useGetHotels } from '@/hooks/useGetHotels';
import { useTranslation } from '@/hooks/useTranslation';
import { filterAndSortHotels } from '@/services/filterHotels';
import { Colors } from '@/design/colors';
import FilterModal from '@/components/FilterModal';
import { HotelFilters } from '@/types/hotelFilters';
import ErrorView from '@/components/ErrorView';
import LoadingIndicator from '@/components/LoadingIndicator';
import { HotelCard, HotelEmptyList, HotelListHeader } from '@/components/Hotel';

export default function HotelListScreen() {
  const t = useTranslation();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState<HotelFilters>({});
  const { hotels, isLoading, error, isRefreshing, refreshHotels } =
    useGetHotels();

  const filteredHotels = useMemo(
    () => (hotels.length > 0 ? filterAndSortHotels(hotels, filters) : []),
    [hotels, filters],
  );

  const handleApplyFilters = (newFilters: HotelFilters) => {
    setFilters(newFilters);
  };

  const handleToggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  if (isLoading)
    return <LoadingIndicator message={t('hotelList.loadingHotels')} />;

  if (error) return <ErrorView error={error} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredHotels}
        renderItem={({ item }) => <HotelCard hotel={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshing={isRefreshing}
        onRefresh={refreshHotels}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<HotelEmptyList />}
        ListHeaderComponent={
          <HotelListHeader
            hotels={filteredHotels}
            onOpen={handleToggleFilterModal}
          />
        }
      />
      <FilterModal
        visible={filterModalVisible}
        currentFilters={filters}
        onClose={handleToggleFilterModal}
        onApplyFilters={handleApplyFilters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    gap: 16,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
