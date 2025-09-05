// import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import Index from "./pages/Index";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import Favorites from "./pages/Favorites";
import Trending from "./pages/Trending";
import Genre from "./pages/Genre";
import NotFound from "./pages/NotFound";
import MovieDetail from "./pages/MovieDetail";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* <Toaster /> */}
        <Sonner richColors ={true}/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv" element={<TVShows />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/genre/:genre" element={<Genre />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
