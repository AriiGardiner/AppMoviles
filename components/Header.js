import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({ title, showBackButton = false }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top : (Platform.OS === 'android' ? 25 : 45);

  return (
    <View style={[styles.headerContainer, { paddingTop: paddingTop + 10 }]}>
      {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={Colors.cardBackground} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  headerTitle: {
    color: Colors.cardBackground,
    fontSize: 24,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    bottom: 15,
    zIndex: 1,
  },
});

export default Header;
