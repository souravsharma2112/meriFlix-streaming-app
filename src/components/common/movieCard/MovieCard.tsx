import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
// import { useNavigation } from '@react-navigation/native';
import { moderateScale, scale, verticalScale } from '../../../theme/metrics';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/NavigationTypes';
import type { StackNavigationProp } from '@react-navigation/stack';
type MovieCardNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const MovieCard = ({ isCarousel = false }: { isCarousel?: boolean }) => {
    const navigation = useNavigation<MovieCardNavigationProp>();

    const handlePress = () => {
        navigation.navigate('MovieDetail');
    }

    return (
        <TouchableOpacity style={!isCarousel ? styles.card : styles.cardWidth} onPress={handlePress}>
            <View>
                <Image
                    source={require("../../../../assets/images/m1.png")}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={styles.title}>Gladiator II</Text>
                <Text style={styles.genre}>Action • Movie</Text>
            </View>
        </TouchableOpacity>
    );
}

export default MovieCard;

const styles = StyleSheet.create({
    // width: scale(104),
    cardWidth: {
        width: scale(116)
    },
    card: {
        flex: 1,
        maxWidth: scale(108),
        borderRadius: 4,
    },
    image: {
        width: '100%',
        height: verticalScale(167),
    },
    title: {
        fontSize: moderateScale(12),
        fontWeight: 700,
        lineHeight: moderateScale(16),
        color: "#FFFFFF",
        marginTop: moderateScale(9),
        marginBottom: moderateScale(8),
    },
    genre: {
        fontSize: moderateScale(10),
        lineHeight: moderateScale(14),
        color: '#9CA4AB',
        fontWeight: 500,
    },
});
