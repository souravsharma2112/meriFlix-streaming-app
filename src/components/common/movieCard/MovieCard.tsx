import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
// import { useNavigation } from '@react-navigation/native';
import { moderateScale, verticalScale } from '../../../theme/metrics';

const MovieCard = () => {
    //   const navigation = useNavigation();

    const handlePress = () => {
        // Navigate to MovieDetail screen (replace 'MovieDetail' with your screen name)
        // navigation.navigate('MovieDetail', { movieId: 1 });
    }

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress}>
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
    card: {
        flex:1,
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
        color :"#FFFFFF",
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
