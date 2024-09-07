import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { ReadBooksContext } from './ReadBooksContext';

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
