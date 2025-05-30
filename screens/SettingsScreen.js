import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Ajustes" showBackButton={true} />
      <View style={styles.content}>
        <Text style={styles.settingText}>¡Esta es la pantalla de Ajustes!</Text>
        <Text style={styles.settingText}>Aquí podrías implementar funcionalidades como:</Text>
        <Text style={styles.listItem}>- Modo claro/oscuro.</Text>
        <Text style={styles.listItem}>- Notificaciones.</Text>
        <Text style={styles.listItem}>- Sincronización con la nube.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  settingText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
});

export default SettingsScreen;