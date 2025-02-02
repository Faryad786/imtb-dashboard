import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Menu, MenuItem, CssBaseline, Container } from "@mui/material";
import { Search, Close, WbSunny, Brightness4 } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#121212" : "#fff";
  }, [isDarkMode]);

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
              <Box sx={{display:'flex', cursor:'pointer'}}  onClick={handleHomeClick}>
            <Typography
              variant="h6"
              sx={{
                
                fontWeight: "bold",
                background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginRight:'10px'
              }}
             
            >
                IMTB
            </Typography>
                <Box sx={{background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)",width:'60px', height:'20px', borderRadius:'20px', marginTop:'6px'}}></Box>
                </Box>
            <Typography onClick={(e) => setAnchorMovie(e.currentTarget)} sx={{ cursor: "pointer", color: "#fff" }}>
              Movies
            </Typography>
            <Menu anchorEl={anchorMovie} open={Boolean(anchorMovie)} onClose={() => setAnchorMovie(null)}>
              <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/PopularMovies'); }} sx={{color:'#0fadbf'}}>
                Popular
              </MenuItem>

              <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/nowPlaying')}} sx={{color:'#0fadbf'}}>Now Playing</MenuItem>
              <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/topRated')}} sx={{color:'#0fadbf'}}>Top Rated</MenuItem>
              <MenuItem onClick={() => { setAnchorMovie(null); navigate('/movies/upComing')}} sx={{color:'#0fadbf'}}>Upcoming</MenuItem>
            </Menu>
{/* 
            <Typography onClick={(e) => setAnchorTV(e.currentTarget)} sx={{ cursor: "pointer", color: "#fff" }}>
              TV Shows
            </Typography> */}
            <Menu anchorEl={anchorTV} open={Boolean(anchorTV)} onClose={() => setAnchorTV(null)}>
              <MenuItem onClick={() => setAnchorTV(null)} sx={{color:'#0fadbf'}}>Trending</MenuItem>
              <MenuItem onClick={() => setAnchorTV(null)} sx={{color:'#0fadbf'}}>Upcoming</MenuItem>
              <MenuItem onClick={() => setAnchorTV(null)} sx={{color:'#0fadbf'}}>Top Rated</MenuItem>
            </Menu>

            <Typography onClick={(e) => setAnchorPeople(e.currentTarget)} sx={{ cursor: "pointer", color: "#fff" }}>
              People
            </Typography>
            <Menu anchorEl={anchorPeople} open={Boolean(anchorPeople)} onClose={() => setAnchorPeople(null)}>
              <MenuItem onClick={() => { setAnchorPeople(null); navigate('/people/popularPeople')}} sx={{color:'#0fadbf'}}>Popular People</MenuItem>
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
              {showSearch ? <Close /> : <Search sx={{ color: "#0fadbf" }} />}
            </IconButton>
            <IconButton color="inherit" onClick={handleThemeToggle}>
              {isDarkMode ? <WbSunny /> : <Brightness4 />}
            </IconButton>
          </Box>
          </Toolbar>
        </Container>
        {showSearch && (
  <Box 
    sx={{
      display: "flex", 
      justifyContent: "center", 
      padding: "10px",
      boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)', 
      position: 'sticky', 
      top: 0, // This ensures the element sticks to the top of the screen when you scroll
      zIndex: 1, // Ensure the search field is above other content
     
    }}
  >
    <SearchContainer>
      <InputBase placeholder="Search for movies, tv shows, or people" fullWidth />
    </SearchContainer>
  </Box>
)}

      </AppBar>

    
    </>
  );
};

export default Header;
