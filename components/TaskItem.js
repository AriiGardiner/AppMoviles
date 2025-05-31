import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return Colors.priorityHigh;
      case 'medium':
        return Colors.priorityMedium;
      case 'low':
        return Colors.priorityLow;
      default:
        return Colors.textSecondary;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return Colors.statusCompleted;
      case 'pending':
        return Colors.statusPending;
      default:
        return Colors.textSecondary;
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Baja';
      default:
        return priority;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'pending':
        return 'Pendiente';
      default:
        return status;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        <TouchableOpacity onPress={() => onToggleStatus(task.id, task.status)}>
          <Ionicons
            name={task.status === 'completed' ? 'checkmark-circle' : 'time-outline'}
            size={26}
            color={getStatusColor(task.status)}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{task.description}</Text>
      <View style={styles.details}>
        <View style={[styles.badge, { backgroundColor: getPriorityColor(task.priority) }]}>
          <Text style={styles.badgeText}>
            Prioridad: {getPriorityText(task.priority)}
          </Text>
        </View>
        <View style={[styles.badge, { backgroundColor: getStatusColor(task.status) }]}>
          <Text style={styles.badgeText}>
            Estado: {getStatusText(task.status)}
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(task.id)} style={styles.actionButton}>
          <Ionicons name="pencil-outline" size={22} color={Colors.primary} />
          <Text style={[styles.actionButtonText, { color: Colors.primary }]}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.actionButton}>
          <Ionicons name="trash-outline" size={22} color={Colors.error} />
          <Text style={[styles.actionButtonText, { color: Colors.error }]}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    padding: 18,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 4.65,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    flexShrink: 1,
    marginRight: 10,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 5,
  },
  badgeText: {
    fontSize: 12,
    color: Colors.cardBackground,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
    marginTop: 5,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  actionButtonText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TaskItem;
