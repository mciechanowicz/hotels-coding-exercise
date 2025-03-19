import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '@/design/colors';

const { width } = Dimensions.get('window');

type Props = {
  images: string[];
  enablePagination?: boolean;
};

const HorizontalGallery = ({ images = [], enablePagination = true }: Props) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setActiveImageIndex(newIndex);
        }}>
        {images.map((image, index) => (
          <Image
            key={image + index}
            source={{ uri: image }}
            style={styles.image}
            contentFit="cover"
            placeholderContentFit="contain"
            placeholder={require('../assets/images/hotel-placeholder.png')}
          />
        ))}
      </ScrollView>
      {enablePagination && (
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={`pagination-dot-${index}`}
              style={[
                styles.paginationDot,
                activeImageIndex === index && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: width,
  },
  image: {
    width: width,
    height: 250,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 24,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.transparentGrey,
    margin: 3,
  },
  paginationDotActive: {
    backgroundColor: Colors.white,
  },
});

export default HorizontalGallery;
