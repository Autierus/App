import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'schoolApp.db', location: 'default' },
  () => {},
  error => { console.log(error); }
);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS usuario (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL
        )`,
        [],
        () => {
          console.log('Tabela usuario criada com sucesso.');
        },
        error => {
          console.log('Erro ao criar tabela usuario: ' + error.message);
        }
      );
    });
  }, []);

  const handleLogin = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM usuario WHERE email = ? AND password = ?',
        [email, password],
        (tx, results) => {
          if (results.rows.length > 0) {
            const user = results.rows.item(0); 
            navigation.replace('ClassList', { username: user.email });
          } else {
            Alert.alert('Erro', 'Email ou senha incorretos');
          }
        },
        error => {
          console.log('Erro ao verificar login: ' + error.message);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Staturma</Text>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#E0FFFF',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
    textAlign: 'center',
    color: '#000080',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#000080', // Cor de fundo do botão (azul)
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white', // Cor do texto do botão
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
