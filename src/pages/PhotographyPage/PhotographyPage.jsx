import { useState } from "react";
import PhotoGrid from '../../components/PhotoGrid/PhotoGrid'
import { galleries } from '../../data/galleries'
import './PhotographyPage.css'

function PhotographyPage() {
  const [selectedGallery, setSelectedGallery] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const currentGallery = galleries[selectedGallery]

  const selectGallery = (galleryId) => {
    setSelectedGallery(galleryId)
    setSidebarOpen(false)
  }

  return (
    <div className="photography-page">
      <div className={`photography-layout ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {sidebarOpen && (
          <button
            type="button"
            className="gallery-sidebar-backdrop"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close gallery menu"
          />
        )}

        <aside className={`gallery-sidebar ${sidebarOpen ? 'expanded' : 'collapsed'}`}>
          <button
            type="button"
            className="gallery-sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Close gallery menu' : 'Open gallery menu'}
            aria-expanded={sidebarOpen}
          >
            <span className="waffle-icon" aria-hidden="true">
              <span /><span /><span />
              <span /><span /><span />
              <span /><span /><span />
            </span>
          </button>

          <nav className="gallery-nav" aria-label="Photo galleries">
            <p className="gallery-nav-title">Galleries</p>
            <ul className="gallery-nav-list">
              {Object.keys(galleries).map(galleryId => (
                <li key={galleryId}>
                  <button
                    type="button"
                    onClick={() => selectGallery(galleryId)}
                    className={`gallery-nav-item ${selectedGallery === galleryId ? 'active' : ''}`}
                  >
                    {galleries[galleryId].name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="gallery-main">
          <h1>{currentGallery.name}</h1>
          <p className="page-description">{currentGallery.description}</p>

          {currentGallery.photos.length > 0 ? (
            <PhotoGrid photos={currentGallery.photos} />
          ) : (
            <p className="gallery-empty">Photos coming soon.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PhotographyPage
