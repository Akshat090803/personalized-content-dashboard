import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TrendingCarousel } from '@/components/movies/TrendingCarousel';

const Trending = () => {
  return (
    <DashboardLayout>
      <TrendingCarousel />
    </DashboardLayout>
  );
};

export default Trending;