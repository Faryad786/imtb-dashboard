import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Menu, MenuItem } from "@mui/material";
import { Search, Close } from "@mui/icons-material";
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

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#032541" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
          {/* Logo on the Left */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Logo */}
            {/* <Typography variant="h6" sx={{ cursor: "pointer", fontWeight: "bold" }}>
              IMTB ----
            </Typography> */}
                      <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="The Movie Database (TMDB)" width="154" height="20"/>

            {/* Navbar Links */}
            <Box sx={{ display: "flex", gap: 3 }}>
              <Typography
                variant="body1"
                sx={{
                  cursor: "pointer",
                  fontSize: "16px",
                  fontFamily: "Source Sans Pro, Arial, sans-serif",
                  fontWeight: 600,
                  color: "#fffff",
                  textTransform: "capitalize",
                  letterSpacing: "0.5px",
                }}
                onClick={handleMenuClick}
              >
                Movies
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  cursor: "pointer",
                  fontSize: "16px",
                  fontFamily: "Source Sans Pro, Arial, sans-serif",
                  fontWeight: 600,
                  color: "#fffff",
                  textTransform: "capitalize",
                  letterSpacing: "0.5px",
                }}
                onClick={handleMenuClick}
              >
                TV Shows
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  cursor: "pointer",
                  fontSize: "16px",
                  fontFamily: "Source Sans Pro, Arial, sans-serif",
                  fontWeight: 600,
                  color: "#fffff",
                  textTransform: "capitalize",
                  letterSpacing: "0.5px",
                }}
                onClick={handlePeopleOpen}
              >
                People
              </Typography>
              <Menu anchorEl={anchorE2} open={Boolean(anchorE2)} onClose={handlePeople}>
                <MenuItem onClick={handlePeople}>Popular People</MenuItem>
              </Menu>
              <Typography
                variant="body1"
                sx={{
                  cursor: "pointer",
                  fontSize: "16px",
                  fontFamily: "Source Sans Pro, Arial, sans-serif",
                  fontWeight: 600,
                  color: "#fffff",
                  textTransform: "capitalize",
                  letterSpacing: "0.5px",
                }}
                onClick={handleMenuClick}
              >
                More
              </Typography>
            </Box>
          </Box>

          {/* More Menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Trending</MenuItem>
            <MenuItem onClick={handleMenuClose}>Upcoming</MenuItem>
            <MenuItem onClick={handleMenuClose}>Top Rated</MenuItem>
          </Menu>

          {/* Search Icon on the Right */}
          <Box>
            <IconButton color="inherit" onClick={handleSearchClick}>
              {showSearch ? <Close /> : <Search />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Search Field Below Navbar */}
      {showSearch && (
        <Box sx={{ display: "flex", justifyContent: "center", padding: "10px" }}>
          <SearchContainer>
            <InputBase placeholder="Search for a movies,tvshows,person" fullWidth />
          </SearchContainer>
        </Box>
      )}
    </>
  );
};

export default Header;
