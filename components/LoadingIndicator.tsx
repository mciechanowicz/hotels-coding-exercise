import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/design/colors';

type Props = {
  message?: string;
};

const LoadingIndicator = ({ message }: Props) => {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.blue} />
      {message ? <Text style={styles.loadingText}>{message}</Text> : null}
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
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.grey1,
  },
});

export default LoadingIndicator;
