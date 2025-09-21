import './App.css'
import Home from './components/Home.jsx'
import UploadSongForm from './components/UploadSongForm.jsx'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import About from './components/About.jsx'
import PageNotFound from './PageNotFound.jsx'

function App() {

  return (
    <>
      <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<UploadSongForm />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </>
  )
}

export default App
