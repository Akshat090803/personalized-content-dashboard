import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { fetchMovieById } from '@/store/slices/moviesSlice';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Play, Calendar, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

import { toast } from 'sonner';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedMovie, loading, error } = useAppSelector((state) => state.movies);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <Skeleton className="h-48 md:h-96 w-full rounded-lg" />
          <div className="flex flex-col md:flex-row gap-8 mt-8">
            <div className="w-full md:w-1/3">
              <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              <Skeleton className="h-8 w-3/4 rounded" />
              <Skeleton className="h-6 w-1/2 rounded" />
              <Skeleton className="h-20 w-full rounded" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !selectedMovie) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-destructive">Error</h2>
          <p className="text-muted-foreground">{error || "Movie not found."}</p>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="relative h-48 md:h-96 w-full">
        <img
          src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : '/placeholder.svg'}
          alt={`${selectedMovie.Title} backdrop`}
          className="w-full h-full object-cover object-top rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 -mt-24 md:-mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <img
              src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : '/placeholder.svg'}
              alt={selectedMovie.Title}
              className="w-full h-auto aspect-[2/3] rounded-lg shadow-2xl"
            />
            <Button className="w-full mt-4 h-12 text-lg" onClick={()=>toast.success("This is a dummy button.")}>
              <Play className="mr-2 h-5 w-5" /> Play Now
            </Button>
          </div>
          <div className="w-full md:w-2/3 lg:w-3/4 text-foreground pt-4 md:pt-16">
            <h1 className="text-3xl md:text-5xl font-bold">{selectedMovie.Title}</h1>
            <p className="text-muted-foreground mt-2 text-lg">{selectedMovie.Plot}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-muted-foreground">
              {selectedMovie.imdbRating && selectedMovie.imdbRating !== "N/A" && (
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-cinema-secondary" />
                  <span>Rating: {selectedMovie.imdbRating} / 10</span>
                </div>
              )}
               {selectedMovie.Runtime && selectedMovie.Runtime !== "N/A" && (
                <div className="flex items-center gap-1">
                  <Clock className="h-5 w-5" />
                  <span>Duration: {selectedMovie.Runtime}</span>
                </div>
              )}
               {selectedMovie.Released && selectedMovie.Released !== "N/A" && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-5 w-5" />
                  <span>Released: {selectedMovie.Released}</span>
                </div>
              )}
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-3">Overview</h2>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Director:</strong> {selectedMovie.Director}</p>
                <p><strong>Writer:</strong> {selectedMovie.Writer}</p>
                <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
                <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
              </div>
            </div>
             <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-3">Cast</h2>
               <div className="flex flex-wrap gap-2">
                 {selectedMovie.Actors?.split(', ').map((actor) => (
                   <Badge key={actor} variant="secondary">{actor}</Badge>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MovieDetail;