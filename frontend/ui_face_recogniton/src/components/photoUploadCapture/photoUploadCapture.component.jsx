import React, { useState, useRef, useEffect, useContext } from 'react';
import { Upload, Camera, Image as ImageIcon, RotateCw } from 'lucide-react';
import { ContextState } from '../../context/context_state';
import './photoUploadCapture.style.scss';

const PhotoUploadCapture = () => {
  const{ setFaces } = useContext(ContextState);
  const [currentStep, setCurrentStep] = useState('initial');
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [cameraInitialized, setCameraInitialized] = useState(false);

  const [images, setImages] = useState({
    uploadedImage: null,
    capturedImage: null
  });

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Effect to handle camera initialization and cleanup
  useEffect(() => {
    if (currentStep === 'capture' && !cameraInitialized) {
      startCamera();
    }
    return () => {
      if (currentStep !== 'capture') {
        stopCamera();
      }
    };
  }, [currentStep, cameraInitialized]);

  const handleSubmitImages = () => {
    if (images.uploadedImage && images.capturedImage) {
      const formData = new FormData();
      const uploadedBlob = dataURLtoBlob(images.uploadedImage);
      const capturedBlob = dataURLtoBlob(images.capturedImage);
      
      formData.append('uploadedImage', uploadedBlob);
      formData.append('capturedImage', capturedBlob);

      if ( uploadedBlob && capturedBlob){
        console.log(images)
        console.log('FormData ready to be sent:', formData);
        setFaces(formData);
      }
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      processFile(file, 'upload');
    }
  };

  const processFile = (file, source) => {
    setIsLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (source === 'upload') {
        setImages(prev => ({ ...prev, uploadedImage: reader.result }));
        handleStepChange('capture');
      } else {
        setImages(prev => ({ ...prev, capturedImage: reader.result }));
        handleStepChange(images.uploadedImage ? 'complete' : 'upload');
      }
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file, 'upload');
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraInitialized(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraInitialized(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setCameraInitialized(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const dataURL = canvas.toDataURL('image/jpeg');
    setImages(prev => ({ ...prev, capturedImage: dataURL }));
    handleStepChange('complete');
  };

  const resetComponent = () => {
    setImages({ uploadedImage: null, capturedImage: null });
    setCameraInitialized(false);
    handleStepChange('initial');
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="photo-upload-container">
      <div className="photo-upload-card">
        {currentStep === 'initial' && (
          <div className="initial-options">
            <h2 className="title">Selecciona una opción</h2>
            <button
              className="upload-button"
              onClick={() => handleStepChange('upload')}
            >
              <Upload size={24} />
              <span>Subir foto desde archivo</span>
            </button>
            <button
              className="capture-button"
              onClick={() => handleStepChange('capture')}
            >
              <Camera size={24} />
              <span>Tomar foto con cámara</span>
            </button>
          </div>
        )}

        {currentStep === 'upload' && (
          <div
            className={`upload-area ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden-input"
            />
            <ImageIcon className="upload-icon" size={48} />
            <p className="upload-text">
              Arrastra tu imagen aquí o haz clic para seleccionar
            </p>
          </div>
        )}

        {currentStep === 'capture' && !images.capturedImage && (
          <div className="camera-container">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="camera-preview"
            />
            <button
              className="capture-photo-button"
              onClick={capturePhoto}
              disabled={!cameraInitialized}
            >
              <Camera size={24} />
              <span>Capturar foto</span>
            </button>
          </div>
        )}

        {currentStep === 'complete' && (
          <div className="preview-container">
            <div className="images-preview">
              <div className="preview-image-wrapper">
                <img
                  src={images.uploadedImage}
                  alt="Uploaded"
                  className="preview-image"
                />
                <span>Imagen subida</span>
              </div>
              <div className="preview-image-wrapper">
                <img
                  src={images.capturedImage}
                  alt="Captured"
                  className="preview-image"
                />
                <span>Imagen capturada</span>
              </div>
            </div>
            <div className="action-buttons">
              <button
                className="retry-button"
                onClick={resetComponent}
              >
                <RotateCw size={24} />
                <span>Volver a intentar</span>
              </button>
              <button
                className="submit-button"
                onClick={handleSubmitImages}
              >
                <Upload size={24} />
                <span>Enviar fotos</span>
              </button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <span>Procesando imagen...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUploadCapture;