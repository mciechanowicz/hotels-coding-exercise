import { api } from '@/lib/api';
import { Hotels } from '../types/hotel';
import { API_ENDPOINTS } from '@/constants';

export const getHotels = async (): Promise<Hotels> => {
  try {
    const response = await api.get<Hotels>(API_ENDPOINTS.HOTELS);
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};
