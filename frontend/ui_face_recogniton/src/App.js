import React, { useState } from 'react';
import { Camera, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import PhotoUploadCapture from './components/photoUploadCapture/photoUploadCapture.component';
import './App.scss';

const App = () => {
  const [buttonSelect, setButtonSelect] = useState(null);
  
  const handleOnclick = (event) => {
    // setButtonSelect(event.target.dataset.action);
    if (event.target.dataset.action === 'comenzar') {
      setButtonSelect('comenzar');
    }

    if (event.target.dataset.action === 'informacion') {
      setButtonSelect('informacion');
    }
    
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">


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
              buttonSelect === 'comenzar' ?
                <PhotoUploadCapture /> : buttonSelect !== null ?  
                <div className="informacion-content">
                  <h2>¿Qué es el reconocimiento facial?</h2>
                  <p>El reconocimiento facial es un proceso que utiliza la cámara de tu dispositivo para identificar a una persona en una foto. Esto se hace mediante la comparación de características faciales, como la expresión, la mirada y la postura, entre otras.</p>
                  <p>Este proceso puede ser útil en una variedad de aplicaciones, como la identificación de clientes en una empresa, la detección de agresores en un entorno público, entre otros.</p>
                </div> : null
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
                  <a href="#" className="social-link">
                    <Instagram size={24} />
                  </a>
                  <a href="#" className="social-link">
                    <Twitter size={24} />
                  </a>
                  <a href="#" className="social-link">
                    <Facebook size={24} />
                  </a>
                  <a href="#" className="social-link">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="logo-container">
          {/* Reemplaza la URL con la de tu logo */}
          <img 
            src="img/9.png" 
            alt="Logo de la empresa" 
            className="logo-image"
          />
        </div>
      </div>


    </div>
  );
};

export default App;