import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, IconButton, InputBase, Box, Menu, MenuItem, CssBaseline, Container, CircularProgress, Drawer, List, ListItem, ListItemText
} from "@mui/material";
import { Search, Close, WbSunny, Brightness4, Menu as MenuIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PeopleIcon from '@mui/icons-material/People';
import LanguageIcon from '@mui/icons-material/Language';
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [anchorMovie, setAnchorMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [anchorPeople, setAnchorPeople] = useState(null);
  const navigate = useNavigate();

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
        params: { query },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setLoading(false);
  };

  const handleThemeToggle = () => setIsDarkMode(!isDarkMode);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" sx={{ backgroundColor: isDarkMode ? "black" : "#032541" }}>
        <Container>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Mobile Menu Button */}
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ display: { xs: "block", md: "none" } }}>
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Box sx={{ cursor: "pointer", display: 'flex' }} onClick={() => navigate('/')}>
              <Typography variant="h6" sx={{ fontWeight: "bold", background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginRight: '6px' }}>
                NestFllix
              </Typography>
              <Box sx={{ background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)", width: '60px', height: '16px', borderRadius: '20px', marginTop: '8px' }}></Box>
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: "20px" }}>
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
              <MenuItem onClick={() => navigate('/movies/punjabi-movies')}>Punjabi movies</MenuItem>
              <MenuItem onClick={() => navigate('/movies/hindi-movies')}>Hindi movies</MenuItem>
              <MenuItem onClick={() => navigate('/movies/english-movies')}>English movies</MenuItem>
              <MenuItem onClick={() => navigate('/all-cartoons')}>Cartoons</MenuItem>
              <Typography onClick={(e) => setAnchorPeople(e.currentTarget)} sx={{ cursor: "pointer", color: "#fff" }}>
                Peoples
              </Typography>
              <Menu anchorEl={anchorPeople} open={Boolean(anchorPeople)} onClose={() => setAnchorPeople(null)}>
                <MenuItem onClick={() => { setAnchorPeople(null); navigate('/people/popularPeople') }} sx={{ color: '#0fadbf' }}>Popular People</MenuItem>
              </Menu>
            </Box>

            {/* Right Icons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton color="inherit" onClick={() => setShowSearch(!showSearch)}>
                {showSearch ? <Close sx={{ color: "#0fadbf" }} /> : <Search sx={{ color: "#0fadbf" }} />}
              </IconButton>
              <IconButton color="inherit" onClick={handleThemeToggle}>
                {isDarkMode ? <WbSunny /> : <Brightness4 />}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>

        {/* Search Bar */}
        {showSearch && (
          <Box sx={{ display: "flex", justifyContent: "center", padding: "10px", backgroundColor: "white" }}>
            <SearchContainer>
              <InputBase
                placeholder="Search for movies, TV shows, or people"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>
          </Box>
        )}

        {/* Search Results */}
        {loading ? (
          <Box display="flex" justifyContent="center" mt={2}><CircularProgress /></Box>
        ) : (
          <Box sx={{ width: "98%", maxHeight: "300px", overflowY: "auto", backgroundColor: "whitesmoke", margin: "auto" }}>
            {searchResults.map((result) => (
              <MenuItem key={result.id} onClick={() => navigate(`/zxyxvyXdF/${result.id}`)}>
                {result.title || result.name}
              </MenuItem>
            ))}
          </Box>
        )}
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle} >
        <Box sx={{ cursor: "pointer", display: 'flex', padding: '15px', backgroundColor: '#032541' }} onClick={() => {navigate('/'); setMobileOpen(false)}}>
          <Typography variant="h6" sx={{ fontWeight: "bold", background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginRight: '6px' }}>
            NestFllix
          </Typography>
          <Box sx={{ background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)", width: '40px', height: '16px', borderRadius: '20px', marginTop: '8px' }}></Box>
        
        </Box>
        <List>
          <ListItem onClick={(e) => { setAnchorMovie(e.currentTarget) }} sx={{ cursor: "pointer", fontWeight: 'bold' }}>
           <MovieFilterIcon sx={{mr:2, color:'#0fadbf'}}/> Movies
          </ListItem>

          <Menu anchorEl={anchorMovie} open={Boolean(anchorMovie)} onClose={() => setAnchorMovie(null)}>
            <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/PopularMovies'); setMobileOpen(false) }} sx={{ color: '#0fadbf' }}>
              Popular
            </MenuItem>

            <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/nowPlaying'); setMobileOpen(false) }} sx={{ color: '#0fadbf' }}>Now Playing</MenuItem>
            <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/topRated'); setMobileOpen(false) }} sx={{ color: '#0fadbf' }}>Top Rated</MenuItem>
            <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/upComing'); setMobileOpen(false) }} sx={{ color: '#0fadbf' }}>Upcoming</MenuItem>
          </Menu>
          <ListItem button onClick={() => { navigate('/movies/punjabi-movies'); setMobileOpen(false) }} sx={{ cursor: "pointer", fontWeight: 'bold' }}><LanguageIcon sx={{mr:2, color:'#0fadbf'}}/>Punjabi movies</ListItem>
          <ListItem button onClick={() => { navigate('/movies/hindi-movies'); setMobileOpen(false) }} sx={{ cursor: "pointer", fontWeight: 'bold' }}><LanguageIcon sx={{mr:2, color:'#0fadbf'}}/>Hindi movies</ListItem>
          <ListItem button onClick={() => { navigate('/movies/english-movies'); setMobileOpen(false) }} sx={{ cursor: "pointer", fontWeight: 'bold' }}><LanguageIcon sx={{mr:2, color:'#0fadbf'}}/>English movies</ListItem>
          <ListItem button onClick={() => { navigate('/all-cartoons'); setMobileOpen(false) }} sx={{ cursor: "pointer", fontWeight: 'bold' }}><ChildCareIcon sx={{mr:2, color:'#0fadbf'}}/>Cartoons</ListItem>
          <ListItem onClick={(e) => setAnchorPeople(e.currentTarget)} sx={{ cursor: "pointer", fontWeight: 'bold' }}>
            <PeopleIcon sx={{mr:2, color:'#0fadbf'}}/>Peoples
          </ListItem>
          <Menu anchorEl={anchorPeople} open={Boolean(anchorPeople)} onClose={() => setAnchorPeople(null)}>
            <MenuItem onClick={() => { setAnchorPeople(null); navigate('/people/popularPeople'); setMobileOpen(false) }} sx={{ color: '#0fadbf' }}>Popular People</MenuItem>
          </Menu>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
