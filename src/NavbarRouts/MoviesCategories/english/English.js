import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Container, Button, Box, Modal, IconButton, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { Close } from '@mui/icons-material';


const English = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tmdb/english-movies`, {
                    params: { page },
                });
                if (page === 1) {
                    setMovies(response.data.result);
                } else {
                    setMovies((prevMovies) => [...prevMovies, ...response.data.result]);
                }
                setHasMore(response.data.page < response.data.total_pages);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
            setLoading(false);
        };
        fetchMovies();
    }, [page]);

    const loadMoreMovies = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleCardClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
    };

    if (loading && page === 1) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div>
            <Container sx={{ marginTop: '30px' }}>
                <Typography variant='h4' sx={{ marginBottom: '20px', fontWeight: 'bold', color: '#0fadbf' }}>
                English Movies
                </Typography>
                <Grid container spacing={3}>
                    {movies.map((movie) => (
                        <Grid item xs={6} sm={3} md={2} key={movie.id}>
                            <Card
                                sx={{
                                    minWidth: isMobile ? '100%' : '100%',
                                    maxWidth: isMobile ? '100%' : '100%',
                                    cursor: 'pointer',
                                    backgroundColor: 'white',
                                    boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)',
                                    },
                                }}
                                onClick={() => handleCardClick(movie)}
                            >
                                <CardMedia component="img" height="240" image={movie.posterimage} alt={movie.title} />
                                <CardContent sx={{ position: 'relative' }}>
                                    <Typography variant="h6" sx={{ fontSize: '12px', textAlign: 'center', marginTop: '0px', color: '#0fadbf', fontWeight: 'bold' }}>
                                        {movie.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {hasMore && !loading && (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Button variant="contained" sx={{ backgroundColor: '#0fadbf', color: 'white', width: '100%', marginBottom: '20px' }} onClick={loadMoreMovies}>
                            Load More
                        </Button>
                    </div>
                )}
            </Container>
            
            {/* Movie Modal */}
            <Modal open={!!selectedMovie} >
                <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', md: '60%' },  // 90% width on mobile, 60% on larger screens
            height: { xs: '90%', md: '80%' }, // 90% height on mobile, 80% on larger screens
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: { xs: 1.5, md: 2 }, // Adjust padding for mobile
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
        }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ color: '#0fadbf', fontWeight: 'bold' }}>
                            {selectedMovie?.title}
                        </Typography>
                        <IconButton onClick={handleCloseModal}>
                            <Close />
                        </IconButton>
                    </Box>
                    <iframe
                        width="100%"
                        height="80%"
                        src={selectedMovie?.links}
                        title={selectedMovie?.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </Box>
            </Modal>
        </div>
    );
};

export default English;