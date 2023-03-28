
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Button, Text } from 'react-native';

export default function Home({ navigation }) {

    return (
        <View style={styles.container}>
            <Text>
                Home page
            </Text>

        </View>
    );
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        }
    })