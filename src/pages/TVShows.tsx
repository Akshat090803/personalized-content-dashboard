// import { DashboardLayout } from '@/components/layout/DashboardLayout';
// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
// import { fetchTvShows, resetTvShows } from '@/store/slices/moviesSlice';
// import { MovieCard } from '@/components/movies/MovieCard';

// const TVShows = () => {
//   const dispatch = useAppDispatch();
//   const { tvShows, loading } = useAppSelector((state) => state.movies);

//   useEffect(() => {
//     dispatch(resetTvShows());
//     dispatch(fetchTvShows(1));
//   }, [dispatch]);

//   return (
//     <DashboardLayout>
//       <section className="space-y-6 animate-fade-in">
//         <div>
//           <h1 className="text-3xl font-bold text-gradient-primary mb-2">
//             TV Shows
//           </h1>
//           <p className="text-muted-foreground">
//             Discover amazing TV series and shows
//           </p>
//         </div>

//         <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
//           {tvShows.map((movie, index) => (
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
//             <div className="text-muted-foreground">Loading TV shows...</div>
//           </div>
//         )}
//       </section>
//     </DashboardLayout>
//   );
// };

// export default TVShows;


import { useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { fetchTvShows, resetTvShows } from '@/store/slices/moviesSlice';
import { MovieCard } from '@/components/movies/MovieCard';
import { RefreshCw } from 'lucide-react';

const TVShows = () => {
  const dispatch = useAppDispatch();
  
  // FIX: Select the paginated list and the global loading state separately
  const { items, hasMore, currentPage } = useAppSelector((state) => state.movies.tvShows);
  const { loading } = useAppSelector((state) => state.movies);
  
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1 });

  const loadMoreShows = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(fetchTvShows(currentPage));
    }
  }, [currentPage, hasMore, loading, dispatch]);

  useEffect(() => {
    dispatch(resetTvShows());
    dispatch(fetchTvShows(1));
  }, [dispatch]);
  
  useEffect(() => {
    if (inView) {
      loadMoreShows();
    }
  }, [inView, loadMoreShows]);

  return (
    <DashboardLayout>
      <section className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-gradient-primary mb-2">
            TV Shows
          </h1>
          <p className="text-muted-foreground">
            Discover amazing TV series and shows
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
              Loading TV shows...
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

export default TVShows;