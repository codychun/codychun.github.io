import './AboutPage.css'

function AboutPage() {
  return (
    <div className="about-page">
      <h1>About Me</h1>
      
      <div className="about-content">
        <section>
          <p>
            I'm a junior at the University of Notre Dame studying Computer Engineering. 
            I'm passionate about the intersection of hardware and software, 
            particularly in digital design and verification.
          </p>
          
          <p>
            When I'm not coding, you'll find me behind my Sony Alpha 230 capturing ...
          </p>
        </section>
        
        <section className="education-section">
          <h2>Education</h2>
          <div className="education-card">
            <h3>Your University Name</h3>
            <p className="degree">B.S. Computer Engineering</p>
            <p className="graduation">Expected Graduation: May 2027</p>
            <p className="coursework">
              Relevant Coursework: Digital Integrated Circuits, Computer Architecture, 
              Logic Design, Intro to AI, Applied Embedded Systems, Electric Circuits, Data Structures, Systems Programming
            </p>
          </div>
        </section>
        
        <section className="skills-section">
          <h2>Skills</h2>
          <div className="skills-grid">
            <div>
              <h3>Languages</h3>
              <p>C, Python, SystemVerilog, JavaScript, Java</p>
            </div>
            <div>
              <h3>Technologies</h3>
              <p>React, Node.js, Raspberry Pi, Git, Linux</p>
            </div>
            <div>
              <h3>Tools</h3>
              <p>Cadence, VS Code, Arduino, KiCad, Figma</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
