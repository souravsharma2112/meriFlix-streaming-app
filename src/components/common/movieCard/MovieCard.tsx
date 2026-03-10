import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
import { moderateScale, scale, verticalScale } from '../../../theme/metrics';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/NavigationTypes';
import type { StackNavigationProp } from '@react-navigation/stack';
import { BASE_IMAGE_URL } from '@env'
import { useGenreMovieList } from '../../../hooks/queries/useConfiguration';
type MovieCardNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
interface MovieCardProps {
    isCarousel?: boolean;
    data?: { item: {id: number, genre_ids: number[]; backdrop_path?: string; title?: string ; name: string; } };
}
const MovieCard = ({ isCarousel = false, data }: MovieCardProps) => {
    const { isLoading, data: genreData } = useGenreMovieList();
    const cardData = data?.item
    const genreIDS = data?.item?.genre_ids;
    const title = data?.item?.title ? data?.item?.title : data?.item?.name;
    const navigation = useNavigation<MovieCardNavigationProp>();
    const [genresNames, setGenreNames] = useState<string>("");
    const handlePress = (id: number) => { navigation.navigate('MovieDetail' , {id : id}) }

    useEffect(() => {
        if (data) {
            if (genreIDS && genreData) {
                genreIDS.forEach((id: number) => {
                    const genre = genreData?.genres?.find((g: { id: number; name: string }) => +g.id === +id);
                    setGenreNames(genre?.name);
                })
            }
        }
    }, [data, genreData, genreIDS]);


    if (isLoading) {
        return <Text>Loading...</Text>
    }

    return (
        <TouchableOpacity style={!isCarousel ? styles.card : styles.cardWidth} onPress={() => handlePress(cardData?.id!)}>
            <View>
                <Image
                    source={
                        cardData?.backdrop_path
                            ? { uri: `${BASE_IMAGE_URL}${cardData.backdrop_path}` }
                            : require("../../../../assets/images/m1.png")
                    }
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={styles.title}>{title ?? "Title"}</Text>
                <Text style={styles.genre}>{genresNames} • Movie</Text>
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
