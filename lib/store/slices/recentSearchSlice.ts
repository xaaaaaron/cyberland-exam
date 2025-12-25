import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RecentSearchState = string[];

const initialState: RecentSearchState = [];

const recentSearchSlice = createSlice({
  name: 'recentSearch',
  initialState,
  reducers: {
    addSearch(state, action: PayloadAction<string>) {
      const searchTerm = action.payload.trim();
      if (!searchTerm) return;

      // remove if already exists
      const index = state.indexOf(searchTerm);
      if (index !== -1) {
        state.splice(index, 1);
      }

      // add to top
      state.unshift(searchTerm);

      // keep max 5
      if (state.length > 5) {
        state.pop();
      }
    },

    removeSearch(state, action: PayloadAction<string>) {
      const index = state.indexOf(action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },

    clearSearches() {
      return [];
    },
  },
});

export const { addSearch, removeSearch, clearSearches } =
  recentSearchSlice.actions;

export default recentSearchSlice.reducer;
