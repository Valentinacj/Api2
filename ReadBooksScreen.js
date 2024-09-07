import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ReadBooksScreen() {
  // Aquí podrías tener una lista de libros leídos similar a `LibraryScreen`

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Read Books</Text>
      {/* Renderiza la lista de libros leídos aquí */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a569bd',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    backgroundColor: '#4a235a',
    padding: 10,
    borderRadius: 10,
    color: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});
