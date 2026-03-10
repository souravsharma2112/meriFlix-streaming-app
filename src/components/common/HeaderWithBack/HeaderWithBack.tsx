import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { Ionicons } from '../../../utils/Icons'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

const HeaderWithBack = ({ headerTitle, children }: { headerTitle: string; children: ReactNode }) => {
    const navigation = useNavigation<any>()
    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar barStyle="light-content" backgroundColor="#030014" />
                  <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={({ pressed }) => [
                        styles.backButton,
                        pressed && styles.backButtonPressed,
                    ]}
                    hitSlop={10}
                >
                    <Ionicons name="chevron-back" size={22} color="#fff" />
                </Pressable>

                <View style={styles.headerTextWrap}>
                    <Text style={styles.header}>{headerTitle}</Text>
                </View>
            </View>
            {children}
            </View>
        </SafeAreaView>
    )
}

export default HeaderWithBack

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#030014',
    },
      container: {
    flex: 1,
    backgroundColor: '#030014',
    paddingHorizontal: 16,
  },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 6,
        marginBottom: 12,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#171329',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#27213d',
    },
    backButtonPressed: {
        opacity: 0.75,
    },
    headerTextWrap: {
        flex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
    },
})