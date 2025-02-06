import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Typography, CircularProgress, Container, Button, Box, Modal, IconButton } from '@mui/material';
import axios from 'axios';
import { Close } from '@mui/icons-material';


const Cartoons = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState(null);
   

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tmdb/trending/cartoon`, {
                    params: { page },
                });
                if (page === 1) {
                    setMovies(response.data.results);
                } else {
                    setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
                }
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
            setLoading(false);
        };
        fetchMovies();
    }, [page]);

    const loadMoreMovies = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
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
                    Cartoons
                </Typography>
                <Grid container spacing={3}>
                    {movies.map((movie) => (
                        <Grid item xs={6} sm={3} md={2} key={movie.movieTitle}>
                            <Card
                                sx={{
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
                                <CardMedia component="img" height="270" image={movie.posterUrl} alt={movie.movieTitle} />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {page < totalPages && !loading && (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Button variant="contained" sx={{ backgroundColor: '#0fadbf', color: 'white', width: '100%', marginBottom: '20px' }} onClick={loadMoreMovies}>
                            Load More
                        </Button>
                    </div>
                )}
            </Container>
            
            {/* Movie Modal */}
            <Modal open={!!selectedMovie} >
    <Box
        sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '100%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
            borderRadius: 2,
            "@media (max-width:600px)": {
                width: '90%',
                height: '70%',
                p: 1,
            },
        }}
    >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#0fadbf', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                {selectedMovie?.movieTitle}
            </Typography>
            <IconButton onClick={handleCloseModal}>
                <Close />
            </IconButton>
        </Box>

        {/* Trailer Video */}
        <iframe
            width="100%"
            height="80%"
            src={selectedMovie?.trailerKey}
            title={selectedMovie?.movieTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    </Box>
</Modal>

        </div>
    );
};

export default Cartoons;