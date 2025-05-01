import React from 'react';
import './Projects.css';

function Projects() {
  // Sample project data - replace with your own projects
  const projects = [
    {
      id: 1,
      title: 'Keep Talking and Nobody Explodes',
      description: 'A physical puzzle game, similar to the computer game: Keep Talking and Nobody Explodes, where the player has to solve puzzles before the bomb EXPLODES! I will link my work here soon!',
      technologies: ['Arduino'],
      //github: 'https://github.com/yourusername/project1',
      //demo: 'https://project1-demo.com'
    },
    {
      id: 2,
      title: 'Haptic Alarm Project',
      description: 'An alarm clock that ONLY vibrates, so I can wake up and my roommates don\'t have to! I am finalizing the soldering and will soon be developing the app!',
      technologies: ['Micropython', 'BLE', 'Raspberry Pi Pico 2W'],
      //github: 'https://github.com/yourusername/project2',
      //demo: 'https://project2-demo.com'
    },
    {
      id: 3,
      title: 'This Website!',
      description: 'I still have to finish a lot of things... it will be an ongoing process!',
      technologies: ['React', 'JavaScript', 'CSS'],
      //github: 'https://github.com/yourusername/project2',
      //demo: 'https://project2-demo.com'
    },
  ];

  return (
    <section id="projects" className="projects">
      <h2>My Projects</h2>
      <div className="grid projects-grid">
        {projects.map(project => (
          <div className="card project-card" key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="technologies">
              {project.technologies.map((tech, index) => (
                <span className="tech-tag" key={index}>{tech}</span>
              ))}
            </div>
            <div className="project-links">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-sm">GitHub</a>
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-sm">Live Demo</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;