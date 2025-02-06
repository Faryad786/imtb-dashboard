import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {

    Typography,
    CircularProgress,
    Container,
    Box,
    IconButton,
    Modal,
    Backdrop,
    Fade,
    Button,
    useMediaQuery
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import PopularMovies from '../PopularMovies/PopularMovies';

const UpcomingTrailers = () => {
    const [trailers, setTrailers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedTrailer, setSelectedTrailer] = useState(null);
    const [selectedTrailerName, setSelectedTrailerName] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');
    const [timeWindow, setTimeWindow] = useState('day');
    const isMobile = useMediaQuery("(max-width:600px)");
    const handleMouseEnter = (posterPath) => {
        setBackgroundImage(posterPath);
    };

    const handleMouseLeave = (posterPath) => {
        setBackgroundImage(posterPath);
    };

    useEffect(() => {
        setLoading(true); // Start loading when API call is triggered
        const apiUrl = timeWindow === 'day'
            ? `${process.env.REACT_APP_API_URL}/api/tmdb/dashboard/popular/trailer`
            : `${process.env.REACT_APP_API_URL}/api/tmdb/dashboard/trailer`;

        axios.get(apiUrl)
            .then(response => {
                setTrailers(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Something went wrong while fetching trailers');
                setLoading(false);
            });
    }, [timeWindow]); // Re-run the effect when timeWindow changes

    const handlePlayClick = (trailerKey, trailerName) => {
        setSelectedTrailer(trailerKey);
        setSelectedTrailerName(trailerName);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedTrailer(null);
        setSelectedTrailerName('');
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '60vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }


    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <div>
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '20px 0',
                        gap: '10px',

                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 'bold', color: '#0fadbf' }}
                    >
                        Trailers
                    </Typography>
                    <Box variant="outlined" sx={{ ml: 1, border: '2px solid #032541', borderRadius: '20px' }}>
                        <Button
                            onClick={() => setTimeWindow('day')}
                            sx={{
                                width: '100px',
                                height: '30px',
                                backgroundColor: timeWindow === 'day' ? '#032541' : 'none',
                                borderRadius: '20px',
                                color: timeWindow === 'day' ? '#0fadbf' : '#032541',
                            }}
                        >
                            Popular
                        </Button>
                        <Button
                            onClick={() => setTimeWindow('week')}
                            sx={{
                                width: '100px',
                                height: '30px',
                                backgroundColor: timeWindow === 'week' ? '#032541' : 'none',
                                borderRadius: '20px',
                                color: timeWindow === 'week' ? '#0fadbf' : '#032541',
                            }}
                        >
                            Upcoming
                        </Button>
                    </Box>
                </Box>
            </Container>

            <div
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'background-image 0.3s ease',
                    minHeight: '40vh',
                }}
            >
                <Container>
                    <Box
                        sx={{
                            display: 'flex',
                            overflowX: 'auto',
                            gap: 4,
                            padding: '10px',
                            scrollbarColor: '#0fadbf transparent',
                            scrollbarWidth: 'thin',
                        }}
                    >
                        {trailers?.map((trailer) => (
                            <Box
                                key={trailer.id}
                                sx={{
                                    minWidth: isMobile ? '50%' : 'calc(30% - 16px)',
                                    maxWidth: isMobile ? '50%' : 'calc(30% - 16px)',
                                    width: 'calc(30% - 16px)',
                                    height: '200px',
                                    textAlign: 'center',
                                    flexShrink: 0,
                                    cursor: 'pointer',
                                    position: 'relative',
                                    boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    marginTop: '50px'
                                }}
                                onMouseEnter={() => handleMouseEnter(trailer.posterPath)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <img
                                    src={trailer.posterPath}
                                    alt={trailer.trailerName}
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    }}
                                />
                                <IconButton
                                    onClick={() => handlePlayClick(trailer.trailerKey, trailer.trailerName)}
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        color: 'white',
                                    }}
                                >
                                    <PlayArrowIcon sx={{ fontSize: '4rem' }} />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>

                    <Modal
                        open={openModal}

                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{ timeout: 500 }}
                    >
                        <Fade in={openModal}>
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: isMobile ? "90%" : "60%",
                                    height: isMobile ? "60%" : "80%",
                                    bgcolor: "black",
                                    borderRadius: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "hidden",
                                    boxShadow: 24,
                                }}
                            >
                                {/* Modal Header */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "10px",
                                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                                        color: "white",
                                        borderTopLeftRadius: "8px",
                                        borderTopRightRadius: "8px",
                                    }}
                                >
                                    <Typography
                                        variant={isMobile ? "subtitle1" : "h6"}
                                        sx={{ color: "#0fadbf", fontWeight: "bold", flex: 1, textAlign: "center" }}
                                    >
                                        {selectedTrailerName || "Trailer"}
                                    </Typography>
                                    <IconButton
                                        onClick={handleCloseModal}
                                        sx={{
                                            color: "#0fadbf",
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>

                                {/* Video Player */}
                                <Box
                                    sx={{
                                        flex: 1,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        overflow: "hidden",
                                    }}
                                >
                                    <iframe
                                        src={`https://www.youtube.com/embed/${selectedTrailer}`}
                                        title="Trailer Video"
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{ borderRadius: "8px", outline: "none" }}
                                    />
                                </Box>
                            </Box>
                        </Fade>
                    </Modal>
                </Container>
            </div>
            <PopularMovies />
        </div>
    );
};

export default UpcomingTrailers;
