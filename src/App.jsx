import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import HomePage from './pages/HomePage/HomePage'
import PhotographyPage from './pages/PhotographyPage/PhotographyPage'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage'
import AboutPage from './pages/AboutPage/AboutPage'
import ContactPage from './pages/ContactPage/ContactPage'
import AlarmPage from './pages/AlarmPage/AlarmPage'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navigation />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/photography" element={<PhotographyPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/alarm-clock" element={<AlarmPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
