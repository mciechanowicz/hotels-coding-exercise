import { render, screen } from '@testing-library/react-native';
import { mockHotels } from '@/mocks/hotelMocks';
import { HotelListHeader } from '@/components/Hotel';

describe('HotelListHeader ', () => {
  test('Component renders and displays the text', () => {
    render(<HotelListHeader hotels={mockHotels} onOpen={jest.fn()} />);

    expect(screen.getByText('hotelList.hotelsFound')).toBeTruthy();
    expect(screen.getByText('hotelList.filters')).toBeTruthy();
  });
});
