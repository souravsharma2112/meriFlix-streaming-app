import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import SearchBar from '../SearchBar'
const { width, height } = Dimensions.get("window");

const HomeHeader = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <ImageBackground
            source={require("../../../assets/images/homebg.png")}
            style={styles.topSection}
            resizeMode="stretch"
        >
            <LinearGradient
                colors={["rgba(35, 42, 255, 0.6)", "#0b0e142c"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.overlay}
            >
                {/* Logo + Text Row */}
                <View style={styles.logoRow}>
                    <Image
                        source={require("../../../assets/images/meriFlix.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.logoText}>meriFlix</Text>
                </View>

                <SearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search movies..."
                />

                <Text style={styles.text}>Top Section (Scrolls with list)</Text>
            </LinearGradient>
        </ImageBackground>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    topSection: {
        height: height * 0.4, // now scrolls with list
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
        width: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        // paddingHorizontal: 16,
    },
    logoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    logo: {
        width: width * 0.09,
        height: width * 0.09,
        marginRight: 8,
    },
    logoText: {
        fontSize: width * 0.07,
        fontWeight: "bold",
        color: "#E50914",
        letterSpacing: 1,
    },
    text: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
})