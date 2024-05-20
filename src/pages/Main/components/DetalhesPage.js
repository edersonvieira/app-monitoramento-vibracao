import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import AWS from '../../../utils/aws';

const docClient = new AWS.DynamoDB.DocumentClient();

export default function DetalhesPage({ item, onClose, theme }) {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (!item || !item.id_dispositivo) {
            console.log("Item ou ID do dispositivo não definido.");
            return;
        }

        const fetchData = async () => {
            const params = {
                TableName: 'reporte'
            };

            docClient.scan(params, function(err, data) {
                if (err) {
                    console.log("Erro", err);
                } else {
                    console.log("Dados recebidos:", data);
                    const filteredData = data.Items.filter(d => d.id_dispositivo === item.id_dispositivo);
                    setTableData(filteredData.map(d => [d.x, d.y, d.z, formatTimestamp(d.timestamp)]));
                }
            });
        };

        fetchData();
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, [item]);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString('pt-BR')} ${date.toLocaleTimeString('pt-BR')}`;
    };

    const tableHead = ['X', 'Y', 'Z', 'Data/Hora'];

    return (
        <ScrollView style={theme.scrollView}>
            <TouchableOpacity onPress={onClose} style={theme.detalhesVoltarCotainer}>
                <Image
                    style={theme.detalhesVoltar}
                    source={require('../assets/goBack.png')}
                />
            </TouchableOpacity>
            <SafeAreaView style={theme.detalhesContainer}>
                <View style={theme.detalhesContent}>
                    <View style={theme.detalhesTitleContainer}>
                        <Text style={theme.detalhesTitle}>ID: </Text>
                        <Text style={theme.detalhesText}>{item.id_dispositivo}</Text>
                    </View>
                    <View style={theme.detalhesDataContainer}>
                        <View style={theme.detalhesData}>
                            <Text style={theme.detalhesDataTitle}>X</Text>
                            <Text style={theme.detalhesDataText}>{item.x}</Text>
                        </View>
                        <View style={theme.detalhesData}>
                            <Text style={theme.detalhesDataTitle}>Y</Text>
                            <Text style={theme.detalhesDataText}>{item.y}</Text>
                        </View>
                        <View style={theme.detalhesData}>
                            <Text style={theme.detalhesDataTitle}>Z</Text>
                            <Text style={theme.detalhesDataText}>{item.z}</Text>
                        </View>
                    </View>
                    <View style={{margin: 5}}>
                        <Table borderStyle={{borderWidth: 1, borderColor: '#ccc'}}>
                            <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                            <Rows data={tableData} textStyle={styles.text}/>
                        </Table>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#f1f1f1', alignSelf: "center" },
    text: { margin: 2,  alignSelf: "center" }
});