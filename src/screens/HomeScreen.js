// export default HomeScreen;
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa a função de navegação


const HomeScreen = () => {
  const navigation = useNavigation(); // Hook para usar a navegação

  const handleLogout = () => {
    navigation.navigate('LoginScreen'); // Navega de volta para a tela de login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Staturma</Text>
      <Text style={styles.text}>Aqui você pode gerenciar suas atividades.</Text>
      <Button title="Sair" onPress={handleLogout} color="#FF0000" /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#000080', // Cor da fonte do título
  },
  text: {
    fontSize: 16,
    color: '#808080', // Cor da fonte do texto
  },
});

export default HomeScreen;