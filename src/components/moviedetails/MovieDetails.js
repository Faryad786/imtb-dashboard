import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Container, Box, Typography, Card, CardContent, CardMedia, Button, Fade, IconButton, Modal } from '@mui/material';
import { motion } from 'framer-motion'
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
// import { Movie, Theaters, PlayCircle } from "@mui/icons-material";
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// import SentimentSatisfiedSharpIcon from '@mui/icons-material/SentimentSatisfiedSharp';
// import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
// import Diversity1SharpIcon from '@mui/icons-material/Diversity1Sharp';
const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedTrailer, setSelectedTrailer] = useState(null);
    const [selectedTrailerName, setSelectedTrailerName] = useState('');
    const [open, setOpen] = useState(false);
    const [movieUrl, setMovieUrl] = useState("");
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const url = `${process.env.REACT_APP_API_URL}/api/tmdb/dashboard/movie/${id}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);


    const handlePlayMovieClick = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tmdb/dashboard/complete/${movie.id}`);
            setMovieUrl(response.data);
            setOpen(true);
        } catch (error) {
            console.error("Error fetching movie:", error);
        }
    };

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                Loading...
            </Container>
        );
    }

    if (!movie) {
        return (
            <Container>
                <Typography variant="h4">Movie not found</Typography>
            </Container>
        );
    }


    const handlePlayClick = (trailer, title) => {
        setSelectedTrailer(trailer);
        setSelectedTrailerName(title);
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedTrailer(null);
        setSelectedTrailerName('');
    };

    const handleClose = () => setOpen(false);
    return (
        <div style={{ padding: '10px' }}>
            <Box
                sx={{
                    display: "flex",
                    gap: "20px",

                    borderRadius: "10px",
                    position: "relative",
                    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.background_path})`,
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
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
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
                            {movie.title}
                        </Typography>
                        <Box sx={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "gray" }}>
                                Release Date:
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'white' }}>
                                {new Date(movie.release_date).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "2-digit",
                                    year: "numeric",
                                })}
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
                                    value={movie.vote_average * 10}
                                    text={`${Math.round(movie.vote_average * 10)}%`}
                                    styles={buildStyles({
                                        textColor: "#fff",
                                        pathColor:
                                            movie.vote_average >= 7
                                                ? "#21c55d"
                                                : movie.vote_average >= 5
                                                    ? "#ff9800"
                                                    : "#f44336",
                                        trailColor: "rgba(255, 255, 255, 0.2)",
                                        textSize: "30px",
                                    })}
                                />
                            </Box>
                            <Typography variant="h6" sx={{ marginLeft: "10px", color: 'white' }}>
                                Watch Rating:{" "}
                                <span style={{ color: "#0fadbf" }}>{movie.vote_average}</span>
                            </Typography>
                        </Box>
                        <Typography
                            variant="h5"
                            sx={{ marginTop: "15px", fontWeight: "bold", color: "gray" }}
                        >
                            Overview
                        </Typography>
                        <Typography variant="h6" sx={{ marginTop: "5px", fontSize: "15px", color: 'white' }}>
                            {movie.overview}
                        </Typography>

                        <Box
                            sx={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}
                        >
                            {/* Writers */}
                            {/* <Box display="flex" gap={1} justifyContent="center" alignItems="center">
                                <EmojiEmotionsIcon fontSize="large" sx={{color:'yellow'}}/>
                                <Diversity1SharpIcon fontSize="large" sx={{color:'red'}}/>
                                <SentimentSatisfiedSharpIcon fontSize="large"  sx={{color:'yellow'}}/>
                                <FavoriteSharpIcon fontSize="large" sx={{color:'red'}}/>
                            </Box> */}

                            {/* Directors */}
                            {movie.directors?.length > 0 && (
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "gray" }}>
                                        Directors
                                    </Typography>
                                    {movie.directors.map((director, index) => (
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
                        <Box sx={{ marginBottom: '20px', gap: 5 }}>
                            <Button variant='contained' sx={{ marginRight: '10px', borderRadius: '20px' }} onClick={() => handlePlayClick(movie.trailer, movie.title)}>play trailer</Button>
                            <Modal
                                open={openModal}
                                onClose={handleCloseModal}
                                closeAfterTransition

                            >
                                <Fade in={openModal}>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: '60%',
                                            height: '80%',
                                            bgcolor: 'black',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            flexDirection: 'column',

                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '10px',
                                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                color: 'white',
                                                borderTopLeftRadius: '8px',
                                                borderTopRightRadius: '8px',
                                            }}
                                        >
                                            <Typography variant="h6" sx={{ color: 'white' }}>{selectedTrailerName}</Typography>
                                            <IconButton
                                                onClick={handleCloseModal}
                                                sx={{
                                                    color: 'white',
                                                }}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </Box>
                                        <iframe
                                            src={`${selectedTrailer}`}
                                            title="Trailer Video"
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </Box>
                                </Fade>
                            </Modal>
                            <Button variant="contained" sx={{ borderRadius: "20px" }} onClick={handlePlayMovieClick}>
                                Play Movie
                            </Button>

                            <Modal open={open} >
                                <Box
                                    sx={{
                                        width: "60%",
                                        height: "80%",
                                        margin: "auto",
                                        mt: 5,
                                        p: 2,
                                        backgroundColor: "black",
                                        borderRadius: 2,
                                        boxShadow: 24,
                                        display: "flex",
                                        flexDirection: "column",
                                        color:'white'
                                    }}
                                >
                                    {/* Header */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            borderBottom: "1px solid #ccc",
                                            pb: 1,
                                            mb: 2,
                                        }}
                                    >
                                        <Typography variant="h6">{movieUrl.title || "Movie"}</Typography>
                                        <IconButton onClick={handleClose}>
                                            <CloseIcon sx={{color:'white'}}/>
                                        </IconButton>
                                    </Box>

                                    {/* Movie Content */}
                                    {movieUrl.links || movieUrl.trailerUrl ? (
                                        <iframe
                                            src={movieUrl.links || movieUrl.trailerUrl || 'Please wait for few days to release this movie'}
                                            width="100%"
                                            height="100%"
                                            title={movieUrl.title}                                        
                                            
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <Typography>Loading movie...</Typography>
                                    )}
                                </Box>
                            </Modal>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Cast Section */}
            <Box sx={{ marginTop: '40px' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0fadbf' }}>Top Billed Cast</Typography>
                <Box sx={{
                    display: 'flex', gap: 2, overflowX: 'auto', whiteSpace: 'nowrap', padding: '10px 0', scrollbarColor: "#0fadbf transparent",
                    scrollbarWidth: "thin",
                }}>
                    {movie.cast?.map((actor, index) => (
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
                                <Typography variant="body2" color="text.secondary">as {actor.character}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>

            <Box sx={{ marginTop: "40px" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0fadbf" }}>
                    Movie Production Companies
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
                    {movie.productionCompanies?.map((comp, index) => (
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
                                backgroundColor: 'white'
                            }}
                        >
                            {comp.logo_path && (
                                <CardMedia
                                    component="img"
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        objectFit: "contain",
                                        margin: "auto",
                                        padding: "10px",
                                    }}
                                    image={`https://image.tmdb.org/t/p/w185${comp.logo_path}`}
                                    alt={comp.name}
                                />
                            )}
                            <CardContent>
                                <Typography variant="body2" fontWeight="bold">
                                    {comp.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </div>
    );
};

export default MovieDetails;
