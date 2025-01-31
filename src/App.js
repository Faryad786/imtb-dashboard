import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useState } from "react";
import Header from "./components/Header/Header";
import { lightTheme, darkTheme } from "../src/theme";
import TrendingMovies from "./components/TrendingMovies/TrendingMovies";

import MovieDetails from "./components/moviedetails/MovieDetails";

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
        </Routes>
       
      </Router>
    </ThemeProvider>
  );
}

export default App;
