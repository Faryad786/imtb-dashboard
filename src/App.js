import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useState } from "react";
import Header from "./components/Header/Header";
import MoviesList from "./components/Page/MoviePage";
import { lightTheme, darkTheme } from "../src/theme";

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
          <Route path="/" element={<MoviesList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
