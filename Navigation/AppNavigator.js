import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TaskListScreen from '../screens/TaskListScreen';
import AddEditTaskScreen from '../screens/AddEditTaskScreen';
import SettingsScreen from '../screens/SettingsScreen';


const Stack = createStackNavigator();

AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TaskList" component={TaskListScreen} />
        <Stack.Screen name="AddEditTask" component={AddEditTaskScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
