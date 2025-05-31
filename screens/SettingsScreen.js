import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Ajustes" showBackButton={true} />
      <View style={styles.content}>
        <Ionicons name="settings-outline" size={80} color={Colors.primaryLight} style={styles.icon} />
        <Text style={styles.titleText}>¡Bienvenido a los Ajustes!</Text>
        <Text style={styles.descriptionText}>Aquí podrías personalizar tu experiencia con la aplicación:</Text>
        <View style={styles.listItemContainer}>
          <Ionicons name="sunny-outline" size={20} color={Colors.textSecondary} style={styles.listItemIcon} />
          <Text style={styles.listItem}>Cambiar a Modo Claro/Oscuro</Text>
        </View>
        <View style={styles.listItemContainer}>
          <Ionicons name="notifications-outline" size={20} color={Colors.textSecondary} style={styles.listItemIcon} />
          <Text style={styles.listItem}>Configurar Notificaciones</Text>
        </View>
        <View style={styles.listItemContainer}>
          <Ionicons name="cloud-upload-outline" size={20} color={Colors.textSecondary} style={styles.listItemIcon} />
          <Text style={styles.listItem}>Sincronizar Tareas con la Nube</Text>
        </View>
        <Text style={styles.comingSoon}>¡Próximamente más opciones!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.text,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 20,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: Colors.cardBackground,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  listItemIcon: {
    marginRight: 10,
  },
  listItem: {
    fontSize: 16,
    color: Colors.text,
    flexShrink: 1,
  },
  comingSoon: {
    marginTop: 30,
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.textSecondary,
  }
});

export default SettingsScreen;
