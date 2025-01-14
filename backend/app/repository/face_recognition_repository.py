import cv2
import face_recognition as fr
import numpy as np

def face_recognition_post_repo(schema, file, camera_capture):
    print(schema)
    print(file)
    print(camera_capture)
    
    # # Carga el archivo de imagen
    # file_bytes = file.file.read()
    # camera_capture_bytes = camera_capture.file.read()

    # # Convertir los bytes a arrays de numpy
    # img_archive_array = np.frombuffer(file_bytes, np.uint8)
    # img_camera_array = np.frombuffer(camera_capture_bytes, np.uint8)
    
    # # Decodificar las imágenes a matrices de OpenCV
    # img_archive = cv2.imdecode(img_archive_array, cv2.IMREAD_COLOR)
    # img_camera = cv2.imdecode(img_camera_array, cv2.IMREAD_COLOR)

    # # Imprimir las dimensiones de las imágenes para verificar si son iguales
    # print(f"Dimensiones de la imagen de archivo: {img_archive.shape}")
    # print(f"Dimensiones de la imagen de cámara: {img_camera.shape}")

    # # Redimensionar ambas imágenes a un tamaño común (ejemplo: 224x224) si es necesario
    # if img_archive.shape != img_camera.shape:
    #     img_archive = cv2.resize(img_archive, (224, 224))
    #     img_camera = cv2.resize(img_camera, (224, 224))

    # # Imprimir las dimensiones después del redimensionado
    # print(f"Dimensiones de la imagen de archivo (después de redimensionar): {img_archive.shape}")
    # print(f"Dimensiones de la imagen de cámara (después de redimensionar): {img_camera.shape}")

    # # Convertir ambas imágenes a RGB (face_recognition trabaja mejor con imágenes en este formato)
    # img_archive_rgb = cv2.cvtColor(img_archive, cv2.COLOR_BGR2RGB)
    # img_camera_rgb = cv2.cvtColor(img_camera, cv2.COLOR_BGR2RGB)

    # # Detector de caras usando Haar Cascade
    # face_classifier = cv2.CascadeClassifier(
    #     cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    # )

    # # Detectar caras en ambas imágenes
    # face_archive = face_classifier.detectMultiScale(
    #     img_archive, scaleFactor=1.1, minNeighbors=5, minSize=(40, 40)
    # )
    # face_camera = face_classifier.detectMultiScale(
    #     img_camera, scaleFactor=1.1, minNeighbors=5, minSize=(40, 40)
    # )

    # # Si no se detectan caras en alguna de las imágenes, retornar un mensaje de error
    # if len(face_archive) == 0 or len(face_camera) == 0:
    #     return {"error": "No se detectaron caras en una o ambas imágenes"}

    # # Obtener los embeddings de las caras detectadas en ambas imágenes
    # # Primero, recortamos las caras detectadas y luego generamos los embeddings
    # face_encodings_archive = []
    # for (x, y, w, h) in face_archive:
    #     face_image = img_archive_rgb[y:y+h, x:x+w]
    #     encoding = fr.face_encodings(face_image)
    #     if encoding:
    #         face_encodings_archive.append(encoding[0])  # Tomamos solo el primer encoding

    # face_encodings_camera = []
    # for (x, y, w, h) in face_camera:
    #     face_image = img_camera_rgb[y:y+h, x:x+w]
    #     encoding = fr.face_encodings(face_image)
    #     if encoding:
    #         face_encodings_camera.append(encoding[0])  # Tomamos solo el primer encoding

    # # Comparar las caras usando los embeddings
    # for encoding_archive, encoding_camera in zip(face_encodings_archive, face_encodings_camera):
    #     # Comparar las caras y calcular la distancia
    #     result = fr.compare_faces([encoding_archive], encoding_camera)
    #     distance = fr.face_distance([encoding_archive], encoding_camera)

    #     print(f"Resultado de la comparación: {result}")
    #     print(f"Distancia entre las caras: {distance}")

    #     # Si la distancia es menor a un umbral, se considera que las caras son similares
    #     if result[0] and distance[0] < 0.6:  # Ajusta el umbral de distancia si es necesario
    #         return {"result": "Las caras son similares"}
    #     else:
    #         return {"result": "Las caras no son similares"}

    # return {"error": "No se pudo realizar la comparación de las caras"}
