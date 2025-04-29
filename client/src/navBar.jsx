import React from 'react';
import { Menubar } from 'primereact/menubar';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate('/')
        },
        {
            label: 'Chart',
            icon: 'pi pi-chart-line',
            command: () => navigate('/chart')
        },
        {
            label: 'Compare Charts',
            icon: 'pi pi-chart-bar',
            command: () => navigate('/compare')
        },
        {
            label: 'Chart Builder',
            icon: 'pi pi-plus-circle',
            command: () => navigate('/builder')
        },
        {
            label: 'Features',
            icon: 'pi pi-star',
            command: () => navigate('/about')
        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Components',
                    icon: 'pi pi-bolt'
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server'
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil'
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette'
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
        }
    ];
    return (
        <div style={{
            background: 'linear-gradient(to right, #007ad9, #66ccff)',
            padding: '0.5rem 2rem',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            marginBottom: '1rem'
        }}>
            <Menubar
                model={items}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white'
                }}
                className="custom-navbar"
            />
        </div>
    );
}

export default NavBar;