import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MovieSearchResponse, MovieSearchItem } from '../types/movies';
import { API_KEY } from '../constants';

type UseGetMovieListOptions = {
  search?: string;
  filter?: (movie: MovieSearchItem) => boolean;
  sort?: (a: MovieSearchItem, b: MovieSearchItem) => number;
};

export const useGetMovieList = ({
  search,
  filter,
  sort,
}: UseGetMovieListOptions = {}) => {
  return useInfiniteQuery({
    queryKey: ['movies', search],
    initialPageParam: 1,

    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get<MovieSearchResponse>(
        'https://www.omdbapi.com/',
        {
          params: {
            apikey: API_KEY,
            s: search ?? 'Marvel',
            type: 'movie',
            page: pageParam,
          },
        },
      );
      return data;
    },

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.Response === 'False') return undefined;

      const totalResults = Number(lastPage.totalResults);
      const loadedResults = allPages.flatMap(p => p.Search ?? []).length;

      return loadedResults < totalResults ? allPages.length + 1 : undefined;
    },

    // Transform data if filter or sort is provided
    select: data => {
      if (!filter && !sort) return data; // no transformation needed

      let movies = data.pages.flatMap(page => page.Search ?? []);

      if (filter) movies = movies.filter(filter);
      if (sort) movies = movies.sort(sort);

      return { ...data, pages: [{ ...data.pages[0], Search: movies }] };
    },
  });
};
