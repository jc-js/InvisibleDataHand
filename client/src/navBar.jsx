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
        <div className="card">
            <Menubar model={items} />
        </div>
    );
}

export default NavBar;