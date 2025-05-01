import React from 'react';
import './Hobbies.css';

function Hobbies() {
  // Sample hobbies data - replace with your own hobbies
  const hobbies = [
    {
      id: 1,
      name: 'Tennis',
      description: 'I have been playing tennis for as long as I can remember! During my senior year, my team won the first OIA team championshipin in MoHS history!',
      icon: ''
    },
    {
      id: 2,
      name: 'Hiking',
      description: 'I love exploring the trails on O\'ahu with friends and family, and would love to see new sights! So far, my favorite hikes have been Wiliwilinui Ridge Trail and Waimano Falls!',
      icon: ''
    },
    {
      id: 3,
      name: 'Music',
      description: 'I have been playing cello for 11 years and trombone for 6. I march as a member of the trombone section of the Band of the Fighting Irish!',
      icon: ''
    },
    {
      id: 4,
      name: 'Beach',
      description: 'I am still learning how to surf, but I love to catch waves on my bodyboard, or even just bodysurfing!',
      icon: ''
    }
  ];

  return (
    <section id="hobbies" className="hobbies">
      <h2>Hobbies & Interests</h2>
      <h4>**Pictures will be here soon!**</h4>
      <div className="grid hobbies-grid">
        {hobbies.map(hobby => (
          <div className="card hobby-card" key={hobby.id}>
            <div className="hobby-icon">{hobby.icon}</div>
            <h3>{hobby.name}</h3>
            <p>{hobby.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hobbies;