import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'schoolApp.db', location: 'default' },
  () => { console.log('Database opened'); },
  error => { console.log('Error: ' + error.message); }
);

const AddActivityScreen = ({ navigation, route }) => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const addActivity = () => {
    if (subject && description && date) {
        console.log("Turma: "+route.params);
      db.transaction(txn => {
        txn.executeSql(
          'INSERT INTO activities (subject, description, date, class_id) VALUES (?, ?, ?, ?)',
          [subject, description, date, route.params.classId],  // `classId` vindo da navegação
          () => {
            console.log('Activity added successfully');
            navigation.goBack();  // Retorna para a tela anterior (Calendário)
          },
          error => { console.log('Error adding activity: ' + error.message); }
        );
      });
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Atividade</Text>

      <TextInput
        placeholder="Matéria"
        style={styles.input}
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Data (YYYY-MM-DD)"
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />

      <Button title="Adicionar" onPress={addActivity} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#E0FFFF',
  },
  title: { 
    color: '#000080',
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  input: { 
    height: 50, 
    borderColor: '#ddd', 
    borderWidth: 1, 
    marginBottom: 15, 
    paddingHorizontal: 10 
  }
});

export default AddActivityScreen;