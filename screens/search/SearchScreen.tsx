import { Button, FlatList, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import MovieItem from '../../components/MovieItem';
import { isTypeNode } from 'graphql';
import { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebase/firebaseConfig.js"


const query = gql`
query SearchMovies($query: String) {
  myQuery(query: $query) {
    results {
      title
      poster_path
      overview
      vote_average
    }
  }
}
`

export default function SearchScreen({ navigation }: RootTabScreenProps<'Search'>) {


  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Home")
      })
      .catch(error => alert(error.message))
  }

  const [search, setSearch] = useState('')

  const [runQuery, { data, loading, error }] = useLazyQuery(query)


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}>

          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search..."
          style={styles.input}
        />
        <Button
          title='search'
          color='black'
          onPress={() => runQuery({ variables: { query: search } })}
        />
      </View>
      {loading && <ActivityIndicator />}
      {error &&
        <Text>Error Fetching Data</Text>
      }
      <FlatList
        data={data?.myQuery?.results || []}

        renderItem={({ item }) => (
          <MovieItem
            movie={{
              title: item.title,
              image: `https://image.tmdb.org/t/p/w500/${item?.poster_path}`,
              overview: item.overview,
              rating: item.vote_average,
            }}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    padding: 10,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 10,
    backgroundColor: "beige",
    borderRadius: 20,
  },
  button: {
    backgroundColor: 'rgb(237, 23, 3)',
    width: '30%',
    padding: 10,
    borderRadius: 10,
    margin: "auto",
    alignContent: "center",
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  btnContainer: {
    alignItems: "center",
    backgroundColor: 'white'
  }
});
