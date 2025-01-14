const face_recognition_api = async (archivoDeImagen, capturaDeCamara, name) => {
    try {
        const formData = new FormData();
        
        // Adjuntar los archivos al FormData
        formData.append("file", archivoDeImagen);  // Imagen del archivo
        formData.append("camera_capture", capturaDeCamara);  // Imagen de la cámara
        formData.append("name", name);  // Nombre del usuario
        const response = await fetch('http://localhost:8000/face_recognition/post', {
            method: 'POST',
            body: formData,  // Enviar el FormData
        });

        const response_json = await response.json();
        return response_json;
    } catch (error) {
        console.log(error);
    }
}

export default face_recognition_api;
