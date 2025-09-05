// import { DashboardLayout } from '@/components/layout/DashboardLayout';
// import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
// import { fetchMoviesByGenre, resetGenreMovies } from '@/store/slices/moviesSlice';
// import { MovieCard } from '@/components/movies/MovieCard';
// import { Button } from '@/components/ui/button';

// const Genre = () => {
//   const { genre } = useParams<{ genre: string }>();
//   const dispatch = useAppDispatch();
//   const { genreMovies, loading } = useAppSelector((state) => state.movies);

//   const genreTitle = genre?.charAt(0).toUpperCase() + genre?.slice(1) || 'Genre';

//   useEffect(() => {
//     if (genre) {
//       dispatch(resetGenreMovies());
//       dispatch(fetchMoviesByGenre({ genre, page: 1 }));
//     }
//   }, [dispatch, genre]);

//   return (
//     <DashboardLayout>
//       <section className="space-y-6 animate-fade-in">
//         <div>
//           <h1 className="text-3xl font-bold text-gradient-primary mb-2">
//             {genreTitle} Movies
//           </h1>
//           <p className="text-muted-foreground">
//             Explore the best {genreTitle.toLowerCase()} movies
//           </p>
//         </div>

//         <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
//           {genreMovies.map((movie, index) => (
//             <MovieCard
//               key={movie.imdbID}
//               movie={movie}
//               variant="compact"
//               index={index}
//             />
//           ))}
//         </div>

//         {loading && (
//           <div className="flex justify-center py-8">
//             <div className="text-muted-foreground">Loading {genreTitle.toLowerCase()} movies...</div>
//           </div>
//         )}

//         {!loading && genreMovies.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-lg font-medium mb-2">No movies found</p>
//           <p className="text-muted-foreground mb-4">
//             Try refreshing to load some movies
//           </p>
//           <Button onClick={()=>{}}>
//             Load Movies
//           </Button>
//         </div>)
// }
//       </section>
//     </DashboardLayout>
//   );
// };

// export default Genre;



import { useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { fetchMoviesByGenre, resetGenreMovies } from '@/store/slices/moviesSlice';
import { MovieCard } from '@/components/movies/MovieCard';
import { RefreshCw } from 'lucide-react';

const Genre = () => {
  const { genre } = useParams<{ genre: string }>();
  const dispatch = useAppDispatch();
  
  // FIX: Select the paginated list and the global loading state separately
  const { items, hasMore, currentPage } = useAppSelector((state) => state.movies.genreMovies);
  const { loading } = useAppSelector((state) => state.movies);

  const { ref: inViewRef, inView } = useInView({ threshold: 0.1 });

  const genreTitle = genre?.charAt(0).toUpperCase() + genre?.slice(1) || 'Genre';

  const loadMoreMovies = useCallback(() => {
    if (hasMore && !loading && genre) {
      dispatch(fetchMoviesByGenre({ genre, page: currentPage }));
    }
  }, [currentPage, hasMore, loading, genre, dispatch]);
  
  useEffect(() => {
    if (genre) {
      dispatch(resetGenreMovies());
      dispatch(fetchMoviesByGenre({ genre, page: 1 }));
    }
  }, [dispatch, genre]);

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView, loadMoreMovies]);


  return (
    <DashboardLayout>
      <section className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-gradient-primary mb-2">
            {genreTitle} Movies
          </h1>
          <p className="text-muted-foreground">
            Explore the best {genreTitle.toLowerCase()} movies
          </p>
        </div>

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {items.map((movie, index) => (
            <MovieCard
              key={`${movie.imdbID}-${index}`}
              movie={movie}
              variant="compact"
              index={index}
            />
          ))}
        </div>
        
        {loading && (
          <div className="flex justify-center py-8">
             <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Loading {genreTitle.toLowerCase()} movies...
            </div>
          </div>
        )}

        {!loading && hasMore && (
          <div ref={inViewRef} className="h-10" />
        )}

        {!hasMore && items.length > 0 && (
          <p className="text-center text-muted-foreground py-8">You've reached the end!</p>
        )}
      </section>
    </DashboardLayout>
  );
};

export default Genre;