import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const chartConfigs = [
    {
        id: 'FEDFUNDS',
        title: 'Federal Funds Rate',
        description: 'The federal funds rate is the interest rate at which depository institutions trade balances held at the Federal Reserve. It influences overall borrowing costs and is a key tool for managing inflation.',
        source: 'https://www.investopedia.com/terms/f/federalfundsrate.asp'
    },
    {
        id: 'CPIAUCSL',
        title: 'Consumer Price Index (CPI)',
        description: 'The CPI measures the average change over time in the prices paid by consumers for goods and services. It’s one of the most widely used indicators of inflation.',
        source: 'https://www.investopedia.com/terms/c/consumerpriceindex.asp'
    },
    {
        id: 'RETAILSMSA',
        title: 'Retail and Food Services Sales',
        description: 'Retail sales data shows consumer demand trends and economic health. A rising trend may indicate a growing economy.',
        source: 'https://www.investopedia.com/terms/r/retail-sales.asp'
    },
    {
        id: 'DTWEXBGS',
        title: 'U.S. Dollar Index',
        description: 'This index measures the strength of the U.S. dollar relative to other major currencies. A stronger dollar can reduce export competitiveness.',
        source: 'https://www.investopedia.com/terms/u/usdx.asp'
    }
];

function FredChart() {
    const [charts, setCharts] = useState([]);
    const [recessionRanges, setRecessionRanges] = useState([]);

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

    useEffect(() => {
        const fetchCharts = async () => {
            const promises = chartConfigs.map(async ({ id }) => {
                try {
                    const res = await axios.get(`${API_BASE_URL}/api/v1/fred/observations/${id}?sort_order=asc`);
                    const observations = res.data.observations;

                    const xValues = observations.map(p => p.date);
                    const yValues = observations.map(p => parseFloat(p.value));

                    const option = {
                        title: { text: id },
                        tooltip: { trigger: 'axis' },
                        xAxis: { type: 'category', data: xValues },
                        yAxis: { type: 'value', scale: true },
                        dataZoom: [
                            { type: 'slider', start: 60, end: 100 },
                            { type: 'inside' }
                        ],
                        series: [{
                            data: yValues,
                            type: 'line',
                            smooth: true,
                            symbol: 'none',
                            lineStyle: { width: 2 },
                            markArea: {
                                itemStyle: { color: 'rgba(200, 200, 200, 0.2)' },
                                data: recessionRanges.map(([start, end]) => [
                                    { name: 'Recession', xAxis: start },
                                    { xAxis: end }
                                ])
                            }
                        }]
                    };

                    return { id, option };
                } catch (err) {
                    console.error(`Failed to fetch ${id}:`, err);
                    return null;
                }
            });

            const resolved = await Promise.all(promises);
            setCharts(resolved.filter(Boolean));
        };

        if (recessionRanges.length > 0) {
            fetchCharts();
        }
    }, [recessionRanges]);

    return (
        <div className="card" style={{ padding: '20px' }}>
            <h2>Economic Snapshot Dashboard</h2>
            <p style={{ fontSize: '1rem', color: '#555', maxWidth: '800px', marginBottom: '30px' }}>
                A curated set of economic indicators providing a snapshot of the U.S. economy. Scroll through interest rates, inflation, retail sales, and dollar strength to understand trends shaping the market.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
                {charts.map((chart, idx) => {
                    const { title, description, source } = chartConfigs.find(c => c.id === chart.id) || {};
                    return (
                        <div key={idx} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
                            <h3>{title}</h3>
                            <ReactECharts option={chart.option} style={{ height: '400px' }} />
                            <p style={{ marginTop: '15px', fontSize: '0.95rem', color: '#444' }}>
                                {description}
                                {source && (
                                    <span> Source: <a href={source} target="_blank" rel="noreferrer">{new URL(source).hostname}</a></span>
                                )}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FredChart;
