import { Search, Settings, Moon, Sun, Menu, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { toggleTheme, toggleSidebar, setSearchFocused } from '@/store/slices/uiSlice';
import { setSearchQuery, searchMovies, clearSearchResults } from '@/store/slices/moviesSlice';
import { setSettingsOpen } from '@/store/slices/preferencesSlice';
import { useState, useEffect } from 'react';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { theme, searchFocused } = useAppSelector((state) => state.ui);
  const { searchQuery, searchResults } = useAppSelector((state) => state.movies);
  const { favorites } = useAppSelector((state) => state.movies);

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  //deboumcing 
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localSearchQuery.trim()) {
        dispatch(setSearchQuery(localSearchQuery));
        dispatch(searchMovies(localSearchQuery));
      } else {
        dispatch(clearSearchResults());
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearchQuery, dispatch]);

  const handleSearchFocus = () => {
    dispatch(setSearchFocused(true));
  };

  const handleSearchBlur = () => {
    setTimeout(() => dispatch(setSearchFocused(false)), 200);
  };

  return (
    <header
      className="fixed top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-lg animate-slide-down-in w-full"
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleSidebar())}
            className="hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-gradient-primary flex items-center justify-center">
              <span className={`${theme ==='dark' ? "text-primary-foreground" : "text-black"} text-sm font-bold`}>M</span>
            </div>
            <h1 className="text-xl font-bold text-gradient-primary hidden sm:block">
              MovieHub
            </h1>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search movies..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className={`pl-10 transition-all duration-300 ${searchFocused ? 'ring-2 ring-primary/50 border-primary' : 'border-primary'
                }`}
            />
          </div>

          {/* Search Results Dropdown */}
          {searchFocused && searchResults.length > 0 && (
            <div
              className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50 animate-fade-in"
            >
              {searchResults.slice(0, 5).map((movie) => (
                <div
                  key={movie.imdbID}
                  className="flex items-center gap-3 p-3 hover:bg-accent cursor-pointer transition-colors"
                >
                  <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'}
                    alt={movie.Title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{movie.Title}</p>
                    <p className="text-sm text-muted-foreground">{movie.Year}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(setSettingsOpen(true))}
            className="hover:bg-accent"
          >
            <Settings className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleTheme())}
            className="hover:bg-accent"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent"
          >
            <User className="h-5 w-5" />
          </Button>

          {favorites.length > 0 && (
            <Badge variant="secondary" className="ml-2 hidden sm:flex">
              {favorites.length} Favorites
            </Badge>
          )}
        </div>
      </div>
    </header>
  );
};