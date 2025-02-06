import React, { useEffect, useState, useRef } from 'react';
import { Typography, Container, Box, Modal, IconButton, CircularProgress, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const RecentMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState(null);
   
    const scrollContainerRef = useRef(null);
    const isMobile = useMediaQuery('(max-width:600px)');
    const fetchMovies = async (pageNumber) => {
        try {
            const url = `${process.env.REACT_APP_API_URL}/api/tmdb/recently-add/movies?page=${pageNumber}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            
            // Ensure data is an object and contains required properties
            if (data && Array.isArray(data.movies)) {
                setMovies((prevMovies) => [...prevMovies, ...data.movies]);
                setTotalPages(data.totalPages || 1);
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
        fetchMovies(page);
    }, [page]);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        const handleScroll = () => {
            if (scrollContainer) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
                if (scrollLeft + clientWidth >= scrollWidth - 10 && page < totalPages) {
                    setPage((prevPage) => prevPage + 1);
                }
            }
        };
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, [page, totalPages]);

    const handleMovieClick = (movie) => {
        if (movie) {
            setSelectedMovie(movie);
        }
    };

    const handleClose = () => {
        setSelectedMovie(null);
    };

    return (
        <Container>
            <Typography variant="h5" gutterBottom sx={{ margin: '20px 0', fontWeight: 'bold', color: '#0fadbf' }}>
                Recently movies
            </Typography>
            {loading && page === 1 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress/>
                </Box>
            ) : (
                <Box
            ref={scrollContainerRef}
            sx={{
                display: 'flex',
                overflowX: 'auto',
                gap: 2,
                padding: '10px',
                scrollbarColor: '#0fadbf transparent',
                scrollbarWidth: 'thin',
            }}
        >
            {movies.map((movie) => (
                <Box
                    key={movie.id}
                    sx={{
                        minWidth: isMobile ? '50%' : '14.28%', // 50% width for mobile, 14.28% for large screens
                        maxWidth: isMobile ? '50%' : '14.28%',
                        textAlign: 'center',
                        flexShrink: 0,
                        cursor: 'pointer',
                        position: 'relative',
                        boxShadow: '0 4px 12px rgba(15, 173, 191, 0.5)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}
                    onClick={() => handleMovieClick(movie)}
                >
                    <img
                        src={movie.posterimage || 'https://via.placeholder.com/150'}
                        alt={movie.title || 'Movie poster'}
                        style={{ width: '100%', height: '250px', borderRadius: '8px' }}
                    />

                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0fadbf', padding: '10px', fontSize: '12px' }}>
                        {movie.title || 'Untitled'}
                    </Typography>
                </Box>
            ))}
        </Box>
            )}

            {/* Movie Modal */}
            <Modal open={Boolean(selectedMovie)} >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: isMobile ? "90%" : "60%",
                    bgcolor: "black",
                    boxShadow: 24,
                    p: 2,
                    height: isMobile ? "70%" : "80%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Modal Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" sx={{ color: "#0fadbf", fontWeight: "bold" }}>
                        {selectedMovie?.title || "Movie Title"}
                    </Typography>
                    <IconButton onClick={handleClose} sx={{ color: "#0fadbf" }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Video Content */}
                <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {selectedMovie?.links ? (
                        <iframe
                            src={selectedMovie.links}
                            width="100%"
                            height="100%"
                            title={selectedMovie?.title || "Movie"}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ borderRadius: "8px" }}
                        />
                    ) : (
                        <Typography variant="h6" sx={{ color: "#fff", textAlign: "center" }}>
                            No Video Available
                        </Typography>
                    )}
                </Box>
            </Box>
        </Modal>
        </Container>
    );
};

export default RecentMovies;
