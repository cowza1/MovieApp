import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { useMyMovies } from "../context/MyBooksProvider";
import MovieItem from "../components/MovieItem";
export default function BookmarkScreen() {

  const { savedMovies } = useMyMovies();

  return (
    <View style={styles.container}>
      <FlatList
        data={savedMovies}
        renderItem={({ item }) => <MovieItem movie={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
