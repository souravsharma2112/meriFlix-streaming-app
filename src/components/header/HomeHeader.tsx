import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import SearchBar from '../SearchBar'
import { moderateScale, verticalScale } from '../../theme/metrics'
import { useNavigation } from '@react-navigation/native'

const HomeHeader = () => {
    const navigation = useNavigation<any>()
    return (
        <ImageBackground
            source={require("../../../assets/images/homebg.png")}
            style={styles.topSection}
            resizeMode="stretch"
        >
            <LinearGradient
                colors={["#232aff1e", "#03001416"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
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
                    value=""
                    onChangeText={() => {}}
                    placeholder="Search through 300+ movies online"
                    onPressBar={() => navigation.navigate('searchScreen')}
                />
            </LinearGradient>
        </ImageBackground>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    topSection: {
        width: '100%',
     
    },
    overlay: {
        justifyContent: "center",
        alignItems: "center",
    },
    logoRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop : moderateScale(88),
        paddingBottom : verticalScale(24)
    },
    logo: {
        width: verticalScale(40),
        height: verticalScale(40),
        marginRight: moderateScale(8),
    },
    logoText: {
        fontSize: moderateScale(32),
        fontWeight: "bold",
        color: "#E50914",
        letterSpacing: 1,
    },
})
