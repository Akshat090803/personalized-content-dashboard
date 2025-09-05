import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAppSelector } from '@/hooks/use-redux';
import { MovieCard } from '@/components/movies/MovieCard';
import { Heart } from 'lucide-react';

const Favorites = () => {
  const { favorites } = useAppSelector((state) => state.movies);

  return (
    <DashboardLayout>
      <section className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <Heart className="h-8 w-8 text-cinema-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gradient-primary">
              My Favorites
            </h1>
            <p className="text-muted-foreground">
              Your favorite movies and shows ({favorites.length} items)
            </p>
          </div>
        </div>

        {favorites.length > 0 ? (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {favorites.map((movie, index) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                variant="compact"
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
            <p className="text-muted-foreground">
              Start adding movies to your favorites by clicking the heart icon
            </p>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
};

export default Favorites;