import { useState } from 'react'
import './PhotoGrid.css'

function PhotoGrid({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const openModal = (photo) => {
    setSelectedPhoto(photo)
    document.body.style.overflow = 'hidden' // Prevent background scrolling
  }

  const closeModal = () => {
    setSelectedPhoto(null)
    document.body.style.overflow = 'unset' // Restore scrolling
  }

  // Close modal on Escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }

  return (
    <>
      <div className="photo-grid">
        {photos.map(photo => (
          <div 
            key={photo.id} 
            className="photo-item"
            onClick={() => openModal(photo)}
          >
            <img 
              src={photo.url} 
              alt={photo.alt}
              loading="lazy"
            />
            {photo.caption && (
              <p className="photo-caption">{photo.caption}</p>
            )}
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div 
          className="photo-modal" 
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <button 
            className="modal-close"
            onClick={closeModal}
            aria-label="Close"
          >
            ×
          </button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedPhoto.url} 
              alt={selectedPhoto.alt}
              className="modal-image"
            />
            {selectedPhoto.caption && (
              <p className="modal-caption">{selectedPhoto.caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default PhotoGrid