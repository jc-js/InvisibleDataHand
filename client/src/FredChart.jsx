import React, { useEffect, useState } from 'react';
import { Chart, Chart as PrimeChart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';


function FredChart() {
    const [chartData, setChartData] = useState(null);
    const [selectedSeries, setSelectedSeries] = useState('CPIAUCSL'); // default series
    const [loading, setLoading] = useState(false);

    const seriesOptions = [
        { label: 'Consumer Price Index (CPI)', value: 'CPIAUCSL' },
        { label: 'Unemployment Rate', value: 'UNRATE' },
        { label: 'Real GDP', value: 'GDPC1' },
        { label: 'Federal Funds Rate', value: 'FEDFUNDS' }
    ];

    const fetchData = async (seriesId) => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/fred/observations/${seriesId}?sort_order=asc`);
            const observations = res.data.observations;

            const labels = observations.map(obs => obs.date);
            const data = observations.map(obs => parseFloat(obs.value));

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: seriesId,
                        data: data,
                        fill: false,
                        borderColor: '#42A5F5',
                        tension: 0.4
                    }
                ]
            });
        } catch (error) {
            console.error('Error fetching FRED data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(selectedSeries);
    }, [selectedSeries]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `FRED Data - ${selectedSeries}`
            },
            zoom: {  // <== ADD ZOOM HERE
                pan: {
                    enabled: true,
                    mode: 'x', // only horizontal pan
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x', // zoom only x axis (time)
                }
            }
        },
        elements: {
            point: {
                radius: 0 // <== REMOVE POINTS (makes them invisible)
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Value'
                }
            }
        }
    };

    return (
        <div className="card">
            <h2>FRED Data Chart</h2>

            <div style={{ marginBottom: '20px' }}>
                <Dropdown 
                    value={selectedSeries} 
                    options={seriesOptions} 
                    onChange={(e) => setSelectedSeries(e.value)} 
                    placeholder="Select a series" 
                />
            </div>

            {loading ? (
                <div>Loading chart...</div>
            ) : (
                chartData && <Chart type="line" data={chartData} options={options} />
            )}
        </div>
    );
}

export default FredChart;
