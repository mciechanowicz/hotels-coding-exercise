import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslation } from '@/hooks/useTranslation';
import { Colors } from '@/design/colors';

type Props = {
  error: string | Error;
  onRetry?: () => void;
};

const ErrorView = ({ error, onRetry }: Props) => {
  const t = useTranslation();
  const errorMessage = typeof error === 'string' ? error : error.message;

  return (
    <View style={styles.centered}>
      <FontAwesome name="exclamation-circle" size={50} color={Colors.error} />
      <Text style={styles.errorText}>{errorMessage}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryButtonText}>
          {t('common.retryButtonText')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.grey1,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.blue,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ErrorView;
