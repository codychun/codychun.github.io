import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { galleries, galleryNav } from '../../data/galleries'
import './Navigation.css'

function getGalleryPath(galleryId) {
  return galleryId === 'home' ? '/photography' : `/photography?gallery=${galleryId}`
}

function Navigation() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const selectedGallery = searchParams.get('gallery') || 'home'

  const navItems = [
    { id: 'home', path: '/', label: 'Home' },
    { id: 'projects', path: '/projects', label: 'Projects' },
    { id: 'about', path: '/about', label: 'About' },
    { id: 'contact', path: '/contact', label: 'Contact' }
  ]

  const isPhotographyActive = location.pathname === '/photography'

  return (
    <nav className='navigation'>
      <Link to="/" className='logo'>CODY CHUN</Link>

      <div className='nav-links'>
        <Link
          to="/"
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Home
        </Link>

        <div className="nav-dropdown">
          <Link
            to="/photography"
            className={`nav-link ${isPhotographyActive ? 'active' : ''}`}
          >
            Photography
          </Link>

          <div className="nav-dropdown-menu">
            <ul className="nav-dropdown-list">
              {galleryNav.map(item => {
                if (item.type === 'gallery') {
                  return (
                    <li key={item.id}>
                      <Link
                        to={getGalleryPath(item.id)}
                        className={`nav-dropdown-item ${isPhotographyActive && selectedGallery === item.id ? 'active' : ''}`}
                      >
                        {galleries[item.id].name}
                      </Link>
                    </li>
                  )
                }

                return (
                  <li key={item.id} className="nav-dropdown-folder">
                    <span className="nav-dropdown-folder-label">{item.name}</span>
                    <ul className="nav-dropdown-sublist">
                      {item.galleries.map(galleryId => (
                        <li key={galleryId}>
                          <Link
                            to={getGalleryPath(galleryId)}
                            className={`nav-dropdown-item nav-dropdown-subitem ${isPhotographyActive && selectedGallery === galleryId ? 'active' : ''}`}
                          >
                            {galleries[galleryId].name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {navItems.filter(item => item.id !== 'home').map(item => (
          <Link
            key={item.id}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
