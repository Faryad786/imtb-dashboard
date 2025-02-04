import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, CircularProgress, Card, CardMedia, Button } from '@mui/material';
import { motion } from 'framer-motion';

const PeopleDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const { detail } = location.state;
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    const toggleBiography = () => {
        setIsExpanded(!isExpanded);
    };
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tmdb/${id}`);
                setMovie(response.data);
            } catch (err) {
                setError("Failed to load movie details.");
            } finally {
                setLoading(false);
            }
        };
        fetchMovieDetails();
    }, [id]);

    if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: '50px' }} />;
    if (error) return <Typography variant="h6" color="error" sx={{ textAlign: 'center', marginTop: '50px' }}>{error}</Typography>;
    if (!movie) return <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '50px' }}>No movie data available.</Typography>;


    const handleCardClick = (id) => {
        // Navigate to /zxyxvyXdF/:id
        navigate(`/zxyxvyXdF/${id}`);
    };


    const handleTvSeriesClick = (seriesId) => {
        navigate(`/detail/tv-series/${seriesId}`);
    };
    return (
        <Container sx={{ marginTop: '30px' }}>
            <Box sx={{ display: "flex", flexWrap: 'wrap' }}> {/* Removed the gap property */}
                {/* Image & Personal Info */}
                <Box sx={{ flex: '1 1 300px' }}>
                    <motion.img
                        src={`https://image.tmdb.org/t/p/w500${movie.profile_path}`}
                        alt={movie.name}
                        style={{
                            width: "300px",
                            height: "450px",
                            borderRadius: "8px",
                            boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)',
                        }}
                        whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0, 0, 0, 0.4)" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    />

                    {/* Personal Info */}
                    <Box sx={{ marginTop: "20px", background: "#f9f9f9", padding: "15px", borderRadius: "8px", width: '300px' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: "#0fadbf" }}>
                            Personal Info
                        </Typography>
                        <Typography variant="body1"><strong>Department:</strong> {movie.known_for_department}</Typography>
                        <Typography variant="body1"><strong>Birthday:</strong> {movie.birthday}</Typography>
                        <Typography variant="body1"><strong>Place of Birth:</strong> {movie.place_of_birth}</Typography>
                        <Typography variant="body1"><strong>Gender:</strong><span style={{color:'#0fadbf'}}> {detail.gender === 1 ? 'Female' : detail.gender === 2 ? 'Male' : 'Not specified'}</span></Typography>

                    </Box>
                </Box>

                {/* Biography and Known For */}
                <Box sx={{ flex: 1, maxWidth: '800px' }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0fadbf", marginBottom: '15px' }}>
                        {movie.name}
                    </Typography>
                    <Box sx={{ gap: "10px", marginTop: "5px" }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "gray" }}>
                            Biography
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'grey',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: isExpanded ? 'unset' : 3,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {movie.biography}
                        </Typography>
                        <Button variant='contained' onClick={toggleBiography}  sx={{ backgroundColor: '#0fadbf', color: 'white', marginBottom:'20px' }}>
                            {isExpanded ? 'Show Less' : 'Read More'}
                        </Button>
                    </Box>

                    {/* Known For */}
                    <Box sx={{ marginTop: '30px' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: "gray" }}>
                            Personal Images:
                        </Typography>
                        <Box
                            sx={{
                                overflowX: "auto",
                                whiteSpace: "nowrap",
                                width: "100%",
                                display: "flex",
                                gap: 2,
                                paddingBottom: 1,
                                scrollbarColor: '#0fadbf transparent',
                                scrollbarWidth: 'thin',
                            }}
                        >
                            {movie.images && movie.images.map((image, index) => (
                                <Box key={index} sx={{ textAlign: "center", flex: "0 0 auto" }}>
                                    <motion.img
                                        src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                                        alt={image.title}
                                        style={{
                                            height: "250px",
                                            width: "150px",
                                            borderRadius: "10px",
                                            boxShadow: "0 4px 12px rgba(15, 173, 191, 0.5)",
                                            objectFit: "cover",
                                            display: "block",
                                        }}
                                        whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0, 0, 0, 0.4)" }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Box>


                </Box>
                {/* Known For Movies */}
               
                <Container>
<Box sx={{ marginTop: '30px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: "gray" }}>
                        Role in movies:
                    </Typography>
                    <Box
                        sx={{
                            overflowX: "auto",
                            display: 'flex',
                            gap: 2,
                            padding: '10px',
                            scrollbarColor: '#0fadbf transparent',
                            scrollbarWidth: 'thin',
                        }}
                    >
                        {movie.movie_credits && movie.movie_credits.map((credit, index) => (
                            <Box key={index} sx={{ textAlign: "center", flex: "0 0 auto" }}>
                                <Card sx={{
                                    maxWidth: 150,
                                    boxShadow: "0 4px 12px rgba(15, 173, 191, 0.5)",
                                    borderRadius: "8px",
                                    transition: "transform 0.3s ease-in-out",
                                    cursor:'pointer'
                                }}
                                onClick={() => handleCardClick(credit.id)}
                                >
                                    <motion.div whileHover={{ scale: 1.05 }}>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={`https://image.tmdb.org/t/p/w500${credit.poster_path}`}
                                            alt={credit.title}
                                            sx={{ borderRadius: "8px 8px 0 0", objectFit: "cover" }}
                                        />
                                    </motion.div>
                                </Card>
                            </Box>
                        ))}
                    </Box>
                </Box>
                </Container>

                <Container>
                <Box sx={{ marginTop: '30px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: "gray" }}>
                        Role in TV series:
                    </Typography>
                    <Box
                        sx={{
                            overflowX: "auto",
                            display: 'flex',
                            gap: 2,
                            padding: '10px',
                            scrollbarColor: '#0fadbf transparent',
                            scrollbarWidth: 'thin',
                        }}
                    >
                        {movie.tv_credits && movie.tv_credits.map((credit, index) => (
                            <Box key={index} sx={{ textAlign: "center", flex: "0 0 auto" }}>
                                <Card sx={{
                                    maxWidth: 150,
                                    boxShadow: "0 4px 12px rgba(15, 173, 191, 0.5)",
                                    borderRadius: "8px",
                                    transition: "transform 0.3s ease-in-out",
                                    cursor:'pointer'
                                }}
                                onClick={() => handleTvSeriesClick(credit.id)}
                                >
                                    <motion.div whileHover={{ scale: 1.05 }}>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={`https://image.tmdb.org/t/p/w500${credit.poster_path}`}
                                            alt={credit.title}
                                            sx={{ borderRadius: "8px 8px 0 0", objectFit: "cover" }}
                                        />
                                    </motion.div>
                                </Card>
                            </Box>
                        ))}
                    </Box>
                    </Box>
                    </Container>
            </Box>
        </Container>
    );
};

export default PeopleDetails;
