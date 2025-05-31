import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { Colors } from '../constants/Colors';

const CustomInput = ({ label, value, onChangeText, placeholder, multiline = false, numberOfLines = 1, keyboardType = 'default' }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        placeholderTextColor={Colors.textSecondary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: Colors.text,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: Colors.cardBackground,
    color: Colors.text,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default CustomInput;
