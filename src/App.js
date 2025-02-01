import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useState } from "react";
import Header from "./components/Header/Header";
import { lightTheme, darkTheme } from "../src/theme";
import TrendingMovies from "./components/TrendingMovies/TrendingMovies";

import MovieDetails from "./components/moviedetails/MovieDetails";
import Trending from "./NavbarRouts/Movies/trending/Trending";
import TopRated from "./NavbarRouts/Movies/Toprated/TopRated";
import Upcoming from "./NavbarRouts/Movies/Upcoming/Upcoming";

import TrendingTv from "./NavbarRouts/TvShows/trending/TrendingTv";
import TopRatedTv from "./NavbarRouts/TvShows/Toprated/TopRatedTv";
import UpComingTv from "./NavbarRouts/TvShows/Upcoming/UpComingTv";
import PopularPeoples from "./NavbarRouts/Poeples/PopularPeoples";
import TrendingMore from "./NavbarRouts/More/trending/TrendingMore";
import TopRatedMore from "./NavbarRouts/More/Toprated/TopRatedMore";
import UpComingMore from "./NavbarRouts/More/Upcoming/UpComingMore";
import PopularMovie from "./NavbarRouts/Movies/Popular/PopularMovie";
import PeopleDatiels from "./NavbarRouts/Poeples/PeopleDatiels";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<TrendingMovies />} />
          <Route path="/zxyxvyXdF/:id" element={<MovieDetails />} />

          {/* Navbarroutes */}
          {/* Movies */}
          <Route path="/movies/PopularMovies" element={<PopularMovie/> } />
          <Route path="/movies/nowPlaying" element={<Trending />} />
          <Route path="/movies/topRated" element={<TopRated />} />
          <Route path="/movies/upComing" element={<Upcoming />} />
          {/* TvShows */}
          <Route path='/TvShow/trending' element={<TrendingTv />} />
          <Route path="/TvShow/topRated" element={<TopRatedTv />} />
          <Route path="/TvShow/upComing" element={ <UpComingTv/>} />
          {/* Poeples */}
          <Route path="/people/popularPeople" element={<PopularPeoples />} />
          <Route path="/people/detail/:id" element={ <PeopleDatiels/>} />
          {/* More */}
          <Route path="/more/trending" element={<TrendingMore/> } />
          <Route path="/more/topRated" element={<TopRatedMore />} />
          <Route path="/more/upComing" element={<UpComingMore/> } />
        </Routes>
       
      </Router>
    </ThemeProvider>
  );
}

export default App;
