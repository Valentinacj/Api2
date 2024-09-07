import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';

function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() === '') return;

    setLoading(true);
    fetch(`https://openlibrary.org/search.json?q=${searchQuery}&limit=20`)
      .then(response => response.json())
      .then(data => {
        // Verifica que 'docs' exista antes de usarlo
        if (data && data.docs) {
          setSearchResults(data.docs);
        } else {
          setSearchResults([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setSearchResults([]);
        setLoading(false);
      });
  };

  const renderBooks = (books) => {
    const rows = [];
    for (let i = 0; i < books.length; i += 3) {
      const rowBooks = books.slice(i, i + 3);
      rows.push(
        <View key={i} style={styles.bookRow}>
          {rowBooks.map(book => (
            <View key={book.key} style={styles.bookCard}>
              {/* Asegúrate de que book.cover_i esté disponible y sea válido */}
              {book.cover_i ? (
                <Image
                  source={{ uri: `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` }}
                  style={styles.bookImage}
                />
              ) : (
                <View style={styles.bookImage} /> // Placeholder if no cover image
              )}
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.author_name ? book.author_name[0] : 'Unknown Author'}</Text>
              <Text style={styles.bookYear}>{book.first_publish_year ? book.first_publish_year : 'Unknown Year'}</Text>
            </View>
          ))}
        </View>
      );
    }
    return rows;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for books..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Search Results</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4a235a" />
      ) : (
        searchResults.length > 0 ? renderBooks(searchResults) : <Text style={styles.noResults}>No results found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a569bd',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centra los elementos en la fila
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 50, // Ajusta la altura de la barra de búsqueda
    borderColor: '#4a235a',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#d2b4de', // Color de fondo de la barra de búsqueda
    marginRight: 10, // Espacio entre la barra de búsqueda y el botón
  },
  searchButton: {
    height: 50,
    width: 150, // Ajusta el ancho del botón de búsqueda
    backgroundColor: '#4a235a',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16, // Tamaño de fuente del botón
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
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#4a235a',
    marginTop: 20,
  },
  bookRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  bookCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 10,
    padding: 10,
    width: '30%',
    alignItems: 'center',
    backgroundColor: '#d2b4de',
  },
  bookImage: {
    width: 80,
    height: 120,
    backgroundColor: '#eee', // Color de fondo para imágenes faltantes
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bookAuthor: {
    fontSize: 14,
    textAlign: 'center',
  },
  bookYear: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default SearchScreen;
