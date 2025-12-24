import { Image, StyleSheet, Text, View } from 'react-native';

type MovieDetailsCardProps = {
  poster: string;
  country: string;
  director: string;
  genre: string;
};

export const MovieDetailsCard = ({
  poster,
  country,
  director,
  genre,
}: MovieDetailsCardProps) => {
  return (
    <>
      <View style={styles.card}>
        <View style={styles.shadow}>
          <Image
            source={{ uri: poster }}
            style={styles.poster}
            resizeMode="contain"
          />
        </View>
        <View style={styles.meta}>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            {genre?.split(',').map(data => (
              <View key={data} style={styles.chip}>
                <Text style={{ color: 'white' }}>{data}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.sub}>{country}</Text>
          <Text style={styles.sub}>{director}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: 'grey',
    borderRadius: 12,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 12,
    borderRadius: 12,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 16,
  },

  card: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: -70,
  },
  meta: {
    marginTop: 40,
    flex: 1,
    marginLeft: 6,
    justifyContent: 'center',
    gap: 6,
  },
  sub: {
    color: 'black',
  },
});
