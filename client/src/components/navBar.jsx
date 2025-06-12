import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import './NavBar.css';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import "primeicons/primeicons.css";

function NavBar() {
    const navigate = useNavigate();
    const items = [
        { label: 'Home', command: () => navigate('/') },
        {
            label: 'Charts',
            items: [
                    { label: 'Economy View', icon: 'pi pi-chart-line', command: () => navigate('/chart') },
                    { label: 'Compare Charts', icon: 'pi pi-chart-bar', command: () => navigate('/compare') },
                    { label: 'Chart Builder', icon: 'pi pi-plus-circle', command: () => navigate('/builder') }
                ]
        },
        { label: 'Contact', command: () => navigate('/contact') }
    ];

    const start = (
        <h3 className="p-menubar-title">
          Invisible Hand
        </h3>
    );

    const end = (
        <Avatar label="JC" shape="circle" />
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