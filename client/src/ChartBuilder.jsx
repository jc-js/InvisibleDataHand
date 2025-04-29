import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';

function ChartBuilder() {
    const [seriesIdInput, setSeriesIdInput] = useState('');
    const [charts, setCharts] = useState([]);
    const [loaded, setLoaded] = useState(false); // <-- ADD THIS

    // Load from localStorage on first mount
    useEffect(() => {
        const savedCharts = localStorage.getItem('saved_charts');
        if (savedCharts) {
            try {
                setCharts(JSON.parse(savedCharts));
            } catch (e) {
                console.error('Error parsing saved_charts:', e);
            }
        }
        setLoaded(true); // <-- Mark loading finished
    }, []);

    // Save to localStorage whenever charts change, but only after loading is done
    useEffect(() => {
        if (loaded) {
            localStorage.setItem('saved_charts', JSON.stringify(charts));
        }
    }, [charts, loaded]); // <-- notice we track `loaded`

    const addChart = async () => {
        if (!seriesIdInput.trim()) return;

        try {
            const res = await axios.get(`http://localhost:8000/api/v1/fred/observations/${seriesIdInput}?sort_order=asc`);
            const observations = res.data.observations;

            const xValues = observations.map(p => p.date);
            const yValues = observations.map(p => parseFloat(p.value));

            const newChart = {
                id: seriesIdInput,
                option: {
                    title: { text: seriesIdInput },
                    tooltip: { trigger: 'axis' },
                    xAxis: { type: 'category', data: xValues },
                    yAxis: { type: 'value', scale: true },
                    dataZoom: [
                        { type: 'slider', start: 90, end: 100 },
                        { type: 'inside' }
                    ],
                    series: [{
                        data: yValues,
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        lineStyle: { width: 2 }
                    }]
                }
            };

            setCharts(prevCharts => [...prevCharts, newChart]);
            setSeriesIdInput('');
        } catch (error) {
            console.error('Error fetching series:', error);
            alert(`Could not fetch series: ${seriesIdInput}`);
        }
    };

    const removeChart = (indexToRemove) => {
        setCharts(prevCharts => prevCharts.filter((_, idx) => idx !== indexToRemove));
    };

    const clearCharts = () => {
        setCharts([]);
        localStorage.removeItem('saved_charts');
    };

    return (
        <div className="card" style={{ padding: '20px' }}>
            <h2>Chart Builder</h2>

            <p style={{ fontSize: '1rem', color: '#555', maxWidth: '800px', marginBottom: '20px' }}>
            This page allows you to build your own economic indicators dashboard. 
            Enter a FRED <strong>series ID</strong> (such as <em>CPIAUCSL</em> or <em>UNRATE</em>) to add dynamic charts.
            Your charts will be saved automatically and restored even if you refresh or come back later.
            </p>

            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <InputText
                    value={seriesIdInput}
                    onChange={(e) => setSeriesIdInput(e.target.value)}
                    placeholder="Enter FRED series ID"
                />
                <Button label="Add Chart" icon="pi pi-plus" onClick={addChart} />
                <Button label="Clear All" icon="pi pi-trash" severity="danger" onClick={clearCharts} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {charts.map((chart, idx) => (
                    <div key={idx} style={{ position: 'relative', border: '1px solid #ccc', padding: '10px', borderRadius: '10px' }}>
                        <Button
                            icon="pi pi-times"
                            severity="danger"
                            size="small"
                            style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}
                            onClick={() => removeChart(idx)}
                        />
                        <ReactECharts option={chart.option} style={{ height: '400px' }} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChartBuilder;
