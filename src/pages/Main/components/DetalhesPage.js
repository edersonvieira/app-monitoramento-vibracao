import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView } from "react-native";
import { LineChart, Grid, PieChart, BarChart, XAxis } from "react-native-svg-charts";

export default function DetalhesPage({ item, onClose, theme }) {
    const dataLine = [item.x, item.y, item.z];
    const dataPie = [{key: "X", value: item.x, svg: {fill: 'red'}}, {key: "Y", value: item.y, svg: {fill: 'green'}}, {key: "Z", value: item.z, svg: {fill: 'blue'}}];
    const dataBar = [item.x, item.y, item.z];


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
                        <Text style={theme.detalhesText}>{item.id}</Text>
                        <Text style={theme.detalhesTitle}>Nome: </Text>
                        <Text style={theme.detalhesText}>{item.equipamento}</Text>
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
                    <View style={theme.detalhesStatusContainer}>
                        <Text style={{ ...theme.detalhesStatus, color: item.status ? 'green' : 'red' }}>
                            {item.status ? 'BOM' : 'RUIM'}
                        </Text>
                    </View>
                    <View style={theme.detalhesButtomExportar}>
                        <TouchableOpacity style={theme.detalhesButtomExportarCSV}>
                            <Text style={theme.detalhesButtomExportarCSVText}>Exportar CSV</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={theme.detalhesButtomExportarPDF}>
                            <Text style={theme.detalhesButtomExportarPDFText}>Exportar PDF</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <LineChart
                            style={{flex:1, height: 200}}
                            data={dataLine}
                            svg={{ stroke: 'rgb(134, 65, 244)' }}
                            contentInset={{ top: 20, bottom: 20 }}
                        >
                            <Grid />
                        </LineChart>
                    </View>
                    <View>
                        <PieChart
                            style={{ height: 200 }}
                            data={dataPie}
                        />
                    </View>
                    <View>
                        <BarChart
                            style={{ height: 200 }}
                            data={dataBar}
                            svg={{ fill: 'rgb(134, 65, 244)' }}
                            contentInset={{ top: 30, bottom: 30 }}
                        >
                            <Grid />
                        </BarChart>
                    </View>
                    <View>
                        <View>
                            <Text style={theme.detalhesTableTitle}>Tabela de Reportes</Text>
                            <View style={theme.detalhesTableHeader}>
                                <Text style={theme.detalhesTableHeaderText}>X</Text>
                                <Text style={theme.detalhesTableHeaderText}>Y</Text>
                                <Text style={theme.detalhesTableHeaderText}>Z</Text>
                                <Text style={theme.detalhesTableHeaderText}>Hora</Text>
                            </View>
                            {item.reportes.map((reporte, index) => (
                                <View key={index} style={theme.detalhesTableRow}>
                                    <Text style={theme.detalhesTableText}>{reporte.x}</Text>
                                    <Text style={theme.detalhesTableText}>{reporte.y}</Text>
                                    <Text style={theme.detalhesTableText}>{reporte.z}</Text>
                                    <Text style={theme.detalhesTableText}>{reporte.hora}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}
