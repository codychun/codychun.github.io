import React from 'react';
import './Education.css';

function Education() {
    // Sample education data - replace with your own education
    const education = [
        {
        id: 1,
        institution: 'B.S. Computer Engineering',
        degree: 'University of Notre Dame',
        location: 'Notre Dame, IN',
        year: '2023 - Present',
        description: 'Relevant coursework: Computer Architecture, Logic Design, Data Structures, Systems Programming, Intro to Embedded Systems, Intro to Electric Circuits'
        },
        {
        id: 2,
        degree: 'High School Diploma',
        institution: 'Moanalua High Sschool',
        location: 'Honolulu, Hawaii',
        year: '2019 - 2023',
        description: 'Varsity Tennis, Symphony Orchestra, Marching Band, Science Academic Team, National Honor Society'
        }
    ];

  // Sample experience data - replace with your own experience
  /*const experience = [
    {
      id: 1,
      position: 'Software Developer',
      company: 'Company Name',
      location: 'City, State',
      period: 'Jan 2023 - Present',
      description: 'Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.'
    },
    {
      id: 2,
      position: 'Web Development Intern',
      company: 'Internship Company',
      location: 'City, State',
      period: 'May 2022 - Dec 2022',
      description: 'Assisted in front-end development tasks using HTML, CSS, and JavaScript. Participated in code reviews and team meetings.'
    }
  ];*/

  return (
    <section id="education" className="education">
      <h2>Education</h2>
      
        <div className="timeline-section">
          <h3>Education</h3>
          <div className="timeline">
            {education.map(item => (
              <div className="timeline-item" key={item.id}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>{item.degree}</h4>
                  <h5>{item.institution}, {item.location}</h5>
                  <p className="timeline-date">{item.year}</p>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
    </section>
  );
}

export default Education;