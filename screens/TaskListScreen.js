import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // ✅ Corregido
import { useTasks } from '../Context/TaskContext';
import TaskItem from '../components/TaskItem';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const TaskListScreen = () => {
  const { tasks, deleteTask, editTask, getOrganizationSuggestion } = useTasks();
  const navigation = useNavigation();
  const [filterPriority, setFilterPriority] = useState('all'); // Estado para el filtro de prioridad [cite: 16]
  const [filterStatus, setFilterStatus] = useState('all');     // Estado para el filtro de estado [cite: 16]
  const [suggestion, setSuggestion] = useState('');
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);

  const handleDelete = (id) => {
    Alert.alert(
      "Eliminar Tarea",
      "¿Estás seguro de que quieres eliminar esta tarea?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => deleteTask(id) }
      ]
    );
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    navigation.navigate('AddEditTask', { task: taskToEdit });
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    const taskToUpdate = tasks.find(task => task.id === id);
    editTask(id, taskToUpdate.title, taskToUpdate.description, taskToUpdate.priority, newStatus);
  };

  const handleGetSuggestion = async () => {
    setLoadingSuggestion(true);
    const newSuggestion = await getOrganizationSuggestion(); // Obtener sugerencia de la API simulada [cite: 16]
    setSuggestion(newSuggestion);
    setLoadingSuggestion(false);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchesPriority && matchesStatus;
  }).sort((a, b) => { // Opcional: Ordenar por prioridad (alta primero)
    const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return (
    <View style={styles.container}>
      <Header title="Mis Tareas" />
      <View style={styles.filtersContainer}>
        <Picker
          selectedValue={filterPriority}
          style={styles.picker}
          onValueChange={(itemValue) => setFilterPriority(itemValue)}
        >
          <Picker.Item label="Todas las Prioridades" value="all" />
          <Picker.Item label="Prioridad Alta" value="high" />
          <Picker.Item label="Prioridad Media" value="medium" />
          <Picker.Item label="Prioridad Baja" value="low" />
        </Picker>
        <Picker
          selectedValue={filterStatus}
          style={styles.picker}
          onValueChange={(itemValue) => setFilterStatus(itemValue)}
        >
          <Picker.Item label="Todos los Estados" value="all" />
          <Picker.Item label="Pendientes" value="pending" />
          <Picker.Item label="Completadas" value="completed" />
        </Picker>
      </View>

      <CustomButton
        title={loadingSuggestion ? "Cargando Sugerencia..." : "Obtener Sugerencia de Organización"}
        onPress={handleGetSuggestion}
        color="#3CB371"
        textColor="#FFFFFF"
        disabled={loadingSuggestion}
      />
      {suggestion ? <Text style={styles.suggestionText}><Ionicons name="bulb-outline" size={16} /> {suggestion}</Text> : null}

      {filteredTasks.length === 0 ? (
        <Text style={styles.noTasksText}>No hay tareas para mostrar.</Text>
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          )}
        />
      )}

      <CustomButton
        title="Agregar Nueva Tarea"
        onPress={() => navigation.navigate('AddEditTask')}
        color="#007BFF"
        textColor="#FFFFFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  picker: {
    flex: 1,
    height: 40,
  },
  suggestionText: {
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
    fontSize: 15,
    fontStyle: 'italic',
    color: '#444',
  },
  noTasksText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#888',
  },
});

export default TaskListScreen;