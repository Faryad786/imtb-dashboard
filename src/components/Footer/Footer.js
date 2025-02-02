import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#032541',
                color: 'white',
                padding: '20px 0',
                marginTop: '30px',
            }}
        >
            <Container maxWidth="lg">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    {/* Logo Section */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                        <Box sx={{ display: 'flex' }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    marginBottom: '6px',  // Space between IMTB and the full title
                                    marginRight:'6px'
                                }}
                            >
                                IMTB
                            </Typography>
                            <Box sx={{ background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)", width: '60px', height: '20px', borderRadius: '20px', marginTop:'6px' }}></Box>
                        </Box>
                        <Box sx={{ marginTop: '6px', textAlign: 'center' }}>
                            <Typography
                                variant="h4"
                                component="div"
                                sx={{
                                    background: "linear-gradient(to right, #0fadbf 20%, yellow 80%)",
                                    WebkitBackgroundClip: "text",
                                    color: "transparent",
                                    fontWeight: 'bold'
                                }}
                            >
                                International Movies<br /> Television Bureau
                            </Typography>
                        </Box>
                    </Box>



                    {/* Links Section */}
                    <Box>
                        <Link href="#" color="inherit" sx={{ marginRight: '20px' }}>
                            About
                        </Link>
                        <Link href="#" color="inherit" sx={{ marginRight: '20px' }}>
                            Contact
                        </Link>
                        <Link href="#" color="inherit">
                            Privacy Policy
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
