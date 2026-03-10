import React from 'react';
import { View, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../theme/metrics';

const MovieCardSkeleton = ({ isCarousel = false }) => {
  return (
    <View style={!isCarousel ? styles.card : styles.cardWidth}>

      {/* Image Skeleton */}
      <View style={styles.imageSkeleton} />

      {/* Title Skeleton */}
      <View style={styles.titleSkeleton} />

      {/* Genre Skeleton */}
      <View style={styles.genreSkeleton} />

    </View>
  );
};

export default MovieCardSkeleton;

const styles = StyleSheet.create({
  cardWidth: {
    width: scale(116),
  },
  card: {
    flex: 1,
    maxWidth: scale(108),
    borderRadius: 4,
  },

  imageSkeleton: {
    width: '100%',
    height: verticalScale(167),
    backgroundColor: '#525252ff',
    borderRadius: 6,
    marginBottom: moderateScale(10),
    opacity: 0.6,
  },

  titleSkeleton: {
    width: '80%',
    height: moderateScale(14),
    backgroundColor: '#525252ff',
    borderRadius: 4,
    marginBottom: moderateScale(6),
    opacity: 0.6,
  },

  genreSkeleton: {
    width: '50%',
    height: moderateScale(12),
    backgroundColor: '#525252ff',
    borderRadius: 4,
    opacity: 0.6,
  },
});
