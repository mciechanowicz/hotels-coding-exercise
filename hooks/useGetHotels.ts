import { useEffect, useState } from 'react';
import { getHotels } from '@/services/getHotels';
import { Hotels } from '@/types/hotel';
import { useTranslation } from '@/hooks/useTranslation';

export const useGetHotels = () => {
  const t = useTranslation();
  const [hotels, setHotels] = useState<Hotels>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchHotels = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getHotels();
      setHotels(data);
    } catch (err) {
      setError(t('hotelList.errorFetchingHotels'));
      console.error('Error while fetching hotels:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const refreshHotels = () => {
    setIsRefreshing(true);
    fetchHotels();
  };

  return { hotels, isLoading, error, isRefreshing, refreshHotels };
};
