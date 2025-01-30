import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import './Loading.css';

const LoadingComponent = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000); 
        return () => clearTimeout(timer);
    }, []);

    if (!loading) {
        return null; 
    }

    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',

            }}
        >
            <div id="load">
                
                <div>X</div>
                <div>I</div>
                <div>L</div>
                <div>F</div>
                <div>S</div>
                <div>E</div>
                <div>N</div>
                <div>T</div>
            </div>

            <Typography
                variant="h6"
                sx={{ marginTop: 2, color: '#950101', fontWeight: 'bold' }}
            >
                Loading...
            </Typography>
        </Container>
    );
};

export default LoadingComponent;
