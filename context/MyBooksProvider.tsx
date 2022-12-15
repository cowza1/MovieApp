import { useEffect, createContext, useContext, ReactNode, useState, BlockquoteHTMLAttributes } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../firebase/firebaseConfig.js"
import { onAuthStateChanged } from "firebase/auth";


type MyMoviesContextType = {
  onToggleSaved: (movie: Movie) => void;
  isMovieSaved: (movie: Movie) => boolean;
  savedMovies: Movie[];
};

const MyMoviesContext = createContext<MyMoviesContextType>({
  onToggleSaved: () => { },
  isMovieSaved: () => false,
  savedMovies: [],
});

type Props = {
  children: ReactNode;
}

const MyMovieProvider = ({ children }: Props) => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (loaded) {
      persistData();
    }
  }, [savedMovies]);


  const areMoviesTheSame = (a: Movie, b: Movie) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const isMovieSaved = (movie: Movie) => {
    return savedMovies.some((savedMovie) => areMoviesTheSame(savedMovie, movie));
  };

  const onToggleSaved = (movie: Movie) => {
    if (isMovieSaved(movie)) {
      setSavedMovies(movies => movies.filter((savedMovie) => !areMoviesTheSame(savedMovie, movie))
      );
    } else {
      setSavedMovies((movies) => [movie, ...movies])
    }
  };

  const persistData = async () => {
    await AsyncStorage.setItem('moviesData', JSON.stringify(savedMovies));
  };


  const loadData = async () => {
    const dataString = await AsyncStorage.getItem('moviesData');
    if (dataString) {
      const items = JSON.parse(dataString);
      setSavedMovies(items);
    }
    setLoaded(true)
  }



  return (
    <MyMoviesContext.Provider value={{ onToggleSaved, isMovieSaved, savedMovies }}>
      {children}
    </MyMoviesContext.Provider>
  )
};

export const useMyMovies = () => useContext(MyMoviesContext);

export default MyMovieProvider
