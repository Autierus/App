import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const AboutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Sobre o Staturma</Text>
        <Text style={styles.description}>
          O Staturma é um aplicativo de statatus de turma, onde deixa visível um calendário agenda para os usuários, que foi desenvolvido para ajudar alunos e professores a gerenciar atividades e agendamentos acadêmicos de forma prática e organizada. Com o Staturma, você pode acompanhar suas provas, trabalhos e eventos importantes no calendário, tudo em um só lugar.
        </Text>
      </ScrollView>
      {/* <View style={styles.buttonContainer}>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0FFFF',
  },
  content: {
    padding: 16,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#000080',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#363636',
  },
  // buttonContainer: {
  //   padding: 16,
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  // },
});

export default AboutScreen;