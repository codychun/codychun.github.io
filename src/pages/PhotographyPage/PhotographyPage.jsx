import { useSearchParams } from "react-router-dom";
import PhotoGrid from '../../components/PhotoGrid/PhotoGrid'
import { galleries } from '../../data/galleries'
import './PhotographyPage.css'

function PhotographyPage() {
  const [searchParams] = useSearchParams()
  const galleryId = searchParams.get('gallery') || 'home'
  const currentGallery = galleries[galleryId] ?? galleries.home

  return (
    <div className="photography-page">
      <h1>{currentGallery.name}</h1>
      <p className="page-description">{currentGallery.description}</p>

      {currentGallery.photos.length > 0 ? (
        <PhotoGrid photos={currentGallery.photos} />
      ) : (
        <p className="gallery-empty">Photos coming soon.</p>
      )}
    </div>
  )
}

export default PhotographyPage
