import { useEffect, useState } from "react";
import PhotoGrid from '../../components/PhotoGrid/PhotoGrid'
import { galleries, galleryNav } from '../../data/galleries'
import './PhotographyPage.css'

function getFolderForGallery(galleryId) {
  return galleryNav.find(
    item => item.type === 'folder' && item.galleries.includes(galleryId)
  )
}

function PhotographyPage() {
  const [selectedGallery, setSelectedGallery] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedFolders, setExpandedFolders] = useState(() => {
    const folder = getFolderForGallery('home')
    return folder ? new Set([folder.id]) : new Set()
  })
  const currentGallery = galleries[selectedGallery]

  useEffect(() => {
    const folder = getFolderForGallery(selectedGallery)
    if (folder) {
      setExpandedFolders(prev => new Set([...prev, folder.id]))
    }
  }, [selectedGallery])

  const selectGallery = (galleryId) => {
    setSelectedGallery(galleryId)
    setSidebarOpen(false)
  }

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => {
      const next = new Set(prev)
      if (next.has(folderId)) {
        next.delete(folderId)
      } else {
        next.add(folderId)
      }
      return next
    })
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

        <aside className="gallery-sidebar" aria-hidden={!sidebarOpen}>
          <nav className="gallery-nav" aria-label="Photo galleries">
            <p className="gallery-nav-title">Galleries</p>
            <ul className="gallery-nav-list">
              {galleryNav.map(item => {
                if (item.type === 'gallery') {
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => selectGallery(item.id)}
                        className={`gallery-nav-item ${selectedGallery === item.id ? 'active' : ''}`}
                      >
                        {galleries[item.id].name}
                      </button>
                    </li>
                  )
                }

                const isExpanded = expandedFolders.has(item.id)
                const folderHasActiveGallery = item.galleries.includes(selectedGallery)

                return (
                  <li key={item.id} className="gallery-nav-folder">
                    <button
                      type="button"
                      className={`gallery-nav-folder-toggle ${folderHasActiveGallery ? 'has-active' : ''}`}
                      onClick={() => toggleFolder(item.id)}
                      aria-expanded={isExpanded}
                    >
                      <span className="gallery-nav-folder-name">{item.name}</span>
                      <span className={`gallery-nav-chevron ${isExpanded ? 'expanded' : ''}`} aria-hidden="true" />
                    </button>

                    {isExpanded && (
                      <ul className="gallery-nav-sublist">
                        {item.galleries.map(galleryId => (
                          <li key={galleryId}>
                            <button
                              type="button"
                              onClick={() => selectGallery(galleryId)}
                              className={`gallery-nav-item gallery-nav-subitem ${selectedGallery === galleryId ? 'active' : ''}`}
                            >
                              {galleries[galleryId].name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        <div className="gallery-content">
          <div className="gallery-header">
            <button
              type="button"
              className="gallery-sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? 'Close gallery menu' : 'Open gallery menu'}
              aria-expanded={sidebarOpen}
            >
              <span className="menu-icon" aria-hidden="true">
                <span /><span /><span />
              </span>
            </button>

            <div className="gallery-header-text">
              <h1>{currentGallery.name}</h1>
              <p className="page-description">{currentGallery.description}</p>
            </div>
          </div>

          <div className="gallery-photos">
            {currentGallery.photos.length > 0 ? (
              <PhotoGrid photos={currentGallery.photos} />
            ) : (
              <p className="gallery-empty">Photos coming soon.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotographyPage
