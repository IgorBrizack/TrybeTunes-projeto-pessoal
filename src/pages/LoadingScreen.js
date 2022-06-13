import React from 'react';
import '../index.css';
import loading from './loading.gif';

class LoadingScreen extends React.Component {
  render() {
    return (
      <div className="loading-container">
        <img className="loading-image" src={ loading } alt="imagem" />
      </div>
    );
  }
}

export default LoadingScreen;
