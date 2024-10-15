import React, { useContext,useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons'; // Para ícones
import Icon from 'react-native-vector-icons/Ionicons'; // Usaremos o ícone de "+" do Ionicons

import { MyContext } from './ThemeContext';  // Importa o contexto // isso aqui em todos


// const Tab = createBottomTabNavigator();


const db = SQLite.openDatabase(
  { name: 'schoolApp.db', location: 'default' },
  () => { console.log('Database opened'); },
  error => { console.log('Error: ' + error.message); }
);

const ClassListScreen = ({ navigation, route}) => {
  const tema = useContext(MyContext);// isso aqui em todos
  const [classes, setClasses] = useState([]);
  const { username } = route.params; // Recebe o nome do usuário da rota
  useEffect(() => {
    createTables();
    loadClasses();
  }, []);

  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS classes (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50))`,
        [],
        () => { console.log('Classes table created'); },
        error => { console.log('Error creating classes table: ' + error.message); }
      );

        txn.executeSql(
            `CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY AUTOINCREMENT, subject VARCHAR(50), description TEXT, date TEXT, class_id INTEGER, FOREIGN KEY(class_id) REFERENCES classes(id))`,
            [],
            () => { console.log('Activities table created successfully'); },
            error => { console.log('Error creating table: ' + error.message); }
        );

    //   // Inserindo registros de exemplo (comentável após a primeira execução)
    //   txn.executeSql(
    //     `INSERT INTO classes (name) VALUES 
    //     ('Turma 1'), ('Turma 2'), ('Turma 3'), 
    //     ('Turma 4'), ('Turma 5'), ('Turma 6'),
    //     ('Turma 7'), ('Turma 8'), ('Turma 9'), 
    //     ('Turma 10'), ('Turma 11'), ('Turma 12')`,
    //     [],
    //     () => { console.log('Sample classes inserted'); },
    //     error => { console.log('Error inserting classes: ' + error.message); }
    //   );

    //     //  Inserir algumas atividades
    //     txn.executeSql(
    //         `INSERT INTO activities (subject, description, date, class_id) VALUES 
    //         ('Matemática', 'Exercícios sobre equações de 1º grau', '2024-10-14', 1),
    //         ('História', 'Leitura do capítulo 3 do livro', '2024-10-15', 1),
    //         ('Geografia', 'Trabalho sobre as regiões do Brasil', '2024-10-16', 2),
    //         ('Física', 'Experimento sobre as leis de Newton', '2024-10-17', 3)`,
    //         [],
    //         () => { console.log('Activities inserted successfully'); },
    //         error => { console.log('Error inserting activities: ' + error.message); }
    //     );
    });
  };

  const loadClasses = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM classes',
        [],
        (tx, results) => {
          let rows = results.rows.raw();
          setClasses(rows);
          console.log('Classes loaded:', rows); // Debug: verificar se os dados foram carregados
        },
        error => { console.log('Error loading classes: ' + error.message); }
      );
    });
  };

  const renderItem = ({ item }) => (
    <Pressable 
      style={styles.classItem} 
      onPress={() => {
        // console.log("O tema:"+tema.tema)
        console.log(`Navigating to Calendar for class ID: ${item.id}`);
        navigation.navigate('Calendar', { classId: item.id });
      }}
    >
      <Text style={styles.className}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
              <Text style={styles.title}>Bem-vindo, {username}!</Text>
      <View style={styles.head}>
        <Text style={styles.title}>Turmas</Text>

        <Pressable style={styles.headerButton} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.headerButtonText}>👤</Text>
        </Pressable>
        <Pressable style={styles.headerButton} onPress={() => navigation.navigate('SettingsScreen')}>
          <Text style={styles.headerButtonText}>⚙️</Text>
        </Pressable>
      </View>

      <FlatList
        data={classes}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text>Nenhuma turma encontrada</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,  // Flexível para permitir o crescimento e rolagem do FlatList
    padding: 20,
    backgroundColor: '#E0FFFF',
  },
  head: { 
    flexDirection: 'row', // Itens na horizontal
    alignItems: 'center', // Alinha verticalmente no centro
    marginTop: 20,
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    marginRight: 100,
    color: '#000080'
  },
  classItem: { 
    padding: 20, 
    marginVertical: 8, 
    backgroundColor: '#f9f9f9', 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#ddd' 
  },
  className: { 
    color: '#', 
    fontSize: 18 
  },
  headerButton: { 
    color: '#363636', 
    fontSize: 18, 
    margin: 35
  }
});

export default ClassListScreen;