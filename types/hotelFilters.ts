export type HotelFilters = {
  stars?: number;
  sortBy?: SortKey;
  sortOrder?: SortOrderEnum;
};

export enum SortKey {
  Price = 'price',
  Rating = 'rating',
  Stars = 'stars',
}

export enum SortOrderEnum {
  Asc = 'asc',
  Desc = 'desc',
}
