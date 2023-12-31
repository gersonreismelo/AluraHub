import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import { alterarRepositorio, deletarRepositorio } from '../../services/requisicoes/repositorio';

export default function InfoRepositorio({ route, navigation }) {
    const [nome, setNome] = useState(route.params.item.name);
    const [data, setData] = useState(route.params.item.data);

    async function alterar() {
        const resultado = await alterarRepositorio(
            route.params.item.postId,
            nome,
            data,
            route.params.item.id,
        )

        if (resultado === 'sucesso') {
            Alert.alert('Respositório atualizado!')
            navigation.goBack()
        } else {
            Alert.alert('Erro ao atualizar o repositório!')
        }
    }

    async function deletar() {
        const resultado = await deletarRepositorio(route.params.item.id)

        if (resultado === 'sucesso') {
            Alert.alert('Respositório deletado!')
            navigation.goBack()
        } else {
            Alert.alert('Erro ao deletar o repositório!')
        }
    }

    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Nome do repositório"
                autoCapitalize="none"
                style={estilos.entrada}
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                placeholder="Data de criação"
                autoCapitalize="none"
                style={estilos.entrada}
                value={data}
                onChangeText={setData}
            />
            <TouchableOpacity 
                style={estilos.botao} 
                onPress={alterar}
            >
                <Text style={estilos.textoBotao}>
                    Salvar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[estilos.botao, {backgroundColor: '#DD2B2B', marginTop: 10}]} 
                onPress={deletar}
            >
                <Text style={estilos.textoBotao}>
                    Deletar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
