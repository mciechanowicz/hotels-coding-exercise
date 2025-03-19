import { Hotels } from '@/types/hotel';
import { HotelFilters, SortKey, SortOrderEnum } from '@/types/hotelFilters';

export const filterAndSortHotels = (
  hotels: Hotels,
  filters: HotelFilters,
): Hotels => {
  let filteredHotels = [...hotels];

  if (filters.stars) {
    filteredHotels = filteredHotels.filter(
      (hotel) => hotel.stars >= filters.stars!,
    );
  }

  if (filters.sortBy) {
    filteredHotels.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case SortKey.Price:
          comparison = a.price - b.price;
          break;
        case SortKey.Rating:
          comparison = a.userRating - b.userRating;
          break;
        case SortKey.Stars:
          comparison = a.stars - b.stars;
          break;
        default:
          comparison = 0;
          break;
      }

      return filters.sortOrder === SortOrderEnum.Desc
        ? -comparison
        : comparison;
    });
  }

  return filteredHotels;
};
