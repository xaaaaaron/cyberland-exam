import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { RootStackParamList } from '../types/navigation';
import { useGetMovieDetails } from '../hooks/useGetMovieDetails';
import { BackButton } from '../components/BackButton';
import { BookmarkIcon } from '../icons/Bookmark';
import { MovieDetailsCard } from '../components/MovieDetails';
import { MovieDetailsContent } from '../components/MovieDetailsContent';
import { useAppDispatch, useAppSelector } from '../lib/store';
import { selectIsFavorite } from '../lib/store/selectors/favorites';
import { toggleFavorite } from '../lib/store/slices/moviesSlice';
import { BookmarkFilled } from '../icons/BookmarkFilled';

const { width } = Dimensions.get('window');

type Route = NativeStackScreenProps<
  RootStackParamList,
  'MovieDetails'
>['route'];

export const MovieDetails = ({ route }: { route: Route }) => {
  const { data, isLoading } = useGetMovieDetails(route.params.id);
  const navigation = useNavigation();
  const isFavorite = useAppSelector(selectIsFavorite(route.params.id));
  const dispatch = useAppDispatch();

  if (isLoading) return <Text>Loading ... </Text>;

  if (!data) return;

  const { imdbID, Year, Poster, Type, Title } = data;

  const onToggle = () => {
    dispatch(
      toggleFavorite({
        imdbID,
        Year,
        Poster,
        Type,
        Title,
      }),
    );
  };

  if (!data) return null;

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      {/* HERO */}
      <ImageBackground
        source={{ uri: data.Poster }}
        style={styles.hero}
        blurRadius={2}
      >
        {/* HEADER */}
        <SafeAreaView style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />
          <Pressable onPress={onToggle}>
            {isFavorite ? (
              <BookmarkFilled size={24} color="#fff" />
            ) : (
              <BookmarkIcon size={24} color="#fff" />
            )}
          </Pressable>
        </SafeAreaView>

        {/* HERO TEXT */}
        <View style={styles.heroText}>
          <Text style={styles.year}>{data.Year}</Text>
          <Text style={styles.heroTitle} numberOfLines={2}>
            {data.Title}
          </Text>
        </View>
      </ImageBackground>

      {/* MOVIE CARD */}
      <MovieDetailsCard
        genre={data.Genre}
        poster={data.Poster}
        country={data.Country}
        director={data.Director}
      />

      {/* CONTENT */}
      <MovieDetailsContent plot={data.Plot} ratings={data.Ratings} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  hero: {
    width,
    height: 280,
    justifyContent: 'space-between',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  heroText: {
    paddingLeft: 140,
    paddingBottom: 10,
  },
  year: {
    color: '#e5e7eb',
    fontSize: 14,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
});
