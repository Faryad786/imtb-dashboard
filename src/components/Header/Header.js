import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Menu, MenuItem, CssBaseline } from "@mui/material";
import { Search, Close, WbSunny, Brightness4 } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useMediaQuery, useTheme } from '@mui/material';

const SearchContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f1f1f1",
  padding: "5px 10px",
  borderRadius: "5px",
  width: "100%",
}));

const Header = () => {
  const theme = useTheme(); // Get the theme object
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Use media query for mobile

  const [showSearch, setShowSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePeopleOpen = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePeople = () => {
    setAnchorE2(null);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode); // Toggle between dark and light mode
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = "#121212"; // Dark mode background
    } else {
      document.body.style.backgroundColor = "#fff"; // Light mode background
    }
  }, [isDarkMode]);

  return (
    <>
      <CssBaseline /> {/* Ensures baseline styles for dark/light mode */}
      <AppBar position="static" sx={{ backgroundColor: isDarkMode ? "#333" : "#032541" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
          {/* Logo on the Left */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="The Movie Database (TMDB)" width="154" height="20"/> */}
            <Box sx={{ display: "flex", gap: 3 }}>
              <Box sx={{cursor:'pointer', display:'flex'}}>
              <Typography
                variant="body1"
                sx={{
                  cursor: "pointer",
                  fontSize: "20px",
                  fontWeight: 'bold',
                  background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginRight:'5px'
                }}
                onClick={handleMenuClick}
              >
                IMTB
              </Typography>

              <Box
                sx={{
                  width: "50px",
                  height: "16px",
                  background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)",
                  borderRadius: "20px",
                  marginTop: "6px",
                  
                  cursor:'pointer'
                }}
                ></Box>
                </Box>

              <Typography variant="body1" sx={{ cursor: "pointer", fontSize: "16px", fontWeight: 600, color: "#fff" }} onClick={handleMenuClick}>Movies</Typography>
              <Typography variant="body1" sx={{ cursor: "pointer", fontSize: "16px", fontWeight: 600, color: "#fff" }} onClick={handleMenuClick}>TV Shows</Typography>
              <Typography variant="body1" sx={{ cursor: "pointer", fontSize: "16px", fontWeight: 600, color: "#fff" }} onClick={handlePeopleOpen}>People</Typography>
              <Menu anchorEl={anchorE2} open={Boolean(anchorE2)} onClose={handlePeople}>
                <MenuItem onClick={handlePeople}>Popular People</MenuItem>
              </Menu>
              <Typography variant="body1" sx={{ cursor: "pointer", fontSize: "16px", fontWeight: 600, color: "#fff" }} onClick={handleMenuClick}>More</Typography>
            </Box>
          </Box>

          {/* More Menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Trending</MenuItem>
            <MenuItem onClick={handleMenuClose}>Upcoming</MenuItem>
            <MenuItem onClick={handleMenuClose}>Top Rated</MenuItem>
          </Menu>

          {/* Search Icon and Theme Toggle on the Right */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton color="inherit" onClick={handleSearchClick}>
              {showSearch ? <Close /> : <Search sx={{ color: "#0fadbf" }} />}
            </IconButton>
            <IconButton color="inherit" onClick={handleThemeToggle}>
              {isDarkMode ? <WbSunny /> : <Brightness4 />}
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>

      {/* Search Field Below Navbar */}
      {showSearch && (
        <Box sx={{ display: "flex", justifyContent: "center", padding: "10px" }}>
          <SearchContainer>
            <InputBase placeholder="Search for movies, tv shows, or people" fullWidth />
          </SearchContainer>
        </Box>
      )}
    </>
  );
};

export default Header;
