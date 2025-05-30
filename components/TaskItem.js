import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#FF6347'; // Rojo tomate
      case 'medium':
        return '#FFD700'; // Oro
      case 'low':
        return '#3CB371'; // Verde mar
      default:
        return '#A9A9A9'; // Gris oscuro
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#28a745'; // Verde
      case 'pending':
        return '#ffc107'; // Amarillo
      default:
        return '#6c757d'; // Gris
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        <TouchableOpacity onPress={() => onToggleStatus(task.id, task.status)}>
          <Ionicons
            name={task.status === 'completed' ? 'checkmark-circle' : 'hourglass-outline'}
            size={24}
            color={getStatusColor(task.status)}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{task.description}</Text>
      <View style={styles.details}>
        <Text style={[styles.priority, { backgroundColor: getPriorityColor(task.priority) }]}>
          Prioridad: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </Text>
        <Text style={[styles.status, { backgroundColor: getStatusColor(task.status) }]}>
          Estado: {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(task.id)} style={styles.actionButton}>
          <Ionicons name="create-outline" size={24} color="#007BFF" />
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.actionButton}>
          <Ionicons name="trash-outline" size={24} color="#DC3545" />
          <Text style={styles.actionButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1,
    marginRight: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  priority: {
    fontSize: 12,
    color: '#FFFFFF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginRight: 8,
    marginBottom: 5,
  },
  status: {
    fontSize: 12,
    color: '#FFFFFF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  actionButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
});

export default TaskItem;