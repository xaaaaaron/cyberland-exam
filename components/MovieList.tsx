import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MovieSearchItem } from '../types/movies';
import MovieCards from './MovieCards';

const renderItem: ListRenderItem<MovieSearchItem> = ({ item }) => {
  return <MovieCards {...item} />;
};

export const MovieListItem = (
  props: Omit<FlatListProps<MovieSearchItem>, 'renderItem'>,
) => {
  return (
    <FlatList
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapperStyle}
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={item => item.imdbID}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  contentContainerStyle: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
