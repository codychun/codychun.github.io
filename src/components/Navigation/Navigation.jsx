import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  const location = useLocation()
  const navItems = [
    { id: 'home', path: '/', label: 'Home' },
    { id: 'photography', path: '/photography', label: 'Photography'},
    { id: 'projects', path: '/projects', label: 'Projects' },
    { id: 'about', path: '/about', label: 'About' },
    { id: 'contact', path: '/contact', label: 'Contact' }
  ]

  return (
    <nav className='navigation'>
      <Link 
        to="/"
        className='logo' > CODY CHUN
      </Link>

      <div className='nav-links'>
        {navItems.map(item => (
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