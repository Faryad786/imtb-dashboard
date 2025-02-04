import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, CircularProgress, Card, CardMedia, CardContent, Modal, Button, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import CloseIcon from '@mui/icons-material/Close';
const TVSeriesDetails = () => {
    const { seriesId } = useParams();
    const [series, setSeries] = useState(null);
    const [credits, setCredits] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        const fetchSeriesDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tmdb/series/${seriesId}`);
                setSeries(response.data.series);
                setCredits(response.data.credits)
            } catch (err) {
                setError("Failed to load series details.");
            } finally {
                setLoading(false);
            }
        };
        fetchSeriesDetails();
    }, [seriesId]);

    const fetchTrailer = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tmdb/series/videos/${seriesId}`);
            const trailers = response.data.filter(video => video.type === "Trailer");
            if (trailers.length > 0) {
                setTrailerUrl(`https://www.youtube.com/embed/${trailers[0].key}`);
                setOpenModal(true);
            } else {
                setTrailerUrl(null);
                alert("No trailer available.");
            }
        } catch (error) {
            console.error("Error fetching trailer:", error);
        }
    };

    if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: '50px' }} />;
    if (error) return <Typography variant="h6" color="error" sx={{ textAlign: 'center', marginTop: '50px' }}>{error}</Typography>;
    if (!series) return <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '50px' }}>No series data available.</Typography>;

    return (
        <div style={{ padding: '10px' }}>

            <Box sx={{ display: "flex", flexWrap: 'wrap' }}>
                <Box
                    sx={{
                        display: "flex",
                        gap: "20px",
                        width: '100%',
                        borderRadius: "10px",
                        position: "relative",
                        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${series.backdrop_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        "&:before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "rgba(0, 0, 0, 0.6)", // Adds a dark overlay
                            zIndex: 1,
                        },
                    }}
                >
                    {/* Main Content */}
                    <Box sx={{ display: "flex", gap: "20px", zIndex: 2 }}>
                        <motion.img
                            src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                            alt={series.name}
                            style={{
                                width: "300px",
                                height: "450px",
                                borderRadius: "8px",
                                boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)'
                            }}
                            whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0, 0, 0, 0.4)" }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0fadbf" }}>
                                {series.name}
                            </Typography>

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
                                        value={series.vote_average * 10}
                                        text={`${Math.round(series.vote_average * 10)}%`}
                                        styles={buildStyles({
                                            textColor: "#fff",
                                            pathColor:
                                                series.vote_average >= 7
                                                    ? "#21c55d"
                                                    : series.vote_average >= 5
                                                        ? "#ff9800"
                                                        : "#f44336",
                                            trailColor: "rgba(255, 255, 255, 0.2)",
                                            textSize: "30px",
                                        })}
                                    />
                                </Box>
                                <Typography variant="h6" sx={{ marginLeft: "10px", color: 'white' }}>
                                    Watch Rating:{" "}
                                    <span style={{ color: "#0fadbf" }}>{series.vote_average}</span>
                                </Typography>
                            </Box>
                            <Typography
                                variant="h5"
                                sx={{ marginTop: "15px", fontWeight: "bold", color: "gray" }}
                            >
                                Overview
                            </Typography>
                            <Typography variant="h6" sx={{ marginTop: "5px", fontSize: "15px", color: 'white' }}>
                                {series.overview}
                            </Typography>

                            <Box sx={{ display: "flex" }}>


                                {/* Play Trailer Button */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={fetchTrailer}
                                    sx={{ backgroundColor: "#0fadbf", color: "white", fontWeight: "bold", marginTop: '20px' }}
                                >
                                    Play Trailer
                                </Button>
                            </Box>

                            {/* Trailer Modal */}
                            <Modal open={openModal}>
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        backgroundColor: "#000",
                                        boxShadow: 24,
                                        padding: 2,
                                        width: "80%",
                                        maxWidth: "800px",
                                        borderRadius: "10px",
                                        outline: "none",
                                    }}
                                >
                                    {/* Header */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            paddingBottom: 2,
                                            borderBottom: "1px solid rgba(255,255,255,0.2)",
                                        }}
                                    >
                                        <Typography variant="h6" color="white">
                                            {series.name}
                                        </Typography>
                                        <IconButton onClick={() => setOpenModal(false)} sx={{ color: "#fff" }}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>

                                    {/* Content */}
                                    {trailerUrl ? (
                                        <iframe
                                            width="100%"
                                            height="450"
                                            src={trailerUrl}
                                            title="Trailer"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <Typography variant="h6" color="white" sx={{ textAlign: "center" }}>
                                            Trailer not available
                                        </Typography>
                                    )}
                                </Box>
                            </Modal>



                            <Box
                                sx={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}
                            >


                                {/* Directors */}
                                {series.created_by?.length > 0 && (
                                    <Box>
                                        <Typography variant="h5" sx={{ fontWeight: "bold", color: "gray" }}>
                                            Directors
                                        </Typography>
                                        {series.created_by.map((director, index) => (
                                            <Box key={index} sx={{ textAlign: "center" }}>
                                                {director.profile_path && (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w185${director.profile_path}`}
                                                        alt={director.name}
                                                        style={{
                                                            height: "100px",
                                                            width: "100px",
                                                            borderRadius: "10%",
                                                            objectFit: "cover",
                                                            marginTop: "10px",
                                                        }}
                                                    />
                                                )}
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "bold",
                                                        color: "#0fadbf",
                                                    }}
                                                >
                                                    {director.name}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                )}

                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Box>
            <Container >
                {/* Cast Section */}
                <Box sx={{ marginTop: '40px' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0fadbf' }}>Series Cast</Typography>
                    <Box sx={{
                        display: "flex",
                        gap: 2,
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                        padding: "10px 0",
                        scrollbarColor: "#0fadbf transparent",
                        scrollbarWidth: "thin",
                    }}>
                        {credits?.cast?.map((actor, index) => (
                            <Card key={index} sx={{
                                minWidth: 150, maxWidth: 200, boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)',
                                },
                            }}>
                                {actor.profile_path && (
                                    <CardMedia
                                        component="img"
                                        height="220"
                                        image={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                        alt={actor.name}
                                    />
                                )}
                                <CardContent>
                                    <Typography variant="body2" fontWeight="bold">{actor.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">{actor.character}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
                {/* crew section */}
                <Box sx={{ marginTop: "40px" }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0fadbf" }}>
                        Full Crew
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            overflowX: "auto",
                            whiteSpace: "nowrap",
                            padding: "10px 0",
                            scrollbarColor: "#0fadbf transparent",
                            scrollbarWidth: "thin",
                        }}
                    >
                        {credits.crew?.map((member, index) => (
                            <Card
                                key={index}
                                sx={{
                                    minWidth: 150,
                                    maxWidth: 200,
                                    boxShadow: "0 4px 12px rgba(15, 173, 191, 0.5)",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 4px 12px rgba(15, 173, 191, 0.5)",
                                    },
                                }}
                            >
                                {member.profile_path ? (
                                    <CardMedia
                                        component="img"
                                        height="220"
                                        image={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                                        alt={member.name}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            height: 220,
                                            backgroundColor: "#e0e0e0",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography variant="body2" color="text.secondary">
                                            No Image
                                        </Typography>
                                    </Box>
                                )}
                                <CardContent>
                                    <Typography variant="body2" fontWeight="bold">
                                        {member.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {member.job}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default TVSeriesDetails;
