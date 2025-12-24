export interface MovieSearchItem {
    Title: string;
    Year: string;
    imdbID: string;
    Type: 'movie' | 'series' | 'episode';
    Poster: string;
  }
  
  export interface MovieSearchResponse {
    Search: MovieSearchItem[];
    totalResults: string; // OMDb returns this as string
    Response: 'True' | 'False';
  }
  