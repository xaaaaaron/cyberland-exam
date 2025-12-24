import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Keyboard,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../lib/store';
import { addSearch } from '../lib/store/slices/recentSearchSlice';

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export const MovieSearch = ({ value, onChange }: Props) => {
  const dispatch = useAppDispatch();
  const recentSearches = useAppSelector(state => state.recentSearch);

  const [isFocused, setIsFocused] = useState(false);

  const handleSearchSubmit = () => {
    if (value.trim()) {
      dispatch(addSearch(value));
      Keyboard.dismiss(); // hide keyboard after submit
      setIsFocused(false);
    }
  };

  const handleSelectRecent = (term: string) => {
    onChange(term);
    dispatch(addSearch(term)); // move to top
    setIsFocused(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search movies..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
        autoCorrect={false}
        clearButtonMode="while-editing"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={handleSearchSubmit}
      />

      {/* Recent Search Dropdown */}
      {isFocused && recentSearches.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={recentSearches}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.recentItem}
                onPress={() => handleSelectRecent(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    position: 'relative',
  },
  input: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F2F2F2',
    fontSize: 16,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
    maxHeight: 180,
  },
  recentItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
