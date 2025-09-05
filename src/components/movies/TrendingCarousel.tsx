import { useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieCard } from './MovieCard';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { fetchTrendingMovies } from '@/store/slices/moviesSlice';
import useEmblaCarousel from 'embla-carousel-react';

export const TrendingCarousel = () => {
  const dispatch = useAppDispatch();
  const { trending, loading ,error} = useAppSelector((state) => state.movies);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (trending.length === 0) {
      dispatch(fetchTrendingMovies());
    }
  }, [dispatch, trending.length]);


    if( !loading &&  trending.length === 0){
     
        return (
              <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trending Now</h2>
        </div>
           <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-destructive">Error</h2>
              <p className="text-muted-foreground">{error || "Api Daily Limit Reached."}</p>
            </div>

      </div>
        )
    }
  if (loading && trending.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trending Now</h2>
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="min-w-[280px] w-[280px]">
              <div className="bg-muted animate-pulse rounded-lg aspect-[2/3] mb-3" />
              <div className="space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-3 bg-muted animate-pulse rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6 animate-slide-up mx-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gradient-primary mb-2">
            Trending Now
          </h2>
          <p className="text-muted-foreground">
            Popular movies everyone's watching
          </p>
        </div>

        <div className="sm:flex gap-2 hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="rounded-full hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="rounded-full hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="overflow-hidden -mx-4" ref={emblaRef}>
          <div className="flex">
            {trending.map((movie, index) => (
              <div className="flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] pl-4" key={movie.imdbID}>
                <MovieCard
                  movie={movie}
                  variant="trending"
                  index={index}
                  maxHeight='max-h-96'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};