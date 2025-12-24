import { FlatList, StyleSheet, Text } from 'react-native';
import { useAppSelector } from '../lib/store';
import MovieCards from '../components/MovieCards';
import { selectFavorites } from '../lib/store/selectors/favorites';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MovieListItem } from '../components/MovieList';

const ListHeaderComponent = () => {
  return <Text style={styles.header}>Favorites</Text>;
};

export const Favorites = () => {
  const favoriteMovies = useAppSelector(selectFavorites);

  if (!favoriteMovies?.length) {
    return <Text style={styles.empty}>No favorites yet.</Text>;
  }

  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        bounces={false}
        data={favoriteMovies}
        keyExtractor={item => item.imdbID}
        renderItem={({ item }) => <MovieCards {...item} />}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  columnWrapper: { justifyContent: 'space-between', marginBottom: 20 },
  content: { paddingHorizontal: 10, paddingTop: 10 },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 18 },
  header: { fontSize: 24, fontWeight: '600', marginBottom: 20 },
});
