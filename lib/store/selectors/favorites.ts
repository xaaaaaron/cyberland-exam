import { RootState } from '../index';

export const selectIsFavorite = (id: string) => (state: RootState) =>
  state.favorites.some(movie => movie.imdbID === id);

export const selectFavorites = (state: RootState) => state.favorites;
