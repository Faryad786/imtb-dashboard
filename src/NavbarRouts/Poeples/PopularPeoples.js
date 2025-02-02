import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Container, Button, Box } from '@mui/material';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useNavigate } from 'react-router-dom';

const PopularPeoples = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); // To track the current page
    const [hasMore, setHasMore] = useState(true); // To check if more movies are available
   const navigate  =useNavigate()
    useEffect(() => {
        // Fetch popular movies from the API
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tmdb/popular-people`, {
                    params: {
                        page: page, // Pass the current page in the API request
                    },
                });

                // If it's the first page, set the movies array
                if (page === 1) {
                    setMovies(response.data.results);
                } else {
                    setMovies((prevMovies) => [...prevMovies, ...response.data.results]); // Append new movies
                }

                setHasMore(response.data.page < response.data.total_pages); 
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, [page]);

    const loadMoreMovies = () => {
        setPage((prevPage) => prevPage + 1); // Increment page when the "Load More" button is clicked
    };

    if (loading && page === 1) {
        return <CircularProgress />;
    }

  
    const handleMovieClick = (detail) => {
      // Navigate to the PeopleDetails page, passing the movie data
      navigate(`/people/detail/${detail.id}`, { state: { detail } });
    };
    return (
        <div>
            <Container sx={{ marginTop: '30px' }}>
                <Typography variant='h4' sx={{ marginBottom: '10px', fontWeight: 'bold', color: '#0fadbf' }}>
                   Most Popular 
                </Typography>
                <Grid container spacing={3}>
                    {movies.map((detail) => (
                        <Grid item xs={12} sm={6} md={2} key={detail.id}>
                            <Card
                                sx={{
                                    backgroundColor: 'white',
                                    boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)',
                            },
                                    cursor:'pointer'
                          }}
                          onClick={() => handleMovieClick(detail)}
                            >
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={`https://image.tmdb.org/t/p/w500${detail.profile_path}`}
                                    alt={detail.title}
                                />
                                <CardContent sx={{ position: 'relative' }}>
                                    {/* Vote Average Circular Progress */}
                                    <Box
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            position: 'absolute',
                                            bottom: 55,
                                            left: 10,
                                            backgroundColor: '#032541',
                                            borderRadius: '50%',
                                        }}
                                    >
                                        <CircularProgressbar
                                            value={detail.popularity * 10}
                                            text={`${Math.round(detail.popularity * 10)}%`}
                                            styles={buildStyles({
                                                textColor: '#fff',
                                                pathColor: detail.popularity >= 7 ? '#21c55d' : detail.popularity >= 5 ? '#ff9800' : '#f44336',
                                                trailColor: 'rgba(255, 255, 255, 0.2)',
                                                textSize: '25px',
                                            })}
                                        />
                                    </Box>
                                  
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: '14px',
                                            textAlign: 'center',
                                            marginTop: '15px',
                                            color: '#0fadbf',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {detail.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {hasMore && !loading && (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#0fadbf', color: 'white', width:'100%', marginBottom:'20px' }}
                            onClick={loadMoreMovies}
                        >
                            Load More movies
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default PopularPeoples;
