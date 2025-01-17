import React, { useState, useContext, useEffect } from 'react';
import { ContextState } from './context/context_state';
import { Camera, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import Confetti from 'react-confetti';

import PhotoUploadCapture from './components/photoUploadCapture/photoUploadCapture.component';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner.component';
import './App.scss';

const App = () => {
  const [buttonSelect, setButtonSelect] = useState(null);
  
  const { loading, response, setResponse } = useContext(ContextState);
  
  const handleOnclick = (event) => {
    // setButtonSelect(event.target.dataset.action);
    if (event.target.dataset.action === 'comenzar') {
      setButtonSelect('comenzar');
      setResponse(null);
    }

    if (event.target.dataset.action === 'informacion') {
      setButtonSelect('informacion');
      setResponse(null);
    }
  };

  useEffect(() => {
    setButtonSelect(null);
  }, [loading]);

  console.log(buttonSelect);

  return (
    <div className="welcome-container">

      <div className="welcome-card">
        {
          response ?
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
            /> : null
        }
        <div className="welcome-content">

          <div className="welcome-header">
            <h1>Primera semana del reto de 60 días</h1>
            <div className="divider"></div>
          </div>

          <div className="welcome-body">

            <div className="facial-recognition">
              <h2>¡Bienvenido a la aplicación de reconocimiento facial!</h2>
              <Camera className="camera-icon" size={48} />
            </div>
            {
              loading ? (
                <LoadingSpinner />
              ) : response !== null ? (
                <div className="informacion-content">
                  <h2>¡Gracias por tus fotos!</h2>
                  {response ? (
                    <p><strong>Las fotos coinciden</strong>, lo que indica que es la misma persona. ¡Gracias por tu contribución!</p>
                  ) : (
                    <p><strong>Las fotos no coinciden</strong>, lo que indica que son personas diferentes. ¡Gracias por tu contribución!</p> 
                  )}
                </div>
              ) : buttonSelect === 'comenzar' ? (
                <PhotoUploadCapture />
              ) : buttonSelect ? (
                <div className="informacion-content">
                  <h2>¿Qué es el reconocimiento facial?</h2>
                  <p>
                    El reconocimiento facial es un proceso que utiliza la cámara de tu dispositivo para identificar a una persona en una foto. Este proceso se basa en la comparación de características faciales como la expresión, la mirada y la postura, entre otras.
                  </p>
                  <p>Este sistema consta de dos pasos principales:</p>
                  <ul>
                    <li>Comparar dos imágenes para identificar similitudes y diferencias en las características faciales.</li>
                    <li>Identificar los rostros presentes en las imágenes utilizando algoritmos avanzados.</li>
                  </ul>
                  <p>
                    La lógica detrás del reconocimiento facial incluye el uso de inteligencia artificial, algoritmos matemáticos y técnicas de procesamiento de imágenes. Esto permite analizar las características únicas del rostro de una persona para realizar identificaciones precisas y confiables.
                  </p>
                  <p>
                    El reconocimiento facial tiene aplicaciones en diversas áreas, como la identificación de clientes en una empresa, la detección de agresores en un entorno público, entre otras.
                  </p>
                </div>
              ) : null
            }

            <div className="action-buttons">
              {
                buttonSelect === null ?
                <>
                  <button data-action= 'comenzar' onClick={handleOnclick} className="btn primary">Comenzar</button> 
                  <button data-action= 'informacion' onClick={handleOnclick} className="btn secondary">Mas información</button>
                </> : buttonSelect === 'comenzar' ?
                  <button data-action= 'informacion' onClick={handleOnclick} className="btn secondary">Información</button> : 
                  buttonSelect === 'informacion' ?
                  <button data-action= 'comenzar' onClick={handleOnclick} className="btn primary">Comenzar</button> : null
              }
            </div>

            <div className="profile-section">
              <div className="profile-content">
                <h3>¡Hola! Soy Neyen</h3>
                <p>Puedes seguirnos en nuestras redes sociales</p>
                <div className="social-icons">
                  <a href="https://www.instagram.com/neyenfrandino/" className="social-link" target="_blank" rel="noopener noreferrer">
                    <Instagram size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/neyen-frandino/" className="social-link" target="_blank" rel="noopener noreferrer">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
      
      
      <div className="logo-container">
          {/* Reemplaza la URL con la de tu logo */}
          <a href="https://portfolio-neyenfrandino-update.netlify.app/" target="_blank" title='Visitar Portfolio'>
            <img 
              src="img/9.png" 
              alt="Logo de la empresa" 
              className="logo-image"
            />
          </a>
      </div>

    </div>
  );
};

export default App;