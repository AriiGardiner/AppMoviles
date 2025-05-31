import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, Modal, Pressable, ScrollView } from 'react-native';
import { useTasks } from '../Context/TaskContext'; 
import TaskItem from '../components/TaskItem';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Picker } from '@react-native-picker/picker';

const TaskListScreen = () => {
  const { tasks, deleteTask, editTask, getOrganizationSuggestion } = useTasks();
  const navigation = useNavigation();
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [suggestion, setSuggestion] = useState('');
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const [showPriorityPicker, setShowPriorityPicker] = useState(false);
  const [showStatusPicker, setShowStatusPicker] = useState(false);

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
    const newSuggestion = await getOrganizationSuggestion();
    setSuggestion(newSuggestion);
    setLoadingSuggestion(false);
  };

  const getPriorityLabel = (value) => {
    switch (value) {
      case 'all': return 'Todas';
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return 'Todas';
    }
  };

  const getStatusLabel = (value) => {
    switch (value) {
      case 'all': return 'Todos';
      case 'pending': return 'Estado';
      case 'completed': return 'Completadas';
      default: return 'Todos';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchesPriority && matchesStatus;
  }).sort((a, b) => {
    const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return (
    <View style={styles.container}>
      <Header title="Mis Tareas" />
      
      <View style={styles.filtersSection}>
        <Text style={styles.filtersTitle}>Filtrar por:</Text>
        <View style={styles.filtersContainer}>
          <Pressable
            style={styles.filterInput}
            onPress={() => setShowPriorityPicker(true)}
          >
            <View style={styles.filterContent}>
              <Ionicons name="flag-outline" size={16} color={Colors.primary} />
              <Text style={styles.filterText}>{getPriorityLabel(filterPriority)}</Text>
            </View>
            <Ionicons name="chevron-down-outline" size={16} color={Colors.textSecondary} />
          </Pressable>

          <Pressable
            style={styles.filterInput}
            onPress={() => setShowStatusPicker(true)}
          >
            <View style={styles.filterContent}>
              <Ionicons name="checkmark-circle-outline" size={16} color={Colors.primary} />
              <Text style={styles.filterText}>{getStatusLabel(filterStatus)}</Text>
            </View>
            <Ionicons name="chevron-down-outline" size={16} color={Colors.textSecondary} />
          </Pressable>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={showPriorityPicker}
        animationType="slide"
        onRequestClose={() => setShowPriorityPicker(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowPriorityPicker(false)}>
          <View style={styles.pickerModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Prioridad</Text>
              <Pressable onPress={() => setShowPriorityPicker(false)}>
                <Ionicons name="close" size={24} color={Colors.textSecondary} />
              </Pressable>
            </View>
            <Picker
              selectedValue={filterPriority}
              style={styles.modalPicker}
              onValueChange={(itemValue) => {
                setFilterPriority(itemValue);
                setShowPriorityPicker(false);
              }}
            >
              <Picker.Item label="Todas las Prioridades" value="all" />
              <Picker.Item label="Prioridad Alta" value="high" />
              <Picker.Item label="Prioridad Media" value="medium" />
              <Picker.Item label="Prioridad Baja" value="low" />
            </Picker>
          </View>
        </Pressable>
      </Modal>

      <Modal
        transparent={true}
        visible={showStatusPicker}
        animationType="slide"
        onRequestClose={() => setShowStatusPicker(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowStatusPicker(false)}>
          <View style={styles.pickerModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar Estado</Text>
              <Pressable onPress={() => setShowStatusPicker(false)}>
                <Ionicons name="close" size={24} color={Colors.textSecondary} />
              </Pressable>
            </View>
            <Picker
              selectedValue={filterStatus}
              style={styles.modalPicker}
              onValueChange={(itemValue) => {
                setFilterStatus(itemValue);
                setShowStatusPicker(false);
              }}
            >
              <Picker.Item label="Todos los Estados" value="all" />
              <Picker.Item label="Pendientes" value="pending" />
              <Picker.Item label="Completadas" value="completed" />
            </Picker>
          </View>
        </Pressable>
      </Modal>

      <View style={styles.mainContent}>
        <TouchableOpacity
          style={[styles.suggestionButton, loadingSuggestion && styles.suggestionButtonDisabled]}
          onPress={handleGetSuggestion}
          disabled={loadingSuggestion}
          activeOpacity={0.8}
        >
          <View style={styles.suggestionButtonContent}>
            {loadingSuggestion ? (
              <ActivityIndicator size="small" color={Colors.cardBackground} />
            ) : (
              <Ionicons name="bulb-outline" size={20} color={Colors.cardBackground} />
            )}
            <Text style={styles.suggestionButtonText}>
              {loadingSuggestion ? "Obteniendo..." : "Sugerencia de Organización"}
            </Text>
          </View>
        </TouchableOpacity>

        {suggestion ? (
          <View style={styles.suggestionBox}>
            <View style={styles.suggestionHeader}>
              <Ionicons name="bulb" size={20} color={Colors.accent} />
              <Text style={styles.suggestionTitle}>Sugerencia</Text>
            </View>
            <Text style={styles.suggestionText}>{suggestion}</Text>
          </View>
        ) : null}

        {filteredTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="clipboard-outline" size={64} color={Colors.textSecondary} />
            <Text style={styles.noTasksText}>No hay tareas para mostrar</Text>
            <Text style={styles.noTasksSubtext}>¡Agrega tu primera tarea!</Text>
          </View>
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
            contentContainerStyle={styles.taskList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate('AddEditTask')}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={28} color={Colors.cardBackground} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filtersSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.cardBackground,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  filterInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerModalContent: {
    backgroundColor: Colors.cardBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 30,
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  modalPicker: {
    width: '100%',
    height: 200,
    color: Colors.text,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  suggestionButton: {
    backgroundColor: Colors.accent,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 16,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  suggestionButtonDisabled: {
    opacity: 0.7,
  },
  suggestionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  suggestionButtonText: {
    color: Colors.cardBackground,
    fontSize: 16,
    fontWeight: '600',
  },
  suggestionBox: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  suggestionText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  noTasksText: {
    fontSize: 20,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  noTasksSubtext: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.7,
  },
  taskList: {
    paddingBottom: 100,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  floatingButton: {
    backgroundColor: Colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default TaskListScreen;