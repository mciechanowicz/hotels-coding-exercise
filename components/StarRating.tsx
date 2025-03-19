import { View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/design/colors';

type Props = {
  rating: number;
  maxStars?: number;
  size?: number;
  color?: string;
};

const StarRating = ({
  rating,
  maxStars = 5,
  size = 16,
  color = Colors.yellow,
}: Props) => {
  return (
    <View style={styles.container}>
      {[...Array(maxStars)].map((_, index) => (
        <FontAwesome
          key={index}
          name={index < rating ? 'star' : 'star-o'}
          size={size}
          color={color}
          style={styles.star}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 2,
  },
});

export default StarRating;
