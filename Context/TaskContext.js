import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para persistencia permanente [cite: 6]
import { Alert } from 'react-native';

const TaskContext = createContext(); // Creación del contexto [cite: 4]

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]); // Estado para las tareas en memoria [cite: 4]

  // Cargar tareas al iniciar la aplicación [cite: 6]
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks'); // Obtener tareas de AsyncStorage [cite: 6]
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Error loading tasks from AsyncStorage:", error);
        Alert.alert("Error", "No se pudieron cargar las tareas guardadas.");
      }
    };
    loadTasks();
  }, []);

  // Guardar tareas cada vez que cambien [cite: 6]
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks)); // Guardar tareas en AsyncStorage [cite: 6]
      } catch (error) {
        console.error("Error saving tasks to AsyncStorage:", error);
        Alert.alert("Error", "No se pudieron guardar las tareas.");
      }
    };
    saveTasks();
  }, [tasks]);

  // Función para añadir una tarea [cite: 15]
  const addTask = (title, description, priority) => {
    const newTask = {
      id: Date.now().toString(), // ID único para cada tarea
      title,
      description,
      priority,
      status: 'pending', // Estado inicial de la tarea [cite: 15]
      createdAt: new Date().toISOString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Función para editar una tarea [cite: 15]
  const editTask = (id, updatedTitle, updatedDescription, updatedPriority, updatedStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: updatedTitle,
              description: updatedDescription,
              priority: updatedPriority,
              status: updatedStatus,
            }
          : task
      )
    );
  };

  // Función para eliminar una tarea [cite: 15]
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Función para obtener sugerencias (simulación de API) [cite: 3, 16]
  const getOrganizationSuggestion = async () => {
    try {
      // Simular una llamada a la API con un retraso
      const suggestions = [
        "Prioriza tus tareas más importantes al principio del día.",
        "Divide las tareas grandes en pasos más pequeños.",
        "Usa la técnica Pomodoro: 25 minutos de trabajo, 5 de descanso.",
        "Elimina las distracciones mientras trabajas en tareas importantes."
      ];
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      return new Promise(resolve => setTimeout(() => resolve(randomSuggestion), 1000));
    } catch (error) {
      console.error("Error fetching suggestion:", error);
      return "No se pudo obtener una sugerencia en este momento.";
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, getOrganizationSuggestion }}>
      {children}
    </TaskContext.Provider>
  );
};

// Hook personalizado para usar el contexto de tareas
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};