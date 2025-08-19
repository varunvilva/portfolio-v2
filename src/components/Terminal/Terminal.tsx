import React from 'react';
import './Terminal.css';

const Terminal: React.FC = () => {
  return (
    <div className="terminal-container">
      {/* Terminal header with traffic lights */}
      <div className="terminal-header">
        <div className="traffic-lights">
          <div className="traffic-light red"></div>
          <div className="traffic-light yellow"></div>
          <div className="traffic-light green"></div>
        </div>
      </div>
      
      {/* Terminal content */}
      <div className="terminal-content">
        <div className="terminal-line">
          <span className="prompt">{'>'}</span>
          <span className="command">Varun.currentLocation</span>
        </div>
        <div className="output">
          <span className="string">"Bangaluru, KA"</span>
        </div>

        <div className="terminal-line">
          <span className="prompt">{'>'}</span>
          <span className="command">Varun.contactInfo</span>
        </div>
        <div className="output">
          <span className="bracket">["</span>
          <span className="string"><a href="mailto:varunvilva1208@gmail.com">varunvilva1208@gmail.com</a></span>
          <span className="bracket">", "</span>
          <span className="string"><a href="https://linkedin.com/in/varunvilva" target='_blank'>LinkedIn</a></span>
          <span className="bracket">", "</span>
          <span className="string"><a href="https://github.com/varunvilva" target='_blank'>github</a></span>
          <span className="bracket">"]</span>
        </div>

        <div className="terminal-line">
          <span className="prompt">{'>'}</span>
          <span className="command">Varun.resume</span>
        </div>
        <div className="output">
          <span className="string"><a href="/VarunVilvadrinath_Resume.pdf" target="_blank" rel="noopener noreferrer">"varunvilva_resume.pdf"</a></span>
        </div>

        <div className="terminal-line">
          <span className="prompt">{'>'}</span>
          <span className="command">Varun.interests</span>
        </div>
        <div className="output">
          <span className="bracket">["</span>
          <span className="string">reading</span>
          <span className="bracket">", "</span>
          <span className="string">working out</span>
          <span className="bracket">", "</span>
          <span className="string">video games</span>
          <span className="bracket">", "</span>
          <span className="string">watching movies/series</span>
          <span className="bracket">"]</span>
        </div>

        <div className="terminal-line">
          <span className="prompt">{'>'}</span>
          <span className="command">Varun.education</span>
        </div>
        <div className="output">
            <span className="bracket">[</span>
            <span className="string">"Computer Science & Engineering, IIIT Vadodara"</span>
                <span className="bracket">, "</span>
               <span className="string">B.Sc. Data Science and Programming, IIT Madras"</span>
            <span className="bracket">"]</span>
        </div>


        <div className="terminal-line">
          <span className="prompt">{'>'}</span>
          <span className="command">Varun.domains</span>
        </div>
        <div className="output">
          <span className="bracket">["</span>
          <span className="string">Software Development</span>
          <span className="bracket">", "</span>
          <span className="string">Data Engineering</span>
          <span className="bracket">", "</span>
          <span className="string">Data Science</span>
          <span className="bracket">", "</span>
          <span className="string">Machine Learning & Artificial Intelligence</span>
          <span className="bracket">", "</span>
          <span className="string">Devops (AWS)</span>
          <span className="bracket">"]</span>
        </div>
        <div className="terminal-line">
          <span className="prompt">{'>'}</span>
          <span className="command">Varun.skills</span>
        </div>
        <div className="output">
          <span className="bracket">["</span>
          <span className="string">Java - SpringBoot</span>
          <span className="bracket">", "</span>
          <span className="string">NodeJs</span>
          <span className="bracket">", "</span>
          <span className="string">Python</span>
          <span className="bracket">", "</span>
          <span className="string">React</span>
          <span className="bracket">", "</span>
          <span className="string">Redux</span>
          <span className="bracket">", "</span>
          <span className="string">Flask</span>
          <span className="bracket">", "</span>
          <span className="string">git</span>
          <span className="bracket">", "</span>
          <span className="string">go</span>
          <span className="bracket">", "</span>
          <span className="string">kafka</span>
          <span className="bracket">", "</span>
          <span className="string">AWS</span>
          <span className="bracket">", "</span>
          <span className="string">Docker</span>
          <span className="bracket">"]</span>
        </div>

        <div className="terminal-line">
          <span className="prompt">{'>'}</span>
          <span className="cursor">█</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;