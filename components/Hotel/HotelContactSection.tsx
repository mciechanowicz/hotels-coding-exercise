import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useContact } from '@/hooks/useContact';
import { useTranslation } from '@/hooks/useTranslation';
import { Colors } from '@/design/colors';

type Props = {
  phoneNumber: string;
  email: string;
};

const HotelContactSection = ({ phoneNumber, email }: Props) => {
  const t = useTranslation();
  const { openPhone, openEmail } = useContact();
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}> {t('hotelDetails.contact')}</Text>
      <View style={styles.contactContainer}>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => openPhone(phoneNumber)}>
          <FontAwesome name="phone" size={16} color="white" />
          <Text style={styles.contactButtonText}>
            {t('hotelDetails.phone')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => openEmail(email)}>
          <FontAwesome name="envelope" size={16} color="white" />
          <Text style={styles.contactButtonText}>
            {t('hotelDetails.email')}
          </Text>
        </TouchableOpacity>
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
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: 8,
  },
});

export default HotelContactSection;
