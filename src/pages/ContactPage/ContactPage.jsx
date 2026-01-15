import './ContactPage.css'

function ContactPage() {
  return (
    <div className="contact-page">
      <h1>Get In Touch</h1>
      
      <p className="contact-intro">
        I'm always open to new opportunities, collaborations, or just a chat 
        about technology and photography.
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