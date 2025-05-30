import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Picker } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import { useTasks } from '../Context/TaskContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddEditTaskScreen = () => {
  const { addTask, editTask } = useTasks();
  const navigation = useNavigation();
  const route = useRoute();
  const taskToEdit = route.params?.task; // Si hay un parámetro 'task', estamos editando

  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
  const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');
  const [priority, setPriority] = useState(taskToEdit ? taskToEdit.priority : 'medium');
  const [status, setStatus] = useState(taskToEdit ? taskToEdit.status : 'pending');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ocultar el header por defecto de React Navigation
    });
  }, [navigation]);

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert("Error", "El título de la tarea no puede estar vacío.");
      return;
    }

    if (taskToEdit) {
      // Editar tarea existente [cite: 15]
      editTask(taskToEdit.id, title, description, priority, status);
      Alert.alert("Éxito", "Tarea actualizada correctamente.");
    } else {
      // Añadir nueva tarea [cite: 15]
      addTask(title, description, priority);
      Alert.alert("Éxito", "Tarea añadida correctamente.");
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title={taskToEdit ? "Editar Tarea" : "Agregar Tarea"} showBackButton={true} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <CustomInput
            label="Título de la Tarea"
            placeholder="Ej: Comprar víveres"
            value={title}
            onChangeText={setTitle}
          />
          <CustomInput
            label="Descripción"
            placeholder="Ej: Leche, huevos, pan, frutas."
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={4}
          />

          <Text style={styles.label}>Prioridad</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={priority}
              style={styles.picker}
              onValueChange={(itemValue) => setPriority(itemValue)}
            >
              <Picker.Item label="Alta" value="high" />
              <Picker.Item label="Media" value="medium" />
              <Picker.Item label="Baja" value="low" />
            </Picker>
          </View>

          {taskToEdit && ( // Solo mostrar el estado al editar una tarea
            <>
              <Text style={styles.label}>Estado</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={status}
                  style={styles.picker}
                  onValueChange={(itemValue) => setStatus(itemValue)}
                >
                  <Picker.Item label="Pendiente" value="pending" />
                  <Picker.Item label="Completada" value="completed" />
                </Picker>
              </View>
            </>
          )}

          <CustomButton
            title={taskToEdit ? "Guardar Cambios" : "Agregar Tarea"}
            onPress={handleSubmit}
            color="#28a745"
            textColor="#FFFFFF"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  form: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default AddEditTaskScreen;