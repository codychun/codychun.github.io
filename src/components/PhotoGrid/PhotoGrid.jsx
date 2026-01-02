import './PhotoGrid.css'

function PhotoGrid({ photos }) {
  return (
    <div className="photo-grid">
      {photos.map(photo => (
        <div key={photo.id} className="photo-item">
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
  )
}

export default PhotoGrid