import {View, TextInput, TouchableOpacity} from 'react-native'

export default function EditarPage({item, onClose, onSave, theme}) {
    return (
        <View style={theme.containerAddBar}>
            <Text style={theme.addBarTitle}>Atualizar Comunicação com MQTT</Text>
            <Text>Publicar</Text>
            <TextInput
                style={theme.addBarInput}
                placeholder="Digite aqui..."
                value={formData.publicar}
                onChangeText={(text) => handleInputChange("publicar", text)}
            />
            <Text>Receber</Text>
            <TextInput
                style={theme.addBarInput}
                placeholder="Digite aqui..."
                value={formData.receber}
                onChangeText={(text) => handleInputChange("receber", text)}
            />
            <Text>Usuario</Text>
            <TextInput
                style={theme.addBarInput}
                placeholder="Digite aqui..."
                value={formData.usuario}
                onChangeText={(text) => handleInputChange("usuario", text)}
            />
            <Text>Senha</Text>
            <TextInput
                style={theme.addBarInput}
                placeholder="Digite aqui..."
                value={formData.senha}
                onChangeText={(text) => handleInputChange("senha", text)}
            />
            <TouchableOpacity style={theme.addBarButton} onPress={handleAddData}>
                <Text style={theme.addBarButtonText}>Atualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={theme.addBarButtonCancelar} onPress={toggleAddBar}>
                <Text style={theme.addBarButtonTextCancelar}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    )
}