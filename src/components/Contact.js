import './Contact.css';

function Contact() {
    return (
        <section id="contact" className="contact">
        <h2>Contact Me</h2>
            <div className="contact-container">
            <div className="contact-info">
                <h3>Get in Touch</h3>
                <p>Feel free to reach out to me through any of the following channels:</p>
                    
            <div className="contact-details">
                <div className="contact-item">
                    <div className="contact-text">
                        <h4>Email</h4>
                        <p>cchun4@nd.edu</p>
                    </div>
                </div>
                        
                <div className="contact-item">
                    <div className="contact-icon"></div>
                    <div className="contact-text">
                        <h4>LinkedIn</h4>
                        <a href="https://www.linkedin.com/in/cody-chun-056ab4286/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
                        
                <div className="contact-item">
                    <div className="contact-icon"></div>
                    <div className="contact-text">
                        <h4>GitHub</h4>
                        <a href="https://github.com/codychun" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </div>
                </div>

            </div>
            </div>
            </div>
        </section>
    );
}

export default Contact;