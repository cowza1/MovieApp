import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const API_KEY = "sansompark::stepzen.net+1000::f2a29124dfa64073a0b375dc4c51cec6e7c043a495bec01eeda4b0df880938b6"

const client = new ApolloClient({
  uri: "https://sansompark.stepzen.net/api/lame-wasp/__graphql",
  headers: {
    Authorization: `Apikey ${API_KEY}`,
  },
  cache: new InMemoryCache(),
});


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Navigation colorScheme={colorScheme} />
        </ApolloProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
