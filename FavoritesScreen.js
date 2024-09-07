// FavoritesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const getCoverImageUrl = (item) => {
    if (item.isbn && item.isbn[0]) {
      return `https://covers.openlibrary.org/b/isbn/${item.isbn[0]}-M.jpg`;
    }
    if (item.cover_edition_key) {
      return `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`;
    }
    return 'https://via.placeholder.com/150'; // Imagen de placeholder si no hay portada disponible
  };

  const renderFavoriteCard = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: getCoverImageUrl(item) }}
        style={styles.coverImage}
        resizeMode="contain"
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>Autor: {item.author_name ? item.author_name.join(', ') : 'Desconocido'}</Text>
      <Text style={styles.text}>Primera publicación: {item.first_publish_year}</Text>
      <Text style={styles.text}>ISBN: {item.isbn ? item.isbn[0] : 'N/A'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Favoritos</Text>
      <FlatList
        data={favorites}
        renderItem={renderFavoriteCard}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.list}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  list: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 5,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  coverImage: {
    width: 100,
    height: 150,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});

export default FavoritesScreen;
