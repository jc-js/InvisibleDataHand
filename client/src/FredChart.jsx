import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { chartConfigs } from './config/fredChartChartsConfigs';
import { getResponsiveWidth } from './utils/layout';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

function FredChart() {
    const [charts, setCharts] = useState([]);
    const [recessionRanges, setRecessionRanges] = useState([]);
    const [showRecessions, setShowRecessions] = useState(true);
    const [logScales, setLogScales] = useState({});

    // Fetch recession shading ranges
    useEffect(() => {
        const fetchRecessionRanges = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/v1/fred/observations/JHDUSRGDPBR?sort_order=asc`);
                const observations = res.data.observations;
                const ranges = [];

                let start = null;
                observations.forEach(o => {
                    if (o.value === '1' && !start) {
                        start = o.date;
                    } else if (o.value === '0' && start) {
                        ranges.push([start, o.date]);
                        start = null;
                    }
                });
                if (start) {
                    ranges.push([start, observations.at(-1).date]);
                }

                setRecessionRanges(ranges);
            } catch (err) {
                console.error('Failed to fetch recession ranges:', err);
            }
        };

        fetchRecessionRanges();
    }, []);

    // Fetch all chart data
    useEffect(() => {
        const flatConfigs = chartConfigs.flat();

        const fetchCharts = async () => {
            const promises = flatConfigs.map(async ({ id }) => {
                try {
                    const res = await axios.get(`${API_BASE_URL}/api/v1/fred/observations/${id}?sort_order=asc`);
                    const observations = res.data.observations;
                    const xValues = observations.map(p => p.date);
                    const yValues = observations.map(p => parseFloat(p.value));

                    return { id, xValues, yValues };
                } catch (err) {
                    console.error(`Failed to fetch ${id}:`, err);
                    return null;
                }
            });

            const results = await Promise.all(promises);
            setCharts(results.filter(Boolean));
        };

        fetchCharts();
    }, []);

    const buildOption = (id, xValues, yValues) => {
        const isLog = logScales[id] || false;
        const markAreas = showRecessions
            ? recessionRanges.map(([start, end]) => [
                { name: 'Recession', xAxis: start },
                { xAxis: end }
            ])
            : [];

        return {
            title: { text: id },
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', data: xValues },
            yAxis: {
                type: isLog ? 'log' : 'value',
                scale: true,
                ...(isLog && { logBase: 10 })
            },
            dataZoom: [
                { type: 'slider', start: 55, end: 100 },
                { type: 'inside' }
            ],
            series: [{
                data: yValues,
                type: 'line',
                smooth: true,
                symbol: 'none',
                lineStyle: { width: 2 },
                markArea: showRecessions ? {
                    itemStyle: { color: 'rgba(200, 200, 200, 0.2)' },
                    data: markAreas
                } : undefined
            }]
        };
    };

    return (
        <div className="card" style={{ marginTop: '0.3rem', padding: '0.75rem' }}>

            <h2 style={{ marginTop: 0, marginBottom: '0.3rem' }}>Economic Snapshot Dashboard</h2>

            <div style={{ marginBottom: '1rem' }}>
                <Checkbox inputId="recessions" checked={showRecessions} onChange={e => setShowRecessions(e.checked)} />
                <label htmlFor="recessions" style={{ marginLeft: '0.5rem' }}>
                    Show shaded areas for U.S. recession periods
                </label>
            </div>

            <Divider />

            {chartConfigs.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        width: '100%',
                        marginBottom: '10px',
                        gap: '10px'
                    }}
                    >
                    {row.map(config => {
                        const chart = charts.find(c => c.id === config.id);
                        if (!chart) return null;

                        return (
                            <div
                                key={config.id}
                                style={{
                                    width: getResponsiveWidth(row.length, 10),
                                    maxWidth: getResponsiveWidth(row.length, 10),
                                    padding: '5px',
                                    boxSizing: 'border-box',
                                    border: '1px solid #ccc',
                                    borderRadius: '10px'
                                }}
                                >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    
                                    <div style={{ marginBottom: '0.5rem' }}>
                                        <Checkbox
                                            inputId={`log-${config.title}`}
                                            checked={logScales[config.title] || false}
                                            onChange={e =>
                                                setLogScales(prev => ({ ...prev, [config.title]: e.checked }))
                                            }
                                        />
                                        <label htmlFor={`log-${config.title}`} style={{ marginLeft: '0.5rem' }}>
                                            Logarithmic scale
                                        </label>
                                    </div>
                                </div>

                                <ReactECharts
                                    option={buildOption(config.title, chart.xValues, chart.yValues)}
                                    style={{ height: '300px', width: '100%' }}
                                    />

                                <p style={{ marginTop: '15px', fontSize: '0.95rem', color: '#444' }}>
                                    {config.description}
                                    {config.source && (
                                        <span>
                                            {' '}Source:{' '}
                                            <a href={config.source} target="_blank" rel="noreferrer">
                                                {new URL(config.source).hostname}
                                            </a>
                                        </span>
                                    )}
                                </p>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default FredChart;
