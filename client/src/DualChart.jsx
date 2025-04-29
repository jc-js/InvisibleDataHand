import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';
import ReactECharts from 'echarts-for-react';

function DualChart() {
    const [series, setSeries] = useState('CPIAUCSL');
    const [dataPoints, setDataPoints] = useState([]);
    const [loading, setLoading] = useState(false);

    const seriesOptions = [
        { label: 'Consumer Price Index (CPI)', value: 'CPIAUCSL', description: 'Measures changes in the price level of a basket of consumer goods and services.' },
        { label: 'Unemployment Rate', value: 'UNRATE', description: 'Represents the percentage of the total labor force that is unemployed but actively seeking employment.' },
        { label: 'Real GDP', value: 'GDPC1', description: 'Tracks the value of all goods and services produced, adjusted for inflation.' },
        { label: 'Federal Funds Rate', value: 'FEDFUNDS', description: 'Interest rate at which depository institutions lend balances at the Federal Reserve to other institutions overnight.' }
    ];

    const selectedMeta = seriesOptions.find(s => s.value === series);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/fred/observations/${series}?sort_order=asc`);
                setDataPoints(res.data.observations);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [series]);

    const xValues = dataPoints.map(p => p.date);
    const yValues = dataPoints.map(p => parseFloat(p.value));

    const chartOptions = {
        title: { text: selectedMeta?.label },
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
    };

    return (
        <div className="card" style={{ padding: '20px' }}>
            <h2>Economic Indicators Dashboard</h2>

            <div style={{ marginBottom: '20px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Dropdown
                    value={series}
                    options={seriesOptions}
                    onChange={(e) => setSeries(e.value)}
                    placeholder="Select a series"
                />
                <span style={{ fontStyle: 'italic', fontSize: '0.9rem', maxWidth: '600px' }}>
                    {selectedMeta?.description}
                </span>
            </div>

            {loading ? (
                <div>Loading chart...</div>
            ) : (
                <ReactECharts option={chartOptions} style={{ height: '500px' }} />
            )}
        </div>
    );
}

export default DualChart;
