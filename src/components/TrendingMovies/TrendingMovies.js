import React, { useEffect, useState } from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import UpcomingTrailers from '../UpcomingTrailers/UpcomingTrailers';
import CurrentYearmovies from '../currentYear/CurrentYearmovies';

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState('day'); // State for time window
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}/api/tmdb/trending/movies?timeWindow=${timeWindow}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (Array.isArray(data.data.results)) {
        setMovies(data.data.results);
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
    fetchMovies();
  }, [timeWindow]);

  const handleMovieClick = (movieId) => {
    navigate(`/zxyxvyXdF/${movieId}`);
  };

  return (
    <div>
      <CurrentYearmovies/>
    <Container>
      {/* Trending Header with Button Group */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: '20px 0',
          gap: '10px'
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', color: '#0fadbf' }}
        >
          ᵀʳᵉⁿᵈⁱⁿᵍ
        </Typography>


        <Box variant="outlined" sx={{ ml: 1, border: '2px solid #032541', borderRadius: '20px' }}>
          <Button
            onClick={() => setTimeWindow('day')}
            sx={{
              width: '100px',
              height: '30px',
              backgroundColor: timeWindow === 'day' ? '#032541' : 'none',
              borderRadius: timeWindow === 'day' ? ' 20px' : '20px',
              color: timeWindow === 'day' ? '#0fadbf' : '#032541',
            }}
          >
            Today
          </Button>
          <Button
            onClick={() => setTimeWindow('week')}
            sx={{
              width: '100px',
              height: '30px',
              backgroundColor: timeWindow === 'week' ? '#032541' : 'none',
              borderRadius: timeWindow === 'week' ? ' 20px ' : '20px',
              color: timeWindow === 'week' ? '#0fadbf' : '#032541',
            }}
          >
            This week
          </Button>
        </Box>


      </Box>


      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          loading
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 2,
            padding: '10px',
            scrollbarColor: "#0fadbf transparent",
            scrollbarWidth: "thin",            
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

              {/* Vote Average Circular Progress */}
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

              {/* Movie Title */}
              <Typography
                variant="h6"
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

              {/* Release Date */}
              <Typography
                variant="h6"
                sx={{
                  fontSize: '12px',
                  textAlign: 'center',
                  marginTop: '0px',
                  color: 'gray',
                  fontWeight: 'bold',
                }}
              >
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Container>
      <UpcomingTrailers/>
    </div>
  );
};

export default TrendingMovies;


