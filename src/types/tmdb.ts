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
  credits?: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  videos?: {
    results: Video[];
  };
  images?: {
    backdrops: Image[];
    posters: Image[];
  };
  recommendations?: {
    results: Movie[];
  };
  similar?: {
    results: Movie[];
  };
  reviews?: {
    results: Review[];
  };
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface Image {
  file_path: string;
  width: number;
  height: number;
  aspect_ratio: number;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
}

export interface SearchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface FavoriteMovie {
  id: string;
  tmdb_movie_id: number;
  movie_title: string;
  movie_poster_path: string | null;
  added_at: string;
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
