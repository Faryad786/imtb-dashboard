import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Container, Button, Box } from '@mui/material';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const Trending = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); // To track the current page
    const [hasMore, setHasMore] = useState(true); // To check if more movies are available

    useEffect(() => {
        // Fetch popular movies from the API
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tmdb/now-playing`, {
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

                setHasMore(response.data.page < response.data.total_pages); // Check if there are more pages to load
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

    return (
        <div>
            <Container sx={{ marginTop: '30px' }}>
                <Typography variant='h4' sx={{ marginBottom: '10px', fontWeight: 'bold', color: '#0fadbf' }}>
                    NowPlaying Movies
                </Typography>
                <Grid container spacing={3}>
                    {movies.map((movie) => (
                        <Grid item xs={12} sm={6} md={2} key={movie.id}>
                            <Card
                                sx={{
                                    backgroundColor: 'white',
                                    boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)',
                                      },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <CardContent sx={{ position: 'relative' }}>
                                    {/* Vote Average Circular Progress */}
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            position: 'absolute',
                                            bottom: 40,
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
                            Load More
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Trending;
