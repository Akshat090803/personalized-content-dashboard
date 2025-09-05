// import { DashboardLayout } from '@/components/layout/DashboardLayout';
// import { MoviesGrid } from '@/components/movies/MoviesGrid';

// const Movies = () => {
//   return (
//     <DashboardLayout>
//       <MoviesGrid />
//     </DashboardLayout>
//   );
// };

// export default Movies;


import { useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MovieCard } from '@/components/movies/MovieCard';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { fetchMovies, resetMovies } from '@/store/slices/moviesSlice';
import { RefreshCw } from 'lucide-react';

const Movies = () => {
  const dispatch = useAppDispatch();
  
  // FIX: Select the paginated list and the global loading state separately
  const { items, hasMore, currentPage } = useAppSelector((state) => state.movies.allMovies);
  const { loading } = useAppSelector((state) => state.movies);

  const { ref: inViewRef, inView } = useInView({ threshold: 0.1 });

  const loadMoreMovies = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(fetchMovies(currentPage));
    }
  }, [currentPage, hasMore, loading, dispatch]);

  useEffect(() => {
    // Reset and fetch on initial mount if the list is empty
    if (items.length === 0) {
      dispatch(resetMovies());
      dispatch(fetchMovies(1));
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView, loadMoreMovies]);

  return (
    <DashboardLayout>
      <section className="space-y-6">
        <h1 className="text-3xl font-bold text-gradient-primary">All Movies</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
          {items.map((movie, index) => (
            <MovieCard key={`${movie.imdbID}-${index}`} movie={movie} variant="compact" index={index} />
          ))}
        </div>
        
        {loading && (
          <div className="flex justify-center py-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Loading movies...
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

export default Movies;