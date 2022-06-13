import React from 'react';
import gitLogo from './github.png';
import linkedinLogo from './linkedinIcon.png';
// import '../index.css';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="logo-container">
          <a href="https://github.com/IgorBrizack" target="_blank" rel="noreferrer">
            <img className="logo-images" src={ gitLogo } alt="GitHub logo" />
          </a>
        </div>
        <div className="logo-container-text">
          <p>
            Igor Brizack - Desenvolvedor Web
          </p>
        </div>
        <div className="logo-container">
          <a href="https://www.linkedin.com/in/igor-brizack-a627b1129/" target="_blank" rel="noreferrer">
            <img className="logo-images" src={ linkedinLogo } alt="LinkedIn logo" />
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
