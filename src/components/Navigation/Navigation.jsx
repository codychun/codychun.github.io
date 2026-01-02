import './Navigation.css'

function Navigation({ currentPage, setCurrentPage}) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'photography', label: 'Photography'},
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <nav className='navigation'>
      <button 
        onClick={() => setCurrentPage('home')}
        className='logo' > CODY CHUN
      </button>

      <div className='nav-links'>
        {navItems.map(item => (
          <button 
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
          > 
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navigation