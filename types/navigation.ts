export type RootStackParamList = {
  Home: undefined;
  Favorites: undefined;
  MovieDetails: { id: string };
  Search: { initialValue?: string } | undefined;
};

export type HomeTabParamList = {
  HomeTab: undefined;
  FavoritesTab: undefined;
};
