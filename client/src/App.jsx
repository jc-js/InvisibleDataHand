import './App.css'
import NavBar from './navBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './about'
import FredChart from './FredChart';

function App() {


  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/about" element={<About />} />
          <Route path="/chart" element={<FredChart />} /> {/* Add this line */}
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
