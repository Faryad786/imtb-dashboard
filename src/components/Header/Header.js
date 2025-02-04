import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Menu, MenuItem, CssBaseline, Container, CircularProgress } from "@mui/material";
import { Search, Close, WbSunny, Brightness4 } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SearchContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f1f1f1",
  padding: "5px 10px",
  borderRadius: "5px",
  width: "100%",
}));

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [anchorMovie, setAnchorMovie] = useState(null);
  const [anchorTV, setAnchorTV] = useState(null);
  const [anchorPeople, setAnchorPeople] = useState(null);
  const [anchorMore, setAnchorMore] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSearchClick = () => {
    setShowSearch(!showSearch);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#121212" : "#fff";
  }, [isDarkMode]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      fetchSearchResults(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);


  const fetchSearchResults = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tmdb/dashboard/search`, {
        params: {
          query,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setLoading(false);
  };


  const handleHomeClick = () => {
    navigate('/')
  }

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" sx={{ backgroundColor: isDarkMode ? "black" : "#032541" }}>
        <Container>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Box sx={{ display: 'flex', cursor: 'pointer' }} onClick={handleHomeClick}>
                <Typography
                  variant="h6"
                  sx={{

                    fontWeight: "bold",
                    background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginRight: '10px'
                  }}

                >
                  NestFllix
                </Typography>
                <Box sx={{ background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)", width: '60px', height: '16px', borderRadius: '20px', marginTop: '8px' }}></Box>
              </Box>
              <Typography onClick={(e) => setAnchorMovie(e.currentTarget)} sx={{ cursor: "pointer", color: "#fff" }}>
                Movies
              </Typography>

              <Menu anchorEl={anchorMovie} open={Boolean(anchorMovie)} onClose={() => setAnchorMovie(null)}>
                <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/PopularMovies'); }} sx={{ color: '#0fadbf' }}>
                  Popular
                </MenuItem>

                <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/nowPlaying') }} sx={{ color: '#0fadbf' }}>Now Playing</MenuItem>
                <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/topRated') }} sx={{ color: '#0fadbf' }}>Top Rated</MenuItem>
                <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/upComing') }} sx={{ color: '#0fadbf' }}>Upcoming</MenuItem>
              </Menu>
              {/* 
            <Typography onClick={(e) => setAnchorTV(e.currentTarget)} sx={{ cursor: "pointer", color: "#fff" }}>
              TV Shows
            </Typography> */}
              <Menu anchorEl={anchorTV} open={Boolean(anchorTV)} onClose={() => setAnchorTV(null)}>
                <MenuItem onClick={() => setAnchorTV(null)} sx={{ color: '#0fadbf' }}>Trending</MenuItem>
                <MenuItem onClick={() => setAnchorTV(null)} sx={{ color: '#0fadbf' }}>Upcoming</MenuItem>
                <MenuItem onClick={() => setAnchorTV(null)} sx={{ color: '#0fadbf' }}>Top Rated</MenuItem>
              </Menu>

              <MenuItem onClick={() =>  navigate('/movies/punjabi-movies')} sx={{ color: '#fff' }}>
                  Punjabi movies
                </MenuItem>
                <MenuItem onClick={() =>  navigate('/movies/hindi-movies')} sx={{ color: '#fff' }}>
                  Hindi movies
                </MenuItem>
                <MenuItem onClick={() =>  navigate('/movies/english-movies')} sx={{ color: '#fff' }}>
                  English movies
                </MenuItem>
                <MenuItem onClick={() =>  navigate('/all-cartoons')} sx={{ color: '#fff' }}>
                  Cartoons
                </MenuItem>

              <Typography onClick={(e) => setAnchorPeople(e.currentTarget)} sx={{ cursor: "pointer", color: "#fff" }}>
                Peoples
              </Typography>
              <Menu anchorEl={anchorPeople} open={Boolean(anchorPeople)} onClose={() => setAnchorPeople(null)}>
                <MenuItem onClick={() => { setAnchorPeople(null); navigate('/people/popularPeople') }} sx={{ color: '#0fadbf' }}>Popular People</MenuItem>
              </Menu>

              {/* <Typography onClick={(e) => setAnchorMore(e.currentTarget)} sx={{ cursor: "pointer", color: "#fff" }}>
              More
            </Typography> */}
              <Menu anchorEl={anchorMore} open={Boolean(anchorMore)} onClose={() => setAnchorMore(null)}>
                <MenuItem onClick={() => setAnchorMore(null)}>Trending</MenuItem>
                <MenuItem onClick={() => setAnchorMore(null)}>Top Rated</MenuItem>
                <MenuItem onClick={() => setAnchorMore(null)}>Upcoming</MenuItem>
              </Menu>

              
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton color="inherit" onClick={handleSearchClick}>
                {showSearch ? <Close sx={{ color: "#0fadbf" }} /> : <Search sx={{ color: "#0fadbf" }} />}
              </IconButton>
              <IconButton color="inherit" onClick={handleThemeToggle}>
                {isDarkMode ? <WbSunny /> : <Brightness4 />}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>



        {showSearch && (
          <Box sx={{ display: "flex", justifyContent: "center", padding: "10px", backgroundColor: "white", boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)' }}>
            <SearchContainer sx={{border:'1px solid #0fadbf'}}>
              <InputBase
                placeholder="Search for movies, TV shows, or people"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>
          </Box>
        )}
        {loading ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{
            width: "98%", maxHeight: "300px", overflowY: "auto", borderRadius: "8px", backgroundColor: 'whitesmoke', margin: 'auto', scrollbarColor: "#0fadbf transparent",
            scrollbarWidth: "thin",
          }}>
            {searchResults.map((result) => (
              <MenuItem
                key={result.id}
                onClick={() => { navigate(`/zxyxvyXdF/${result.id}`); setSearchQuery(''); setShowSearch(false) }}
                sx={{ padding: "10px 20px", color: "black" }}
              >
                {result.title || result.name}
              </MenuItem>
            ))}
          </Box>
        )}

      </AppBar>



    </>
  );
};

export default Header;
