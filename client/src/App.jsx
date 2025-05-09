import './App.css'
import NavBar from './components/navBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FredChart from './FredChart';
import DualChart from './DualChart';
import ChartBuilder from './ChartBuilder';
import Home from './Home';

function App() {


  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chart" element={<FredChart />} /> {/* Add this line */}
          <Route path="/compare" element={<DualChart />} />
          <Route path="/builder" element={<ChartBuilder />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
