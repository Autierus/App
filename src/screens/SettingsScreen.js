import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { MyContext } from './ThemeContext';  // Importa o contexto

const SettingsScreen = ({ navigation }) => {
  const tema = useContext(MyContext);  // Acessa o contexto do tema
  const [isDarkMode, setIsDarkMode] = useState(tema.tema === 2); // Inicializa baseado no tema atual

  const toggleDarkMode = () => {
    setIsDarkMode(previousState => !previousState);

    if (tema.tema === 1) {
      tema.setTema(2);  // Muda para tema escuro
    } else if (tema.tema === 2) {
      tema.setTema(1);  // Muda para tema claro
    }else{
      tema.setTema(1);
    }
    console.log("O tema atual é: " + tema.tema);
  };

  return (
    <View style={tema.tema === 1 ? styles.container1 : styles.container2}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Sobre o Staturma</Text>
        <TouchableOpacity 
          style={styles.customButton} 
          onPress={() => navigation.navigate('AboutScreen')}
        >
          <Text style={styles.customButtonText}>Ir para Sobre</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Modo Escuro</Text>
        <Switch 
          value={isDarkMode} 
          onValueChange={toggleDarkMode}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: { // Tema claro
    flex: 1,
    padding: 16,
    backgroundColor: '#E0FFFF', // Fundo claro
  },
  container2: { // Tema escuro
    flex: 1,
    padding: 16,
    backgroundColor: 'gray', // Fundo escuro
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#000080', // Cor do título
  },
  settingItem: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 18,
    color: '#363636', // Cor do texto
  },
  customButton: {
    backgroundColor: '#000080', // Cor de fundo do botão
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  customButtonText: {
    color: 'white', // Cor do texto do botão
    fontSize: 16,
    fontWeight: 'black',
    textAlign: 'center',
  },
});

export default SettingsScreen;
