import { Heart, Star, Play, Info, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { toggleFavorite } from '@/store/slices/moviesSlice';
import type { Movie } from '@/store/slices/moviesSlice';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
  variant?: 'default' | 'trending' | 'compact';
  index?: number;
  maxHeight?:string
}

export const MovieCard = ({ movie, variant = 'default', index = 0 ,maxHeight}: MovieCardProps) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.movies);
  const {theme , sidebarOpen} = useAppSelector((state)=>state.ui)
 
  const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(movie));
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Playing movie:', movie.Title);
  };

  const handleInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Movie info:', movie.Title);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: movie.Title,
        text: `Check out this movie: ${movie.Title}`,
        url: `https://www.imdb.com/title/${movie.imdbID}`,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      console.log('Share not supported');
    }
  };

  return (
    <div
      className="w-full animate-fade-in "
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Card className={`h-full overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col ${maxHeight && sidebarOpen ? 'max-h-80' : maxHeight} ${theme==='light' && 'boxShadow'}`}>
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'}
            alt={movie.Title}
            className="w-full h-full  object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex gap-2">
              {/* <Button size="icon" onClick={handlePlay} className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full h-12 w-12">
                <Play className="h-5 w-5" />
              </Button> */}
              <Link to={`/movie/${movie.imdbID}`}>
              <Button size="icon" variant="secondary" onClick={handleInfo} className="bg-background/90 hover:bg-background rounded-full h-12 w-12">
                <Info className="h-4 w-4" />
              </Button></Link>
            </div>
          </div>

          <Button size="icon" variant="ghost" onClick={handleToggleFavorite} className={`absolute top-2 right-2 rounded-full h-8 w-8 ${isFavorite ? 'bg-cinema-primary/90 text-white hover:bg-cinema-primary' : 'bg-background/70 hover:bg-background/90'}`}>
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>

          <Badge variant="secondary" className="absolute bottom-2 left-2 bg-background/90">
            {movie.Year}
          </Badge>
        </div>

        <CardContent className="p-3 flex flex-col flex-grow">
          <h3 className="font-semibold text-base leading-tight truncate" title={movie.Title}>
            {movie.Title}
          </h3>

          <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
            <span className="truncate">{movie.Language?.split(',')[0]}</span>
            {movie.imdbRating && movie.imdbRating !== "N/A" && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="h-3 w-3 fill-current text-cinema-secondary" />
                {/* 🍅 */}
                <span>{movie.imdbRating}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-auto pt-3">
            <Link to={`/movie/${movie.imdbID}`}>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 bg-detail hover:bg-primary hover:text-primary-foreground text-white "
            >
              Details
            </Button>

            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="h-8 w-8 rounded-full"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};