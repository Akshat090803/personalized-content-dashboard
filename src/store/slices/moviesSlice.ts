


// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../store';

// export interface Movie {
//   imdbID: string;
//   Title: string;
//   Year: string;
//   Type: 'movie' | 'series' | 'episode';
//   Poster: string;
//   Plot?: string;
//   Director?: string;
//   Actors?: string;
//   Genre?: string;
//   Language?: string;
//   imdbRating?: string;
//   Runtime?: string;
//   isFavorite?: boolean;
//   Ratings?: { Source: string; Value: string }[];
// }

// interface PaginatedList {
//   items: Movie[];
//   currentPage: number;
//   hasMore: boolean;
// }

// interface MoviesState {
//   trending: Movie[];
//   allMovies: PaginatedList;
//   tvShows: PaginatedList;
//   genreMovies: PaginatedList;
//   favorites: Movie[];
//   searchResults: Movie[];
//   loading: boolean;
//   error: string | null;
//   searchQuery: string;
// }

// const createInitialPaginatedList = (): PaginatedList => ({
//   items: [],
//   currentPage: 1,
//   hasMore: true,
// });

// const initialState: MoviesState = {
//   trending: [],
//   allMovies: createInitialPaginatedList(),
//   tvShows: createInitialPaginatedList(),
//   genreMovies: createInitialPaginatedList(),
//   favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
//   searchResults: [],
//   loading: false,
//   error: null,
//   searchQuery: '',
// };

// const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'f0eea280';
// const OMDB_BASE_URL = 'https://www.omdbapi.com';

// const fetchMovieDetails = async (movies: Movie[]) => {
//   const detailedMovies = await Promise.all(
//     movies.map(async (movie) => {
//       try {
//         const response = await fetch(`${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&i=${movie.imdbID}`);
//         const details = await response.json();
//         return details.Response === 'True' ? { ...movie, ...details } : movie;
//       } catch (error) {
//         console.error("Failed to fetch details for:", movie.imdbID, error);
//         return movie;
//       }
//     })
//   );
//   return detailedMovies;
// };

// export const fetchTrendingMovies = createAsyncThunk(
//   'movies/fetchTrending',
//   async () => {
//     const trendingTitles = ['Avengers', 'Spider-Man', 'Batman', 'Star Wars', 'Marvel', 'Fast', 'Mission Impossible', 'John Wick', 'Jurassic'];
//     const promises = trendingTitles.map(async (title) => {
//       const response = await fetch(`${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&s=${title}&type=movie`);
//       const data = await response.json();
//       return data.Search?.[0] || null;
//     });
//     const results = (await Promise.all(promises)).filter(Boolean) as Movie[];
//     return fetchMovieDetails(results);
//   }
// );

// export const fetchMovies = createAsyncThunk(
//   'movies/fetchMovies',
//   async (page: number, thunkAPI) => {
//     const state = thunkAPI.getState() as RootState;
//     const { favoriteGenres } = state.preferences.preferences;
//     const searchGenres = favoriteGenres.length > 0 ? favoriteGenres : ['love', 'life', 'war', 'space', 'time'];
//     const randomGenre = searchGenres[Math.floor(Math.random() * searchGenres.length)];
//     const searchString = `${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&s=${randomGenre}&page=${page}&type=movie`;
//     const response = await fetch(searchString);
//     const data = await response.json();

//     if (data.Response === 'True') {
//       const detailedMovies = await fetchMovieDetails(data.Search);
//       return { movies: detailedMovies, hasMore: page < Math.ceil(data.totalResults / 10) };
//     }
//     return { movies: [], hasMore: false };
//   }
// );

// export const fetchTvShows = createAsyncThunk(
//   'movies/fetchTvShows',
//   async (page: number) => {
//     const searchTerms = ['game', 'king', 'star', 'dark', 'money'];
//     const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
//     const response = await fetch(`${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&s=${randomTerm}&page=${page}&type=series`);
//     const data = await response.json();

//     if (data.Response === 'True') {
//       const detailedShows = await fetchMovieDetails(data.Search);
//       return { movies: detailedShows, hasMore: page < Math.ceil(data.totalResults / 10) };
//     }
//     return { movies: [], hasMore: false };
//   }
// );

// export const fetchMoviesByGenre = createAsyncThunk(
//   'movies/fetchMoviesByGenre',
//   async ({ genre, page }: { genre: string, page: number }) => {
//     const response = await fetch(`${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&s=${genre}&page=${page}&type=movie`);
//     const data = await response.json();

//     if (data.Response === 'True') {
//       const detailedMovies = await fetchMovieDetails(data.Search);
//       return { movies: detailedMovies, hasMore: page < Math.ceil(data.totalResults / 10) };
//     }
//     return { movies: [], hasMore: false };
//   }
// );

// export const searchMovies = createAsyncThunk(
//   'movies/searchMovies',
//   async (query: string) => {
//     if (!query.trim()) return [];
//     const response = await fetch(`${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`);
//     const data = await response.json();
//     return data.Response === 'True' ? data.Search as Movie[] : [];
//   }
// );

// const moviesSlice = createSlice({
//   name: 'movies',
//   initialState,
//   reducers: {
//     toggleFavorite: (state, action: PayloadAction<Movie>) => {
//       const movie = action.payload;
//       const existingIndex = state.favorites.findIndex(fav => fav.imdbID === movie.imdbID);
//       if (existingIndex >= 0) {
//         state.favorites.splice(existingIndex, 1);
//       } else {
//         state.favorites.push({ ...movie, isFavorite: true });
//       }
//       localStorage.setItem('favorites', JSON.stringify(state.favorites));
//     },
//     setSearchQuery: (state, action: PayloadAction<string>) => {
//       state.searchQuery = action.payload;
//     },
//     clearSearchResults: (state) => {
//       state.searchResults = [];
//       state.searchQuery = '';
//     },
//     resetMovies: (state) => {
//       state.allMovies = createInitialPaginatedList();
//     },
//     resetTvShows: (state) => {
//       state.tvShows = createInitialPaginatedList();
//     },
//     resetGenreMovies: (state) => {
//       state.genreMovies = createInitialPaginatedList();
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTrendingMovies.pending, (state) => {
//         state.loading = true; state.error = null;
//       })
//       .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
//         state.loading = false; state.trending = action.payload;
//       })
//       .addCase(fetchTrendingMovies.rejected, (state, action) => {
//         state.loading = false; state.error = action.error.message || 'Failed to fetch trending movies';
//       })
//       .addCase(fetchMovies.pending, (state) => {
//         state.loading = true; state.error = null;
//       })
//       .addCase(fetchMovies.fulfilled, (state, action) => {
//         state.loading = false;
//         state.allMovies.items.push(...action.payload.movies);
//         state.allMovies.hasMore = action.payload.hasMore;
//         state.allMovies.currentPage += 1;
//       })
//       .addCase(fetchMovies.rejected, (state, action) => {
//         state.loading = false; state.error = action.error.message || 'Failed to fetch movies';
//       })
//       .addCase(fetchTvShows.pending, (state) => {
//         state.loading = true; state.error = null;
//       })
//       .addCase(fetchTvShows.fulfilled, (state, action) => {
//         state.loading = false;
//         state.tvShows.items.push(...action.payload.movies);
//         state.tvShows.hasMore = action.payload.hasMore;
//         state.tvShows.currentPage += 1;
//       })
//       .addCase(fetchTvShows.rejected, (state, action) => {
//         state.loading = false; state.error = action.error.message || 'Failed to fetch TV shows';
//       })
//       .addCase(fetchMoviesByGenre.pending, (state) => {
//         state.loading = true; state.error = null;
//       })
//       .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
//         state.loading = false;
//         state.genreMovies.items.push(...action.payload.movies);
//         state.genreMovies.hasMore = action.payload.hasMore;
//         state.genreMovies.currentPage += 1;
//       })
//       .addCase(fetchMoviesByGenre.rejected, (state, action) => {
//         state.loading = false; state.error = action.error.message || 'Failed to fetch genre movies';
//       })
//       .addCase(searchMovies.fulfilled, (state, action) => {
//         state.searchResults = action.payload;
//       });
//   },
// });

// export const {
//   toggleFavorite,
//   setSearchQuery,
//   clearSearchResults,
//   resetMovies,
//   resetTvShows,
//   resetGenreMovies
// } = moviesSlice.actions;
// export default moviesSlice.reducer;

//!--
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: 'movie' | 'series' | 'episode';
  Poster: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  Genre?: string;
  Language?: string;
  imdbRating?: string;
  Runtime?: string;
  Released?: string;
  Writer?: string;
  isFavorite?: boolean;
  Ratings?: { Source: string; Value: string }[];
}

interface PaginatedList {
  items: Movie[];
  currentPage: number;
  hasMore: boolean;
}

interface MoviesState {
  trending: Movie[];
  allMovies: PaginatedList;
  tvShows: PaginatedList;
  genreMovies: PaginatedList;
  favorites: Movie[];
  searchResults: Movie[];
  selectedMovie: Movie | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const createInitialPaginatedList = (): PaginatedList => ({
  items: [],
  currentPage: 1,
  hasMore: true,
});

const initialState: MoviesState = {
  trending: [],
  allMovies: createInitialPaginatedList(),
  tvShows: createInitialPaginatedList(),
  genreMovies: createInitialPaginatedList(),
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  searchResults: [],
  selectedMovie: null,
  loading: false,
  error: null,
  searchQuery: '',
};

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'f0eea280';
const OMDB_BASE_URL = 'https://www.omdbapi.com';

const fetchMovieDetails = async (movies: Movie[]) => {
  const detailedMovies = await Promise.all(
    movies.map(async (movie) => {
      try {
        const response = await fetch(`${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&i=${movie.imdbID}&plot=full`);
        const details = await response.json();
        return details.Response === 'True' ? { ...movie, ...details } : movie;
      } catch (error) {
        console.error("Failed to fetch details for:", movie.imdbID, error);
        return movie;
      }
    })
  );
  return detailedMovies;
};

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id: string) => {
    const response = await fetch(`${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`);
    const data = await response.json();
    if (data.Response === 'True') {
      return data as Movie;
    }
    throw new Error(data.Error || 'Failed to fetch movie details.');
  }
);


export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrending',
  async () => {
    const trendingTitles = ['Avengers', 'Spider-Man', 'Batman', 'Star Wars', 'Marvel', 'Fast', 'Mission Impossible', 'John Wick', 'Jurassic'];
    const promises = trendingTitles.map(async (title) => {
      const response = await fetch(
        `${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&s=${title}&type=movie`
      );
      const data = await response.json();
      return data.Search?.[0] || null;
    });
    const results = (await Promise.all(promises)).filter(Boolean) as Movie[];
    return fetchMovieDetails(results);
  }
);

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (page: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { favoriteGenres } = state.preferences.preferences;
    const searchGenres = favoriteGenres.length > 0 ? favoriteGenres : ['love', 'life', 'war', 'space', 'time'];
    const randomGenre = searchGenres[Math.floor(Math.random() * searchGenres.length)];
    const searchString = `${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&s=${randomGenre}&page=${page}&type=movie`;
    const response = await fetch(searchString);
    const data = await response.json();

    if (data.Response === 'True') {
      const detailedMovies = await fetchMovieDetails(data.Search);
      return { movies: detailedMovies, hasMore: page < Math.ceil(data.totalResults / 10) };
    }
    return { movies: [], hasMore: false };
  }
);

export const fetchTvShows = createAsyncThunk(
  'movies/fetchTvShows',
  async (page: number) => {
    const searchTerms = ['game', 'king', 'star', 'dark', 'money'];
    const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    const response = await fetch(`${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&s=${randomTerm}&page=${page}&type=series`);
    const data = await response.json();

    if (data.Response === 'True') {
      const detailedShows = await fetchMovieDetails(data.Search);
      return { movies: detailedShows, hasMore: page < Math.ceil(data.totalResults / 10) };
    }
    return { movies: [], hasMore: false };
  }
);

export const fetchMoviesByGenre = createAsyncThunk(
  'movies/fetchMoviesByGenre',
  async ({ genre, page }: { genre: string, page: number }) => {
    const response = await fetch(`${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&s=${genre}&page=${page}&type=movie`);
    const data = await response.json();

    if (data.Response === 'True') {
      const detailedMovies = await fetchMovieDetails(data.Search);
      return { movies: detailedMovies, hasMore: page < Math.ceil(data.totalResults / 10) };
    }
    return { movies: [], hasMore: false };
  }
);

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (query: string) => {
    if (!query.trim()) return [];
    const response = await fetch(`${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.Response === 'True' ? data.Search as Movie[] : [];
  }
);


const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const existingIndex = state.favorites.findIndex(fav => fav.imdbID === movie.imdbID);
      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push({ ...movie, isFavorite: true });
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
    },
    resetMovies: (state) => {
      state.allMovies = createInitialPaginatedList();
    },
    resetTvShows: (state) => {
      state.tvShows = createInitialPaginatedList();
    },
    resetGenreMovies: (state) => {
      state.genreMovies = createInitialPaginatedList();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.loading = false; state.trending = action.payload;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false; state.error = action.error.message || 'Failed to fetch trending movies';
      })
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.allMovies.items.push(...action.payload.movies);
        state.allMovies.hasMore = action.payload.hasMore;
        state.allMovies.currentPage += 1;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false; state.error = action.error.message || 'Failed to fetch movies';
      })
      .addCase(fetchTvShows.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(fetchTvShows.fulfilled, (state, action) => {
        state.loading = false;
        state.tvShows.items.push(...action.payload.movies);
        state.tvShows.hasMore = action.payload.hasMore;
        state.tvShows.currentPage += 1;
      })
      .addCase(fetchTvShows.rejected, (state, action) => {
        state.loading = false; state.error = action.error.message || 'Failed to fetch TV shows';
      })
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.genreMovies.items.push(...action.payload.movies);
        state.genreMovies.hasMore = action.payload.hasMore;
        state.genreMovies.currentPage += 1;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.loading = false; state.error = action.error.message || 'Failed to fetch genre movies';
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedMovie = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movie details.';
      });
  },
});

export const {
  toggleFavorite,
  setSearchQuery,
  clearSearchResults,
  resetMovies,
  resetTvShows,
  resetGenreMovies
} = moviesSlice.actions;
export default moviesSlice.reducer;