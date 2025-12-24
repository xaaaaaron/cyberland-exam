import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieSearchItem } from '../../../types/movies';

const initialState: MovieSearchItem[] = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<MovieSearchItem>) {
      const movie = action.payload;

      const index = state.findIndex(item => item.imdbID === movie.imdbID);

      if (index !== -1) {
        // remove favorite
        state.splice(index, 1);
      } else {
        // add favorite
        state.push(movie);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
