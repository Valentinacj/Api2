import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider, FavoritesContext } from './components/FavoritesContext';
import { ReadBooksProvider, ReadBooksContext } from './components/ReadBooksContext';

const Tab = createMaterialTopTabNavigator();

function LibraryScreen() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { readBooks, toggleRead } = useContext(ReadBooksContext);

  useEffect(() => {
    fetch('https://openlibrary.org/subjects/young_adult_fiction.json?limit=400')
      .then(response => response.json())
      .then(data => {
        setBooks(data.works);
        setFilteredBooks(data.works);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    setFilteredBooks(
      books.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, books]);

  const renderBooks = (books) => {
    const rows = [];
    for (let i = 0; i < books.length; i += 3) {
      const rowBooks = books.slice(i, i + 3);
      rows.push(
        <View key={i} style={styles.bookRow}>
          {rowBooks.map(book => (
            <View key={book.key} style={styles.bookCard}>
              <Image
                source={{ uri: `http://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg` }}
                style={styles.bookImage}
              />
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.authors ? book.authors[0].name : 'Unknown Author'}</Text>
              <Text style={styles.bookYear}>{book.first_publish_year ? book.first_publish_year : 'Unknown Year'}</Text>
              <TouchableOpacity onPress={() => toggleFavorite(book)}>
                <Text style={styles.button}>
                  {favorites.find(fav => fav.key === book.key) ? 'Remove from Favorites' : 'Add to Favorites'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleRead(book)}>
                <Text style={styles.button}>
                  {readBooks.find(readBook => readBook.key === book.key) ? 'Mark as Unread' : 'Mark as Read'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      );
    }
    return rows;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('./assets/wanderwords.png')}
          style={styles.headerImage}
        />
      </View>
      <Text style={styles.title}>Library</Text>
      {renderBooks(filteredBooks)}
    </ScrollView>
  );
}

function FavoritesScreen() {
  const { favorites } = useContext(FavoritesContext);

  const renderBooks = (books) => {
    const rows = [];
    for (let i = 0; i < books.length; i += 3) {
      const rowBooks = books.slice(i, i + 3);
      rows.push(
        <View key={i} style={styles.bookRow}>
          {rowBooks.map(book => (
            <View key={book.key} style={styles.bookCard}>
              <Image
                source={{ uri: `http://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg` }}
                style={styles.bookImage}
              />
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.authors ? book.authors[0].name : 'Unknown Author'}</Text>
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
      <Text style={styles.title}>Favorites</Text>
      {renderBooks(favorites)}
    </ScrollView>
  );
}

function ReadBooksScreen() {
  const { readBooks } = useContext(ReadBooksContext);

  const renderBooks = (books) => {
    const rows = [];
    for (let i = 0; i < books.length; i += 3) {
      const rowBooks = books.slice(i, i + 3);
      rows.push(
        <View key={i} style={styles.bookRow}>
          {rowBooks.map(book => (
            <View key={book.key} style={styles.bookCard}>
              <Image
                source={{ uri: `http://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg` }}
                style={styles.bookImage}
              />
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.authors ? book.authors[0].name : 'Unknown Author'}</Text>
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
      <Text style={styles.title}>Read Books</Text>
      {renderBooks(readBooks)}
    </ScrollView>
  );
}

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
        setSearchResults(data.docs);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
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
              <Image
                source={{ uri: `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` }}
                style={styles.bookImage}
              />
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

export default function App() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <ReadBooksProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor: '#532500',
                tabBarStyle: { backgroundColor: '#f7bf6b' },
              }}
            >
              <Tab.Screen name="Library" component={LibraryScreen} />
              <Tab.Screen name="Search" component={SearchScreen} />
              <Tab.Screen name="Favorites" component={FavoritesScreen} />
              <Tab.Screen name="ReadBooks" component={ReadBooksScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </ReadBooksProvider>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fceaba',
  },
  headerContainer: {
    padding: 0,
    alignItems: 'center',
    marginBottom: 0,
  },
  headerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 50,
    fontWeight:'thin',
    marginVertical: 20,
    textAlign: 'center',
    color: '#532500',
  },
  bookRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bookCard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    padding: 8,
    backgroundColor: '#f9d493',
    borderRadius: 8,
  },
  bookImage: {
    width: 200,
    height: 250,
    marginBottom: 10,
  },
  bookTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  bookAuthor: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
  bookYear: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#d18623',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    color: '#5a2000',
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#aa6417',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    backgroundColor: '#f9d496',
  },
  searchButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#aa6417',
    borderRadius: 20,
  },
  searchButtonText: {
    color: '#ffffff',
  },
  noResults: {
    textAlign: 'center',
    color: '#784300',
    marginTop: 20,
  },
});
