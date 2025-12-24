import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MovieSearchItem } from '../types/movies';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAppDispatch, useAppSelector } from '../lib/store';
import { selectIsFavorite } from '../lib/store/selectors/favorites';
import { toggleFavorite } from '../lib/store/slices/moviesSlice';
import { BookmarkIcon } from '../icons/Bookmark';
import { BookmarkFilled } from '../icons/BookmarkFilled';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MovieCards = ({ Title, Year, imdbID, Poster, Type }: MovieSearchItem) => {
  const navigation = useNavigation<NavigationProp>();

  const handleOnPress = () => {
    navigation.navigate('MovieDetails', { id: imdbID });
  };

  const isFavorite = useAppSelector(selectIsFavorite(imdbID));
  const dispatch = useAppDispatch();

  const onToggle = () => {
    dispatch(toggleFavorite({ Title, Year, imdbID, Poster, Type }));
  };

  return (
    <Pressable onPress={handleOnPress}>
      <ImageBackground
        source={{ uri: Poster }}
        style={styles.container}
        imageStyle={styles.image}
      >
        <Pressable onPress={onToggle} style={styles.bookmarkContainer}>
          {isFavorite ? (
            <BookmarkFilled color="white" />
          ) : (
            <BookmarkIcon color="white" />
          )}
        </Pressable>
        <View style={styles.gradient} />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {Title}
          </Text>

          <Text style={styles.subtitle}>
            {Year} • {Type}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 220,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bookmarkContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 4,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
  image: {
    borderRadius: 10,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
  },
});

export default MovieCards;
