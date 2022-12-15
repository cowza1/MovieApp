import { Text, StyleSheet, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from "../../firebase/firebaseConfig.js"
import { db } from "../../firebase/firebaseConfig.js"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, doc, setDoc } from "firebase/firestore/lite";


const image = { uri: "https://source.unsplash.com/pJadQetzTkI" };


const RegisterScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Root")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setDoc(doc(db, "users", user.uid), {
          email: email,
          username: username
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome to Fitspo! </Text>
        <Text style={styles.title}>Register your details here</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder='Profile Username'
          value={username}
          onChangeText={text => setUsername(text)}
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
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign Up!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  logo: {
    height: 120,
    width: 190,
    // borderRadius: "50%",
    // backgroundColor: "white",
    marginBottom: 50,
  },
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    // opacity: 0.8,
  },
  titleContainer: {
    // width: "100%",
  },

  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    // backgroundColor: "white",
    // paddingTop: 50,
    paddingBottom: 20,
    textAlign: "center"
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
    marginBottom: 10,
  },
  logo: {
    height: 200,
    width: 200,
    borderRadius: 500,
  },
});
