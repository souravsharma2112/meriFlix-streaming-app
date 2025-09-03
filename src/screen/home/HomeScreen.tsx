import React, { useState } from "react";
import { StyleSheet, View, Text, ImageBackground, Image, Dimensions } from "react-native";
import { COLORS } from "../../constants/colors";
import LinearGradient from "react-native-linear-gradient";
import SearchBar from "../../components/SearchBar";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
     const [searchQuery, setSearchQuery] = useState("");
    return (
        <View style={styles.container}>
            {/* First View with ImageBackground (30%) */}
            <ImageBackground
                source={require("../../../assets/images/homebg.png")}
                style={styles.topSection}
                resizeMode="stretch"
            >
                <LinearGradient
                    colors={[
                        "rgba(95, 23, 171, 0.47)",
                        "rgba(30, 0, 61, 0.56)"
                    ]}
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
                    <Text style={styles.text}>Top Section (30%)</Text>
                </LinearGradient>
            </ImageBackground>

            {/* Second View (70%) */}
            <View style={styles.bottomSection}>
                <Text style={styles.bottomText}>Bottom Section (70%)</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    topSection: {
        flex: 4, // 30% height
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
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
    bottomSection: {
        flex: 6, // 70% height
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
    },
    text: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    bottomText: {
        fontSize: 18,
        color: "#333",
    },
});

export default HomeScreen;
