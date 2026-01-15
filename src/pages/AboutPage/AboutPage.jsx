import './AboutPage.css'

function AboutPage() {
  return (
    <div className="about-page">
      <h1>About Me</h1>
      
      <div className="about-content">
        <section>
          <p>
            I'm a junior at the University of Notre Dame studying Computer Engineering and Real Estate. 
            I'm fascinated by the intersection of hardware and software, particularly in optimizing performance 
            and efficiency in digital ASIC design.
          </p>
          
          <p>
            I aspire to travel the world, capturing interesting moments and forgotten places with my Sony A230.
            My favorite urban nooks so far have been random parks, alleys, and jazz clubs. I especially like 
            getting out of the city to the great mountains and oceans of the world. I also like to play tennis and music.
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
              <p>C, Python, SystemVerilog, RISC-V Assembly, JavaScript, Java, Bash</p>
            </div>
            <div>
              <h3>Technologies</h3>
              <p>Git, Linux (Ubuntu), Make/CMake, React, Node.js</p>
            </div>
            <div>
              <h3>Tools</h3>
              <p>Cadence Virtuoso, Spectre, Innovus, Genus, Modus, KiCad, VS Code, Arduino, Raspberry Pi, Figma</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
