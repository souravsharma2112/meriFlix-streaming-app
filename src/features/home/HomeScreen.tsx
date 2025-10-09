/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { COLORS } from "../../constants/colors";
import HomeHeader from "../../components/header/HomeHeader";
import MovieCard from "../../components/common/movieCard/MovieCard";
import { moderateScale } from "../../theme/metrics";

const movies = Array.from({ length: 20 }, (_, i) => ({
    id: i.toString(),
    title: `Movie ${i + 1}`,
}));

const homeSectionData = [
    { id: '1', title: "Popular Shows" }
]

const HomeScreen = () => {
    const PopularShows = () => {
        return (
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id}
                renderItem={MovieCard}
                numColumns={3}
                ListHeaderComponent={<View><Text style={{ color: '#ffffff' }}>Popular Shows</Text></View>}
                columnWrapperStyle={styles.row}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            />
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={homeSectionData}
                keyExtractor={(item) => item.id}
                renderItem={PopularShows}
                numColumns={1}
                ListHeaderComponent={HomeHeader}
                contentContainerStyle={styles.moviesWrapper}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.primary,
    },
    row: {
        width: '100%',
        gap: moderateScale(21.5),
        paddingLeft: moderateScale(16),
        paddingRight: moderateScale(16),
    },
    moviesWrapper: {
        backgroundColor: '#030014',
    },

});

export default HomeScreen;
