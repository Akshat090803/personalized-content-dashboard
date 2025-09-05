import { Home, TrendingUp, Heart, Settings, Film, Tv, Star } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { setSidebarOpen } from '@/store/slices/uiSlice';
import { setSettingsOpen } from '@/store/slices/preferencesSlice';

const navigationItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Trending', href: '/trending', icon: TrendingUp },
  { name: 'Movies', href: '/movies', icon: Film },
  { name: 'TV Shows', href: '/tv', icon: Tv },
  { name: 'Favorites', href: '/favorites', icon: Heart },
];

const genreItems = [
  { name: 'Action', href: '/genre/action' },
  { name: 'Comedy', href: '/genre/comedy' },
  { name: 'Drama', href: '/genre/drama' },
  { name: 'Thriller', href: '/genre/thriller' },
  { name: 'Sci-Fi', href: '/genre/sci-fi' },
];

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { sidebarOpen, isMobile } = useAppSelector((state) => state.ui);
  const { favorites } = useAppSelector((state) => state.movies);
  const { preferences } = useAppSelector((state) => state.preferences);

  const handleLinkClick = () => {
    if (isMobile) {
      dispatch(setSidebarOpen(false));
    }
  };


  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-16 h-[calc(100vh-4rem)] w-[17.5rem] bg-card border-r border-border z-50
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full p-4 overflow-y-auto custom-scrollbar no-scrollbar">
          {/* Navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'hover:bg-accent text-foreground'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
                {item.name === 'Favorites' && favorites.length > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {favorites.length}
                  </Badge>
                )}
              </NavLink>
            ))}
          </nav>

          <Separator className="my-4" />

          {/* Genres */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-3">
              Genres
            </h3>
            <div className="space-y-1">
              {genreItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  <div className="w-2 h-2 rounded-full bg-primary/60" />
                  <span>{item.name}</span>
                  {preferences.favoriteGenres.includes(item.name) && (
                    <Star className="h-3 w-3 ml-auto text-cinema-secondary" />
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Quick Stats */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-3">
              Stats
            </h3>
            <div className="space-y-2 px-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Favorites</span>
                <Badge variant="outline">{favorites.length}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Watchlist</span>
                <Badge variant="outline">12</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">This Month</span>
                <Badge variant="outline">24</Badge>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-auto space-y-2 pt-4">
            <Button
              variant="outline"
              className="w-full justify-center "
              onClick={() => dispatch(setSettingsOpen(true))}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>

            <div className="text-xs text-muted-foreground text-center">
              MovieHub v1.0
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};