import { useEffect, useState } from 'react';
import { getHotels } from '@/services/getHotels';
import { Hotels } from '@/types/hotel';
import { useTranslation } from '@/hooks/useTranslation';

export const useGetHotels = () => {
  const t = useTranslation();
  const [hotels, setHotels] = useState<Hotels>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHotels();
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
    }
  };

  return { hotels, isLoading, error };
};
