import { View, Text, Image, TouchableOpacity } from "react-native";
import React from 'react';

export default function HeadBar({theme, toggleConfigBar, toggleAddBar }) {
    return (
        <View style={theme.headBar}>
            <Text style={theme.headBarText}>Monitoramento de Vibração</Text>
            <View style={theme.headBarImageContainer}>
                <TouchableOpacity onPress={toggleAddBar}>
                    <Image
                        style={theme.headBarImage}
                        source={require('../assets/plus.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleConfigBar }>
                    <Image 
                        style={theme.headBarImage}
                        source={require('../assets/config.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}
