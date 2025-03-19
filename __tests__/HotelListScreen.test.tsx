import { render, screen, fireEvent } from '@testing-library/react-native';
import HotelListScreen from '../app/index';
import { useGetHotels } from '@/hooks/useGetHotels';
import { filterAndSortHotels } from '@/services/filterHotels';
import { mockHotels } from '@/mocks/hotelMocks';

jest.mock('@/hooks/useGetHotels');
jest.mock('@/services/filterHotels', () => ({
  filterAndSortHotels: jest.fn(),
}));

describe('HotelListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders LoadingIndicator when loading hotels', () => {
    (useGetHotels as jest.Mock).mockReturnValue({
      hotels: [],
      isLoading: true,
      error: null,
      isRefreshing: false,
      refreshHotels: jest.fn(),
    });

    render(<HotelListScreen />);

    expect(screen.getByText('hotelList.loadingHotels')).toBeTruthy();
  });

  it('renders ErrorView when error occurs', () => {
    const mockError = new Error('Failed to fetch hotels');
    (useGetHotels as jest.Mock).mockReturnValue({
      hotels: [],
      isLoading: false,
      error: mockError,
      isRefreshing: false,
      refreshHotels: jest.fn(),
    });

    render(<HotelListScreen />);

    expect(screen.getByText(mockError.message)).toBeTruthy();
  });

  it('renders HotelEmptyList when filteredHotels is empty', () => {
    (useGetHotels as jest.Mock).mockReturnValue({
      hotels: [],
      isLoading: false,
      error: null,
      isRefreshing: false,
      refreshHotels: jest.fn(),
    });
    (filterAndSortHotels as jest.Mock).mockReturnValue([]);

    render(<HotelListScreen />);

    expect(screen.getByText('hotelList.emptyListText')).toBeTruthy();
    expect(screen.getByText('hotelList.changeSearchFilters')).toBeTruthy();
  });

  it('renders list of hotels when data is available', () => {
    (useGetHotels as jest.Mock).mockReturnValue({
      hotels: mockHotels,
      isLoading: false,
      error: null,
      isRefreshing: false,
      refreshHotels: jest.fn(),
    });
    (filterAndSortHotels as jest.Mock).mockReturnValue(mockHotels);

    render(<HotelListScreen />);

    expect(screen.getByText(mockHotels[0].name)).toBeTruthy();
    expect(screen.getByText(mockHotels[1].name)).toBeTruthy();
  });

  it('renders HotelListHeader with correct data', () => {
    (useGetHotels as jest.Mock).mockReturnValue({
      hotels: mockHotels,
      isLoading: false,
      error: null,
      isRefreshing: false,
      refreshHotels: jest.fn(),
    });
    (filterAndSortHotels as jest.Mock).mockReturnValue(mockHotels);

    render(<HotelListScreen />);

    expect(screen.getByText('hotelList.hotelsFound')).toBeTruthy();
  });

  it('does not render FilterModal when filterModalVisible is false', () => {
    (useGetHotels as jest.Mock).mockReturnValue({
      hotels: mockHotels,
      isLoading: false,
      error: null,
      isRefreshing: false,
      refreshHotels: jest.fn(),
    });
    (filterAndSortHotels as jest.Mock).mockReturnValue(mockHotels);

    render(<HotelListScreen />);

    expect(screen.queryByText('hotelList.filtersTitle')).not.toBeTruthy();
  });

  it('renders FilterModal when filter button is clicked', () => {
    (useGetHotels as jest.Mock).mockReturnValue({
      hotels: mockHotels,
      isLoading: false,
      error: null,
      isRefreshing: false,
      refreshHotels: jest.fn(),
    });
    (filterAndSortHotels as jest.Mock).mockReturnValue(mockHotels);

    render(<HotelListScreen />);

    const filterButton = screen.getByText('hotelList.filters');
    fireEvent.press(filterButton);

    expect(screen.getByText('hotelList.filtersTitle')).toBeTruthy();
  });
});
