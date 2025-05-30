import React from 'react';
import AppNavigator from './Navigation/AppNavigator';
import { TaskProvider } from './Context/TaskContext'; // Importar el TaskProvider [cite: 4]
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <TaskProvider>
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor="#4A148C" /> {/* Configurar la barra de estado */}
        <AppNavigator />
      </View>
    </TaskProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});