import './App.css'
import NavBar from './components/navBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/about'
import Home from './pages/home';

function App() {


  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
