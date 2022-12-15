import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";

const image = { uri: "https://source.unsplash.com/wMkaMXTJjlQ" };

const HomeScreen = () => {

  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo/logo.png')} style={styles.logo} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default HomeScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '60%',
    marginTop: 60,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'rgb(237, 23, 3)',
    width: '100%',
    padding: 15,
    paddingRight: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'rgb(237, 23, 3)',
    borderWidth: 2,

  },
  buttonOutlineText: {
    textAlign: 'center',
    color: 'rgb(237, 23, 3)',
    fontWeight: '700',
    fontSize: 16,
  },
  titleContainer: {
    width: "100%",
  },
  title: {
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
    paddingTop: 50,
    paddingBottom: 20,
    textAlign: "center"
  },
  logoContainer: {
    marginTop: 50,
  },
  logo: {
    height: 200,
    width: 200,
    borderRadius: 500,
  },
});
