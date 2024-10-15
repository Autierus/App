import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native'; // Importa a função de navegação

const db = SQLite.openDatabase(
  { name: 'schoolApp.db', location: 'default' },
  () => {},
  error => { console.log(error); }
);

const CalendarScreen = ({ route }) => {
    const navigation = useNavigation();
  const { classId } = route.params;
  console.log('Class ID:', classId);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const deleteActivity = (id) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM activities WHERE id = ?',
        [id],
        () => {
          console.log(`Activity with id ${id} deleted`);
          loadActivities(); // Recarrega as atividades após a exclusão
        },
        error => { console.log('Error deleting activity: ' + error.message); }
      );
    });
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir esta atividade?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", onPress: () => deleteActivity(id) }
      ]
    );
  };

  const loadActivities = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM activities WHERE class_id = ?',
        [classId],
        (tx, results) => {
          let rows = results.rows.raw();
          setActivities(rows);
        },
        error => { console.log('Error loading activities: ' + error.message); }
      );
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.activityItem}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.subject}>{item.subject}</Text>
      <Text style={styles.description}>{item.description}</Text>

      <Pressable
        style={styles.deleteButton}
        onPress={() => confirmDelete(item.id)}
      >
        <Text style={styles.deleteText}>Excluir</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atividades Agendadas</Text>
      <FlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />


      {/* Botão de adicionar atividade no canto inferior direito */}
      <Pressable 
        style={styles.addButton}
        onPress={() => {
          console.log('Navigating to Add Activity screen');
        //   navigation.navigate('AddActivity');
          navigation.navigate('AddActivity', { classId: classId });
        }}
      >
        {/* <Icon name="add" size={30} color="#fff" /> */}
        <Text style={styles.date}>+</Text>
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 ,  backgroundColor: '#E0FFFF',},
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#555' },
  activityItem: { padding: 20, backgroundColor: '#f9f9f9', borderBottomWidth: 1, borderBottomColor: '#ddd', color: '#555' },
  date: { fontSize: 16, fontWeight: 'bold', color: '#555' },
  subject: { fontSize: 16 },
  description: { fontSize: 14, color: '#555' },
  deleteText: { fontSize: 14, color: 'red' },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#40E0D0',  // Cor do botão
    width: 60,
    height: 60,
    borderRadius: 30,  // Deixa o botão circular
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,  // Sombra para Android
    shadowColor: '#000',  // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    
  }
});

export default CalendarScreen;