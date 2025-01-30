import React, { useEffect, useState } from 'react';
import { Grid, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all movies from the API
  const fetchMovies = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/tmdb/all`;  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (Array.isArray(data.results)) {
        setMovies(data.results); 
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
  }, []); // Only call on mount

  const handleMovieClick = (movieId) => {
    navigate(`/videoPlay/${movieId}`);
  };

  return (
    <div>
      <Container>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: 'center',
            margin: '20px 0',
            fontWeight: 'bold',
            color: '#fff',
            fontFamily: 'Bebas Neue',
          }}
        >
          мσνιєѕ
        </Typography>

        <Typography
          variant="h4"
          gutterBottom
          sx={{
            margin: '20px 0',
            fontWeight: 'bold',
            color: '#fff',
            fontFamily: 'Bebas Neue',
            fontSize: '20px',
          }}
        >
          All Movies
        </Typography>

        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <CircularProgressbar
              value={100}
              text={'Loading...'}
              styles={buildStyles({
                textColor: '#fff',
                pathColor: '#ff9800',
                trailColor: 'rgba(255, 255, 255, 0.2)',
              })}
            />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={3} key={movie.id} sx={{ textAlign: 'center' }}>
                <div
                  style={{
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    style={{ width: '100%', height: '250px', transition: 'filter 0.3s ease-in-out' }}
                    onError={(e) => {
                      e.target.src = '/path/to/placeholder.jpg'; // Fallback image
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '200px',
                      left: '10px',
                      width: '45px',
                      height: '45px',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CircularProgressbar
                      value={movie.vote_average * 10}
                      text={`${(movie.vote_average * 10).toFixed(0)}%`}
                      styles={buildStyles({
                        textSize: '30px',
                        pathColor:
                          movie.vote_average >= 7
                            ? '#4caf50'
                            : movie.vote_average >= 5
                            ? '#ff9800'
                            : '#f44336',
                        textColor: '#fff',
                        trailColor: 'rgba(255, 255, 255, 0.2)',
                      })}
                    />
                  </div>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      color: '#950101',
                      padding: '10px',
                      fontStyle: 'italic',
                    }}
                  >
                    {movie.title}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default MoviesList;
