import { SwipeListView } from "react-native-swipe-list-view";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import AWS from "../../../utils/aws";

const docClient = new AWS.DynamoDB.DocumentClient();

async function deleteItemsById(id_dispositivo) {
  const scanParams = {
    TableName: 'reporte',
    FilterExpression: 'id_dispositivo = :id',
    ExpressionAttributeValues: {
      ':id': id_dispositivo
    }
  };

  try {
    const scanResult = await docClient.scan(scanParams).promise();
    const deletePromises = scanResult.Items.map((item) => {
      return docClient.delete({
        TableName: 'reporte',
        Key: {
          'timestamp': item.timestamp, // Usando timestamp como chave de partição
          'id_dispositivo': item.id_dispositivo // Supondo que id_dispositivo seja a chave de ordenação
        }
      }).promise();
    });

    await Promise.all(deletePromises);
    Alert.alert("Sucesso", "Itens deletados com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar itens:", error);
    Alert.alert("Erro", "Falha ao deletar itens.");
  }
}

export default function SwipeList({ theme, data, onOpenDetalhes }) {
  return (
    <>
      <SwipeListView
        data={data}
        keyExtractor={(item) => `${item.timestamp}-${item.id_dispositivo}`} // Chave única combinando timestamp e id_dispositivo
        renderItem={({ item }) => (
          <View style={[theme.ItemSquareContainer, { flexDirection: 'row' }]}>
            <View style={theme.ItemSquare}>
              <View style={theme.ItemSquareTitleContainer}>
                <Text style={theme.ItemSquareTitle}>ID: </Text>
                <Text>{item.id_dispositivo}</Text>
              </View>
              <View style={theme.ItemSquareDataContainer}>
                <View style={theme.ItemSquareData}>
                  <Text style={theme.ItemSquareDataTitle}>X</Text>
                  <Text style={theme.ItemSquareDataText}>{item.x}</Text>
                </View>
                <View style={theme.ItemSquareData}>
                  <Text style={theme.ItemSquareDataTitle}>Y</Text>
                  <Text style={theme.ItemSquareDataText}>{item.y}</Text>
                </View>
                <View style={theme.ItemSquareData}>
                  <Text style={theme.ItemSquareDataTitle}>Z</Text>
                  <Text style={theme.ItemSquareDataText}>{item.z}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        renderHiddenItem={({ item }) => (
          <View style={theme.itemSquareHiddenContainer}>
            <TouchableOpacity style={theme.itemSquareHiddenDetalhes} onPress={() => onOpenDetalhes(item)}>
              <Text style={theme.itemSquareHiddenDetalhesText}>Detalhes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={theme.itemSquareHiddenDelete} onPress={() => deleteItemsById(item.id_dispositivo)}>
              <Text style={theme.itemSquareHiddenDeleteText}>Deletar</Text>
            </TouchableOpacity>
          </View>
        )}
        disableLeftSwipe={true}
        leftOpenValue={75}
        contentContainerStyle={theme.swipeListContainer}
      />
    </>
  );
}