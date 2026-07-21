import './ContactPage.css'

function ContactPage() {
  return (
    <div className="contact-page">
      <h1>Get In Touch</h1>
      
      <p className="contact-intro">
        I love to talk.<br></br>About careers, travel, tennis, music, food ... anything!<br></br> Feel free to reach out and we can have a nice chat!
      </p>
      
      <div className="contact-links">
        <a href="mailto:[email protected]" className="contact-link">
          <span>cchun4@nd.edu</span>
        </a>
        <a 
          href="https://www.linkedin.com/in/cody-chun/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          <span>linkedin.com/in/cody-chun</span>
        </a>
        <a 
          href="https://github.com/codychun"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          <span>github.com/codychun</span>
        </a>
      </div>
    </div>
  )
}

export default ContactPage