import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from '@/hooks/useTranslation';
import { useOpenMap } from '@/hooks/useOpenMap';
import { Colors } from '@/design/colors';

type Props = {
  latitude: number;
  longitude: number;
  label?: string;
};

const HotelMap = ({ latitude, longitude, label }: Props) => {
  const t = useTranslation();
  const openMap = useOpenMap({
    latitude,
    longitude,
    label,
  });

  return latitude && longitude ? (
    <TouchableOpacity style={styles.mapContainer} onPress={openMap}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}>
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
        />
      </MapView>
      <View style={styles.mapOverlay}>
        <Text style={styles.mapText}>{t('hotelDetails.openMap')}</Text>
      </View>
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: Colors.transparentBlack,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default HotelMap;
