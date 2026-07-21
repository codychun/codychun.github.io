import './AboutPage.css'

function AboutPage() {
  return (
    <div className="about-page">
      <h1>About Me</h1>
      
      <div className="about-content">
        <section>
          <p>
            I'm a rising senior at the University of Notre Dame studying Computer Engineering and Real Estate. 
            I'm fascinated by the intersection of hardware and software, optimizing performance and efficiency in digital ASIC design.
          </p>
          
          <p>
            I love travelling the world, capturing interesting moments and forgotten places with my Sony A230.
            I've been so fortunate to research abroad in Lyon, France through an NSF grant, and study abroad at Notre Dame London. 
            Check out some of my pictures from Europe on my photography page! Growing up in Hawaii, I love being outdoors in nature 
            and I really appreciate a good hike through the mountains. I also like to play tennis and music.
          </p>
        </section>
        
        <section className="education-section">
          <h2>Education</h2>
          <div className="education-card">
            <h3>University of Notre Dame</h3>
            <p className="degree">B.S. Computer Engineering</p>
            <p className="graduation">Expected Graduation: May 2027</p>
            <p className="coursework">
              Relevant Coursework: Digital Integrated Circuits, Computer Architecture, 
              Logic Design and Sequential Circuits, Data Science, Intro to AI, Applied Embedded Systems,
              Microprocessor Application Design and Implementation, Operating Systems, Data Structures, Systems Programming
            </p>
          </div>
        </section>
        
        <section className="skills-section">
          <h2>Skills</h2>
          <div className="skills-grid">
            <div>
              <h3>Languages</h3>
              <p>SystemVerilog, VHDL, C, Python, RISC-V Assembly, JavaScript, Java, Bash</p>
            </div>
            <div>
              <h3>Technologies/Frameworks</h3>
              <p>UVM/UVMF, Git, Linux, Make/CMake, LLVM, React, Node.js</p>
            </div>
            <div>
              <h3>Tools</h3>
              <p>Cadence Design Suite (Virtuoso, Spectre, Innovus, Genus, Modus), Libero SoC, QuestaSim, Synplify Pro, KiCAD, Arduino, Raspberry Pi, VSCode, vim, SolidWorks, Excel</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
