import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LibraryScreen from './LibraryScreen';
import SearchScreen from './SearchScreen';
import FavoritesScreen from './FavoritesScreen';
import ReadBooksScreen from './ReadBooksScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#4a235a' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Library" component={LibraryScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="ReadBooks" component={ReadBooksScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
