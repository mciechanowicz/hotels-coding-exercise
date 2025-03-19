import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/design/colors';
import { useTranslation } from '@/hooks/useTranslation';

type Props = {
  checkIn: {
    from: string;
    to: string;
  };
  checkOut: {
    from: string;
    to: string;
  };
};

const HotelCheckInOutSection = ({ checkIn, checkOut }: Props) => {
  const t = useTranslation();
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('hotelDetails.hours')}</Text>
      <View style={styles.timeContainer}>
        <View style={styles.timeItem}>
          <FontAwesome
            name="sign-in"
            size={16}
            color={Colors.blue}
            style={styles.icon}
          />
          <View>
            <Text style={styles.timeLabel}>{t('hotelDetails.checkIn')}</Text>
            <Text style={styles.timeValue}>
              {checkIn.from} - {checkIn.to}
            </Text>
          </View>
        </View>
        <View style={styles.timeItem}>
          <FontAwesome
            name="sign-out"
            size={16}
            color={Colors.blue}
            style={styles.icon}
          />
          <View>
            <Text style={styles.timeLabel}>{t('hotelDetails.checkOut')}</Text>
            <Text style={styles.timeValue}>
              {checkOut.from} - {checkOut.to}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.grey4,
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
  },
  timeLabel: {
    fontSize: 12,
    color: Colors.grey1,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.grey4,
  },
  icon: {
    marginRight: 8,
  },
});

export default HotelCheckInOutSection;
