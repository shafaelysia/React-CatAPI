import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/liked" element={<Favorites />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
