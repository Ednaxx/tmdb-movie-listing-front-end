export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  original_language: string;
  original_title: string;
  genre_ids?: number[];
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  homepage: string;
}

export interface SearchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface FavoriteMovie {
  id: number;
  tmdb_movie_id: number;
  movie_title: string;
  movie_poster_path: string | null;
  created_at: string;
}

export interface FavoriteMovieCreate {
  tmdb_movie_id: number;
  movie_title: string;
  movie_poster_path: string | null;
}

export interface ShareTokenResponse {
  share_token: string;
  share_url: string;
}
