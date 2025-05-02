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
                    Hi! I'm Cody, a sophomore Computer Engineering student at the University of Notre Dame from Aiea, Hawai'i. 
                    I'm interested in computer architecture, VLSI design, and embedded systems applications.
                </p>
                <p>
                    I also love all things music, playing tennis, hiking, and having fun in the ocean! Lately, I have been really 
                    enjoying rock climbing and photography and would love to share some of my adventures with you!
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