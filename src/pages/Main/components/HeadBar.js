import { View, Text, Image, TouchableOpacity } from "react-native";
import React from 'react';

export default function HeadBar({theme, toggleConfigBar, toggleAddBar }) {
    return (
        <View style={theme.headBar}>
            <Text style={theme.headBarText}>Monitoramento de Vibração</Text>
        </View>
    )
}
