import './App.css'
import NavBar from './navBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './about'

function App() {


  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
