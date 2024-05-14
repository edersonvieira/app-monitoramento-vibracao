import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Modal, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Paho from 'paho-mqtt';

export default function ConfigBar({ theme }) {
    const [modalVisibleLimpar, setModalVisibleLimpar] = useState(false);
    const [modalVisibleAddMqtt, setModalVisibleAddMqtt] = useState(false);
    const [modalVisibleComunicacao, setModalVisibleComunicacao] = useState(false);
    const [mqttServer, setMqttServer] = useState('');
    const [mqttPort, setMqttPort] = useState('');
    const [mqttUsername, setMqttUsername] = useState('');
    const [mqttPassword, setMqttPassword] = useState('');
    const [temComunicacao, setTemComunicacao] = useState(false);
    const [client, setClient] = useState(null);

    const connectToMQTT = () => {
        getMqttSettings();
        if (!mqttServer || !mqttPort) {
            console.log("Invalid MQTT server or port.");
            return;
        }

        const client = new Paho.Client(mqttServer, Number(mqttPort), 'clientId');

        client.connect({
            userName: mqttUsername,
            password: mqttPassword,
            onSuccess: () => {
                cosnole.log("conectado")
                const message = new Paho.Message('Teste');
                client.send(message);
            },
            onFailure: (error) => {
                console.error(error);
            },
        });

        client.onConnectionLost = (responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.error('onConnectionLost:' + responseObject.errorMessage);
            }
        };

        client.onMessageArrived = (message) => {
            console.log('onMessageArrived:' + message.payloadString);
        };

        setClient(client);
    };

    const disconnectFromMQTT = () => {
        if (client) {
            client.disconnect();
            setClient(null);
        }
    };

    const testarComunicacao = () => {
        connectToMQTT();
        console.log("Testing MQTT Connection with", mqttServer, "on port", mqttPort);
    };

    const getMqttSettings = async () => {
        try {
            const server = await AsyncStorage.getItem('mqttServer');
            const port = await AsyncStorage.getItem('mqttPort');
            const username = await AsyncStorage.getItem('mqttUsername');
            const password = await AsyncStorage.getItem('mqttPassword');
            if (server !== null && port !== null && username !== null && password !== null) {
                setMqttServer(server);
                setMqttPort(port);
                setMqttUsername(username);
                setMqttPassword(password);
                setTemComunicacao(true);
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Erro ao carregar configurações MQTT.");
        }
    }

    const saveMqttSettings = async () => {
        if (!mqttServer || !mqttPort || isNaN(mqttPort)) {
            Alert.alert("Erro", "Insira um servidor e porta válidos.");
            return;
        }
        try {
            await AsyncStorage.setItem('mqttServer', mqttServer);
            await AsyncStorage.setItem('mqttPort', mqttPort);
            await AsyncStorage.setItem('mqttUsername', mqttUsername);
            await AsyncStorage.setItem('mqttPassword', mqttPassword);
            setTemComunicacao(true);
            setModalVisibleAddMqtt(false);
        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Erro ao salvar configurações MQTT.");
        }
    }
    
    const handleLimpar = async () => {
        try {
            await AsyncStorage.removeItem('mqttServer');
            await AsyncStorage.removeItem('mqttPort');
            await AsyncStorage.removeItem('mqttUsername');
            await AsyncStorage.removeItem('mqttPassword');
            setTemComunicacao(false);
            setModalVisibleLimpar(false);
            Alert.alert("Sucesso", "Armazenamento limpo com sucesso!");
        } catch (error) {
            Alert.alert("Erro", "Falha ao limpar o armazenamento: " + error.message);
        }
    };

    const toggleModalComunicacao = () => {
        setModalVisibleComunicacao(!modalVisibleComunicacao);
    };

    return (
        <>
            <View style={theme.containerConfigBar}>
                <Text style={theme.configBarTitle}>Configurações</Text>
                <TouchableOpacity style={theme.configBarButton}>
                    <Text style={theme.configBarButtonText}>Documentação</Text>
                    <Image
                        style={theme.configBarImage}
                        source={require('../assets/doc.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={theme.configBarButton} onPress={() => setModalVisibleLimpar(true)}>
                    <Text style={theme.configBarButtonText}>Limpar Armazenamento</Text>
                    <Image
                        style={theme.configBarImage}
                        source={require('../assets/clean.png')}
                    />
                </TouchableOpacity>
                <Text style={theme.configBarTitle}>MQTT</Text>
                <TouchableOpacity style={theme.configBarButton} onPress={() => setModalVisibleAddMqtt(true)} >
                    <Text style={theme.configBarButtonText}>Adicionar Comunicação MQTT</Text>
                    <Image
                        style={theme.configBarImage}
                        source={require('../assets/plus.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={theme.configBarButton} onPress={toggleModalComunicacao}>
                    <Text style={theme.configBarButtonText}>Informações de Comunicação</Text>
                    <Image
                        style={theme.configBarImage}
                        source={require('../assets/info.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={theme.configBarButton} onPress={testarComunicacao}>
                    <Text style={theme.configBarButtonText}>Testar Comunicação MQTT</Text>
                    <Image
                        style={theme.configBarImage}
                        source={require('../assets/test.png')}
                    />
                </TouchableOpacity>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleComunicacao}
                onRequestClose={toggleModalComunicacao}
            >
                <View style={theme.modalContainer}>
                    <View style={theme.modalContent}>
                        <Text style={theme.modalTitle}>Informações de Comunicação</Text>
                        {temComunicacao ? (
                            <View style={theme.comunicacaoContainer}>
                                <View style={theme.comunicacaoContent}>
                                    <Text style={theme.comunicacaoText1}>Servidor</Text><Text style={theme.comunicacaoText2}>{mqttServer}</Text> 
                                    <Text style={theme.comunicacaoText1}>Porta</Text><Text style={theme.comunicacaoText2}> {mqttPort}</Text>
                                    <Text style={theme.comunicacaoText1}>Usuário</Text><Text style={theme.comunicacaoText2}> {mqttUsername}</Text>
                                    <Text style={theme.comunicacaoText1}>Senha</Text><Text style={theme.comunicacaoText2}>{mqttPassword}</Text>
                                </View>
                            </View>
                        ) : (
                            <Text style={{ textAlign: "center", margin: 20, fontWeight: "bold" }}>Nenhuma comunicação MQTT salva.</Text>
                        )}
                        <TouchableOpacity style={theme.modalButton} onPress={toggleModalComunicacao}>
                            <Text style={theme.modalButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleLimpar}
                onRequestClose={() => setModalVisibleLimpar(false)}
            >
                <View style={theme.modalContainer}>
                    <View style={theme.modalContent}>
                        <Text style={theme.modalAviso}>
                            ⚠ ALERTA ⚠
                        </Text>
                        <Text style={theme.modalText}>
                            Isso limpa sua comunicação MQTT e seus tópicos salvos. Deseja continuar?
                        </Text>
                        <TouchableOpacity style={theme.modalButton} onPress={handleLimpar}>
                            <Text style={theme.modalButtonText}>Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={theme.modalButtonCancelar} onPress={() => setModalVisibleLimpar(false)}>
                            <Text style={theme.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleAddMqtt}
                onRequestClose={() => setModalVisibleAddMqtt(false)}
            >
                <View style={theme.modalContainer}>
                    <View style={theme.modalContent}>
                        <Text style={theme.modalTitle}>
                            Adicionar Comunicação MQTT
                        </Text>
                        <Text style={theme.modalLabel}>Servidor</Text>
                        <TextInput
                            style={theme.modalInput}
                            placeholder="Digite aqui..."
                            value={mqttServer}
                            onChangeText={setMqttServer}
                        />
                        <Text style={theme.modalLabel}>Porta</Text>
                        <TextInput
                            style={theme.modalInput}
                            placeholder="Digite aqui..."
                            value={mqttPort}
                            onChangeText={setMqttPort}
                        />
                        <Text style={theme.modalLabel}>Usuário</Text>
                        <TextInput
                            style={theme.modalInput}
                            placeholder="Digite aqui..."
                            value={mqttUsername}
                            onChangeText={setMqttUsername}
                        />
                        <Text style={theme.modalLabel}>Senha</Text>
                        <TextInput
                            style={theme.modalInput}
                            placeholder="Digite aqui..."
                            value={mqttPassword}
                            onChangeText={setMqttPassword}
                        />
                        <TouchableOpacity style={theme.modalButton} onPress={saveMqttSettings}>
                            <Text style={theme.modalButtonText}>Adicionar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={theme.modalButtonCancelar} onPress={() => setModalVisibleAddMqtt(false)}>
                            <Text style={theme.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}
