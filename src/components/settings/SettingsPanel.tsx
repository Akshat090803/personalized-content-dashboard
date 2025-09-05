import { Palette, Monitor, Moon, Sun, Grid, List, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { setSettingsOpen, toggleFavoriteGenre, updatePreferences, resetPreferences } from '@/store/slices/preferencesSlice';
import { setTheme } from '@/store/slices/uiSlice';

const genres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama',
  'Family', 'Fantasy', 'Horror', 'Music', 'Mystery', 'Romance',
  'Sci-Fi', 'Thriller', 'War', 'Western'
];

const decades = [
  '2020s', '2010s', '2000s', '1990s', '1980s', '1970s', '1960s'
];

const themes = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
];

export const SettingsPanel = () => {
  const dispatch = useAppDispatch();
  const { isSettingsOpen, preferences } = useAppSelector((state) => state.preferences);
  const { theme } = useAppSelector((state) => state.ui);

  const handleClose = () => {
    dispatch(setSettingsOpen(false));
  };

  const handleGenreToggle = (genre: string) => {
    dispatch(toggleFavoriteGenre(genre));
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    dispatch(setTheme(newTheme));
  };

  const handleViewModeChange = (viewMode: 'grid' | 'list') => {
    dispatch(updatePreferences({ viewMode }));
  };

  const handleDecadeChange = (decade: string) => {
    dispatch(updatePreferences({ preferredDecade: decade }));
  };

  const handleAutoplayToggle = () => {
    dispatch(updatePreferences({ autoplay: !preferences.autoplay }));
  };

  const handleAdultContentToggle = () => {
    dispatch(updatePreferences({ showAdultContent: !preferences.showAdultContent }));
  };

  const handleReset = () => {
    dispatch(resetPreferences());
  };

  return (
    <Sheet open={isSettingsOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Settings & Preferences
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {themes.map((themeOption) => (
                  <Button
                    key={themeOption.value}
                    variant={theme === themeOption.value ? 'default' : 'outline'}
                    onClick={() => handleThemeChange(themeOption.value as 'light' | 'dark')}
                    className="h-12 justify-start gap-2"
                  >
                    <themeOption.icon className="h-4 w-4" />
                    {themeOption.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* View Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Grid className="h-4 w-4" />
                View Mode
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={preferences.viewMode === 'grid' ? 'default' : 'outline'}
                  onClick={() => handleViewModeChange('grid')}
                  className="h-12 justify-start gap-2"
                >
                  <Grid className="h-4 w-4" />
                  Grid
                </Button>
                <Button
                  variant={preferences.viewMode === 'list' ? 'default' : 'outline'}
                  onClick={() => handleViewModeChange('list')}
                  className="h-12 justify-start gap-2"
                >
                  <List className="h-4 w-4" />
                  List
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Favorite Genres */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Favorite Genres</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select your preferred movie genres for personalized recommendations
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">

                {genres.map((genre) => (
                  <div
                    key={genre}
                  >
                    <Badge
                      variant={preferences.favoriteGenres.includes(genre) ? 'default' : 'outline'}
                      className="cursor-pointer transition-all hover:scale-105"
                      onClick={() => handleGenreToggle(genre)}
                    >
                      {genre}
                    </Badge>
                  </div>
                ))}

              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Selected: {preferences.favoriteGenres.length} genres
              </p>
            </CardContent>
          </Card>

          {/* Preferred Decade */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preferred Decade</CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose your favorite movie era
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {decades.map((decade) => (
                  <Button
                    key={decade}
                    variant={preferences.preferredDecade === decade ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleDecadeChange(decade)}
                  >
                    {decade}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Playback Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Playback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {preferences.autoplay ? (
                    <Volume2 className="h-4 w-4" />
                  ) : (
                    <VolumeX className="h-4 w-4" />
                  )}
                  <span>Autoplay trailers</span>
                </div>
                <Switch
                  checked={preferences.autoplay}
                  onCheckedChange={handleAutoplayToggle}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span>Show adult content</span>
                <Switch
                  checked={preferences.showAdultContent}
                  onCheckedChange={handleAdultContentToggle}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full"
            >
              Reset to Defaults
            </Button>

            <Button
              onClick={handleClose}
              className="w-full"
            >
              Save Changes
            </Button>
          </div>

          {/* Stats */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Preferences saved automatically
                </p>
                <Badge variant="outline" className="text-xs">
                  CineCube v1.0
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};