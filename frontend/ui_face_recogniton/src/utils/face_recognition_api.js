const face_recognition_api = async (formData) => {
    console.log(formData, 'jajajaja');
    try {
        const response = await fetch('http://localhost:8000/face_recognition/post', {
            method: 'POST',
            body: formData,  // Enviar el FormData
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const response_json = await response.json();
        return response_json;
    } catch (error) {
        console.log('Error:', error);
    }
}

export default face_recognition_api;
