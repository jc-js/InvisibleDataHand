import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

function About() {
    const navigate = useNavigate();

    return (
        <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            maxWidth: '900px',
            margin: '0 auto'
        }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                📊 Economic Dashboard Builder
            </h1>

            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
                Build custom visualizations using real-time economic data from the FRED API.
                Quickly compare indicators like CPI, GDP, interest rates and more — all in one place.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Button label="Start Building" icon="pi pi-plus-circle" onClick={() => navigate('/builder')} />
                <Button label="Compare Indicators" icon="pi pi-chart-bar" onClick={() => navigate('/compare')} />
            </div>

            <div style={{ marginTop: '4rem', opacity: 0.5 }}>
                <p style={{ fontSize: '0.9rem' }}>Powered by React, ECharts & FastAPI · Built with ❤️</p>
            </div>
        </div>
    );
}

export default About;
