import { Hotels } from '@/types/hotel';

export const mockHotels: Hotels = [
  {
    id: 1,
    name: 'Test Hotel',
    location: {
      address: 'Test address',
      city: 'Wroclaw',
      latitude: 51.1079,
      longitude: 17.0385,
    },
    stars: 5,
    checkIn: {
      from: '14:00',
      to: '22:00',
    },
    checkOut: {
      from: '06:00',
      to: '12:00',
    },
    contact: {
      phoneNumber: '+48 123 456 789',
      email: 'contact@test.com',
    },
    gallery: ['', ''],
    userRating: 8.5,
    price: 500,
    currency: 'PLN',
  },
  {
    id: 2,
    name: 'Test Hotel 2',
    location: {
      address: 'Test address 2',
      city: 'Wroclaw',
      latitude: 51.1079,
      longitude: 17.0385,
    },
    stars: 2,
    checkIn: {
      from: '14:00',
      to: '22:00',
    },
    checkOut: {
      from: '06:00',
      to: '12:00',
    },
    contact: {
      phoneNumber: '+48 123 456 789',
      email: 'contact@test.com',
    },
    gallery: ['', ''],
    userRating: 5,
    price: 100,
    currency: 'PLN',
  },
];
