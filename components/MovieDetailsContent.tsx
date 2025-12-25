import { StyleSheet, Text, View } from 'react-native';
import { Rating } from '../types/movieDetails';
import { Ratings } from './Ratings';
import { StarFilled } from '../icons/StarFilled';

type MovieDetailsContentProps = {
  plot: string;
  ratings: Rating[];
  cast: string;
  imdbRating: string;
};

export const MovieDetailsContent = ({
  plot,
  ratings,
  cast,
  imdbRating,
}: MovieDetailsContentProps) => {
  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Plot Summary</Text>
        <Text style={styles.text}>{plot}</Text>
      </View>
      {ratings?.map(rating => (
        <View style={styles.section} key={rating.Source}>
          <Text style={styles.sectionTitle}>{`${rating.Source} Ratings`}</Text>
          <Ratings
            value={+rating.Value.split('/')[0]}
            maxValue={+rating.Value.split('/')[1]}
            stars={5}
          />
        </View>
      ))}
      {imdbRating && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>imdb Rating</Text>
          <Ratings value={+imdbRating.split('.')[0]} maxValue={10} stars={5} />
        </View>
      )}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cast Overview</Text>
        <Text style={styles.text}>{cast}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  text: {
    color: '#374151',
    lineHeight: 22,
  },
});
