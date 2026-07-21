import { useNavigate } from 'react-router-dom'
import { projects } from '../../data/projects'
import './ProjectsPage.css'

function ProjectsPage() {
  const navigate = useNavigate()

  return (
    <div className="projects-page">
      <h1>Projects</h1>
      
      <div className="projects-grid">
        {projects.map(project => (

          <div key={project.id} className="project-card">
            <h2>{project.title}</h2>
            
            <div className="project-image">
              <img src={project.image} alt={project.title}/>
            </div>

            <p className="project-description">{project.description}</p>

            <div className="tech-tags">
              {project.tech.map(tech => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="project-links">
              {project.link && (
                <a 
                  onClick={() => navigate(project.link)}  // Navigate!
                  className="project-link"
                >
                  View Project
                </a>
              )}

              {project.github && (
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link github"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectsPage