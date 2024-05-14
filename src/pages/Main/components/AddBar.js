import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddBar ({ theme, toggleAddBar }) {
    const [idDispositivo, setIdDispositivo] = useState('')
    const [receber, setReceber] = useState('')
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')

    const handleAddData = async () => {
        try {
            await AsyncStorage.setItem('idDispositivo', idDispositivo)
            await AsyncStorage.setItem('receber', receber)
            await AsyncStorage.setItem('usuario', usuario)
            await AsyncStorage.setItem('senha', senha)
            console.log('Data added successfully!')
        } catch (error) {
            console.log('Error adding data:', error)
        }
    }

    return (
        <View style={theme.containerAddBar}>
            <Text style={theme.addBarTitle}>Adicionar Equipamento</Text>
            <Text>ID Dispositivo</Text>
            <TextInput 
                style={theme.addBarInput}
                placeholder="Digite aqui..."
                value={idDispositivo}
                onChangeText={(text) => setIdDispositivo(text)}
            />
            <Text>Receber</Text>
            <TextInput
                style={theme.addBarInput}
                placeholder="Digite aqui..."
                value={receber}
                onChangeText={(text) => setReceber(text)}
            />
            <Text>Usuario</Text>
            <TextInput
                style={theme.addBarInput}
                placeholder="Digite aqui..."
                value={usuario}
                onChangeText={(text) => setUsuario(text)}
            />
            <Text>Senha</Text>
            <TextInput
                style={theme.addBarInput}
                placeholder="Digite aqui..."
                value={senha}
                onChangeText={(text) => setSenha(text)}
            />
            <TouchableOpacity style={theme.addBarButton} onPress={handleAddData}>
                <Text style={theme.addBarButtonText}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={theme.addBarButtonCancelar} onPress={toggleAddBar}>
                <Text style={theme.addBarButtonTextCancelar}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    )
}
