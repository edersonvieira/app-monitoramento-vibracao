import { SwipeListView } from "react-native-swipe-list-view";
import { View, Text, TouchableOpacity} from "react-native";

export default function SwipeList({ theme, data, onOpenDetalhes }) {

  return (
    <>
      <SwipeListView
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[theme.ItemSquareContainer, { flexDirection: 'row' }]}>
            <View style={theme.ItemSquare}>
              <View style={theme.ItemSquareTitleContainer}>
                <Text style={theme.ItemSquareTitle}>ID: </Text>
                <Text style={{maxWidth: 30}}>{item.id}</Text>
                <Text style={theme.ItemSquareTitle}>Nome: </Text>
                <Text style={{flex: 1}}>{item.equipamento}</Text>
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
              <View style={theme.ItemSquareStatusContainer}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', padding: 5, borderRadius: 5, borderWidth: 1, borderColor: '#ccc', color: item.status ? 'green' : 'red' }}>
                  {item.status ? 'BOM' : 'RUIM'}
                </Text>
              </View>
            </View>
          </View>
        )}
        renderHiddenItem={({ item }) => {

          return (
            <View style={theme.itemSquareHiddenContainer}>
              <TouchableOpacity style={theme.itemSquareHiddenDetalhes} onPress={() => onOpenDetalhes(item)}>
                <Text style={theme.itemSquareHiddenDetalhesText}>Detalhes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={theme.itemSquareHiddenEdit} onPress={() => console.log("Editar")}>
                <Text style={theme.itemSquareHiddenEditText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={theme.itemSquareHiddenDelete} onPress={() => console.log("Delete")}>
                <Text style={theme.itemSquareHiddenDeleteText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        disableLeftSwipe={true}
        leftOpenValue={75}
        contentContainerStyle={theme.swipeListContainer}
      />
    </>
  );
}
