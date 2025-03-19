import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/design/colors';
import { useTranslation } from '@/hooks/useTranslation';
import { HotelFilters, SortKey, SortOrderEnum } from '@/types/hotelFilters';
import i18n from '@/translations/i18n';

const SORT_OPTIONS = [
  {
    value: SortKey.Price,
    label: i18n.t('hotelList.filtersSortByPrice'),
  },
  {
    value: SortKey.Rating,
    label: i18n.t('hotelList.filtersSortByRating'),
  },
  {
    value: SortKey.Stars,
    label: i18n.t('hotelList.filtersSortByStars'),
  },
];

type Props = {
  visible: boolean;
  currentFilters: HotelFilters;
  onClose: () => void;
  onApplyFilters: (filters: HotelFilters) => void;
};

const FilterModal = ({
  visible,
  currentFilters,
  onClose,
  onApplyFilters,
}: Props) => {
  const t = useTranslation();
  const [filters, setFilters] = useState<HotelFilters>(currentFilters);

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    onApplyFilters({});
    setFilters({});
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('hotelList.filtersTitle')}</Text>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome name="times" size={24} color={Colors.grey4} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t('hotelList.filtersStarRating')}
              </Text>
              <View style={styles.starButtons}>
                {[1, 2, 3, 4, 5].map((star) => {
                  const isSelected = filters.stars === star;
                  return (
                    <TouchableOpacity
                      key={star}
                      style={[
                        styles.starButton,
                        isSelected && styles.selectedStarButton,
                      ]}
                      onPress={() =>
                        setFilters({
                          ...filters,
                          stars: isSelected ? undefined : star,
                        })
                      }>
                      <Text
                        style={[
                          styles.starButtonText,
                          isSelected && styles.selectedStarButtonText,
                        ]}>
                        {star} <FontAwesome name="star" />
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t('hotelList.filtersSortBy')}
              </Text>
              <View style={styles.sortButtons}>
                {SORT_OPTIONS.map((option) => {
                  const isSelected = filters.sortBy === option.value;
                  return (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.sortButton,
                        isSelected && styles.selectedSortButton,
                      ]}
                      onPress={() =>
                        setFilters((prev) => {
                          const isSameSort = prev.sortBy === option.value;
                          return {
                            ...prev,
                            sortBy:
                              isSameSort &&
                              prev.sortOrder === SortOrderEnum.Desc
                                ? undefined
                                : option.value,
                            sortOrder: isSameSort
                              ? prev.sortOrder === SortOrderEnum.Asc
                                ? SortOrderEnum.Desc
                                : SortOrderEnum.Asc
                              : SortOrderEnum.Asc,
                          };
                        })
                      }>
                      <Text
                        style={[
                          styles.sortButtonText,
                          isSelected && styles.selectedSortButtonText,
                        ]}>
                        {option.label}
                      </Text>
                      {isSelected && (
                        <FontAwesome
                          name={
                            filters.sortOrder === SortOrderEnum.Desc
                              ? 'caret-down'
                              : 'caret-up'
                          }
                          size={14}
                          color={isSelected ? Colors.white : Colors.grey4}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>
                {t('hotelList.filtersReset')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>
                {t('hotelList.filtersApply')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.transparentBlack,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContent: {
    flex: 1,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  starButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  starButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background,
  },
  selectedStarButton: {
    backgroundColor: Colors.blue,
  },
  starButtonText: {
    color: Colors.grey4,
  },
  selectedStarButtonText: {
    color: Colors.white,
  },
  sortButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background,
    gap: 6,
  },
  selectedSortButton: {
    backgroundColor: Colors.blue,
  },
  sortButtonText: {
    color: Colors.grey4,
  },
  selectedSortButtonText: {
    color: Colors.white,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.grey3,
  },
  resetButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.grey5,
  },
  resetButtonText: {
    color: Colors.grey1,
    fontWeight: '500',
  },
  applyButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.blue,
  },
  applyButtonText: {
    color: Colors.white,
    fontWeight: '500',
  },
});

export default FilterModal;
