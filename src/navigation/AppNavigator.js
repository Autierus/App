import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
//import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ClassListScreen from '../screens/ClassListScreen';
import AddActivityScreen from '../screens/AddActivityScreen';
// import ThemeProvider from '../screens/ThemeContext';
// import { UserProvider } from '../screens/ThemeContext';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        {/* <Stack.Screen name="SignupScreen" component={SignupScreen} /> */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        {/* <Stack.Screen name="ClassList" component={ClassListScreen} options={{ title: 'Turmas' }} /> */}
        <Stack.Screen name="ClassList" component={ClassListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: 'Calendário' }} />
        <Stack.Screen name="AddActivity" component={AddActivityScreen} options={{ title: 'Adicionar Atividade' }} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;