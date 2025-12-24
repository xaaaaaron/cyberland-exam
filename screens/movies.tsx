import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  ActivityIndicator,
  Pressable,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo, useState } from 'react';

import { useGetMovieList } from '../hooks/useGetMovieList';
import { MovieSearchItem } from '../types/movies';
import MovieCards from '../components/MovieCards';

import { useDebounce } from '../hooks/useDebounce';
import { MovieSearch } from '../components/Search';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { MovieListItem } from '../components/MovieList';
import { SearchIcon } from '../icons/SearchIcon';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MoviesList = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'year'>('title');
  const [ascending, setAscending] = useState(true);

  const debouncedSearch = useDebounce(search);
  const navigation = useNavigation<NavigationProp>();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMovieList({
      search: debouncedSearch || undefined,
      filter: movie => movie.Title.length > 0,
      sort: (a, b) => {
        if (sortBy === 'title') {
          return ascending
            ? a.Title.localeCompare(b.Title)
            : b.Title.localeCompare(a.Title);
        } else {
          return ascending
            ? Number(a.Year) - Number(b.Year)
            : Number(b.Year) - Number(a.Year);
        }
      },
    });

  const movies = useMemo(
    () => data?.pages.flatMap(page => page.Search ?? []) ?? [],
    [data],
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Filter & Sort Controls */}
      <View style={{ flexDirection: 'row', padding: 12, gap: 12 }}>
        <Pressable
          onPress={() => {
            setSortBy('title');
            setAscending(!ascending);
          }}
        >
          <Text>
            Sort by Title {sortBy === 'title' ? (ascending ? '↑' : '↓') : ''}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setSortBy('year');
            setAscending(!ascending);
          }}
        >
          <Text>
            Sort by Year {sortBy === 'year' ? (ascending ? '↑' : '↓') : ''}
          </Text>
        </Pressable>
      </View>

      <MovieListItem
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerText}>Film List</Text>
            <Pressable onPress={() => navigation.navigate('Search')}>
              <SearchIcon />
            </Pressable>
          </View>
        }
        data={movies}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
