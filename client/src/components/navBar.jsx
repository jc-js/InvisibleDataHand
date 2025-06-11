import React from 'react';
import { Menubar } from 'primereact/menubar';
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
     className='bg-[#ff6347] p-8 text-white'
      model={items}
      start={start}
      end = {end}
    />
  );
}

export default NavBar;