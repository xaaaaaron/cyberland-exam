import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { MovieDetails } from '../types/movieDetails';
import { API_KEY } from '../constants';

export const useGetMovieDetails = (id: string) => {
  const getMovieDetails = async (): Promise<MovieDetails> => {
    const response = await axios.get(
      `https://www.omdbapi.com/?i=${id}&apiKey=${API_KEY}`,
    );
    return response.data;
  };

  const options: UseQueryOptions<
    MovieDetails,
    Error,
    MovieDetails,
    ['movie', string]
  > = {
    queryKey: ['movie', id],
    queryFn: getMovieDetails,
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24, // 24h fresh
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  };

  const { data, isLoading } = useQuery(options);

  return { data, isLoading };
};
