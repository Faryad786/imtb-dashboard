import React, { useEffect, useState, useRef } from 'react';
import { Typography, Container, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null); // Reference to the scroll container

  const fetchMovies = async (pageNumber) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/tmdb/popular?page=${pageNumber}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (Array.isArray(data.results)) {
        setMovies((prevMovies) => [...prevMovies, ...data.results]); // Append the new movies to the existing list
        setTotalPages(data.total_pages); // Set total pages from the API response
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]); // Fetch new page data when the page state changes

  useEffect(() => {
    // Only add the event listener if the container is present
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      if (scrollContainer) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
        if (scrollLeft + clientWidth >= scrollWidth - 10 && page < totalPages) {
          setPage(page + 1); // Load the next page
        }
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [page, totalPages]); // Re-run when page or totalPages changes

  const handleMovieClick = (movieId) => {
    navigate(`/zxyxvyXdF/${movieId}`);
  };

  return (
    <div>
      <Container>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            margin: '20px 0',
            fontWeight: 'bold',
            color: '#0fadbf',
          }}
        >
          What's Popular
        </Typography>
        {loading && page === 1 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress/>
          </Box>
        ) : (
          <Box
            ref={scrollContainerRef} 
            sx={{
              display: 'flex',
              overflowX: 'auto',
              gap: 2,
              padding: '10px',
              scrollbarColor: '#0fadbf transparent',
              scrollbarWidth: 'thin',
            }}
          >
            {movies.map((movie) => (
              <Box
                key={movie.id}
                sx={{
                  minWidth: '14.28%',
                  maxWidth: '14.28%',
                  textAlign: 'center',
                  flexShrink: 0,
                  cursor: 'pointer',
                  position: 'relative',
                  boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)',
                  },
                }}
                onClick={() => handleMovieClick(movie.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  style={{ width: '100%', height: '250px', borderRadius: '8px' }}
                  onError={(e) => (e.target.src = '/path/to/placeholder.jpg')}
                />

                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    position: 'absolute',
                    bottom: 75,
                    left: 10,
                    backgroundColor: '#032541',
                    borderRadius: '50%',
                  }}
                >
                  <CircularProgressbar
                    value={movie.vote_average * 10}
                    text={`${Math.round(movie.vote_average * 10)}%`}
                    styles={buildStyles({
                      textColor: '#fff',
                      pathColor: movie.vote_average >= 7 ? '#21c55d' : movie.vote_average >= 5 ? '#ff9800' : '#f44336',
                      trailColor: 'rgba(255, 255, 255, 0.2)',
                      textSize: '30px',
                    })}
                  />
                </Box>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: '#0fadbf',
                    padding: '10px',
                    fontSize: '12px',
                    textAlign: 'center',
                    marginBottom: '0px',
                  }}
                >
                  {movie.title}
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontSize: '12px',
                    textAlign: 'center',
                    marginTop: '0px',
                    left: 10,
                    color: 'gray',
                    fontWeight: 'bold',
                  }}
                >
                  {new Date(movie.release_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </div>
  );
};

export default PopularMovies;
