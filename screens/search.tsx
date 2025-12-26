import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../lib/store';
import { addSearch, removeSearch } from '../lib/store/slices/recentSearchSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MovieSearchItem } from '../types/movies';
import MovieCards from '../components/MovieCards';
import { useGetMovieList } from '../hooks/useGetMovieList';
import { useDebounce } from '../hooks/useDebounce';
import { MovieListItem } from '../components/MovieList';

export const SearchScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const recentSearches = useAppSelector(state => state.recentSearch);

  const [value, setValue] = useState('');
  const inputRef = useRef<TextInput>(null);

  const debouncedSearch = useDebounce(value);

  const { data } = useGetMovieList({ search: debouncedSearch || undefined });

  const movies = useMemo(
    () => data?.pages.flatMap(page => page.Search ?? []) ?? [],
    [data],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submitSearch = (text: string) => {
    if (!text.trim()) return;

    dispatch(addSearch(text));
    Keyboard.dismiss();
    setValue(text);
  };

  const renderSearch: ListRenderItem<string> = ({ item }) => (
    <View style={styles.recentItem}>
      <TouchableOpacity
        onPress={() => submitSearch(item)}
        style={styles.recentTextWrapper}
      >
        <Text>{item}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => dispatch(removeSearch(item))}>
        <Text style={styles.remove}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={setValue}
          placeholder="Search movies"
          style={styles.input}
          returnKeyType="search"
          onSubmitEditing={() => submitSearch(value)}
          clearButtonMode="while-editing"
        />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {value ? (
        <MovieListItem
          ListHeaderComponent={
            <Text style={styles.header}>{`Result for ${value}`}</Text>
          }
          data={movies}
          key="grid"
        />
      ) : (
        <FlatList
          key="list"
          ListHeaderComponent={() => (
            <View style={{ marginLeft: 16, marginVertical: 12 }}>
              <Text style={{ fontWeight: '600', fontSize: 16 }}>Recent</Text>
            </View>
          )}
          data={recentSearches}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={renderSearch}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  cancel: {
    color: '#007AFF',
    fontSize: 16,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  recentTextWrapper: {
    flex: 1,
  },
  remove: {
    fontSize: 16,
    color: '#999',
  },
  header: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 20,
  },
});
