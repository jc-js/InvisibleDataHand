import React from 'react';
import { Menubar } from 'primereact/menubar';
import './NavBar.css';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import "primeicons/primeicons.css";

function NavBar() {
    const navigate = useNavigate();
    const items = [
        { label: 'Home', icon: 'pi pi-home', command: () => navigate('/') },
        {
            label: 'Charts',
            icon: 'pi pi-chart-line',
            items: [
                    { label: 'Economy View', icon: 'pi pi-chart-line', command: () => navigate('/chart') },
                    { label: 'Compare Charts', icon: 'pi pi-chart-bar', command: () => navigate('/compare') },
                    { label: 'Chart Builder', icon: 'pi pi-plus-circle', command: () => navigate('/builder') }
                ]
        },
        { label: 'Contact', icon: 'pi pi-envelope', command: () => navigate('/contact') }
    ];

    const start = (
        <i
        className="pi pi-github"
        style={{ fontSize: '1.5rem', cursor: 'pointer', color: 'white' }}
        onClick={() => navigate('/')}
        />
    );

    const end = (
        <i
        className="pi pi-user"
        style={{ fontSize: '1.5rem', cursor: 'pointer', color: 'white' }}
        onClick={() => navigate('/user')}
        />
    );

  return (
    <Menubar
      model={items}
      start={start}
      end = {end}
    />
  );
}

export default NavBar;