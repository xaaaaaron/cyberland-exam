import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';

import { persistor, store } from './lib/store';
import { MoviesList } from './screens/movies';
import { Favorites } from './screens/favorites';
import { MovieDetails } from './screens/movieDetails';
import { RootStackParamList } from './types/navigation';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { SearchScreen } from './screens/search';
import { HomeIcon } from './icons/Home';
import { StarFilled } from './icons/StarFilled';

const queryClient = new QueryClient();

// create persistor
const asyncStoragePersistor = createAsyncStoragePersister({
  storage: AsyncStorage,
});

// persist the queryClient
persistQueryClient({
  queryClient,
  persister: asyncStoragePersistor,
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days cache
});

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={MoviesList} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}

function FavoritesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
    </Stack.Navigator>
  );
}

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarShowLabel: true, // ensures text label is visible
                }}
              >
                <Tab.Screen
                  name="HomeTab"
                  component={HomeStack}
                  options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                      <HomeIcon color={focused ? '#007AFF' : 'grey'} />
                    ),
                  }}
                />
                <Tab.Screen
                  name="FavoritesTab"
                  component={FavoritesStack}
                  options={{
                    title: 'Favorites',
                    tabBarIcon: ({ focused }) => (
                      <StarFilled
                        color={focused ? '#007AFF' : 'grey'}
                        size={20}
                      />
                    ),
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
