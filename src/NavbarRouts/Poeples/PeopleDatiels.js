import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Card, CardMedia, CardContent, Box, Grid, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const PeopleDetails = () => {
    const location = useLocation();
    const { movie } = location.state; // Access the passed data from the previous page

    if (!movie) {
        return <Typography variant="h6">No movie data available.</Typography>;
    }

    return (
        <Container sx={{ marginTop: '30px' }}>
            <Box sx={{ display: "flex", gap: "20px" }}>
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
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0fadbf" }}>
                        {movie.name}
                    </Typography>
                    <Box sx={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "gray" }}>
                            Biography
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'white' }}>
                            {movie.overview}
                        </Typography>
                    </Box>
                    {/* Vote Average Circular Progress */}
                    <Box sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                backgroundColor: "#032541",
                                borderRadius: "50%",
                            }}
                        >
                            <CircularProgressbar
                                value={movie.popularity * 10}
                                text={`${Math.round(movie.popularity * 10)}%`}
                                styles={buildStyles({
                                    textColor: "#fff",
                                    pathColor:
                                        movie.popularity >= 7
                                            ? "#21c55d"
                                            : movie.popularity >= 5
                                                ? "#ff9800"
                                                : "#f44336",
                                    trailColor: "rgba(255, 255, 255, 0.2)",
                                    textSize: "30px",
                                })}
                            />
                        </Box>
                        <Typography variant="h6" sx={{ marginLeft: "10px", color: '#0fadbf' }}>
                            Popularity:{" "}
                            <span style={{ color: "#0fadbf" }}>{movie.popularity}</span>
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ marginTop: '30px' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    Known For:
                </Typography>
                <Grid container spacing={3}>
                    {movie.known_for.map((knownFor, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ backgroundColor: 'white', boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={`https://image.tmdb.org/t/p/w500${knownFor.poster_path}`}
                                    alt={knownFor.title}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0fadbf' }}>
                                        {knownFor.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {knownFor.release_date}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: '5px' }}>
                                        {knownFor.overview.slice(0, 100)}...
                                    </Typography>
                                    <Chip label={`Genre: ${knownFor.genre_ids.join(', ')}`} color="primary" sx={{ marginTop: '10px' }} />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default PeopleDetails;
