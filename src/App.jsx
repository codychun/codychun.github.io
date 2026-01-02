import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navigation from './components/Navigation/Navigation'
import HomePage from './pages/HomePage/HomePage'
import PhotographyPage from './pages/PhotographyPage/PhotographyPage'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage'
import AboutPage from './pages/AboutPage/AboutPage'
import ContactPage from './pages/ContactPage/ContactPage'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="app">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="main-content">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'photography' && <PhotographyPage />}
        {currentPage === 'projects' && <ProjectsPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer />
    </div>
  )
}

export default App
