import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, color, textColor }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color || '#007BFF' }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor || '#FFFFFF' }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;