import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { BottomTabBarHeightCallbackContext } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons';
import ReadMore from '@fawazahmed/react-native-read-more';
import { useMyMovies } from "../context/MyBooksProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";



type MovieItemProps = {
  movie: Movie;
};

const MovieItem = ({ movie }: MovieItemProps) => {


  const { onToggleSaved, isMovieSaved } = useMyMovies();
  const saved = isMovieSaved(movie);

  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.rating}>
          <FontAwesome name={'heart'} style={{ marginRight: 10 }} />
          {movie.rating}</Text>
        <Pressable
          style={[styles.button, saved ? { backgroundColor: 'lightgray' } : {}]}
          onPress={() => onToggleSaved(movie)}>
          <Text style={styles.buttonText}>{saved ? 'Remove' : 'Bookmark'}</Text>
        </Pressable>
        <ReadMore numberOfLines={4}>

          {movie.overview}
        </ReadMore>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
  },
  image: {
    flex: 1,
    aspectRatio: 2 / 3,
    marginHorizontal: 10,
  },
  contentContainer: {
    flex: 4,
    borderColor: "lightgray",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  overview: {
  },
  rating: {
  },
  button: {
    backgroundColor: Colors.light.tint,
    alignSelf: "flex-start",
    marginTop: 5,
    marginVertical: 10,
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "600"
  }
})

export default MovieItem;
