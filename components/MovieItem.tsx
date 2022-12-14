import { View, Image, Text, StyleSheet } from "react-native";
import React from "react";
import { BottomTabBarHeightCallbackContext } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons';
import ReadMore from '@fawazahmed/react-native-read-more';



type MovieItemProps = {
  movie: Movie;
};

const MovieItem = ({ movie }: MovieItemProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{movie.title}</Text>


        <Text style={styles.rating}>
          <FontAwesome name={'heart'} />
          {movie.rating}</Text>
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
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  overview: {

  },
  rating: {

  },
})

export default MovieItem;
