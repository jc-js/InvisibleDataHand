import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1677871598276-85b14ea353ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            paddingTop: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.6)',
            padding: '20px'
        }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
                Build Your Economic Dashboard
            </h1>

            <p style={{ fontSize: '1.5rem', maxWidth: '700px', textAlign: 'center', marginBottom: '2rem' }}>
                Visualize key economic indicators, analyze trends, and build custom reports — all in a few clicks.
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <Button label="Start Building" icon="pi pi-plus-circle" onClick={() => navigate('/builder')} />
                <Button label="Explore Comparisons" icon="pi pi-chart-line" onClick={() => navigate('/compare')} />
            </div>
        </div>
    );
}

export default Home;
