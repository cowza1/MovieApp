import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from "../../firebase/firebaseConfig.js"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

// const image = { uri: "https://source.unsplash.com/pJadQetzTkI" };


const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Root")
      }
    })

    return unsubscribe
  }, [])

  const handleLogin = () => {

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
      })
      .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">

      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome back! </Text>
        <Text style={styles.title}>Login here</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Login</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  )
}
export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "black",
  },
  titleContainer: {
    // width: "100%",
  },

  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",

    paddingBottom: 20,
    textAlign: "center"
  },
  logo: {
    height: 120,
    width: 190,

    marginBottom: 50,
  },
  inputContainer: {
    width: '60%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,

  },
  buttonContainer: {
    width: '60%',
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
  },

  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: 'rgb(237, 23, 3)',
    marginTop: 5,
    borderColor: 'white',
    borderWidth: 2,

  },
  buttonOutlineText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  logoContainer: {
    marginTop: 10,
  },
  logo: {
    height: 200,
    width: 200,
    borderRadius: 500,
    marginBottom: 20,
  },
});
