import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TrendingCarousel } from '@/components/movies/TrendingCarousel';
import { MoviesGrid } from '@/components/movies/MoviesGrid';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-12 animate-fade-in">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8 animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient-primary">
            Discover Amazing Movies
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your personalized movie dashboard with trending content, favorites, and tailored recommendations
          </p>
        </div>

        {/* Trending Movies Section */}
        <TrendingCarousel  />

        {/* All Movies Section */}
        <MoviesGrid />
      </div>
    </DashboardLayout>
  );
};

export default Index;