import './HomePage.css'
import headshot from '../../assets/headshot.jpg'

function HomePage() {
  return (
    <div className="home-page">
      <h1>Hi, I'm Cody.</h1>

      <div className="headshot">
        <img src={headshot} alt="Cody" />
      </div>

      <p className='subtitle'>
        Computer Engineering and Real Estate Student
      </p>

      <p className='description'>
        Welcome to my corner of the internet! I've always wondered what magic makes computers work. After studying computer engineering at Notre Dame, I'm beginning to understand it. 
      </p>

      <p className='description'>
        I'm passionate about ASIC design, especially AI accelerators, and I'm recruiting for RTL Design and DV New Grad 2027.
      </p>

      <p className='description'>
        Check out some of my <a href="https://codychun.github.io/projects">projects</a>! I also take photos. Check them out <a href="https://codychun.github.io/photography">here</a>! 
      </p>

      <div className="social-buttons">
        <a 
          href="mailto:cchun4@nd.edu" 
          className="social-button"
        >
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/cody-chun/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-button"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/codychun"
          target="_blank"
          rel="noopener noreferrer"
          className="social-button"
        >
          GitHub
        </a>
      </div>
    </div>
  )
}

export default HomePage