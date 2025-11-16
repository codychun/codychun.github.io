import React from 'react';
import headshot from '../img/senior_headshot.jpg'
import './About.css';

function About() {
    return (
        <section id="about" className="about">
            <h2>About Me</h2>
            <div className="about-content">
            <div className="about-text">
                <p>
                    Hi, I'm Cody! I'm originally from Aiea, Hawaii, and I'm currently a junior studying Computer Engineering at the University of Notre Dame.
                    I'm fascinated by how software really runs on hardware, and I love digging into the layers of abstraction that make these complex computer systems work.
                    I'm especially interested in computer architecture, VLSI, and processing-in-memory. Ultimately, I want to build tools that people can rely on in their daily lives.
                </p>
                <p>
                    I play cello and trombone and love all things music-related. I'm currently listening to a lot of jazz, indie rock, and R&B, but I'm always open to new recommendations!
                    You can also catch me playing tennis, hiking, or rock climbing with friends in my free time. I recently got a used Sony Alpha 230 and am really enjoying taking
                    pictures of my travels. Let me share some of my adventures with you!
                </p>
            </div>
            <div className="about-image">
                <div className="headshot">
                    <img src={headshot} alt="Cody's Headshot" className="headshot" />
                </div>
            </div>
            </div>
        </section>
    );
}

export default About;