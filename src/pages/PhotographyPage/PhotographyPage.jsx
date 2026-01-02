import { useState } from "react";
import PhotoGrid from '../../components/PhotoGrid/PhotoGrid'
import { galleries } from '../../data/galleries'
import './PhotographyPage.css'

function PhotographyPage() {
  const [selectedGallery, setSelectedGallery] = useState('tokyo')
  const currentGallery = galleries[selectedGallery]
  
  return (
    <div className="photography-page">
      <h1>Photography</h1>
      <p className="page-description">{currentGallery.description}</p>

      <div className="gallery-tabs">
        {Object.keys(galleries).map(galleryId => (
          <button
            key={galleryId}
            onClick={() => setSelectedGallery(galleryId)}
            className={`gallery-tab ${selectedGallery === galleryId ? 'active' : ''}`}
          >
            {galleries[galleryId].name}
            </button>
        ))}
      </div>

      <PhotoGrid photos={currentGallery.photos}/>
    </div>
  )
}

export default PhotographyPage