import React from 'react';
import AppNavigator from'./navigation/AppNavigator';
import { TaskProvider } from './Context/TaskContext';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { Colors } from './constants/Colors';

export default function App() {
  return (
    <TaskProvider>
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor={Colors.primary} />
        <AppNavigator />
      </View>
    </TaskProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});