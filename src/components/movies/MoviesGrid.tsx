// import { useEffect, useCallback } from 'react';
// import { useInView } from 'react-intersection-observer';
// import { MovieCard } from './MovieCard';
// import { Button } from '@/components/ui/button';
// import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
// import { fetchMovies, resetMovies } from '@/store/slices/moviesSlice';
// import { updatePreferences } from '@/store/slices/preferencesSlice';
// import { RefreshCw, Filter } from 'lucide-react';

// export const MoviesGrid = () => {
//   const dispatch = useAppDispatch();
//   const { allMovies, loading, hasMore, currentPage } = useAppSelector((state) => state.movies);
//   const { preferences } = useAppSelector((state) => state.preferences);

//   const { ref: inViewRef, inView } = useInView({
//     threshold: 0.1,
//     triggerOnce: false,
//   });

//   const loadMovies = useCallback(() => {
//     if (!loading && hasMore) {
//       dispatch(fetchMovies(currentPage));
//     }
//   }, [dispatch, loading, hasMore, currentPage]);

//   useEffect(() => {
//     if (allMovies.length === 0) {
//       loadMovies();
//     }
//   }, []);

//   useEffect(() => {
//     if (inView && hasMore && !loading) {
//       loadMovies();
//     }
//   }, [inView, hasMore, loading, loadMovies]);

//   const handleRefresh = () => {
//     dispatch(resetMovies());
//     setTimeout(() => {
//       dispatch(fetchMovies(1));
//     }, 100);
//   };

//   const handleViewModeChange = (mode: 'grid' | 'list') => {
//     dispatch(updatePreferences({ viewMode: mode }));
//   };

//   return (
//     <section
//       className="space-y-6 animate-slide-up"
//       style={{ animationDelay: '0.3s' }}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-bold mb-2">
//             All Movies
//           </h2>
//           <p className="text-muted-foreground">
//             Discover your next favorite movie
//           </p>
//         </div>

//         <div className="flex gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={handleRefresh}
//             disabled={loading}
//             className="gap-2"
//           >
//             <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
//             Refresh
//           </Button>
//           <Button variant="outline" size="sm" className="gap-2">
//             <Filter className="h-4 w-4" />
//             Filter
//           </Button>
//         </div>
//       </div>

//       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//         <div className="flex items-center gap-4">
//           <span className="text-sm text-muted-foreground">
//             View as:
//           </span>
//           <div className="flex gap-1 bg-muted rounded-lg p-1">
//             <Button
//               variant={preferences.viewMode === 'grid' ? 'default' : 'ghost'}
//               size="sm"
//               className="h-8 px-3"
//               onClick={() => handleViewModeChange('grid')}
//             >
//               Grid
//             </Button>
//             <Button
//               variant={preferences.viewMode === 'list' ? 'default' : 'ghost'}
//               size="sm"
//               className="h-8 px-3"
//               onClick={() => handleViewModeChange('list')}
//             >
//               List
//             </Button>
//           </div>
//         </div>

//         <span className="text-sm text-muted-foreground sm:ml-auto">
//           {allMovies.length} movies loaded
//         </span>
//       </div>

//       <div
//         className={`grid gap-4 sm:gap-6 ${preferences.viewMode === 'grid'
//             ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'
//             : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
//           }`}
//       >
//         {allMovies.map((movie, index) => (
//           <MovieCard
//             key={`${movie.imdbID}-${index}`}
//             movie={movie}
//             variant={preferences.viewMode === 'list' ? 'default' : 'compact'}
//             index={index}
//           />
//         ))}

//         {loading && allMovies.length > 0 && (
//           <div className="col-span-full flex justify-center py-8">
//             <div className="flex items-center gap-2 text-muted-foreground">
//               <RefreshCw className="h-4 w-4 animate-spin" />
//               Loading more movies...
//             </div>
//           </div>
//         )}

//         {hasMore && !loading && (
//           <div ref={inViewRef} className="col-span-full h-10 flex items-center justify-center">
//             <div className="text-sm text-muted-foreground">
//               Scroll for more movies
//             </div>
//           </div>
//         )}

//         {!hasMore && allMovies.length > 0 && (
//           <div className="col-span-full text-center py-8">
//             <p className="text-muted-foreground">
//               That's all the movies for now!
//             </p>
//             <Button variant="outline" onClick={handleRefresh} className="mt-4">
//               Load Fresh Content
//             </Button>
//           </div>
//         )}
//       </div>

//       {!loading && allMovies.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-lg font-medium mb-2">No movies found</p>
//           <p className="text-muted-foreground mb-4">
//             Try refreshing to load some movies
//           </p>
//           <Button onClick={handleRefresh}>
//             Load Movies
//           </Button>
//         </div>
//       )}
//     </section>
//   );
// };



import { useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { MovieCard } from './MovieCard';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { fetchMovies, resetMovies } from '@/store/slices/moviesSlice';
import { updatePreferences } from '@/store/slices/preferencesSlice';
import { RefreshCw, Filter } from 'lucide-react';

export const MoviesGrid = () => {
  const dispatch = useAppDispatch();
  const { items, hasMore, currentPage } = useAppSelector((state) => state.movies.allMovies);
  const {loading} = useAppSelector(state=>state.movies)
  const { preferences } = useAppSelector((state) => state.preferences);

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const loadMovies = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchMovies(currentPage));
    }
  }, [dispatch, loading, hasMore, currentPage]);

  useEffect(() => {
    if (items.length === 0) {
      loadMovies();
    }
  }, []);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMovies();
    }
  }, [inView, hasMore, loading, loadMovies]);

  const handleRefresh = () => {
    dispatch(resetMovies());
    setTimeout(() => {
      dispatch(fetchMovies(1));
    }, 100);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    dispatch(updatePreferences({ viewMode: mode }));
  };

  return (
    <section
      className="space-y-6 animate-slide-up"
      style={{ animationDelay: '0.3s' }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">
            For You
          </h2>
          <p className="text-muted-foreground">
            Discover your next favorite movie based on your preferences
          </p>
        </div>

        <div className="sm:flex gap-2 hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          {/* <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button> */}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-4 relative w-full">
          <span className="text-sm text-muted-foreground">
            View as:
          </span>
          <div className="flex gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={preferences.viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="h-8 px-3"
              onClick={() => handleViewModeChange('grid')}
            >
              Grid
            </Button>
            <Button
              variant={preferences.viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="h-8 px-3"
              onClick={() => handleViewModeChange('list')}
            >
              List
            </Button>
          </div>
          {/* Only visble here in mobile view */}
           <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
            className="sm:hidden absolute right-0"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        <span className="text-sm text-muted-foreground sm:ml-auto">
          {items.length} movies loaded
        </span>
      </div>

      <div
        className={`grid gap-4 sm:gap-6 ${preferences.viewMode === 'grid'
            ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
      >
        {items.map((movie, index) => (
          <MovieCard
            key={`${movie.imdbID}-${index}`}
            movie={movie}
            variant={preferences.viewMode === 'list' ? 'default' : 'compact'}
            index={index}
          />
        ))}

        {loading && items.length > 0 && (
          <div className="col-span-full flex justify-center py-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Loading more movies...
            </div>
          </div>
        )}

        {hasMore && !loading && (
          <div ref={inViewRef} className="col-span-full h-10 flex items-center justify-center">
          </div>
        )}

        {!hasMore && items.length > 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">
              That's all the movies for now!
            </p>
            <Button variant="outline" onClick={handleRefresh} className="mt-4">
              Load Fresh Content
            </Button>
          </div>
        )}
      </div>

      {!loading && items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg font-medium mb-2">No movies found</p>
          <p className="text-muted-foreground mb-4">
            Try refreshing or adjusting your preferences
          </p>
          <Button onClick={handleRefresh}>
            Load Movies
          </Button>
        </div>
      )}
    </section>
  );
};